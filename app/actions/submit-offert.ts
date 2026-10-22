"use server";

import { draftMode, headers } from "next/headers";
import { put } from "@vercel/blob";
import {
  SitecmsError,
  hashIp,
  submitQuoteRequest,
  uploadQuoteAttachment,
  type QuoteAttachment,
  type QuoteRequestInput,
} from "sitecms-next";
import { prisma } from "@/lib/prisma";
import { offertSchema } from "@/lib/validations/offert";
import { offertToQuoteRequest } from "@/lib/offert-to-quote";
import { sendOffertBekraftelseToCustomer, sendOffertNotifieringToJesper } from "@/lib/email";
import { MAX_IMAGE_BYTES } from "@/lib/offert-upload";
import { HONEYPOT_FIELD, MIN_FILL_TIME_MS, STARTED_FIELD } from "@/lib/offert-spam";

export type SubmitOffertResult = { success: true } | { success: false; error: string };

/** Filtyper som sitecms tar emot som bilaga (jpg/png/webp/heic/pdf). GIF skickas bara till Blob. */
const CMS_ATTACHMENT_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/heif",
  "application/pdf",
]);

function parseFormDataToPayload(formData: FormData): {
  typ: string;
  beskrivning: string;
  onskatStartdatum: string;
  postnummer: string;
  rot: boolean;
  namn: string;
  epost: string;
  telefon: string;
  kundtyp: string;
  budget: string;
  kalla: string;
  consent: boolean;
  honeypot: string;
  started: number;
  bilder: File[];
} {
  const rotVal = formData.get("rot");
  const consentVal = formData.get("consent");
  return {
    typ: (formData.get("typ") as string) ?? "",
    beskrivning: (formData.get("beskrivning") as string) ?? "",
    onskatStartdatum: (formData.get("onskatStartdatum") as string) ?? "",
    postnummer: (formData.get("postnummer") as string) ?? "",
    rot: rotVal === "true" || rotVal === "ja",
    namn: (formData.get("namn") as string) ?? "",
    epost: (formData.get("epost") as string) ?? "",
    telefon: (formData.get("telefon") as string) ?? "",
    kundtyp: (formData.get("kundtyp") as string) ?? "",
    budget: (formData.get("budget") as string) ?? "",
    kalla: ((formData.get("kalla") as string) ?? "").slice(0, 500),
    consent: consentVal === "true" || consentVal === "on",
    honeypot: String(formData.get(HONEYPOT_FIELD) ?? ""),
    started: Number(formData.get(STARTED_FIELD) ?? 0),
    bilder: (formData.getAll("bilder") as File[]).filter((f) => f && f.size > 0),
  };
}

function sanitizeBlobFilename(name: string): string {
  const base = name.replace(/[^a-zA-Z0-9._-]/g, "_");
  return base.length > 0 ? base.slice(0, 120) : "bild";
}

async function uploadImageToBlob(file: File, index: number): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const pathname = `offert/${Date.now()}-${index}-${sanitizeBlobFilename(file.name)}`;
  const result = await put(pathname, buffer, {
    access: "private",
    contentType: file.type || "application/octet-stream",
  });
  return result.url;
}

/** Sant när sitecms är konfigurerat (samma nyckel som innehållshämtningen i lib/cms.ts). */
function cmsConfigured(): boolean {
  return Boolean(process.env.CMS_API_KEY?.trim());
}

/**
 * Laddar upp en bild som bilaga i sitecms. Får ALDRIG stoppa förfrågan:
 * returnerar null (och loggar) vid fel, saknad konfiguration eller filtyp som
 * CMS:et inte tar emot.
 */
async function uploadCmsAttachment(file: File, ipHash: string | undefined): Promise<QuoteAttachment | null> {
  if (!cmsConfigured()) return null;
  if (!CMS_ATTACHMENT_TYPES.has(file.type)) {
    console.warn(`sitecms: hoppar över bilaga "${file.name}" (${file.type || "okänd typ"} tas inte emot av CMS:et).`);
    return null;
  }
  try {
    return await uploadQuoteAttachment(file, file.name, { ipHash });
  } catch (error) {
    logCmsError("uploadQuoteAttachment", error);
    return null;
  }
}

