import type { Metadata } from "next";
import Link from "next/link";
import { defaultMetadata, SITE_URL } from "@/lib/seo";
import { siteContent } from "@/lib/site-content";
import { Hero } from "@/components/hero";
import { Services } from "@/components/services";
import { Button } from "@/components/ui/button";

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
  const { homePage } = siteContent;
  const faqJson = JSON.stringify(faqPageJsonLd(homePage.faq));

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJson }} />
      <Hero />
      <Services />

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

      <section className="border-t border-primary/10 bg-muted/30 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center text-2xl font-semibold text-primary md:text-3xl">
            {homePage.trustTitle}
          </h2>
          <ul className="mt-10 flex flex-col gap-6 sm:flex-row sm:justify-center sm:gap-12">
            {homePage.trust.map((item, i) => (
              <li key={i} className="flex items-center justify-center gap-3 text-center sm:flex-col">
                <span
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent"
                  aria-hidden
                >
                  ✓
                </span>
                <span className="font-medium text-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-primary/10 bg-primary py-16">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <h2 className="text-2xl font-semibold text-primary-foreground md:text-3xl">
            {homePage.ctaTitle}
          </h2>
          <p className="mt-3 text-primary-foreground/90">{homePage.ctaSubline}</p>
          <Button asChild size="lg" className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="/offert">{homePage.ctaButtonText}</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
