import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SERVICE_PAGES, getServicePage } from "@/lib/services-content";
import { getLocationPage } from "@/lib/locations-content";
import {
  SERVICE_LOCATION_PAGES,
  getServiceLocationPage,
  serviceLocationPagesFor,
  serviceLocationPagesIn,
} from "@/lib/service-location-content";
import { SITE_URL, defaultMetadata } from "@/lib/seo";
import { siteContent } from "@/lib/site-content";
import { breadcrumbJsonLd, type Crumb } from "@/components/breadcrumbs";
import {
  ArticleCta,
  ArticleFaq,
  ArticleHero,
  ArticleSections,
  LinkCardGrid,
  faqJsonLd,
  formatSwedishDate,
} from "@/components/seo-article";

type Props = { params: { slug: string; ort: string } };

export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICE_LOCATION_PAGES.map((page) => ({ slug: page.service, ort: page.location }));
}

export function generateMetadata({ params }: Props): Metadata {
  const page = getServiceLocationPage(params.slug, params.ort);
  if (!page) return {};
  const url = `${SITE_URL}/tjanster/${page.service}/${page.location}`;

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

export default function ServiceLocationPage({ params }: Props) {
  const page = getServiceLocationPage(params.slug, params.ort);
  const service = getServicePage(params.slug);
  const location = getLocationPage(params.ort);
  if (!page || !service || !location) notFound();

  const url = `${SITE_URL}/tjanster/${page.service}/${page.location}`;
  const crumbs: Crumb[] = [
    { name: "Hem", href: "/" },
    { name: "Tjänster", href: "/tjanster" },
    { name: service.name, href: `/tjanster/${service.slug}` },
    { name: location.name },
  ];

  // Samma tjänst på andra orter + andra tjänster på samma ort.
  const sameServiceElsewhere = serviceLocationPagesFor(page.service)
    .filter((p) => p.location !== page.location)
    .map((p) => {
      const loc = getLocationPage(p.location);
      return { href: `/tjanster/${p.service}/${p.location}`, label: `${service.name} ${loc?.inPhrase ?? p.location}` };
    });
  const otherServicesHere = serviceLocationPagesIn(page.location)
    .filter((p) => p.service !== page.service)
    .map((p) => {
      const s = SERVICE_PAGES.find((x) => x.slug === p.service);
      return { href: `/tjanster/${p.service}/${p.location}`, label: `${s?.name ?? p.service} ${location.inPhrase}` };
    });

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: page.h1,
      serviceType: service.name,
      description: page.metaDescription,
      url,
      areaServed: { "@type": location.areaType, name: location.name },
      provider: {
        "@type": "GeneralContractor",
        "@id": `${SITE_URL}/#foretag`,
        name: siteContent.footer.companyName,
        url: SITE_URL,
      },
    },
    breadcrumbJsonLd(crumbs, url),
    ...(page.faq.length > 0 ? [faqJsonLd(page.faq)] : []),
  ];

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <ArticleHero crumbs={crumbs} h1={page.h1} lead={page.lead} />

      <article className="bg-background py-12 md:py-16">
        <div className="mx-auto max-w-3xl space-y-10 px-4">
          <ArticleSections sections={page.sections} />

          <ArticleFaq heading={`Vanliga frågor om ${service.name.toLowerCase()} ${location.inPhrase}`} faq={page.faq} />

          <LinkCardGrid
            id="more-heading"
            heading="Läs mer"
            columns={2}
            links={[
              { href: `/tjanster/${service.slug}`, label: `Allt om ${service.name.toLowerCase()}` },
              { href: `/byggfirma/${location.slug}`, label: `Byggfirma ${location.inPhrase}` },
            ]}
          />

          <LinkCardGrid id="same-service-heading" heading="Samma tjänst på andra orter" links={sameServiceElsewhere} columns={2} />
          <LinkCardGrid id="other-services-heading" heading={`Fler tjänster ${location.inPhrase}`} links={otherServicesHere} />

          <p className="text-sm text-muted-foreground">
            Senast uppdaterad <time dateTime={page.updated}>{formatSwedishDate(page.updated)}</time>
          </p>
        </div>
      </article>

      <ArticleCta
        title={`Vill du veta vad ${service.name.toLowerCase()} kostar ${location.inPhrase}?`}
        body="Beskriv projektet i vårt formulär så återkommer vi. Hembesök i Boden och Luleå är kostnadsfritt."
      />
    </main>
  );
}
