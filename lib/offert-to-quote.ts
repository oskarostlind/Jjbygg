import type { QuoteAttachment, QuoteRequestInput } from "sitecms-next";
// Relativa importer med filändelse så att modulen går att köra direkt i
// `node --test` (utan @/-alias och utan bundler).
import type { OffertFormData } from "./validations/offert.ts";
import { OFFERT_LIMITS } from "./validations/offert.ts";
import { jobTypeLabel } from "./offert-job-types.ts";

/**
 * Det som behövs för att bygga sitecms-payloaden: den validerade formulärdatan
 * plus det som server actionen tar fram (bilagor i CMS:et, leadkälla, ipHash).
 */
export type OffertToQuoteInput = {
  data: OffertFormData;
  /** Leadkälla (referrer/UTM) från klienten, max 500 tecken. */
  kalla?: string | null;
  /** Bilagor som redan laddats upp till sitecms med `uploadQuoteAttachment()`. */
  attachments?: QuoteAttachment[] | null;
  /** Saltad hash av avsändarens IP (`hashIp()`), eller undefined om salt saknas. */
  ipHash?: string | null;
};

/** Trimmad sträng eller null när värdet är tomt/saknas. */
function optional(value: string | null | undefined, max?: number): string | null {
  const trimmed = (value ?? "").trim();
  if (!trimmed) return null;
  return typeof max === "number" ? trimmed.slice(0, max) : trimmed;
}

/**
 * Mappar Jjbyggs offertformulär till sitecms `QuoteRequestInput`. Ren funktion
 * utan I/O – testas mot en kopia av CMS:ets `validateQuote` i
 * tests/offert-to-quote.test.ts.
 *
 * Fältmappning (Jjbygg → sitecms):
 *   namn → name, epost → email, telefon → phone, typ → jobType (etiketten),
 *   beskrivning → description, onskatStartdatum → desiredStart,
 *   postnummer → postalCode, budget → budget, rot → rot, kundtyp → customerType,
 *   kalla → source, bilder → attachments, consent → consent.
 *   location och company: sajten har inga ort-/företagsnamnsfält → null.
 *   machine och extra används inte.
 */
export function offertToQuoteRequest({ data, kalla, attachments, ipHash }: OffertToQuoteInput): QuoteRequestInput {
  const attachmentList = attachments && attachments.length > 0 ? attachments.slice(0, 10) : null;

  const payload: QuoteRequestInput = {
    name: data.namn.trim().slice(0, OFFERT_LIMITS.name.max),
    company: null,
    phone: data.telefon.trim(),
    email: data.epost.trim().toLowerCase(),
    jobType: jobTypeLabel(data.typ).slice(0, OFFERT_LIMITS.jobType.max),
    location: null,
    desiredStart: optional(data.onskatStartdatum),
    description: data.beskrivning.trim().slice(0, OFFERT_LIMITS.description.max),
    consent: data.consent === true,
    customerType: data.kundtyp ?? null,
    budget: optional(data.budget, OFFERT_LIMITS.budget.max),
    rot: data.rot,
    postalCode: optional(data.postnummer, OFFERT_LIMITS.postalCode.max),
    source: optional(kalla, OFFERT_LIMITS.source.max),
    attachments: attachmentList,
  };

  if (ipHash) payload.ipHash = ipHash;

  return payload;
}
