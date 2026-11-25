/**
 * Datakontroller för tjänstesidorna (lib/services-content.ts) och bilderna från
 * egna jobb (lib/referenser-content.ts): unika sluggar/titlar, längder på
 * title/description, att alla interna hänvisningar pekar på en befintlig tjänst
 * och att inga belopp i kronor smyger in i texterna.
 *
 * Körs med `npm test`.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { SERVICE_GROUPS, SERVICE_PAGES } from "../lib/services-content.ts";
import { REFERENSER, referenserFor, serviceCardImage } from "../lib/referenser-content.ts";
import { SERVICE_LOCATION_PAGES } from "../lib/service-location-content.ts";

/** De sex ursprungliga tjänsterna – ordningen styr `links: "services"` på ortsidorna. */
const ORIGINAL_SLUGS = [
  "nybyggnation-tillbyggnad",
  "renovering",
  "badrumsrenovering",
  "altan-uteplats",
  "takbyte-platarbeten",
  "totalentreprenad",
];

const slugs = SERVICE_PAGES.map((page) => page.slug);

function allText(page: (typeof SERVICE_PAGES)[number]): string {
  return [
    page.metaTitle,
    page.metaDescription,
    page.h1,
    page.lead,
    ...page.sections.flatMap((s) => [
      s.heading,
      ...s.paragraphs,
      ...(s.list ?? []),
      ...(s.after ?? []),
      ...(s.serviceLinks ?? []).map((l) => l.note ?? ""),
    ]),
    ...page.faq.flatMap((f) => [f.question, f.answer]),
  ].join("\n");
}

test("de sex ursprungliga tjänsterna ligger först, i oförändrad ordning", () => {
  assert.deepEqual(slugs.slice(0, 6), ORIGINAL_SLUGS);
});

test("sluggar, titlar, h1 och ikoner är unika", () => {
  for (const key of ["slug", "metaTitle", "metaDescription", "h1", "name", "iconKey"] as const) {
    const values = SERVICE_PAGES.map((page) => page[key]);
    assert.equal(new Set(values).size, values.length, `dubbletter i ${key}`);
  }
});

test("title ≤ 60 tecken, description ≤ 155 tecken, 3–5 frågor per sida", () => {
  for (const page of SERVICE_PAGES) {
    assert.ok(page.metaTitle.length <= 60, `${page.slug}: title ${page.metaTitle.length} tecken`);
    assert.ok(page.metaDescription.length <= 155, `${page.slug}: description ${page.metaDescription.length} tecken`);
    assert.ok(page.faq.length >= 3 && page.faq.length <= 5, `${page.slug}: ${page.faq.length} frågor`);
    assert.match(page.metaTitle, /\| JJ Bygg$/, `${page.slug}: title ska sluta med "| JJ Bygg"`);
  }
});

test("related och serviceLinks pekar på befintliga tjänster (inte på sidan själv)", () => {
  for (const page of SERVICE_PAGES) {
    const refs = [...page.related, ...page.sections.flatMap((s) => (s.serviceLinks ?? []).map((l) => l.slug))];
    for (const ref of refs) {
      assert.ok(slugs.includes(ref), `${page.slug} → okänd tjänst "${ref}"`);
      assert.notEqual(ref, page.slug, `${page.slug} länkar till sig själv`);
    }
  }
});

test("varje tjänst får minst en länk från en annan tjänstesidas related", () => {
  for (const slug of slugs) {
    assert.ok(
      SERVICE_PAGES.some((page) => page.slug !== slug && page.related.includes(slug)),
      `${slug} saknas i alla related-listor`
    );
  }
});

test("SERVICE_GROUPS innehåller varje tjänst exakt en gång", () => {
  const grouped = SERVICE_GROUPS.flatMap((group) => group.slugs);
  assert.deepEqual([...grouped].sort(), [...slugs].sort());
});

test("tjänst×ort-sidor finns bara för de sex ursprungliga tjänsterna", () => {
  for (const page of SERVICE_LOCATION_PAGES) {
    assert.ok(ORIGINAL_SLUGS.includes(page.service), `oväntad tjänst×ort-sida: ${page.service}/${page.location}`);
  }
});

test("inga belopp i kronor utöver ROT-taket, och inga utropstecken", () => {
  for (const page of SERVICE_PAGES) {
    const text = allText(page).replaceAll("50 000 kr per person och år", "");
    // \b fungerar inte med å/ä/ö ("kräver" skulle ge träff på "kr"), därav uttryckliga bokstavsklasser.
    assert.doesNotMatch(text, /(?<![a-zåäö])(kr|kronor|sek|tkr)(?![a-zåäö])|:-|timpris/i, `${page.slug}: belopp i texten`);
    assert.doesNotMatch(text, /!/, `${page.slug}: utropstecken`);
  }
});

test("de nya sidorna anger inga kvadratmetergränser för bygglov", () => {
  for (const page of SERVICE_PAGES.slice(6)) {
    assert.doesNotMatch(allText(page), /\d+\s*(kvm|kvadratmeter|m²|m2)\b/i, `${page.slug}: kvadratmeter i texten`);
  }
});

test("bilder från egna jobb pekar på befintliga tjänster och hamnar på rätt sidor", () => {
  for (const item of REFERENSER) {
    for (const ref of [item.service, ...(item.alsoServices ?? [])]) {
      assert.ok(slugs.includes(ref), `${item.slug} → okänd tjänst "${ref}"`);
    }
  }
  assert.deepEqual(referenserFor("golvlaggning").map((r) => r.slug), ["golv-fiskbensmonster-hall"]);
  assert.deepEqual(referenserFor("bastu").map((r) => r.slug), ["bastu-panel-lavar"]);
  assert.equal(referenserFor("grund-betongplatta").length, 2);
  assert.equal(referenserFor("badrumsrenovering")[0]?.service, "badrumsrenovering");
  assert.equal(referenserFor("altan-uteplats")[0]?.service, "altan-uteplats");
  // De bredare tjänsterna visar fortfarande bilderna under "Från våra jobb" …
  assert.ok(referenserFor("renovering").length >= 2);
  assert.ok(referenserFor("nybyggnation-tillbyggnad").length >= 2);
  // … men lånar dem inte som kortbild på /tjanster.
  assert.equal(serviceCardImage("renovering"), undefined);
  assert.equal(serviceCardImage("grund-betongplatta")?.src, "/referenser/betongplatta-husgrund.jpg");
});
