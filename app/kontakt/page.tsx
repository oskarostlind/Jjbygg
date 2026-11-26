import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Clock, Mail, MapPin, Phone } from "lucide-react";
import { SITE_URL, defaultMetadata } from "@/lib/seo";
import { siteContent } from "@/lib/site-content";
import { PageHeader } from "@/components/page-header";
import { breadcrumbJsonLd, type Crumb } from "@/components/breadcrumbs";
import { Button } from "@/components/ui/button";

const PAGE_URL = `${SITE_URL}/kontakt`;
const TITLE = "Kontakta JJ Bygg – byggföretag i Boden och Luleå";
const DESCRIPTION =
  "Ring Jesper på 070-535 71 94 eller mejla info@jjbyggboden.se. Vi har öppet vardagar 07–17 och svarar inom 1–2 vardagar. Hembesök och offert är gratis.";

export const metadata: Metadata = {
  ...defaultMetadata,
  title: { absolute: TITLE },
  description: DESCRIPTION,
  openGraph: { ...defaultMetadata.openGraph, title: TITLE, description: DESCRIPTION, url: PAGE_URL },
  twitter: { ...defaultMetadata.twitter, title: TITLE, description: DESCRIPTION },
  alternates: { canonical: PAGE_URL },
};

const CRUMBS: Crumb[] = [{ href: "/", label: "Hem" }, { label: "Kontakt" }];

/** Bra att skicka med i förfrågan – då kan vi förbereda hembesöket. */
const SEND_ALONG = [
  "Några bilder på det som ska göras, gärna både översikt och detaljer",
  "Ungefärliga mått, eller ritningar om du har",
  "När du vill att jobbet ska göras",
  "Var huset ligger",
  "Om du vill använda ROT-avdrag",
];

const ICON_BOX =
  "flex h-11 w-11 shrink-0 items-center justify-center rounded bg-sand-deep text-brand-strong transition-colors group-hover:bg-brand-tint";
const ROW =
  "group flex items-center gap-4 rounded py-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-strong focus-visible:ring-offset-2 focus-visible:ring-offset-sand";

