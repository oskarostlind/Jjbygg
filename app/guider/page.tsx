import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { GUIDES, GUIDER_UPDATED } from "@/lib/guider-content";
import { getServicePage } from "@/lib/services-content";
import { SITE_URL, defaultMetadata } from "@/lib/seo";
import { siteContent } from "@/lib/site-content";
import { PageHeader } from "@/components/page-header";
import { breadcrumbJsonLd, type Crumb } from "@/components/breadcrumbs";
import { ServiceIcon } from "@/components/service-icon";
import { CtaBand } from "@/components/cta-band";
import { ArticleUpdated } from "@/components/seo-article";

const PAGE_URL = `${SITE_URL}/guider`;
const TITLE = "Prisguider: badrum, tak, altan, tillbyggnad | JJ Bygg";
const DESCRIPTION =
  "Vad kostar ett badrum, ett takbyte, en altan eller en tillbyggnad? Våra guider förklarar vad som avgör priset och hur du får en offert som håller.";

export const metadata: Metadata = {
  ...defaultMetadata,
  title: { absolute: TITLE },
  description: DESCRIPTION,
  openGraph: { ...defaultMetadata.openGraph, title: TITLE, description: DESCRIPTION, url: PAGE_URL },
  twitter: { ...defaultMetadata.twitter, title: TITLE, description: DESCRIPTION },
  alternates: { canonical: PAGE_URL },
};

const CRUMBS: Crumb[] = [{ href: "/", label: "Hem" }, { label: "Guider" }];

export default function GuiderPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Guider",
      headline: TITLE,
      description: DESCRIPTION,
      url: PAGE_URL,
      inLanguage: "sv-SE",
      dateModified: GUIDER_UPDATED,
      isPartOf: { "@id": `${SITE_URL}/#webbplats` },
      publisher: {
        "@type": "GeneralContractor",
        "@id": `${SITE_URL}/#foretag`,
        name: siteContent.footer.companyName,
        url: SITE_URL,
      },
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: GUIDES.length,
        itemListElement: GUIDES.map((guide, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: guide.h1,
          url: `${SITE_URL}/guider/${guide.slug}`,
        })),
      },
    },
    breadcrumbJsonLd(CRUMBS, PAGE_URL),
  ];

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <PageHeader
        title="Guider"
        lead="Vad kostar det? Det är den vanligaste frågan vi får, och det ärliga svaret är att det beror på. I guiderna går vi igenom vad det beror på – så att du förstår din offert och vet vad du ska fråga efter."
        crumbs={CRUMBS}
      />

      <section className="bg-sand py-10 md:py-16" aria-labelledby="guider-heading">
        <div className="wrap">
          <h2 id="guider-heading" className="sr-only">
            Alla guider
          </h2>
          <ul className="grid gap-6 md:grid-cols-2 lg:gap-8">
            {GUIDES.map((guide) => {
              const service = getServicePage(guide.service);
              return (
                <li key={guide.slug}>
                  <article className="flex h-full flex-col rounded-lg border border-line bg-paper p-6 md:p-8">
                    {service ? <ServiceIcon iconKey={service.iconKey} /> : null}
                    <h3 className="mt-5 font-display text-xl font-bold leading-tight text-graphite md:text-2xl">
                      <Link href={`/guider/${guide.slug}`} className="hover:text-brand-strong">
                        {guide.h1}
                      </Link>
                    </h3>
                    <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-ink-muted">{guide.cardText}</p>
                    <Link
                      href={`/guider/${guide.slug}`}
                      className="group mt-5 inline-flex items-center gap-1.5 text-[0.9375rem] font-semibold text-brand-strong hover:underline hover:decoration-2 hover:underline-offset-4"
                      aria-label={`Läs guiden: ${guide.name}`}
                    >
                      Läs guiden
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                    </Link>
                  </article>
                </li>
              );
            })}
          </ul>

          <div className="mt-12 max-w-prose space-y-5 md:mt-16">
            <h2 className="display text-display-sm text-graphite">Därför står det inga priser här</h2>
            <p className="text-[1.0625rem] leading-[1.7] text-graphite">
              Våra jobb sträcker sig från en ny innerdörr till ett helt hus, och två projekt som låter likadana kan skilja
              mycket när vi har sett dem. Ett schablonpris skulle säga mer om ett genomsnitt än om ditt projekt. Därför
              lämnar vi priset i en skriftlig offert efter hembesök, med arbete och material var för sig.
            </p>
            <p className="text-[1.0625rem] leading-[1.7] text-graphite">
              Hittar du inte det du undrar över? Läs om{" "}
              <Link href="/tjanster" className="link">
                alla våra tjänster
              </Link>
              , titta på{" "}
              <Link href="/referenser" className="link">
                jobb vi har gjort
              </Link>{" "}
              eller{" "}
              <Link href="/offert" className="link">
                beskriv ditt projekt
              </Link>{" "}
              så hör vi av oss.
            </p>
            <ArticleUpdated iso={GUIDER_UPDATED} />
          </div>
        </div>
      </section>

      <CtaBand
        title="Vill du veta vad ditt projekt kostar?"
        subline="Beskriv projektet i vårt formulär så återkommer vi. Hembesök i Boden och Luleå är kostnadsfritt."
      />
    </main>
  );
}
