import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SERVICE_PAGES, getServicePage } from "@/lib/services-content";
import { SITE_URL, defaultMetadata } from "@/lib/seo";
import { siteContent } from "@/lib/site-content";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { FaqList } from "@/components/faq-list";
import { CtaBand } from "@/components/cta-band";
import { ServiceIcon, SERVICE_IMAGES } from "@/components/service-icon";

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

  const image = SERVICE_IMAGES[page.iconKey];

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <PageHeader
        title={page.h1}
        lead={page.lead}
        image={image}
        crumbs={[{ href: "/", label: "Hem" }, { href: "/tjanster", label: "Tjänster" }, { label: page.name }]}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link href="/offert">Begär kostnadsfri offert</Link>
          </Button>
          <Button asChild size="lg" variant="outlineOnDark">
            <a href={`tel:${siteContent.contact.phoneTelDigits}`}>
              <Phone className="h-4 w-4" aria-hidden />
              Ring {siteContent.contact.phoneDisplay}
            </a>
          </Button>
        </div>
      </PageHeader>

      <div className="wrap grid gap-12 py-12 md:py-16 lg:grid-cols-12 lg:gap-16">
        <article className="lg:col-span-8">
          <div className="max-w-prose space-y-12">
            {page.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="display text-display-sm text-graphite">{section.heading}</h2>
                {section.paragraphs.map((text, i) => (
                  <p key={i} className="mt-5 text-[1.0625rem] leading-[1.7] text-graphite">
                    {text}
                  </p>
                ))}
                {section.list ? (
                  <ul className="mt-5 space-y-2.5 pl-5 text-[1.0625rem] leading-relaxed text-graphite marker:text-brand">
                    {section.list.map((item) => (
                      <li key={item} className="list-disc pl-1">
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}

            <section aria-labelledby="faq-heading">
              <h2 id="faq-heading" className="display text-display-sm text-graphite">
                Vanliga frågor om {page.name.toLowerCase()}
              </h2>
              <div className="mt-6">
                <FaqList items={page.faq} />
              </div>
            </section>

            <p className="text-sm text-ink-muted">
              Senast uppdaterad <time dateTime={page.updated}>{formatDate(page.updated)}</time>
            </p>
          </div>
        </article>

        <aside className="lg:col-span-4">
          <div className="space-y-6 lg:sticky lg:top-[calc(var(--header-h)+1.5rem)]">
            <div className="rounded-lg bg-graphite p-6 text-ink-onDark md:p-7">
              <h2 className="font-display text-xl font-bold text-paper">Vad kostar ditt projekt?</h2>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-onDark/75">
                Beskriv projektet så återkommer vi med en offert. Hembesök i Boden och Luleå är kostnadsfritt.
              </p>
              <Button asChild size="lg" className="mt-5 w-full">
                <Link href="/offert">Begär offert</Link>
              </Button>
              <a
                href={`tel:${siteContent.contact.phoneTelDigits}`}
                className="mt-3 flex h-12 items-center justify-center gap-2 rounded border border-ink-onDark/30 font-display font-bold text-paper transition-colors hover:border-ink-onDark hover:bg-ink-onDark/10"
              >
                <Phone className="h-4 w-4" aria-hidden />
                {siteContent.contact.phoneDisplay}
              </a>
            </div>

            {related.length > 0 ? (
              <nav aria-labelledby="related-heading" className="rounded-lg border border-line bg-paper p-6">
                <h2 id="related-heading" className="font-display text-base font-bold text-graphite">
                  Andra tjänster
                </h2>
                <ul className="mt-3 divide-y divide-line">
                  {related.map((p) => (
                    <li key={p.slug}>
                      <Link
                        href={`/tjanster/${p.slug}`}
                        className="group flex items-center gap-3 py-3 font-medium text-graphite transition-colors hover:text-brand-strong"
                      >
                        <ServiceIcon iconKey={p.iconKey} size="sm" className="h-9 w-9 [&>svg]:h-4 [&>svg]:w-4" />
                        <span className="flex-1">{p.name}</span>
                        <ArrowRight className="h-4 w-4 text-concrete transition-transform group-hover:translate-x-0.5 group-hover:text-brand-strong" aria-hidden />
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ) : null}
          </div>
        </aside>
      </div>

      <CtaBand
        title="Vill du veta vad ditt projekt kostar?"
        subline="Beskriv projektet i vårt formulär så återkommer vi. Hembesök i Boden och Luleå är kostnadsfritt."
      />
    </main>
  );
}
