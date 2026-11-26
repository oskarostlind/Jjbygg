/**
 * Datakontroller för ortsidorna (lib/locations-content.ts): längder på
 * title/description, antal frågor, unika titlar och att orter utan
 * tjänst×ort-sidor (Sävast, Norrbotten) inte får några.
 *
 * Körs med `npm test`.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { LOCATIONS, LOCATION_PAGES, SERVICE_LOCATION_SLUGS, areaServedLd, locationHref } from "../lib/locations-content.ts";
import { SERVICE_LOCATION_PAGES } from "../lib/service-location-content.ts";

test("ortsidorna: title ≤ 60, description ≤ 155, 4 frågor, unika titlar", () => {
  for (const page of LOCATION_PAGES) {
    assert.ok(page.metaTitle.length <= 60, `${page.slug}: title ${page.metaTitle.length} tecken`);
    assert.ok(page.metaDescription.length <= 155, `${page.slug}: description ${page.metaDescription.length} tecken`);
    assert.equal(page.faq.length, 4, `${page.slug}: ${page.faq.length} frågor`);
  }
  for (const key of ["metaTitle", "metaDescription", "h1"] as const) {
    const values = LOCATION_PAGES.map((page) => page[key]);
    assert.equal(new Set(values).size, values.length, `dubbletter i ${key}`);
  }
});

test("inga utropstecken i ortsidornas texter", () => {
  for (const page of LOCATION_PAGES) {
    const text = JSON.stringify(page);
    assert.doesNotMatch(text, /!/, `${page.slug}: utropstecken`);
  }
});

test("tjänst×ort-sidor finns bara för Boden och Luleå", () => {
  assert.deepEqual(SERVICE_LOCATION_SLUGS, ["boden", "lulea"]);
  for (const page of SERVICE_LOCATION_PAGES) {
    assert.ok(SERVICE_LOCATION_SLUGS.includes(page.location), `oväntad tjänst×ort-sida: ${page.service}/${page.location}`);
  }
});

test("Sävast: egen ortsida, tätort i Bodens kommun", () => {
  const savast = LOCATIONS.find((location) => location.slug === "savast");
  assert.ok(savast);
  assert.equal(locationHref("savast"), "/byggfirma/savast");
  assert.deepEqual(areaServedLd(savast), {
    "@type": "Place",
    name: "Sävast",
    containedInPlace: { "@type": "City", name: "Boden" },
  });
});
