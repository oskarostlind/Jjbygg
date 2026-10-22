import Link from "next/link";
import { Phone } from "lucide-react";
import { siteContent } from "@/lib/site-content";
import { Button } from "@/components/ui/button";

/**
 * Mörkt offertkort i sidopanelen på tjänste- och ortsidor: offertknapp + telefon.
 * Samma kort överallt så att besökaren känner igen var man hör av sig.
 */
export function OfferCard() {
  return (
    <div className="rounded-lg bg-graphite p-6 text-ink-onDark md:p-7">
      <h2 className="font-display text-xl font-bold text-paper">Vad kostar ditt projekt?</h2>
      <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-onDark/75">
        Beskriv projektet så återkommer vi med en offert. Hembesök i Boden och Luleå är kostnadsfritt.
      </p>
      <Button asChild size="lg" className="mt-5 w-full">
        <Link href="/offert">Begär offert</Link>
      </Button>
      <a
        href={`tel:${siteContent.contact.phoneTelDigits}`}
        className="mt-3 flex h-12 items-center justify-center gap-2 rounded border border-ink-onDark/30 font-display font-bold text-paper transition-colors hover:border-ink-onDark hover:bg-ink-onDark/10"
      >
        <Phone className="h-4 w-4" aria-hidden />
        {siteContent.contact.phoneDisplay}
      </a>
    </div>
  );
}
