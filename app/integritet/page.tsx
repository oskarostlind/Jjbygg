import type { Metadata } from "next";
import Link from "next/link";
import { siteContent } from "@/lib/site-content";
import { SITE_URL, defaultMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/page-header";

const TITLE = "Integritetspolicy";
const DESCRIPTION =
  "Så behandlar JJ Bygg & Entreprenad AB dina personuppgifter när du skickar en offertförfrågan: vilka uppgifter, varför, hur länge och dina rättigheter.";

/** Uppdatera när policyn ändras. */
const UPDATED = "2026-10-22";

export const metadata: Metadata = {
  ...defaultMetadata,
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    ...defaultMetadata.openGraph,
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/integritet`,
  },
  twitter: { ...defaultMetadata.twitter, title: TITLE, description: DESCRIPTION },
  alternates: { canonical: `${SITE_URL}/integritet` },
};

const { footer, contact } = siteContent;

const sections: { heading: string; paragraphs: string[]; list?: string[] }[] = [
  {
    heading: "Personuppgiftsansvarig",
    paragraphs: [
      `${footer.companyName}, org.nr ${footer.orgNumber}, ${footer.address}, är personuppgiftsansvarig för de uppgifter som samlas in via den här webbplatsen. Har du frågor om hur vi hanterar dina uppgifter når du oss på ${contact.email}.`,
    ],
  },
  {
    heading: "Vilka uppgifter vi samlar in",
    paragraphs: ["När du skickar en offertförfrågan sparar vi det du fyller i formuläret:"],
    list: [
      "Namn, e-postadress och telefonnummer",
      "Om du är privatperson eller företag",
      "Beskrivning av projektet, typ av jobb, önskat startdatum, ungefärlig budget och om du vill använda ROT-avdrag",
      "Postnummer och eventuella bilder du bifogar",
      "Varifrån du kom till sidan (t.ex. sökmotor eller annons) och en anonymiserad (hashad) version av din IP-adress som bara används för att stoppa spam",
    ],
  },
  {
    heading: "Varför vi behandlar uppgifterna",
    paragraphs: [
      "Uppgifterna används för att hantera din förfrågan: bedöma projektet, kontakta dig, lämna offert och vid uppdrag genomföra arbetet. Den rättsliga grunden är att behandlingen är nödvändig för att vidta åtgärder på din begäran innan ett avtal ingås, samt vårt berättigade intresse av att skydda formuläret mot missbruk.",
      "Vi använder inte dina uppgifter för marknadsföring och säljer dem aldrig vidare.",
    ],
  },
  {
    heading: "Var uppgifterna lagras och hur länge",
    paragraphs: [
      "Din förfrågan sparas i vår egen databas och i det ärendesystem (sitecms) vi använder för att hantera förfrågningar. Bilder som du bifogar lagras hos vår driftleverantör. I ärendesystemet raderas förfrågningar automatiskt efter 12 månader; i vår egen databas sparar vi dem i 12 månader, eller så länge som krävs för att hantera ett pågående uppdrag.",
      "Du får en bekräftelse per e-post när förfrågan skickats, och vi får en kopia så att vi kan återkomma till dig.",
    ],
  },
  {
    heading: "Vilka som tar del av uppgifterna",
    paragraphs: [
      "Uppgifterna hanteras av oss och av de leverantörer som driver webbplatsen, databasen, e-postutskicken och ärendesystemet. Leverantörerna behandlar uppgifterna bara på vårt uppdrag och enligt våra instruktioner.",
    ],
  },
  {
    heading: "Dina rättigheter",
    paragraphs: [
      `Du har rätt att få veta vilka uppgifter vi har om dig, få dem rättade eller raderade, och att invända mot behandlingen. Vill du att vi raderar din förfrågan mejlar du ${contact.email}, så tar vi bort den ur våra system. Du kan också lämna klagomål till Integritetsskyddsmyndigheten (IMY).`,
    ],
  },
];

export default function IntegritetPage() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Hem", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: TITLE, item: `${SITE_URL}/integritet` },
    ],
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <PageHeader
        title={TITLE}
        lead="Kort och sakligt om vilka uppgifter vi sparar när du begär offert, varför vi gör det och hur du får dem raderade."
        crumbs={[{ href: "/", label: "Hem" }, { label: TITLE }]}
      />

      <div className="wrap py-12 md:py-16">
        <article className="max-w-prose space-y-12">
          {sections.map((section) => (
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

          <p className="text-sm text-ink-muted">
            Senast uppdaterad <time dateTime={UPDATED}>{UPDATED}</time>.{" "}
            <Link href="/offert" className="font-semibold text-brand-strong underline-offset-2 hover:underline">
              Till offertformuläret
            </Link>
          </p>
        </article>
      </div>
    </main>
  );
}
