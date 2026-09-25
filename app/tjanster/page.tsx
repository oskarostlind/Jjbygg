import type { Metadata } from "next";
import Link from "next/link";
import { SERVICE_PAGES } from "@/lib/services-content";
import { SITE_URL, defaultMetadata } from "@/lib/seo";
import { Button } from "@/components/ui/button";

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
      <section className="border-b border-primary/10 bg-primary py-14 md:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-primary-foreground md:text-4xl">
            Bygg- och renoveringstjänster i Boden och Luleå
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-primary-foreground/90">
            Från en ny altan till en hel tillbyggnad. Välj tjänst nedan och läs mer om hur vi arbetar,
            vad som påverkar priset och vad du behöver tänka på.
          </p>
        </div>
      </section>

      <section className="bg-background py-12 md:py-16">
        <ul className="mx-auto grid max-w-5xl gap-4 px-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICE_PAGES.map((page) => (
            <li key={page.slug}>
              <Link
                href={`/tjanster/${page.slug}`}
                className="flex h-full flex-col rounded-lg border border-primary/20 bg-card p-6 shadow-sm transition hover:border-accent hover:shadow-md"
              >
                <h2 className="text-lg font-semibold text-foreground">{page.name}</h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{page.lead}</p>
                <span className="mt-4 text-sm font-medium text-accent">Läs mer →</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-12 text-center">
          <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="/offert">Begär en offert</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
