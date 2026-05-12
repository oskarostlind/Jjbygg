/**
 * Kontaktuppgifter från miljövariabler (endast server / RSC).
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

export type ResolvedContactPhone = {
  display: string;
  /** Endast siffror för tel:-länk */
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
    telDigits: ten,
  };
}
