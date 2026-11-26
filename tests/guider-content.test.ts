/**
 * Datakontroller för prisguiderna (lib/guider-content.ts): unika sluggar och
 * titlar, längder på title/description, 900–1300 ord, 4–5 frågor, att guiden
 * pekar på en befintlig tjänst och att inga belopp, kvadratmetergränser eller
 * utropstecken smyger in.
 *
 * Körs med `npm test`.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { GUIDES, guideForService } from "../lib/guider-content.ts";
import { SERVICE_PAGES } from "../lib/services-content.ts";

function allText(guide: (typeof GUIDES)[number]): string {
  return [
    guide.metaTitle,
    guide.metaDescription,
    guide.h1,
    guide.lead,
    guide.shortAnswer,
    guide.cardText,
    ...guide.sections.flatMap((s) => [
      s.heading,
      ...s.paragraphs,
      ...(s.factors ?? []).flatMap((f) => [f.factor, f.why, f.todo]),
      ...(s.list ?? []),
      ...(s.after ?? []),
    ]),
    ...guide.faq.flatMap((f) => [f.question, f.answer]),
  ].join("\n");
}

/** Brödtexten som läsaren ser i artikeln (utan meta och korttext). */
function bodyWords(guide: (typeof GUIDES)[number]): number {
  const text = [
    guide.lead,
    guide.shortAnswer,
    ...guide.sections.flatMap((s) => [
      s.heading,
      ...s.paragraphs,
      ...(s.factors ?? []).flatMap((f) => [f.factor, f.why, f.todo]),
      ...(s.list ?? []),
      ...(s.after ?? []),
    ]),
    ...guide.faq.flatMap((f) => [f.question, f.answer]),
  ].join(" ");
  return text.split(/\s+/).filter((w) => /[A-Za-zÅÄÖåäö0-9]/.test(w)).length;
}

test("sluggar, titlar, description och h1 är unika – även mot tjänstesidorna", () => {
  for (const key of ["slug", "metaTitle", "metaDescription", "h1", "name"] as const) {
    const values = GUIDES.map((guide) => guide[key]);
    assert.equal(new Set(values).size, values.length, `dubbletter i ${key}`);
  }
  const serviceTitles = new Set(SERVICE_PAGES.map((page) => page.metaTitle));
  for (const guide of GUIDES) assert.ok(!serviceTitles.has(guide.metaTitle), `${guide.slug}: samma title som en tjänstesida`);
});

test("title ≤ 60 tecken med frågan och \"| JJ Bygg\", description ≤ 155 tecken", () => {
  for (const guide of GUIDES) {
    assert.ok(guide.metaTitle.length <= 60, `${guide.slug}: title ${guide.metaTitle.length} tecken`);
    assert.match(guide.metaTitle, /^Vad kostar .+\?.* \| JJ Bygg$/, `${guide.slug}: title ska börja med frågan och sluta med "| JJ Bygg"`);
    assert.ok(guide.metaDescription.length <= 155, `${guide.slug}: description ${guide.metaDescription.length} tecken`);
  }
});

test("900–1300 ord brödtext, 4–5 frågor och ett kort svar på 2–3 meningar", () => {
  for (const guide of GUIDES) {
    const words = bodyWords(guide);
    assert.ok(words >= 900 && words <= 1300, `${guide.slug}: ${words} ord`);
    assert.ok(guide.faq.length >= 4 && guide.faq.length <= 5, `${guide.slug}: ${guide.faq.length} frågor`);
    const sentences = guide.shortAnswer.split(/(?<=\.)\s+/).length;
    assert.ok(sentences >= 2 && sentences <= 3, `${guide.slug}: kort svar har ${sentences} meningar`);
  }
});

test("varje guide pekar på en befintlig tjänst och varje tjänst har högst en guide", () => {
  const slugs = SERVICE_PAGES.map((page) => page.slug);
  for (const guide of GUIDES) {
    assert.ok(slugs.includes(guide.service), `${guide.slug} → okänd tjänst "${guide.service}"`);
    assert.equal(guideForService(guide.service)?.slug, guide.slug, `${guide.service} har flera guider`);
  }
});

test("har avsnitten om priset, ROT, rättvisande pris och fallgropar", () => {
  for (const guide of GUIDES) {
    const ids = guide.sections.map((s) => s.id);
    for (const id of ["det-har-avgor-priset", "norrbotten", "rot", "rattvisande-pris", "fallgropar"]) {
      assert.ok(ids.includes(id), `${guide.slug}: saknar avsnittet ${id}`);
    }
    assert.equal(new Set(ids).size, ids.length, `${guide.slug}: dubbla avsnitts-id`);
    const factors = guide.sections.find((s) => s.id === "det-har-avgor-priset")?.factors ?? [];
    assert.ok(factors.length >= 6, `${guide.slug}: bara ${factors.length} prisfaktorer`);
  }
});

test("inga belopp i kronor utöver ROT-taket, inga kvadratmetergränser, snözoner eller utropstecken", () => {
  for (const guide of GUIDES) {
    const text = allText(guide).replaceAll("50 000 kr per person och år", "");
    // \b fungerar inte med å/ä/ö ("kräver" skulle ge träff på "kr"), därav uttryckliga bokstavsklasser.
    assert.doesNotMatch(text, /(?<![a-zåäö])(kr|kronor|sek|tkr)(?![a-zåäö])|:-/i, `${guide.slug}: belopp i texten`);
    assert.doesNotMatch(text, /\d+([,.]\d+)?\s*(kvm|kvadratmeter|m²|m2|meter|cm)(?![a-zåäö])/i, `${guide.slug}: mått i texten`);
    assert.doesNotMatch(text, /snözon\s*\d|\d+\s*kN/i, `${guide.slug}: snözon/snölast i siffror`);
    assert.doesNotMatch(text, /!/, `${guide.slug}: utropstecken`);
  }
});