export default function ContactPage() {
  const { contact, footer, company, google } = siteContent;
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${footer.companyName}, ${contact.address}`
  )}`;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "@id": `${PAGE_URL}#sida`,
      url: PAGE_URL,
      name: TITLE,
      description: DESCRIPTION,
      inLanguage: "sv-SE",
      isPartOf: { "@id": `${SITE_URL}/#webbplats` },
      about: { "@id": `${SITE_URL}/#foretag` },
      mainEntity: { "@id": `${SITE_URL}/#foretag` },
    },
    breadcrumbJsonLd(CRUMBS, PAGE_URL),
  ];

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <PageHeader
        title="Kontakta JJ Bygg"
        lead={`Ring, mejla eller skicka en offertförfrågan. Du pratar med ${contact.personName}, som håller i ditt projekt från första samtalet tills det är klart.`}
        crumbs={CRUMBS}
      />

      <div className="wrap grid gap-12 py-12 md:py-16 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <section aria-labelledby="contact-heading">
            <h2 id="contact-heading" className="display text-display-sm text-graphite">
              Telefon, e-post och adress
            </h2>
            <ul className="mt-5 divide-y divide-line border-y border-line">
              <li>
                <a href={`tel:${contact.phoneTelDigits}`} className={ROW}>
                  <span className={ICON_BOX}>
                    <Phone className="h-5 w-5" aria-hidden />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm text-ink-muted">Ring {contact.personName}</span>
                    <span className="font-display text-2xl font-bold text-graphite group-hover:text-brand-strong">
                      {contact.phoneDisplay}
                    </span>
                  </span>
                </a>
              </li>
              <li>
                <a href={`mailto:${contact.email}`} className={ROW}>
                  <span className={ICON_BOX}>
                    <Mail className="h-5 w-5" aria-hidden />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm text-ink-muted">E-post</span>
                    <span className="break-all text-lg font-semibold text-graphite group-hover:text-brand-strong">
                      {contact.email}
                    </span>
                  </span>
                </a>
              </li>
              <li className="flex items-start gap-4 py-4">
                <span className={ICON_BOX}>
                  <MapPin className="h-5 w-5" aria-hidden />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm text-ink-muted">Adress</span>
                  <address className="text-lg font-semibold not-italic text-graphite">
                    {footer.companyName}
                    <br />
                    {contact.address}
                  </address>
                  <a
                    href={mapsHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link mt-1.5 inline-flex items-center gap-1 text-[0.9375rem]"
                  >
                    Visa på Google Maps
                    <ArrowUpRight className="h-4 w-4" aria-hidden />
                    <span className="sr-only">(öppnas i ny flik)</span>
                  </a>
                </span>
              </li>
            </ul>
          </section>

          <section aria-labelledby="hours-heading" className="mt-12">
            <h2 id="hours-heading" className="display text-display-sm text-graphite">
              Öppettider och svarstid
            </h2>
            <div className="mt-5 flex items-start gap-4">
              <span className={ICON_BOX}>
                <Clock className="h-5 w-5" aria-hidden />
              </span>
              <div className="min-w-0 flex-1">
                <dl className="max-w-sm divide-y divide-line border-y border-line text-[1.0625rem]">
                  {contact.openingHours.map((row) => (
                    <div key={row.days} className="flex justify-between gap-6 py-2.5">
                      <dt className="text-graphite">{row.days}</dt>
                      <dd className="font-semibold text-graphite">{row.hours}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-4 max-w-prose text-[1.0625rem] leading-[1.7] text-graphite">
                  {contact.responseTime}
                </p>
              </div>
            </div>
          </section>

          <p className="mt-12 text-sm text-ink-muted">
            {footer.companyName} · Org.nr {footer.orgNumber} · Registrerat {company.foundingYear} · {company.taxStatus}
          </p>
        </div>

        <aside className="space-y-6 lg:col-span-5">
          <section aria-labelledby="offer-heading" className="rounded-lg bg-graphite p-6 text-ink-onDark md:p-7">
            <h2 id="offer-heading" className="font-display text-xl font-bold text-paper">
              Begär offert
            </h2>
            <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-onDark/75">
              Enklast är att fylla i offertformuläret. Där beskriver du projektet och kan bifoga bilder, och vi
              återkommer för att boka ett kostnadsfritt hembesök. Offerten är kostnadsfri och utan förpliktelser.
            </p>
            <Button asChild size="lg" className="mt-5 w-full">
              <Link href="/offert">Till offertformuläret</Link>
            </Button>
          </section>

          <section aria-labelledby="send-heading" className="rounded-lg border border-line bg-paper p-6">
            <h2 id="send-heading" className="font-display text-base font-bold text-graphite">
              Bra att skicka med
            </h2>
            <ul className="mt-3 space-y-2 pl-5 text-[0.9375rem] leading-relaxed text-graphite marker:text-brand">
              {SEND_ALONG.map((item) => (
                <li key={item} className="list-disc pl-1">
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-muted">
              Allt behöver inte vara klart. Det räcker att vi förstår ungefär vad du vill göra.
            </p>
          </section>

          <section aria-labelledby="review-heading" className="rounded-lg bg-sand-deep p-6">
            <h2 id="review-heading" className="font-display text-base font-bold text-graphite">
              Har du anlitat oss?
            </h2>
            <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-muted">
              Berätta gärna hur det gick. Ett omdöme hjälper andra som letar efter en byggfirma.
            </p>
            <a
              href={google.writeReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="link mt-3 inline-flex items-center gap-1 text-[0.9375rem]"
            >
              Lämna ett omdöme på Google
              <ArrowUpRight className="h-4 w-4" aria-hidden />
              <span className="sr-only">(öppnas i ny flik)</span>
            </a>
          </section>
        </aside>
      </div>
    </main>
  );
}
