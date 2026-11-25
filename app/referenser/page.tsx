import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { REFERENSER } from "@/lib/referenser-content";
import { getServicePage } from "@/lib/services-content";
import { SITE_URL, absoluteUrl, defaultMetadata } from "@/lib/seo";
import { siteContent } from "@/lib/site-content";
import { PageHeader } from "@/components/page-header";
import { breadcrumbJsonLd, type Crumb } from "@/components/breadcrumbs";
import { CtaBand } from "@/components/cta-band";

const PAGE_URL = `${SITE_URL}/referenser`;
const TITLE = "Utförda arbeten – altan, badrum, bastu & grund | JJ Bygg";
const DESCRIPTION =
  "Bilder från jobb vi har gjort: altan, badrum, bastu, golv och gjutna betongplattor. Se exempel på vad JJ Bygg & Entreprenad AB bygger.";

/** Delningsbild: altanbilden (1170×878). */
const OG = REFERENSER[0];
const OG_IMAGE = {
  url: absoluteUrl(OG.image.src),
  width: OG.image.width,
  height: OG.image.height,
  alt: OG.alt,
};

export const metadata: Metadata = {
  ...defaultMetadata,
  title: { absolute: TITLE },
  description: DESCRIPTION,
  openGraph: {
    ...defaultMetadata.openGraph,
    title: TITLE,
    description: DESCRIPTION,
    url: PAGE_URL,
    images: [OG_IMAGE],
  },
  twitter: { ...defaultMetadata.twitter, title: TITLE, description: DESCRIPTION, images: [OG_IMAGE.url] },
  alternates: { canonical: PAGE_URL },
};

const CRUMBS: Crumb[] = [{ href: "/", label: "Hem" }, { label: "Utförda arbeten" }];

export default function ReferenserPage() {
  const creator = {
    "@type": "GeneralContractor",
    "@id": `${SITE_URL}/#foretag`,
    name: siteContent.footer.companyName,
    url: SITE_URL,
  };

  const jsonLd = [
    breadcrumbJsonLd(CRUMBS, PAGE_URL),
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Utförda arbeten",
      url: PAGE_URL,
      numberOfItems: REFERENSER.length,
      itemListElement: REFERENSER.map((item, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "ImageObject",
          "@id": `${PAGE_URL}#${item.slug}`,
          contentUrl: absoluteUrl(item.image.src),
          name: item.title,
          description: item.description,
          width: item.image.width,
          height: item.image.height,
          creator,
        },
      })),
    },
  ];

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <PageHeader
        title="Utförda arbeten"
        lead="Här är bilder från jobb vi själva har gjort – inga köpta bilder. Några är tagna mitt i arbetet, andra när det var klart."
        crumbs={CRUMBS}
      />

      <section className="bg-sand py-10 md:py-16" aria-label="Bilder från utförda arbeten">
        {/* Spalter i stället för rutnät: liggande och stående bilder behåller sina
            proportioner utan beskärning. Tre spalter ≈ 350 px per bild på desktop. */}
        <ul className="wrap columns-1 gap-x-6 sm:columns-2 lg:columns-3 lg:gap-x-8">
          {REFERENSER.map((item, i) => {
            const service = getServicePage(item.service);
            return (
              <li key={item.slug} id={item.slug} className="mb-8 break-inside-avoid lg:mb-10">
                <article className="overflow-hidden rounded-lg border border-line bg-paper">
                  <Image
                    src={item.image.src}
                    alt={item.alt}
                    width={item.image.width}
                    height={item.image.height}
                    priority={i === 0}
                    loading={i === 0 ? undefined : "lazy"}
                    className="h-auto w-full bg-sand-deep"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 352px"
                  />
                  <div className="p-5 md:p-6">
                    <p className="text-sm font-semibold text-ink-muted">{item.category}</p>
                    <h2 className="mt-1.5 font-display text-xl font-bold leading-tight text-graphite">{item.title}</h2>
                    <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-ink-muted">{item.description}</p>
                    {service ? (
                      <Link
                        href={`/tjanster/${service.slug}`}
                        className="group mt-4 inline-flex items-center gap-1.5 text-[0.9375rem] font-semibold text-brand-strong hover:underline hover:decoration-2 hover:underline-offset-4"
                      >
                        Läs om {service.name.toLowerCase()}
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                      </Link>
                    ) : null}
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </section>

      <CtaBand
        title="Har du ett liknande projekt?"
        subline="Beskriv vad du vill göra i vårt formulär så återkommer vi med en offert. Hembesök i Boden och Luleå är kostnadsfritt."
      />
    </main>
  );
}
