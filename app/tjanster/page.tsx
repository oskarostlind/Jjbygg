import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { SERVICE_GROUPS, SERVICE_PAGES, type ServicePage } from "@/lib/services-content";
import { serviceLocationPagesFor } from "@/lib/service-location-content";
import { getLocation } from "@/lib/locations-content";
import { SITE_URL, defaultMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/page-header";
import { ServiceGlyph, SERVICE_CARD_PHOTOS } from "@/components/service-icon";
import { CtaBand } from "@/components/cta-band";
import { serviceCardImage } from "@/lib/referenser-content";

const TITLE = "Tjänster – bygg & renovering i Boden och Luleå | JJ Bygg";
const DESCRIPTION =
  "Nybyggnation, renovering, kök, badrum, golv, fönster, fasad, tak, altan och garage i Boden och Luleå. Se allt JJ Bygg & Entreprenad AB hjälper till med.";

export const metadata: Metadata = {
  ...defaultMetadata,
  title: { absolute: TITLE },
  description: DESCRIPTION,
  openGraph: {
    ...defaultMetadata.openGraph,
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/tjanster`,
  },
  twitter: { ...defaultMetadata.twitter, title: TITLE, description: DESCRIPTION },
  alternates: { canonical: `${SITE_URL}/tjanster` },
};

export default function TjansterPage() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Hem", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Tjänster", item: `${SITE_URL}/tjanster` },
    ],
  };

  // Tjänster som saknas i SERVICE_GROUPS hamnar sist i en egen grupp, så att ingen sida tappas bort.
  const grouped = new Set(SERVICE_GROUPS.flatMap((group) => group.slugs));
  const ungrouped = SERVICE_PAGES.filter((page) => !grouped.has(page.slug));
  const groups = [
    ...SERVICE_GROUPS.map((group) => ({
      id: group.id,
      title: group.title,
      intro: group.intro,
      pages: group.slugs
        .map((slug) => SERVICE_PAGES.find((page) => page.slug === slug))
        .filter((page): page is ServicePage => Boolean(page)),
    })),
    ...(ungrouped.length > 0
      ? [{ id: "fler-tjanster", title: "Fler tjänster", intro: "", pages: ungrouped }]
      : []),
  ];

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <PageHeader
        title={"Bygg- och renoverings\u00ADtjänster i Boden och Luleå"}
        lead="Vi gör det mesta inom bygg – från en ny innerdörr till ett helt hus. Välj tjänst nedan och läs om hur arbetet går till, vad som påverkar priset och vad du behöver tänka på."
        crumbs={[{ href: "/", label: "Hem" }, { label: "Tjänster" }]}
      />

      <div className="bg-sand">
        <nav className="wrap pt-8 md:pt-10" aria-label="Hoppa till tjänstegrupp">
          <ul className="flex flex-wrap gap-2">
            {groups.map((group) => (
              <li key={group.id}>
                <a
                  href={`#${group.id}`}
                  className="inline-flex h-10 items-center rounded-full border border-line-strong bg-paper px-4 text-sm font-semibold text-graphite transition-colors hover:border-brand-strong hover:text-brand-strong"
                >
                  {group.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {groups.map((group) => (
          <section
            key={group.id}
            id={group.id}
            className="wrap scroll-mt-[calc(var(--header-h)+1rem)] border-b border-line py-10 last:border-b-0 md:py-14"
            aria-labelledby={`${group.id}-heading`}
          >
            <span className="mb-4 block h-1 w-12 rounded-sm bg-brand" aria-hidden />
            <h2 id={`${group.id}-heading`} className="display text-display-md text-graphite">
              {group.title}
            </h2>
            <p className="mt-3 max-w-prose text-lg leading-relaxed text-ink-muted">{group.intro}</p>

            <ul className="mt-8 grid gap-5 lg:grid-cols-2">
              {group.pages.map((page) => {
                const image = serviceCardImage(page.slug) ?? SERVICE_CARD_PHOTOS[page.iconKey];
                const local = serviceLocationPagesFor(page.slug);
                return (
                  <li
                    key={page.slug}
                    className="group relative flex gap-4 rounded-lg border border-line bg-paper p-4 transition-colors hover:border-line-strong sm:gap-5 sm:p-5"
                  >
                    {/* Egen bild eller stockfoto där det finns, annars tjänstens ikon i samma ruta. */}
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded bg-sand-deep sm:h-28 sm:w-28">
                      {image ? (
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                          sizes="(max-width: 640px) 80px, 112px"
                        />
                      ) : (
                        <span className="flex h-full w-full items-center justify-center text-brand-strong" aria-hidden>
                          <ServiceGlyph iconKey={page.iconKey} className="h-9 w-9 sm:h-11 sm:w-11" />
                        </span>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="font-display text-xl font-bold leading-tight text-graphite">
                        <Link
                          href={`/tjanster/${page.slug}`}
                          className="after:absolute after:inset-0 after:content-[''] group-hover:text-brand-strong focus-visible:outline-none focus-visible:underline"
                        >
                          {page.name}
                        </Link>
                      </h3>
                      <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-muted">{page.lead}</p>
                      <span
                        className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-strong"
                        aria-hidden
                      >
                        Läs om {page.name.toLowerCase()}
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </span>
                      {/* Ortvarianter (bara de sex ursprungliga tjänsterna) – ovanpå kortets heltäckande länk (z-10). */}
                      {local.length > 0 ? (
                        <ul className="relative z-10 mt-4 flex flex-wrap gap-2" aria-label={`${page.name} på din ort`}>
                          {local.map((variant) => (
                            <li key={variant.location}>
                              <Link
                                href={`/tjanster/${variant.service}/${variant.location}`}
                                className="inline-flex h-9 items-center gap-1.5 rounded-full border border-line-strong bg-paper px-3 text-sm font-semibold text-graphite transition-colors hover:border-brand-strong hover:text-brand-strong"
                              >
                                <MapPin className="h-3.5 w-3.5 text-brand-strong" aria-hidden />
                                {getLocation(variant.location)?.name ?? variant.location}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>

      <CtaBand
        title="Osäker på vilken tjänst du behöver?"
        subline="Beskriv vad du vill göra så hjälper vi dig att hitta rätt upplägg. Offert och hembesök i Boden och Luleå är kostnadsfritt."
      />
    </main>
  );
}
