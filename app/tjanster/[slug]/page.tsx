import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SERVICE_PAGES, getServicePage } from "@/lib/services-content";
import { SITE_URL, defaultMetadata } from "@/lib/seo";
import { siteContent } from "@/lib/site-content";
import { Button } from "@/components/ui/button";

type Props = { params: { slug: string } };

export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICE_PAGES.map((page) => ({ slug: page.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const page = getServicePage(params.slug);
  if (!page) return {};
  const url = `${SITE_URL}/tjanster/${page.slug}`;

  return {
    ...defaultMetadata,
    title: { absolute: page.metaTitle },
    description: page.metaDescription,
    openGraph: {
      ...defaultMetadata.openGraph,
      title: page.metaTitle,
      description: page.metaDescription,
      url,
    },
    twitter: {
      ...defaultMetadata.twitter,
      title: page.metaTitle,
      description: page.metaDescription,
    },
    alternates: { canonical: url },
  };
}

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("sv-SE", { day: "numeric", month: "long", year: "numeric" }).format(
    new Date(iso)
  );
}

export default function ServicePage({ params }: Props) {
  const page = getServicePage(params.slug);
  if (!page) notFound();

  const url = `${SITE_URL}/tjanster/${page.slug}`;
  const related = page.related
    .map((slug) => SERVICE_PAGES.find((p) => p.slug === slug))
    .filter((p): p is (typeof SERVICE_PAGES)[number] => Boolean(p));

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: page.name,
      serviceType: page.name,
      description: page.metaDescription,
      url,
      areaServed: [
        { "@type": "City", name: "Boden" },
        { "@type": "City", name: "Luleå" },
      ],
      provider: {
        "@type": "GeneralContractor",
        "@id": `${SITE_URL}/#foretag`,
        name: siteContent.footer.companyName,
        url: SITE_URL,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Hem", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Tjänster", item: `${SITE_URL}/tjanster` },
        { "@type": "ListItem", position: 3, name: page.name, item: url },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: page.faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
  ];

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="border-b border-primary/10 bg-primary py-14 md:py-20">
        <div className="mx-auto max-w-3xl px-4">
          <nav aria-label="Brödsmulor" className="text-sm text-primary-foreground/70">
            <ol className="flex flex-wrap items-center gap-1">
              <li>
                <Link href="/" className="hover:text-accent">
                  Hem
                </Link>
              </li>
              <li aria-hidden>›</li>
              <li>
                <Link href="/tjanster" className="hover:text-accent">
                  Tjänster
                </Link>
              </li>
              <li aria-hidden>›</li>
              <li aria-current="page" className="text-primary-foreground/90">
                {page.name}
              </li>
            </ol>
          </nav>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-primary-foreground md:text-4xl">
            {page.h1}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-primary-foreground/90">{page.lead}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="/offert">Begär kostnadsfri offert</Link>
            </Button>
          </div>
        </div>
      </section>

      <article className="bg-background py-12 md:py-16">
        <div className="mx-auto max-w-3xl space-y-10 px-4">
          {page.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-2xl font-semibold text-primary">{section.heading}</h2>
              {section.paragraphs.map((text, i) => (
                <p key={i} className="mt-4 leading-relaxed text-foreground/90">
                  {text}
                </p>
              ))}
              {section.list ? (
                <ul className="mt-4 list-disc space-y-2 pl-6 leading-relaxed text-foreground/90 marker:text-accent">
                  {section.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}

          <section aria-labelledby="faq-heading">
            <h2 id="faq-heading" className="text-2xl font-semibold text-primary">
              Vanliga frågor om {page.name.toLowerCase()}
            </h2>
            <div className="mt-6 space-y-3">
              {page.faq.map((item) => (
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

          {related.length > 0 ? (
            <section aria-labelledby="related-heading">
              <h2 id="related-heading" className="text-2xl font-semibold text-primary">
                Andra tjänster
              </h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-3">
                {related.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/tjanster/${p.slug}`}
                      className="block rounded-lg border border-primary/20 bg-card px-4 py-3 font-medium text-foreground shadow-sm transition hover:border-accent hover:text-primary"
                    >
                      {p.name} →
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <p className="text-sm text-muted-foreground">
            Senast uppdaterad <time dateTime={page.updated}>{formatDate(page.updated)}</time>
          </p>
        </div>
      </article>

      <section className="border-t border-primary/10 bg-primary py-14">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <h2 className="text-2xl font-semibold text-primary-foreground md:text-3xl">
            Vill du veta vad ditt projekt kostar?
          </h2>
          <p className="mt-3 text-primary-foreground/90">
            Beskriv projektet i vårt formulär så återkommer vi. Hembesök i Boden och Luleå är kostnadsfritt.
          </p>
          <Button asChild size="lg" className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="/offert">Begär en offert</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
