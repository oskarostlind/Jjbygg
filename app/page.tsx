import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { defaultMetadata, SITE_URL } from "@/lib/seo";
import { siteContent } from "@/lib/site-content";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type FaqEntry = { readonly question: string; readonly answer: string };

function faqPageJsonLd(entries: readonly FaqEntry[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: entries.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export const metadata: Metadata = {
  ...defaultMetadata,
  openGraph: {
    ...defaultMetadata.openGraph,
    url: SITE_URL,
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function HomePage() {
  const { homePage, images, hero } = siteContent;
  const faqJson = JSON.stringify(faqPageJsonLd(homePage.faq));

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJson }} />
      {/* Hero */}
      <section className="relative bg-primary">
        <div className="relative mx-auto max-w-6xl px-4 py-16 md:py-24 lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
          <div className="relative z-10 text-center lg:text-left">
            <h1 className="text-4xl font-bold tracking-tight text-primary-foreground md:text-5xl">
              {hero.headline}
            </h1>
            <p className="mt-4 max-w-xl text-lg text-primary-foreground/90">
              {hero.subline}
            </p>
            <div className="mt-8">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link href="/offert">{hero.ctaText}</Link>
              </Button>
            </div>
          </div>
          <div className="relative mt-10 aspect-[16/10] overflow-hidden rounded-lg lg:mt-0">
            <Image
              src={images.hero}
              alt={images.heroAlt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, min(560px, 50vw)"
              priority
            />
          </div>
        </div>
      </section>

      {/* Tjänster */}
      <section className="border-t border-primary/10 bg-background py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center text-2xl font-semibold text-primary md:text-3xl">
            {homePage.servicesTitle}
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {homePage.services.map((service, i) => (
              <Card key={i} className="border-primary/20 bg-card">
                <CardContent className="flex items-center gap-3 pt-6">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                    {i + 1}
                  </span>
                  <p className="font-medium text-foreground">{service}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-primary/10 bg-background py-16" aria-labelledby="faq-heading">
        <div className="mx-auto max-w-3xl px-4">
          <h2 id="faq-heading" className="text-center text-2xl font-semibold text-primary md:text-3xl">
            {homePage.faqTitle}
          </h2>
          <div className="mt-8 space-y-3">
            {homePage.faq.map((item, i) => (
              <details
                key={i}
                className="group rounded-lg border border-primary/20 bg-card px-4 py-3 shadow-sm open:shadow-md"
              >
                <summary className="cursor-pointer list-none font-medium text-foreground outline-none marker:content-none [&::-webkit-details-marker]:hidden">
                  <span className="flex items-center justify-between gap-2">
                    {item.question}
                    <span className="text-primary/60 transition group-open:rotate-180" aria-hidden>
                      ▼
                    </span>
                  </span>
                </summary>
                <p className="mt-3 border-t border-primary/10 pt-3 text-sm leading-relaxed text-muted-foreground">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Förtroende / USPs */}
      <section className="border-t border-primary/10 bg-muted/30 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center text-2xl font-semibold text-primary md:text-3xl">
            {homePage.trustTitle}
          </h2>
          <ul className="mt-10 flex flex-col gap-6 sm:flex-row sm:justify-center sm:gap-12">
            {homePage.trust.map((item, i) => (
              <li key={i} className="flex items-center justify-center gap-3 text-center sm:flex-col">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent" aria-hidden>
                  ✓
                </span>
                <span className="font-medium text-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Avslutande CTA */}
      <section className="border-t border-primary/10 bg-primary py-16">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <h2 className="text-2xl font-semibold text-primary-foreground md:text-3xl">
            {homePage.ctaTitle}
          </h2>
          <p className="mt-3 text-primary-foreground/90">
            {homePage.ctaSubline}
          </p>
          <Button asChild size="lg" className="mt-8 bg-accent hover:bg-accent/90 text-accent-foreground">
            <Link href="/offert">{homePage.ctaButtonText}</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
