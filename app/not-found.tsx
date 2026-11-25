import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { siteContent } from "@/lib/site-content";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Sidan hittades inte",
  description: "Sidan du letar efter finns inte. Gå till startsidan, se våra tjänster eller begär en offert.",
  robots: { index: false, follow: true },
};

const LINKS = [
  { href: "/", label: "Startsidan", text: "Byggföretag i Boden och Luleå – vilka vi är och hur vi arbetar." },
  { href: "/tjanster", label: "Tjänster", text: "Tillbyggnad, renovering, badrum, altan, tak och totalentreprenad." },
  { href: "/offert", label: "Begär offert", text: "Beskriv projektet så återkommer vi. Kostnadsfritt och utan förpliktelser." },
];

export default function NotFound() {
  const { contact } = siteContent;

  return (
    <main>
      <PageHeader
        title="Sidan hittades inte"
        lead="Adressen stämmer inte, eller så har sidan flyttats. Här är några vägar vidare."
      >
        <Button asChild size="lg">
          <Link href="/">Till startsidan</Link>
        </Button>
      </PageHeader>

      <section className="bg-sand py-12 md:py-16" aria-label="Vägar vidare">
        <div className="wrap">
          <ul className="grid gap-x-10 md:grid-cols-3">
            {LINKS.map((link) => (
              <li key={link.href} className="group relative border-t border-line py-6">
                <h2 className="font-display text-xl font-bold leading-tight text-graphite">
                  <Link
                    href={link.href}
                    className="inline-flex items-center gap-1.5 after:absolute after:inset-0 after:content-[''] group-hover:text-brand-strong focus-visible:underline focus-visible:outline-none"
                  >
                    {link.label}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                  </Link>
                </h2>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-muted">{link.text}</p>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-[0.9375rem] text-ink-muted">
            Hittar du inte det du söker? Ring {contact.personName.split(" ")[0]} på{" "}
            <a href={`tel:${contact.phoneTelDigits}`} className="link">
              {contact.phoneDisplay}
            </a>
            .
          </p>
        </div>
      </section>
    </main>
  );
}
