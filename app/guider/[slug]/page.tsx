import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { GUIDES, getGuide, type GuideSection } from "@/lib/guider-content";
import { getServicePage } from "@/lib/services-content";
import { serviceLocationPagesFor } from "@/lib/service-location-content";
import { getLocation } from "@/lib/locations-content";
import { SITE_URL, absoluteUrl, defaultMetadata } from "@/lib/seo";
import { siteContent } from "@/lib/site-content";
import { breadcrumbJsonLd, type Crumb } from "@/components/breadcrumbs";
import { CtaBand } from "@/components/cta-band";
import { SidebarLinks } from "@/components/sidebar-links";
import { SERVICE_IMAGES } from "@/components/service-icon";
import { ServiceReferenser } from "@/components/referenser/service-referenser";
import { ArticleFaq, ArticleHero, ArticleLayout, ArticleUpdated, faqJsonLd } from "@/components/seo-article";

type Props = { params: { slug: string } };

export const dynamicParams = false;

export function generateStaticParams() {
  return GUIDES.map((guide) => ({ slug: guide.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const guide = getGuide(params.slug);
  if (!guide) return {};
  const url = `${SITE_URL}/guider/${guide.slug}`;

  return {
    ...defaultMetadata,
    title: { absolute: guide.metaTitle },
    description: guide.metaDescription,
    openGraph: {
      ...defaultMetadata.openGraph,
      type: "article",
      title: guide.metaTitle,
      description: guide.metaDescription,
      url,
    },
    twitter: {
      ...defaultMetadata.twitter,
      title: guide.metaTitle,
      description: guide.metaDescription,
    },
    alternates: { canonical: url },
  };
}

const PARAGRAPH = "mt-5 text-[1.0625rem] leading-[1.7] text-graphite";
const LIST = "mt-5 space-y-2.5 pl-5 text-[1.0625rem] leading-relaxed text-graphite marker:text-brand";

/** "Det här avgör priset": faktor → varför det spelar roll → vad du kan göra. */
function Factors({ factors }: { factors: NonNullable<GuideSection["factors"]> }) {
  return (
    <ol className="mt-6 divide-y divide-line border-y border-line">
      {factors.map((item) => (
        <li key={item.factor} className="py-6">
          <h3 className="font-display text-lg font-bold leading-snug text-graphite">{item.factor}</h3>
          <dl className="mt-3 grid gap-4 sm:grid-cols-2 sm:gap-5">
            <div className="sm:pt-4">
              <dt className="text-sm font-semibold text-ink-muted">Varför det spelar roll</dt>
              <dd className="mt-1.5 text-[0.9375rem] leading-relaxed text-graphite">{item.why}</dd>
            </div>
            <div className="rounded bg-sand-deep p-4">
              <dt className="text-sm font-semibold text-brand-strong">Det här kan du göra</dt>
              <dd className="mt-1.5 text-[0.9375rem] leading-relaxed text-graphite">{item.todo}</dd>
            </div>
          </dl>
        </li>
      ))}
    </ol>
  );
}

export default function GuidePage({ params }: Props) {
  const guide = getGuide(params.slug);
  if (!guide) notFound();
  const service = getServicePage(guide.service);
  if (!service) notFound();

  const url = `${SITE_URL}/guider/${guide.slug}`;
  const crumbs: Crumb[] = [{ href: "/", label: "Hem" }, { href: "/guider", label: "Guider" }, { label: guide.name }];
  const image = SERVICE_IMAGES[service.iconKey];

  // Tjänstesidan och dess Boden-/Luleå-varianter.
  const serviceLinks = [
    { href: `/tjanster/${service.slug}`, label: service.h1 },
    ...serviceLocationPagesFor(service.slug).map((p) => ({
      href: `/tjanster/${p.service}/${p.location}`,
      label: `${service.name} ${getLocation(p.location)?.inPhrase ?? p.location}`,
    })),
  ];
  const otherGuides = GUIDES.filter((g) => g.slug !== guide.slug);

  const company = {
    "@type": "GeneralContractor",
    "@id": `${SITE_URL}/#foretag`,
    name: siteContent.footer.companyName,
    url: SITE_URL,
  };

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: guide.h1,
      description: guide.metaDescription,
      url,
      mainEntityOfPage: url,
      image: absoluteUrl(image.src),
      datePublished: guide.published,
      dateModified: guide.updated,
      inLanguage: "sv-SE",
      author: company,
      publisher: company,
      about: { "@type": "Service", name: service.name, url: `${SITE_URL}/tjanster/${service.slug}` },
    },
    breadcrumbJsonLd(crumbs, url),
    faqJsonLd(guide.faq),
  ];

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <ArticleHero crumbs={crumbs} h1={guide.h1} lead={guide.lead} image={image} />

      <ArticleLayout
        aside={
          <>
            <SidebarLinks
              id="service-heading"
              heading={service.name}
              links={serviceLinks.map((link, i) => (i === 0 ? { ...link, iconKey: service.iconKey } : { ...link, place: true }))}
            />
            <SidebarLinks
              id="guides-heading"
              heading="Fler guider"
              links={otherGuides.map((g) => ({ href: `/guider/${g.slug}`, label: g.name, iconKey: getServicePage(g.service)?.iconKey }))}
            />
          </>
        }
      >
        <section aria-labelledby="kort-svar" className="rounded-lg border border-line border-l-4 border-l-brand bg-paper p-6 md:p-8">
          <h2 id="kort-svar" className="font-display text-base font-bold text-brand-strong">
            Kort svar
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-graphite">{guide.shortAnswer}</p>
        </section>

        <nav aria-labelledby="toc-heading">
          <h2 id="toc-heading" className="font-display text-base font-bold text-graphite">
            På den här sidan
          </h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {[...guide.sections.map((s) => ({ id: s.id, heading: s.heading })), { id: "faq-heading", heading: "Vanliga frågor" }].map(
              (item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="inline-flex min-h-10 items-center rounded-full border border-line-strong bg-paper px-4 py-1.5 text-sm font-semibold text-graphite transition-colors hover:border-brand-strong hover:text-brand-strong"
                  >
                    {item.heading}
                  </a>
                </li>
              )
            )}
          </ul>
        </nav>

        {guide.sections.map((section) => (
          <section key={section.id} aria-labelledby={section.id}>
            <h2 id={section.id} className="display scroll-mt-[calc(var(--header-h)+1rem)] text-display-sm text-graphite">
              {section.heading}
            </h2>
            {section.paragraphs.map((text, i) => (
              <p key={i} className={PARAGRAPH}>
                {text}
              </p>
            ))}
            {section.factors ? <Factors factors={section.factors} /> : null}
            {section.list ? (
              <ul className={LIST}>
                {section.list.map((item) => (
                  <li key={item} className="list-disc pl-1">
                    {item}
                  </li>
                ))}
              </ul>
            ) : null}
            {(section.after ?? []).map((text, i) => (
              <p key={i} className={PARAGRAPH}>
                {text}
              </p>
            ))}
          </section>
        ))}

        <section aria-labelledby="las-mer">
          <h2 id="las-mer" className="display text-display-sm text-graphite">
            Läs mer
          </h2>
          <ul className={LIST}>
            {serviceLinks.map((link) => (
              <li key={link.href} className="list-disc pl-1">
                <Link href={link.href} className="link">
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="list-disc pl-1">
              <Link href="/referenser" className="link">
                Utförda arbeten
              </Link>{" "}
              – bilder från jobb vi har gjort
            </li>
          </ul>
          <p className="mt-6">
            <Link href="/offert" className="link inline-flex items-center gap-1.5">
              Begär offert på ditt projekt
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </p>
        </section>

        <ServiceReferenser slug={service.slug} />

        <ArticleFaq heading="Vanliga frågor om priset" faq={guide.faq} />

        <ArticleUpdated iso={guide.updated} />
      </ArticleLayout>

      <CtaBand
        title="Vill du ha ett pris som håller?"
        subline="Skicka bilder och mått via vårt formulär så återkommer vi. Hembesök i Boden och Luleå är kostnadsfritt, och offerten är utan förpliktelser."
        buttonText="Begär offert"
      />
    </main>
  );
}
