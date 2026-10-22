import Link from "next/link";
import { Phone } from "lucide-react";
import { SERVICE_PAGES, type ServiceFaq, type ServiceSection } from "@/lib/services-content";
import type { LocationSlug } from "@/lib/locations-content";
import { siteContent } from "@/lib/site-content";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/page-header";
import { FaqList } from "@/components/faq-list";
import { OfferCard } from "@/components/offer-card";
import type { Crumb } from "@/components/breadcrumbs";

/**
 * Delad rendering för landningssidorna (ort och tjänst×ort).
 * Innehållet är unikt per sida (lib/locations-content.ts, lib/service-location-content.ts);
 * bara markupen delas. Samma komponenter och klasser som app/tjanster/[slug]/page.tsx
 * (PageHeader med foto, prose-bredd, sticky sidopanel med offert/ring, CtaBand).
 */

export function formatSwedishDate(iso: string): string {
  return new Intl.DateTimeFormat("sv-SE", { day: "numeric", month: "long", year: "numeric" }).format(
    new Date(iso)
  );
}

export function faqJsonLd(faq: ServiceFaq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

/** Foto i sidhuvudet per ort (ur public/hero) – samma bildbank som tjänstesidorna. */
export const LOCATION_IMAGES: Record<LocationSlug, { src: string; alt: string }> = {
  boden: {
    src: "/hero/callum-hill-NGGkGzslIaM-unsplash.jpg",
    alt: "Snickare mäter upp trävirke på en byggarbetsplats",
  },
  lulea: {
    src: "/hero/yves-cedric-schulze-o-ANXY28n_w-unsplash.jpg",
    alt: "Takstolar mot blå himmel",
  },
  norrbotten: {
    src: "/hero/quilia-j86QX1TMNaw-unsplash.jpg",
    alt: "Bjälklag och stomme under uppförande",
  },
};

export function ArticleHero({
  crumbs,
  h1,
  lead,
  image,
  ctaLabel = "Begär kostnadsfri offert",
}: {
  crumbs: Crumb[];
  h1: string;
  lead: string;
  image: { src: string; alt: string };
  ctaLabel?: string;
}) {
  return (
    <PageHeader title={h1} lead={lead} image={image} crumbs={crumbs}>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button asChild size="lg">
          <Link href="/offert">{ctaLabel}</Link>
        </Button>
        <Button asChild size="lg" variant="outlineOnDark">
          <a href={`tel:${siteContent.contact.phoneTelDigits}`}>
            <Phone className="h-4 w-4" aria-hidden />
            Ring {siteContent.contact.phoneDisplay}
          </a>
        </Button>
      </div>
    </PageHeader>
  );
}

/**
 * Tvåspalt som på tjänstesidan: brödtext i prose-bredd till vänster, sticky
 * sidopanel med offertkort (+ ev. länklistor) till höger.
 */
export function ArticleLayout({ children, aside }: { children: React.ReactNode; aside?: React.ReactNode }) {
  return (
    <div className="wrap grid gap-12 py-12 md:py-16 lg:grid-cols-12 lg:gap-16">
      <article className="lg:col-span-8">
        <div className="max-w-prose space-y-12">{children}</div>
      </article>

      <aside className="lg:col-span-4">
        <div className="space-y-6 lg:sticky lg:top-[calc(var(--header-h)+1.5rem)]">
          <OfferCard />
          {aside}
        </div>
      </aside>
    </div>
  );
}

const LOCATION_LIST_HREFS = ["/byggfirma/boden", "/byggfirma/lulea"];

/**
 * Listrader i ett avsnitt med `links: "services"` länkas till SERVICE_PAGES i samma
 * ordning (eller till tjänst×ort-sidan om `serviceHrefs` anger en), `links: "locations"`
 * till ortsidorna.
 */
export function ArticleSections({
  sections,
  serviceHrefs,
}: {
  sections: ServiceSection[];
  /** href per tjänst i SERVICE_PAGES-ordning; default /tjanster/[slug]. */
  serviceHrefs?: string[];
}) {
  const defaultServiceHrefs = SERVICE_PAGES.map((page) => `/tjanster/${page.slug}`);
  return (
    <>
      {sections.map((section) => {
        const hrefs =
          section.links === "services"
            ? serviceHrefs ?? defaultServiceHrefs
            : section.links === "locations"
              ? LOCATION_LIST_HREFS
              : undefined;
        return (
          <section key={section.heading}>
            <h2 className="display text-display-sm text-graphite">{section.heading}</h2>
            {section.paragraphs.map((text, i) => (
              <p key={i} className="mt-5 text-[1.0625rem] leading-[1.7] text-graphite">
                {text}
              </p>
            ))}
            {section.list ? (
              <ul className="mt-5 space-y-2.5 pl-5 text-[1.0625rem] leading-relaxed text-graphite marker:text-brand">
                {section.list.map((item, i) => {
                  const href = hrefs?.[i];
                  return (
                    <li key={item} className="list-disc pl-1">
                      {href ? (
                        <Link href={href} className="link">
                          {item}
                        </Link>
                      ) : (
                        item
                      )}
                    </li>
                  );
                })}
              </ul>
            ) : null}
          </section>
        );
      })}
    </>
  );
}

export function ArticleFaq({ heading, faq }: { heading: string; faq: ServiceFaq[] }) {
  if (faq.length === 0) return null;
  return (
    <section aria-labelledby="faq-heading">
      <h2 id="faq-heading" className="display text-display-sm text-graphite">
        {heading}
      </h2>
      <div className="mt-6">
        <FaqList items={faq} />
      </div>
    </section>
  );
}

export function ArticleUpdated({ iso }: { iso: string }) {
  return (
    <p className="text-sm text-ink-muted">
      Senast uppdaterad <time dateTime={iso}>{formatSwedishDate(iso)}</time>
    </p>
  );
}
