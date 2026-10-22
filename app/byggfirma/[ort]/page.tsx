import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LOCATION_PAGES, getLocationPage } from "@/lib/locations-content";
import { SERVICE_PAGES } from "@/lib/services-content";
import { serviceLocationPagesIn } from "@/lib/service-location-content";
import { SITE_URL, defaultMetadata } from "@/lib/seo";
import { siteContent } from "@/lib/site-content";
import { breadcrumbJsonLd, type Crumb } from "@/components/breadcrumbs";
import { CtaBand } from "@/components/cta-band";
import { SidebarLinks } from "@/components/sidebar-links";
import {
  ArticleFaq,
  ArticleHero,
  ArticleLayout,
  ArticleSections,
  ArticleUpdated,
  LOCATION_IMAGES,
  faqJsonLd,
} from "@/components/seo-article";

type Props = { params: { ort: string } };

export const dynamicParams = false;

export function generateStaticParams() {
  return LOCATION_PAGES.map((page) => ({ ort: page.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const page = getLocationPage(params.ort);
  if (!page) return {};
  const url = `${SITE_URL}/byggfirma/${page.slug}`;

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

export default function LocationPage({ params }: Props) {
  const page = getLocationPage(params.ort);
  if (!page) notFound();

  const url = `${SITE_URL}/byggfirma/${page.slug}`;
  const crumbs: Crumb[] = [
    { label: "Hem", href: "/" },
    { label: `Byggfirma ${page.inPhrase}` },
  ];

  // Tjänst×ort-sidor för orten (bara Boden och Luleå har sådana).
  const localServices = serviceLocationPagesIn(page.slug);
  const serviceHrefs = SERVICE_PAGES.map((service) =>
    localServices.some((p) => p.service === service.slug)
      ? `/tjanster/${service.slug}/${page.slug}`
      : `/tjanster/${service.slug}`
  );
  const localServiceLinks = localServices.map((p) => {
    const service = SERVICE_PAGES.find((s) => s.slug === p.service);
    return { href: `/tjanster/${p.service}/${p.location}`, label: service?.name ?? p.h1, iconKey: service?.iconKey };
  });
  const otherLocations = LOCATION_PAGES.filter((p) => p.slug !== page.slug).map((p) => ({
    href: `/byggfirma/${p.slug}`,
    label: `Byggfirma ${p.inPhrase}`,
    place: true,
  }));

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: `Byggfirma ${page.inPhrase}`,
      serviceType: "Bygg- och entreprenadtjänster",
      description: page.metaDescription,
      url,
      areaServed: { "@type": page.areaType, name: page.name },
      provider: {
        "@type": "GeneralContractor",
        "@id": `${SITE_URL}/#foretag`,
        name: siteContent.footer.companyName,
        url: SITE_URL,
      },
    },
    breadcrumbJsonLd(crumbs, url),
    faqJsonLd(page.faq),
  ];

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <ArticleHero crumbs={crumbs} h1={page.h1} lead={page.lead} image={LOCATION_IMAGES[page.slug]} />

      <ArticleLayout
        aside={
          <>
            <SidebarLinks id="local-services-heading" heading={`Våra tjänster ${page.inPhrase}`} links={localServiceLinks} />
            <SidebarLinks id="other-locations-heading" heading="Andra orter" links={otherLocations} />
          </>
        }
      >
        <ArticleSections sections={page.sections} serviceHrefs={serviceHrefs} />

        <ArticleFaq heading={`Vanliga frågor om att bygga ${page.inPhrase}`} faq={page.faq} />

        {page.alsoServing ? (
          <section aria-labelledby="also-serving-heading">
            <h2 id="also-serving-heading" className="display text-display-sm text-graphite">
              Vi tar även uppdrag i
            </h2>
            <p className="mt-5 text-[1.0625rem] leading-[1.7] text-graphite">
              {page.alsoServing.join(", ")} – och orterna däremellan.
            </p>
          </section>
        ) : null}

        <ArticleUpdated iso={page.updated} />
      </ArticleLayout>

      <CtaBand
        title={`Planerar du ett byggprojekt ${page.inPhrase}?`}
        subline="Beskriv projektet i vårt formulär så återkommer vi med ett förslag. Hembesök i Boden och Luleå är kostnadsfritt."
      />
    </main>
  );
}
