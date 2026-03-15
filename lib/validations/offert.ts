import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export const offertSchema = z.object({
  // Steg 1 – Projektdetaljer
  typ: z.string().min(1, "Välj typ av jobb"),
  beskrivning: z.string().min(10, "Beskrivningen måste vara minst 10 tecken"),
  onskatStartdatum: z.string().optional(),

  // Steg 2 – Media & plats
  postnummer: z.string().optional(),
  rot: z.boolean(),

  // Steg 3 – Kontaktuppgifter
  namn: z.string().min(2, "Namn krävs"),
  epost: z.string().email("Ogiltig e-postadress"),
  telefon: z.string().optional(),
  kundtyp: z.enum(["privat", "foretag"]).optional(),

  // Budget (kan vara i steg 1 eller 2 enligt spec – vi har det som valfritt)
  budget: z.string().optional(),
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
