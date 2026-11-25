/**
 * Kontaktuppgifter från miljövariabler (endast server / RSC).
 *
 * CONTACT_NUMBER läses när sidan byggs eller återskapas (build/ISR) – inte per
 * anrop. Ändras variabeln i Vercel krävs en ny deploy för att den ska slå igenom.
 */

/** Normaliserar till 10 siffror (070…) för svenskt mobilnummer. */
export function parseSwedishMobileTenDigits(input: string): string | null {
  const digits = input.replace(/\D/g, "");
  if (digits.length === 10 && digits.startsWith("0")) {
    return digits;
  }
  if (digits.length === 11 && digits.startsWith("46")) {
    const national = digits.slice(2);
    if (national.length === 9 && national.startsWith("7")) {
      return `0${national}`;
    }
  }
  return null;
}

/** Visningsformat: 070-535 71 94 */
export function formatSwedishMobileDisplay(tenDigits: string): string {
  return `${tenDigits.slice(0, 3)}-${tenDigits.slice(3, 6)} ${tenDigits.slice(6, 8)} ${tenDigits.slice(8, 10)}`;
}

/** Internationellt format för tel:-länkar och strukturerad data: +46705357194 */
export function swedishMobileE164(tenDigits: string): string {
  return `+46${tenDigits.slice(1)}`;
}

export type ResolvedContactPhone = {
  display: string;
  /** Värdet efter "tel:" – internationellt format (+46…). */
  telDigits: string;
};

export function resolveContactPhoneFromEnv(): ResolvedContactPhone | null {
  const raw = process.env.CONTACT_NUMBER?.trim();
  if (!raw) {
    return null;
  }
  const ten = parseSwedishMobileTenDigits(raw);
  if (!ten) {
    return null;
  }
  return {
    display: formatSwedishMobileDisplay(ten),
    telDigits: swedishMobileE164(ten),
  };
}
