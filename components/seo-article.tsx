import Link from "next/link";
import { SERVICE_PAGES, type ServiceFaq, type ServiceSection } from "@/lib/services-content";
import { Button } from "@/components/ui/button";
import { Breadcrumbs, type Crumb } from "@/components/breadcrumbs";

/**
 * Delad rendering för landningssidorna (ort och tjänst×ort).
 * Innehållet är unikt per sida (lib/locations-content.ts, lib/service-location-content.ts);
 * bara markupen delas. Samma klasser som app/tjanster/[slug]/page.tsx så att
 * designbranchen restylar allt på en gång.
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

export function ArticleHero({
  crumbs,
  h1,
  lead,
  ctaLabel = "Begär kostnadsfri offert",
}: {
  crumbs: Crumb[];
  h1: string;
  lead: string;
  ctaLabel?: string;
}) {
  return (
    <section className="border-b border-primary/10 bg-primary py-14 md:py-20">
      <div className="mx-auto max-w-3xl px-4">
        <Breadcrumbs crumbs={crumbs} />
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-primary-foreground md:text-4xl">{h1}</h1>
        <p className="mt-4 text-lg leading-relaxed text-primary-foreground/90">{lead}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="/offert">{ctaLabel}</Link>
          </Button>
        </div>
      </div>
    </section>
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
            <h2 className="text-2xl font-semibold text-primary">{section.heading}</h2>
            {section.paragraphs.map((text, i) => (
              <p key={i} className="mt-4 leading-relaxed text-foreground/90">
                {text}
              </p>
            ))}
            {section.list ? (
              <ul className="mt-4 list-disc space-y-2 pl-6 leading-relaxed text-foreground/90 marker:text-accent">
                {section.list.map((item, i) => {
                  const href = hrefs?.[i];
                  return (
                    <li key={item}>
                      {href ? (
                        <Link href={href} className="font-medium text-primary underline-offset-2 hover:underline">
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
      <h2 id="faq-heading" className="text-2xl font-semibold text-primary">
        {heading}
      </h2>
      <div className="mt-6 space-y-3">
        {faq.map((item) => (
          <details
            key={item.question}
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
    </section>
  );
}

export function LinkCardGrid({
  heading,
  id,
  links,
  columns = 3,
}: {
  heading: string;
  id: string;
  links: { href: string; label: string }[];
  columns?: 2 | 3;
}) {
  if (links.length === 0) return null;
  const cols = columns === 2 ? "sm:grid-cols-2" : "sm:grid-cols-3";
  return (
    <section aria-labelledby={id}>
      <h2 id={id} className="text-2xl font-semibold text-primary">
        {heading}
      </h2>
      <ul className={`mt-4 grid gap-3 ${cols}`}>
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="block rounded-lg border border-primary/20 bg-card px-4 py-3 font-medium text-foreground shadow-sm transition hover:border-accent hover:text-primary"
            >
              {link.label} →
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function ArticleCta({ title, body, label = "Begär en offert" }: { title: string; body: string; label?: string }) {
  return (
    <section className="border-t border-primary/10 bg-primary py-14">
      <div className="mx-auto max-w-2xl px-4 text-center">
        <h2 className="text-2xl font-semibold text-primary-foreground md:text-3xl">{title}</h2>
        <p className="mt-3 text-primary-foreground/90">{body}</p>
        <Button asChild size="lg" className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90">
          <Link href="/offert">{label}</Link>
        </Button>
      </div>
    </section>
  );
}
