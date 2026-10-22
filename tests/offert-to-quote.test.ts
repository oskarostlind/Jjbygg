/**
 * Bekräftar att payloaden från lib/offert-to-quote.ts klarar sitecms
 * validering (kopia i tests/fixtures/sitecms-quote-validation.ts) och att
 * fältmappningen Jjbygg → sitecms är den avsedda.
 *
 * Körs med `npm test` (node --test, Node ≥ 22.18 med inbyggd type stripping).
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { offertToQuoteRequest } from "../lib/offert-to-quote.ts";
import { offertSchema, todayInSweden } from "../lib/validations/offert.ts";
import { validateQuote } from "./fixtures/sitecms-quote-validation.ts";

/** Exempel på det som kunden fyller i (efter Zod-validering i server actionen). */
function fullForm() {
  return offertSchema.parse({
    typ: "badrum",
    beskrivning: "  Vi vill renovera badrummet på övervåningen, ca 6 kvm, nytt kakel och golvvärme.  ",
    onskatStartdatum: todayInSweden(),
    postnummer: "961 96",
    rot: true,
    namn: "Anna Andersson",
    epost: "Anna.Andersson@Example.com",
    telefon: "070-123 45 67",
    kundtyp: "privat",
    consent: true,
    budget: "100 000 – 200 000 kr",
  });
}

test("full förfrågan: mappas rätt och passerar sitecms validateQuote", () => {
  const payload = offertToQuoteRequest({
    data: fullForm(),
    kalla: "referrer=https://www.google.com/ sida=/offert utm_source=google",
    attachments: [
      { url: "https://cdn.sitecms.se/quotes/abc.jpg", name: "badrum.jpg", contentType: "image/jpeg", size: 123456 },
    ],
    ipHash: "a".repeat(64),
  });

  assert.deepEqual(payload, {
    name: "Anna Andersson",
    company: null,
    phone: "070-123 45 67",
    email: "anna.andersson@example.com",
    jobType: "Badrumsrenovering",
    location: null,
    desiredStart: todayInSweden(),
    description: "Vi vill renovera badrummet på övervåningen, ca 6 kvm, nytt kakel och golvvärme.",
    consent: true,
    customerType: "privat",
    budget: "100 000 – 200 000 kr",
    rot: true,
    postalCode: "961 96",
    source: "referrer=https://www.google.com/ sida=/offert utm_source=google",
    attachments: [
      { url: "https://cdn.sitecms.se/quotes/abc.jpg", name: "badrum.jpg", contentType: "image/jpeg", size: 123456 },
    ],
    ipHash: "a".repeat(64),
  });

  const result = validateQuote(payload);
  assert.equal(result.ok, true, JSON.stringify(result));
  if (result.ok) {
    assert.equal(result.data.phone, "+46701234567");
    assert.equal(result.data.customerType, "privat");
    assert.equal(result.data.rot, true);
    assert.equal(result.data.attachments?.length, 1);
    assert.equal(result.data.extra, null);
    assert.equal(result.data.machine, null);
  }
});

test("minimal förfrågan: bara obligatoriska fält, inga bilagor, inget ipHash", () => {
  const data = offertSchema.parse({
    typ: "annat",
    beskrivning: "Byta tio fönster",
    rot: false,
    namn: "Bo",
    epost: "bo@example.se",
    telefon: "+46 921 123 45",
    consent: true,
    onskatStartdatum: "",
    postnummer: "",
    budget: "",
  });

  const payload = offertToQuoteRequest({ data });

  assert.equal("ipHash" in payload, false, "ipHash ska utelämnas helt när salt saknas");
  assert.equal(payload.attachments, null);
  assert.equal(payload.desiredStart, null);
  assert.equal(payload.postalCode, null);
  assert.equal(payload.budget, null);
  assert.equal(payload.source, null);
  assert.equal(payload.customerType, null);
  assert.equal(payload.jobType, "Annat");

  const result = validateQuote(payload);
  assert.equal(result.ok, true, JSON.stringify(result));
});

test("företagskund: customerType foretag, company förblir null (inget fält på sajten)", () => {
  const data = offertSchema.parse({ ...fullForm(), kundtyp: "foretag" });
  const payload = offertToQuoteRequest({ data });
  assert.equal(payload.customerType, "foretag");
  assert.equal(payload.company, null);
  assert.equal(validateQuote(payload).ok, true);
});

test("Zod-schemat avvisar det som sitecms skulle avvisa", () => {
  const base = {
    typ: "tak",
    beskrivning: "Nytt plåttak på garaget",
    rot: false,
    namn: "Eva",
    epost: "eva@example.se",
    telefon: "070-123 45 67",
    consent: true,
  };

  assert.equal(offertSchema.safeParse({ ...base, telefon: "" }).success, false, "telefon krävs");
  assert.equal(offertSchema.safeParse({ ...base, telefon: "12345" }).success, false, "ej svenskt nummer");
  assert.equal(offertSchema.safeParse({ ...base, consent: false }).success, false, "samtycke krävs");
  assert.equal(offertSchema.safeParse({ ...base, beskrivning: "för kort" }).success, false, "beskrivning < 10");
  assert.equal(offertSchema.safeParse({ ...base, beskrivning: "x".repeat(3001) }).success, false, "beskrivning > 3000");
  assert.equal(offertSchema.safeParse({ ...base, onskatStartdatum: "2000-01-01" }).success, false, "datum bakåt");
  assert.equal(offertSchema.safeParse({ ...base, onskatStartdatum: "igår" }).success, false, "ogiltigt datum");
  assert.equal(offertSchema.safeParse({ ...base, budget: "x".repeat(101) }).success, false, "budget > 100");
  assert.equal(offertSchema.safeParse({ ...base, postnummer: "12345678901" }).success, false, "postnummer > 10");
  assert.equal(offertSchema.safeParse({ ...base, kundtyp: "kommun" }).success, false, "okänd kundtyp");
  assert.equal(offertSchema.safeParse(base).success, true);
});

test("payloaden klarar sitecms validering för alla jobbtyper", async () => {
  const { JOB_TYPES } = await import("../lib/offert-job-types.ts");
  for (const jobType of JOB_TYPES) {
    const data = offertSchema.parse({ ...fullForm(), typ: jobType.value });
    const result = validateQuote(offertToQuoteRequest({ data }));
    assert.equal(result.ok, true, `${jobType.value}: ${JSON.stringify(result)}`);
  }
});
