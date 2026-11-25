#!/usr/bin/env node
/**
 * Teknisk SEO-kontroll mot en körande server (next start eller next dev).
 *
 *   node scripts/check-seo.mjs [http://localhost:3000]
 *
 * - Hämtar /sitemap.xml och kontrollerar att varje sida svarar 200
 * - Per sida: exakt en <h1>, unik <title>, meta description, självrefererande canonical,
 *   lang="sv", ingen hreflang, alla <img> har alt, JSON-LD parsas som giltig JSON
 * - Crawlar alla interna länkar (href="/…") från sitemap-sidorna och kontrollerar 200
 * - Räknar ord i <main> för landningssidorna
 * - Startsidan: sektionen #boden finns; /byggfirma/boden redirectar permanent (308) till /
 *   och ingen sida länkar dit; ingen sida svarar med cache-control no-store
 *
 * Avslutar med exit code 1 om något fel hittas.
 */

const base = (process.argv[2] ?? "http://localhost:3000").replace(/\/$/, "");
const SITE_URL = "https://www.jjbyggboden.se";

/** Tidigare ortsida för Boden – ersatt av startsidans sektion #boden. */
const REDIRECTED_PATH = "/byggfirma/boden";

const errors = [];
const warn = [];
/** title → första sidan som hade den; två sidor med samma title konkurrerar om samma sökning. */
const seenTitles = new Map();

function fail(msg) {
  errors.push(msg);
  console.log("  FEL  " + msg);
}

function toLocal(url) {
  return url.replace(SITE_URL, base);
}

function decode(s) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

async function get(url) {
  const res = await fetch(url, { redirect: "manual", headers: { "user-agent": "jjbygg-seo-check" } });
  return {
    status: res.status,
    html: res.status === 200 ? await res.text() : "",
    location: res.headers.get("location") ?? "",
    cacheControl: res.headers.get("cache-control") ?? "",
  };
}

function wordCount(html) {
  const main = html.match(/<main[\s\S]*?<\/main>/i)?.[0] ?? html;
  const text = main
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ");
  return decode(text)
    .split(/\s+/)
    .filter((w) => /[A-Za-zÅÄÖåäö0-9]/.test(w)).length;
}

async function checkPage(url, { landing }) {
  const { status, html, cacheControl } = await get(toLocal(url));
  console.log(`${status} ${url}`);
  if (status !== 200) return fail(`${url} svarade ${status}`);

  // Sidorna ska vara statiska/ISR. no-store betyder att något (noStore, cookies, headers)
  // har gjort sidan dynamisk. Nyhetsinlägg är dynamiska med avsikt.
  if (/no-store/i.test(cacheControl) && !/\/nyheter\/.+/.test(url)) {
    fail(`${url}: cache-control är "${cacheControl}" (sidan renderas dynamiskt)`);
  }
  if (html.includes(REDIRECTED_PATH)) fail(`${url}: länkar till ${REDIRECTED_PATH} (ska vara /#boden)`);
  if (url === SITE_URL && !/<section[^>]*\bid="boden"/i.test(html)) fail(`${url}: saknar sektionen #boden`);

  const h1s = html.match(/<h1[\s>]/gi) ?? [];
  if (h1s.length !== 1) fail(`${url}: ${h1s.length} st <h1> (ska vara exakt 1)`);

  const title = html.match(/<title>([^<]*)<\/title>/i)?.[1];
  if (!title) fail(`${url}: saknar <title>`);
  else if (seenTitles.has(title)) fail(`${url}: samma <title> som ${seenTitles.get(title)}`);
  else seenTitles.set(title, url);
  if (title && decode(title).length > 60) warn.push(`${url}: title ${decode(title).length} tecken: ${decode(title)}`);

  const desc = html.match(/<meta name="description" content="([^"]*)"/i)?.[1];
  if (!desc) fail(`${url}: saknar meta description`);
  else if (decode(desc).length > 155) warn.push(`${url}: description ${decode(desc).length} tecken`);

  const canonical = html.match(/<link rel="canonical" href="([^"]*)"/i)?.[1];
  if (!canonical) fail(`${url}: saknar canonical`);
  else if (canonical !== url) fail(`${url}: canonical pekar på ${canonical}`);

  if (!/<html[^>]*\blang="sv"/i.test(html)) fail(`${url}: saknar lang="sv"`);
  if (/hreflang=/i.test(html)) fail(`${url}: innehåller hreflang (ska inte finnas – bara svenska)`);

  const og = html.match(/<meta property="og:title" content="([^"]*)"/i)?.[1];
  if (!og) fail(`${url}: saknar og:title`);

  for (const img of html.match(/<img\b[^>]*>/gi) ?? []) {
    if (!/\balt=/.test(img)) fail(`${url}: <img> utan alt: ${img.slice(0, 80)}`);
  }

  const ldBlocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)].map((m) => m[1]);
  if (ldBlocks.length === 0) fail(`${url}: ingen JSON-LD`);
  const types = [];
  for (const block of ldBlocks) {
    try {
      const parsed = JSON.parse(block);
      for (const node of Array.isArray(parsed) ? parsed : [parsed]) types.push(node["@type"]);
    } catch (e) {
      fail(`${url}: JSON-LD går inte att parsa: ${e.message}`);
    }
  }

  const links = new Set();
  for (const m of html.matchAll(/href="(\/[^"#?]*)"/g)) {
    if (!m[1].startsWith("/_next") && !m[1].startsWith("/api")) links.add(m[1]);
  }

  const words = wordCount(html);
  if (landing && words < 300) fail(`${url}: bara ${words} ord i <main>`);
  console.log(`      h1=${h1s.length} ord=${words} jsonld=[${types.join(", ")}] länkar=${links.size}`);
  return links;
}

const sitemapRes = await get(`${base}/sitemap.xml`);
if (sitemapRes.status !== 200) {
  console.error(`sitemap.xml svarade ${sitemapRes.status}`);
  process.exit(1);
}
const urls = [...sitemapRes.html.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
console.log(`Sitemap: ${urls.length} adresser\n`);

if (urls.includes(`${SITE_URL}${REDIRECTED_PATH}`)) fail(`${REDIRECTED_PATH} ligger kvar i sitemapen`);
const redirected = await get(`${base}${REDIRECTED_PATH}`);
const redirectTarget = redirected.location ? new URL(redirected.location, base).pathname : "";
console.log(`${redirected.status} ${REDIRECTED_PATH} → ${redirected.location || "(ingen Location)"}\n`);
if (redirected.status !== 308 || redirectTarget !== "/") {
  fail(`${REDIRECTED_PATH} ska svara 308 → / (svarade ${redirected.status} → ${redirected.location || "–"})`);
}

const allLinks = new Set();
for (const url of urls) {
  const landing = /\/byggfirma\/|\/tjanster\/.+/.test(url);
  const links = await checkPage(url, { landing });
  for (const l of links ?? []) allLinks.add(l);
}

console.log(`\nInterna länkar att kontrollera: ${allLinks.size}`);
for (const path of [...allLinks].sort()) {
  const { status } = await get(`${base}${path}`);
  const inSitemap = urls.includes(`${SITE_URL}${path}`) || (path === "/" && urls.includes(SITE_URL));
  console.log(`${status} ${path}${inSitemap ? "" : "   (ej i sitemap)"}`);
  if (status !== 200) fail(`Bruten intern länk: ${path} → ${status}`);
}

if (warn.length) {
  console.log("\nVarningar:");
  for (const w of warn) console.log("  " + w);
}
console.log(errors.length ? `\n${errors.length} fel.` : "\nInga fel.");
process.exit(errors.length ? 1 : 0);