function logCmsError(step: string, error: unknown): void {
  if (error instanceof SitecmsError) {
    const fields = error.status === 400 && Object.keys(error.fields).length > 0 ? error.fields : undefined;
    console.error(`sitecms ${step} failed (HTTP ${error.status}): ${error.message}`, fields ? { fields } : "");
    return;
  }
  console.error(`sitecms ${step} failed:`, error);
}

/** Saltad hash av avsändarens IP för sitecms rate limit. undefined om salt eller IP saknas. */
async function resolveIpHash(): Promise<string | undefined> {
  const salt = process.env.IP_HASH_SALT?.trim();
  if (!salt) return undefined;
  const forwarded = headers().get("x-forwarded-for") ?? "";
  const ip = forwarded.split(",")[0]?.trim() ?? "";
  if (!ip) return undefined;
  try {
    return await hashIp(ip, salt);
  } catch (error) {
    console.error("hashIp failed:", error);
    return undefined;
  }
}

/**
 * Skickar förfrågan till sitecms. Returnerar CMS:ets id, eller null vid fel –
 * kunden har redan fått sin förfrågan sparad i Neon och ska aldrig se ett fel
 * på grund av CMS:et.
 */
async function submitToCms(payload: QuoteRequestInput): Promise<string | null> {
  if (!cmsConfigured()) {
    console.warn("sitecms: CMS_API_KEY saknas – förfrågan sparas bara i Neon.");
    return null;
  }
  try {
    const result = await submitQuoteRequest(payload);
    if (result.emailStatus === "failed") {
      console.warn(`sitecms: förfrågan ${result.id} sparad men CMS:ets mejl misslyckades.`);
    }
    return result.id;
  } catch (error) {
    logCmsError("submitQuoteRequest", error);
    return null;
  }
}

