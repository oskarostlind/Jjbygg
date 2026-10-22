import Link from "next/link";
import { Phone } from "lucide-react";
import { siteContent } from "@/lib/site-content";
import { resolveContactPhoneFromEnv } from "@/lib/contact";
import { Button } from "@/components/ui/button";

type CtaBandProps = {
  title: string;
  subline: string;
  buttonText?: string;
  titleProps?: Record<string, string>;
  sublineProps?: Record<string, string>;
};

/**
 * Avslutande uppmaning på varje sida: offert + telefon. Röd yta – det enda
 * stället på sajten där loggans färg täcker en hel sektion.
 */
export function CtaBand({ title, subline, buttonText = "Begär en offert", titleProps, sublineProps }: CtaBandProps) {
  const phoneFromEnv = resolveContactPhoneFromEnv();
  const phoneDisplay = phoneFromEnv?.display ?? siteContent.contact.phoneDisplay;
  const phoneTel = phoneFromEnv?.telDigits ?? siteContent.contact.phoneTelDigits;

  return (
    <section className="bg-brand-strong py-16 text-paper md:py-20" aria-labelledby="cta-heading">
      <div className="wrap grid items-end gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <h2 id="cta-heading" className="display text-display-lg text-paper" {...titleProps}>
            {title}
          </h2>
          <p className="mt-4 max-w-prose text-lg leading-relaxed text-paper/85" {...sublineProps}>
            {subline}
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:col-span-4 lg:flex-col lg:items-stretch">
          <Button asChild size="lg" variant="onDark" className="hover:bg-sand">
            <Link href="/offert">{buttonText}</Link>
          </Button>
          <a
            href={`tel:${phoneTel}`}
            className="inline-flex h-[3.25rem] items-center justify-center gap-2 rounded border-2 border-paper/60 px-6 font-display text-base font-bold text-paper transition-colors hover:border-paper hover:bg-paper/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-paper focus-visible:ring-offset-2 focus-visible:ring-offset-brand-strong"
            aria-label={`Ring ${phoneDisplay}`}
          >
            <Phone className="h-4 w-4" aria-hidden />
            {phoneDisplay}
          </a>
        </div>
      </div>
    </section>
  );
}
