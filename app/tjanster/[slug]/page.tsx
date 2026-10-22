import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SERVICE_PAGES, getServicePage } from "@/lib/services-content";
import { LOCATION_PAGES, getLocationPage } from "@/lib/locations-content";
import { serviceLocationPagesFor } from "@/lib/service-location-content";
import { SITE_URL, defaultMetadata } from "@/lib/seo";
import { siteContent } from "@/lib/site-content";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { FaqList } from "@/components/faq-list";
import { CtaBand } from "@/components/cta-band";
import { OfferCard } from "@/components/offer-card";
import { SidebarLinks } from "@/components/sidebar-links";
import { SERVICE_IMAGES } from "@/components/service-icon";

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

  // Lokala varianter av tjänsten (/tjanster/[slug]/[ort]) + ortsidor utan egen variant.
  const localVariants = serviceLocationPagesFor(page.slug).map((p) => {
    const loc = getLocationPage(p.location);
    return { href: `/tjanster/${p.service}/${p.location}`, label: `${page.name} ${loc?.inPhrase ?? p.location}` };
  });
  const regionLinks = LOCATION_PAGES.filter((loc) => !localVariants.some((v) => v.href.endsWith(`/${loc.slug}`))).map(
    (loc) => ({ href: `/byggfirma/${loc.slug}`, label: `Byggfirma ${loc.inPhrase}` })
  );
  const areaLinks = [...localVariants, ...regionLinks].map((link) => ({ ...link, place: true }));

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
            <OfferCard />

            <SidebarLinks id="areas-heading" heading={`${page.name} där du bor`} links={areaLinks} />

            <SidebarLinks
              id="related-heading"
              heading="Andra tjänster"
              links={related.map((p) => ({ href: `/tjanster/${p.slug}`, label: p.name, iconKey: p.iconKey }))}
            />
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
