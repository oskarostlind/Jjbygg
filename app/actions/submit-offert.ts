"use server";

import { put } from "@vercel/blob";
import { prisma } from "@/lib/prisma";
import { offertSchema } from "@/lib/validations/offert";
import { sendOffertBekraftelseToCustomer, sendOffertNotifieringToJesper } from "@/lib/email";

export type SubmitOffertResult = { success: true } | { success: false; error: string };

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
  bilder: File[];
} {
  const rotVal = formData.get("rot");
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
    bilder: (formData.getAll("bilder") as File[]).filter((f) => f && f.size > 0),
  };
}

export async function submitOffert(formData: FormData): Promise<SubmitOffertResult> {
  const raw = parseFormDataToPayload(formData);

  const parsed = offertSchema.safeParse({
    typ: raw.typ,
    beskrivning: raw.beskrivning,
    onskatStartdatum: raw.onskatStartdatum || undefined,
    postnummer: raw.postnummer || undefined,
    rot: raw.rot,
    namn: raw.namn,
    epost: raw.epost,
    telefon: raw.telefon || undefined,
    kundtyp: (raw.kundtyp === "privat" || raw.kundtyp === "foretag" ? raw.kundtyp : undefined) as "privat" | "foretag" | undefined,
    budget: raw.budget || undefined,
  });

  if (!parsed.success) {
    const first = parsed.error.flatten().fieldErrors;
    const msg = Object.values(first).flat().find(Boolean) ?? "Ogiltiga uppgifter";
    return { success: false, error: String(msg) };
  }

  const data = parsed.data;
  const bildUrler: string[] = [];

  for (let i = 0; i < raw.bilder.length; i++) {
    const file = raw.bilder[i];
    if (!file || file.size === 0) continue;
    try {
      const blob = await put(`offert/${Date.now()}-${i}-${file.name}`, file, { access: "public" });
      bildUrler.push(blob.url);
    } catch {
      return { success: false, error: "Kunde inte ladda upp en eller flera bilder." };
    }
  }

  const onskatStartdatumDate = data.onskatStartdatum
    ? new Date(data.onskatStartdatum)
    : null;

  try {
    await prisma.offert.create({
      data: {
        namn: data.namn,
        epost: data.epost,
        telefon: data.telefon ?? null,
        typ: data.typ,
        beskrivning: data.beskrivning,
        budget: data.budget ?? null,
        rot: data.rot,
        bildUrler,
        postnummer: data.postnummer ?? null,
        onskatStartdatum: onskatStartdatumDate,
        kundtyp: data.kundtyp ?? null,
      },
    });
  } catch {
    return { success: false, error: "Kunde inte spara förfrågan. Försök igen." };
  }

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