export async function submitOffert(formData: FormData): Promise<SubmitOffertResult> {
  // sitecms förhandsgranskning (draft mode): skicka aldrig riktiga förfrågningar
  // (ingen uppladdning, databaspost eller e-post).
  if (draftMode().isEnabled) {
    return { success: false, error: "Formuläret är avstängt i förhandsgranskning." };
  }

  const raw = parseFormDataToPayload(formData);

  // 1. Validera.
  const parsed = offertSchema.safeParse({
    typ: raw.typ,
    beskrivning: raw.beskrivning,
    onskatStartdatum: raw.onskatStartdatum || undefined,
    postnummer: raw.postnummer || undefined,
    rot: raw.rot,
    namn: raw.namn,
    epost: raw.epost,
    telefon: raw.telefon,
    kundtyp: (raw.kundtyp === "privat" || raw.kundtyp === "foretag" ? raw.kundtyp : undefined) as
      | "privat"
      | "foretag"
      | undefined,
    budget: raw.budget || undefined,
    consent: raw.consent,
  });

  if (!parsed.success) {
    const first = parsed.error.flatten().fieldErrors;
    const msg = Object.values(first).flat().find(Boolean) ?? "Ogiltiga uppgifter";
    return { success: false, error: String(msg) };
  }

  // 2. Spamkontroll (honeypot + tidsfälla). Bottar får ett tyst "ok" utan att
  //    något sparas eller skickas.
  if (raw.honeypot.trim() !== "") {
    console.warn("offert: honeypot ifylld – ignorerar förfrågan.");
    return { success: true };
  }
  if (!Number.isFinite(raw.started) || raw.started <= 0 || Date.now() - raw.started < MIN_FILL_TIME_MS) {
    console.warn("offert: formuläret skickades för snabbt – ignorerar förfrågan.");
    return { success: true };
  }

  const data = parsed.data;
  const ipHash = await resolveIpHash();

  // 3. Bilder: Vercel Blob (som förut, URL:erna sparas i Neon) och parallellt
  //    bilaga i sitecms. Blob-fel stoppar som tidigare; CMS-fel loggas bara.
  const bildUrler: string[] = [];
  const cmsAttachments: QuoteAttachment[] = [];

  for (let i = 0; i < raw.bilder.length; i++) {
    const file = raw.bilder[i];
    if (!file || file.size === 0) continue;

    if (file.size > MAX_IMAGE_BYTES) {
      const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
      return {
        success: false,
        error: `Bilden "${file.name}" är för stor (${sizeMb} MB). Max storlek är 4 MB per fil – komprimera bilden och försök igen.`,
      };
    }

    const [blobResult, cmsAttachment] = await Promise.all([
      uploadImageToBlob(file, i).then(
        (url) => ({ ok: true as const, url }),
        (error: unknown) => ({ ok: false as const, error })
      ),
      uploadCmsAttachment(file, ipHash),
    ]);

    if (!blobResult.ok) {
      console.error("Vercel Blob upload failed:", blobResult.error);
      return {
        success: false,
        error:
          "Kunde inte ladda upp en eller flera bilder. Komprimera bilderna (max 4 MB per fil) och försök igen.",
      };
    }
    bildUrler.push(blobResult.url);
    if (cmsAttachment) cmsAttachments.push(cmsAttachment);
  }

  // Mappningen till sitecms är ren (ingen I/O) och görs här så att den går att
  // felsöka lokalt (OFFERT_DEBUG=1) även utan databas. Själva CMS-anropet
  // sker först efter att Neon-inserten lyckats.
  const quotePayload = offertToQuoteRequest({
    data,
    kalla: raw.kalla,
    attachments: cmsAttachments,
    ipHash,
  });
  if (process.env.OFFERT_DEBUG === "1") {
    console.log("[OFFERT_DEBUG] sitecms-payload:", JSON.stringify(quotePayload, null, 2));
  }

  const onskatStartdatumDate = data.onskatStartdatum ? new Date(data.onskatStartdatum) : null;

  // 4. Neon (källan sajten litar på – misslyckas den får kunden ett fel).
  let offertId: string;
  try {
    const created = await prisma.offert.create({
      data: {
        namn: data.namn,
        epost: data.epost,
        telefon: data.telefon,
        typ: data.typ,
        beskrivning: data.beskrivning,
        budget: data.budget ?? null,
        rot: data.rot,
        bildUrler,
        postnummer: data.postnummer ?? null,
        onskatStartdatum: onskatStartdatumDate,
        kundtyp: data.kundtyp ?? null,
      },
      select: { id: true },
    });
    offertId = created.id;
  } catch (error) {
    console.error("Prisma offert.create failed:", error);
    return { success: false, error: "Kunde inte spara förfrågan. Försök igen." };
  }

  // 5. sitecms (dubbelskrivning). Får aldrig ge kunden ett fel när Neon lyckats.
  const cmsQuoteId = await submitToCms(quotePayload);
  if (cmsQuoteId) {
    try {
      await prisma.offert.update({ where: { id: offertId }, data: { cmsQuoteId } });
    } catch (error) {
      console.error("Prisma offert.update (cmsQuoteId) failed:", error);
    }
  }

  // 6. Mejl via Resend (oförändrat).
  const emailPayload = {
    namn: data.namn,
    epost: data.epost,
    telefon: data.telefon,
    typ: data.typ,
    beskrivning: data.beskrivning,
    budget: data.budget,
    rot: data.rot,
    postnummer: data.postnummer,
    onskatStartdatum: data.onskatStartdatum,
    kundtyp: data.kundtyp,
    bildUrler,
    kalla: raw.kalla || undefined,
  };

  const [bekraftelse, notifiering] = await Promise.all([
    sendOffertBekraftelseToCustomer(emailPayload),
    sendOffertNotifieringToJesper(emailPayload),
  ]);

  if (!bekraftelse.ok) {
    return { success: false, error: bekraftelse.error ?? "E-post kunde inte skickas." };
  }
  if (!notifiering.ok) {
    return { success: false, error: notifiering.error ?? "Notifiering kunde inte skickas." };
  }

  return { success: true };
}
