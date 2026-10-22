/**
 * Jobbtyper i offertformuläret (steg 1). Värdet (`value`) sparas i Neon och
 * skickas i mejlen som förut; etiketten (`label`) används som `jobType` i
 * sitecms så att panelen visar "Badrumsrenovering" i stället för "badrum".
 */
export const JOB_TYPES = [
  { value: "nybyggnad", label: "Nybyggnad" },
  { value: "renovering", label: "Renovering" },
  { value: "tilbyggnad", label: "Tillbyggnad" },
  { value: "badrum", label: "Badrumsrenovering" },
  { value: "kök", label: "Köksrenovering" },
  { value: "fasad", label: "Fasadarbete" },
  { value: "tak", label: "Takarbete" },
  { value: "annat", label: "Annat" },
] as const;

export type JobTypeValue = (typeof JOB_TYPES)[number]["value"];

/** Läsbar etikett för en jobbtyp; okända värden returneras som de är. */
export function jobTypeLabel(value: string): string {
  const match = JOB_TYPES.find((t) => t.value === value);
  return match ? match.label : value;
}
