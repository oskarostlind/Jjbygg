import type { Metadata } from "next";
import { defaultMetadata, SITE_URL } from "@/lib/seo";
import { siteContent } from "@/lib/site-content";
import { Hero } from "@/components/hero";
import { Services } from "@/components/services";
import { ServiceAreas } from "@/components/service-areas";
import { Process } from "@/components/home/process";
import { WhyUs } from "@/components/home/why-us";
import { FaqList } from "@/components/faq-list";
import { CtaBand } from "@/components/cta-band";
import { SectionHeading } from "@/components/section-heading";
import { editable } from "sitecms-next";
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
      <ServiceAreas />
      <Process />
      <WhyUs items={trust} />

      <section className="border-t border-line bg-sand py-16 md:py-24" aria-labelledby="faq-heading">
        <div className="wrap grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <SectionHeading
              id="faq-heading"
              title={homePage.faqTitle}
              intro="Det här undrar de flesta innan de hör av sig. Hittar du inte svaret – ring, så reder vi ut det."
            />
          </div>
          <div className="lg:col-span-8">
            <FaqList
              items={faq.map((item, i) => ({
                question: item.question,
                answer: item.answer,
                answerHtml: item.answerHtml,
                questionProps: editable("home", `faq.q${i + 1}`),
                answerProps: editable("home", `faq.a${i + 1}`),
              }))}
            />
          </div>
        </div>
      </section>

      <CtaBand
        title={ctaTitle}
        subline={ctaSubline}
        buttonText={homePage.ctaButtonText}
        titleProps={editable("home", "cta.title")}
        sublineProps={editable("home", "cta.subtitle")}
      />
    </main>
  );
}
