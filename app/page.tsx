import type { Metadata } from "next";
import Link from "next/link";
import { defaultMetadata, SITE_URL } from "@/lib/seo";
import { siteContent } from "@/lib/site-content";
import { Hero } from "@/components/hero";
import { Services } from "@/components/services";
import { Button } from "@/components/ui/button";
import { getCmsContent, blockValue, blockHtml, cmsSeo, plainText } from "@/lib/cms";

type FaqEntry = {
  readonly question: string;
  /** Svaret som markdown — visas när CMS:et inte levererar färdig HTML. */
  readonly answer: string;
  /** Svaret renderat av CMS:et, med kundens formatering. */
  readonly answerHtml: string | null;
};

function faqPageJsonLd(entries: readonly FaqEntry[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: entries.map((item) => ({
      "@type": "Question",
      name: plainText(item.question),
      acceptedAnswer: {
        "@type": "Answer",
        // Strukturerad data ska vara ren text — aldrig markdown eller taggar.
        text: plainText(item.answer),
      },
    })),
  };
}

export async function generateMetadata(): Promise<Metadata> {
  const content = await getCmsContent();
  const seo = cmsSeo(content, "home");
  const title = seo?.title?.trim() || siteContent.meta.title;
  const description = seo?.description?.trim() || siteContent.meta.description;

  return {
    ...defaultMetadata,
    title: {
      absolute: title,
    },
    description,
    openGraph: {
      ...defaultMetadata.openGraph,
      title,
      description,
      url: SITE_URL,
    },
    twitter: {
      ...defaultMetadata.twitter,
      title,
      description,
    },
    alternates: {
      canonical: SITE_URL,
    },
  };
}

export default async function HomePage() {
  const { homePage } = siteContent;
  const content = await getCmsContent();

  const faq: FaqEntry[] = homePage.faq.map((item, i) => ({
    question: blockValue(content, `faq.q${i + 1}`, item.question),
    answer: blockValue(content, `faq.a${i + 1}`, item.answer),
    answerHtml: blockHtml(content, `faq.a${i + 1}`),
  }));

  const trust: string[] = homePage.trust.map((item, i) =>
    blockValue(content, `why.item${i + 1}`, item)
  );

  const ctaTitle = blockValue(content, "cta.title", homePage.ctaTitle);
  const ctaSubline = blockValue(content, "cta.subtitle", homePage.ctaSubline);

  const faqJson = JSON.stringify(faqPageJsonLd(faq));

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
            {faq.map((item, i) => (
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
                {item.answerHtml ? (
                  <div
                    className="cms-rich-inherit mt-3 border-t border-primary/10 pt-3 text-sm leading-relaxed text-muted-foreground"
                    dangerouslySetInnerHTML={{ __html: item.answerHtml }}
                  />
                ) : (
                  <p className="mt-3 border-t border-primary/10 pt-3 text-sm leading-relaxed text-muted-foreground">
                    {item.answer}
                  </p>
                )}
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
            {trust.map((item, i) => (
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
            {ctaTitle}
          </h2>
          <p className="mt-3 text-primary-foreground/90">{ctaSubline}</p>
          <Button asChild size="lg" className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="/offert">{homePage.ctaButtonText}</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
