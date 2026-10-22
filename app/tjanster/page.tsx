import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SERVICE_PAGES } from "@/lib/services-content";
import { SITE_URL, defaultMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/page-header";
import { ServiceIcon, SERVICE_IMAGES } from "@/components/service-icon";
import { CtaBand } from "@/components/cta-band";

const TITLE = "Tjänster – bygg & renovering i Boden och Luleå | JJ Bygg";
const DESCRIPTION =
  "Nybyggnation, renovering, badrum, altaner, takbyten och totalentreprenad i Boden och Luleå. Se vad JJ Bygg & Entreprenad AB kan hjälpa dig med.";

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

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <PageHeader
        title={"Bygg- och renoverings\u00ADtjänster i Boden och Luleå"}
        lead="Från en ny altan till en hel tillbyggnad. Välj tjänst nedan och läs mer om hur vi arbetar, vad som påverkar priset och vad du behöver tänka på."
        crumbs={[{ href: "/", label: "Hem" }, { label: "Tjänster" }]}
      />

      <section className="bg-sand py-4 md:py-8" aria-label="Våra tjänster">
        <ul className="wrap divide-y divide-line">
          {SERVICE_PAGES.map((page) => {
            const image = SERVICE_IMAGES[page.iconKey];
            return (
              <li key={page.slug} className="group relative grid gap-6 py-8 md:grid-cols-12 md:items-center md:gap-10 md:py-10">
                <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-sand-deep md:col-span-5 md:aspect-[4/3] lg:col-span-4">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                </div>
                <div className="md:col-span-7 lg:col-span-8">
                  <div className="flex items-start gap-4">
                    <ServiceIcon iconKey={page.iconKey} size="sm" className="hidden sm:flex" />
                    <div className="min-w-0">
                      <h2 className="font-display text-display-sm font-bold text-graphite">
                        <Link
                          href={`/tjanster/${page.slug}`}
                          className="after:absolute after:inset-0 after:content-[''] group-hover:text-brand-strong focus-visible:outline-none focus-visible:underline"
                        >
                          {page.name}
                        </Link>
                      </h2>
                      <p className="mt-3 max-w-prose text-[1.0625rem] leading-relaxed text-ink-muted">{page.lead}</p>
                      <span className="mt-5 inline-flex items-center gap-1.5 font-semibold text-brand-strong" aria-hidden>
                        Läs om {page.name.toLowerCase()}
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      <CtaBand
        title="Osäker på vilken tjänst du behöver?"
        subline="Beskriv vad du vill göra så hjälper vi dig att hitta rätt upplägg. Offert och hembesök i Boden och Luleå är kostnadsfritt."
      />
    </main>
  );
}
