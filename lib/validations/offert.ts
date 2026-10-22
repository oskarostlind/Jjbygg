import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

/**
 * Gränserna speglar sitecms validering av offertförfrågningar
 * (lib/quote-validation.ts i sitecms): det som passerar här ska också passera
 * där, så att förfrågan aldrig sparas i Neon men avvisas av CMS:et.
 */
export const OFFERT_LIMITS = {
  name: { min: 2, max: 100 },
  email: { max: 200 },
  jobType: { max: 100 },
  description: { min: 10, max: 3000 },
  budget: { max: 100 },
  postalCode: { max: 10 },
  source: { max: 500 },
} as const;

/**
 * Normaliserar ett svenskt telefonnummer till E.164 (+46…). Samma regler som
 * sitecms: "070-123 45 67", "0921-123 45", "+46 70 123 45 67" och "0046…"
 * godkänns. Returnerar null om det inte ser ut som ett svenskt nummer.
 */
export function normalizeSwedishPhone(raw: string): string | null {
  const cleaned = raw.replace(/[\s\-().]/g, "");
  let digits: string;
  if (/^\+46\d+$/.test(cleaned)) digits = cleaned.slice(3);
  else if (/^0046\d+$/.test(cleaned)) digits = cleaned.slice(4);
  else if (/^0\d+$/.test(cleaned)) digits = cleaned.slice(1);
  else return null;
  if (digits.startsWith("0")) return null;
  if (digits.length < 6 || digits.length > 10) return null;
  return `+46${digits}`;
}

/** Dagens datum (YYYY-MM-DD) i svensk tid – samma referens som sitecms använder. */
export function todayInSweden(now = new Date()): string {
  return new Intl.DateTimeFormat("sv-SE", {
    timeZone: "Europe/Stockholm",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

/** Tom sträng (ej ifyllt datumfält) → undefined, så att valfria fält förblir valfria. */
const emptyToUndefined = (value: unknown) =>
  typeof value === "string" && value.trim() === "" ? undefined : value;

export const offertSchema = z.object({
  // Steg 1 – Projektdetaljer
  typ: z.string().min(1, "Välj typ av jobb").max(OFFERT_LIMITS.jobType.max, "Ogiltig jobbtyp"),
  beskrivning: z
    .string()
    .trim()
    .min(OFFERT_LIMITS.description.min, "Beskrivningen måste vara minst 10 tecken")
    .max(OFFERT_LIMITS.description.max, "Beskrivningen får vara högst 3000 tecken"),
  onskatStartdatum: z.preprocess(
    emptyToUndefined,
    z
      .string()
      .refine((v) => DATE_RE.test(v) && !Number.isNaN(Date.parse(v)), "Ange ett giltigt datum")
      .refine((v) => v >= todayInSweden(), "Önskat startdatum kan inte vara bakåt i tiden")
      .optional()
  ),

  // Steg 2 – Media & plats
  postnummer: z.preprocess(
    emptyToUndefined,
    z.string().trim().max(OFFERT_LIMITS.postalCode.max, "Postnumret är för långt").optional()
  ),
  rot: z.boolean(),

  // Steg 3 – Kontaktuppgifter
  namn: z
    .string()
    .trim()
    .min(OFFERT_LIMITS.name.min, "Namn krävs")
    .max(OFFERT_LIMITS.name.max, "Namnet får vara högst 100 tecken"),
  epost: z
    .string()
    .trim()
    .email("Ogiltig e-postadress")
    .max(OFFERT_LIMITS.email.max, "E-postadressen är för lång"),
  telefon: z
    .string()
    .trim()
    .min(1, "Telefonnummer krävs")
    .refine((v) => normalizeSwedishPhone(v) !== null, "Ange ett svenskt telefonnummer, t.ex. 070-123 45 67"),
  kundtyp: z.enum(["privat", "foretag"]).optional(),
  /** GDPR-samtycke – krävs både av oss och av sitecms. */
  consent: z
    .boolean()
    .refine((v) => v === true, "Du behöver godkänna att vi behandlar dina uppgifter"),

  // Budget (kan vara i steg 1 eller 2 enligt spec – vi har det som valfritt)
  budget: z.preprocess(
    emptyToUndefined,
    z.string().trim().max(OFFERT_LIMITS.budget.max, "Budgeten får vara högst 100 tecken").optional()
  ),
});

export type OffertFormData = z.infer<typeof offertSchema>;

export const imageFileSchema = z
  .instanceof(File)
  .refine((file) => file.size <= MAX_FILE_SIZE, "Max filstorlek 5 MB")
  .refine(
    (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
    "Endast bilder (JPEG, PNG, WebP, GIF)"
  );

export type OffertSubmitPayload = OffertFormData & {
  bilder?: File[];
};
