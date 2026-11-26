import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SERVICE_GROUPS, getServicePage, type ServicePage } from "@/lib/services-content";
import { getReferens, type Referens } from "@/lib/referenser-content";
import { locationHref } from "@/lib/locations-content";
import { SITE_URL, defaultMetadata } from "@/lib/seo";
import { siteContent } from "@/lib/site-content";
import { PageHeader } from "@/components/page-header";
import { breadcrumbJsonLd, type Crumb } from "@/components/breadcrumbs";
import { CtaBand } from "@/components/cta-band";
import { ArticleLayout } from "@/components/seo-article";

const PAGE_URL = `${SITE_URL}/om-oss`;
const TITLE = "Om oss – byggföretag i Boden sedan 2010 | JJ Bygg";
const DESCRIPTION =
  "JJ Bygg & Entreprenad AB är ett byggföretag i Boden, registrerat 2010 och godkänt för F-skatt. Du har en kontaktperson, Jesper Johansson, hela vägen.";

export const metadata: Metadata = {
  ...defaultMetadata,
  title: { absolute: TITLE },
  description: DESCRIPTION,
  openGraph: { ...defaultMetadata.openGraph, title: TITLE, description: DESCRIPTION, url: PAGE_URL },
  twitter: { ...defaultMetadata.twitter, title: TITLE, description: DESCRIPTION },
  alternates: { canonical: PAGE_URL },
};

const CRUMBS: Crumb[] = [{ href: "/", label: "Hem" }, { label: "Om oss" }];

/** Tre egna bilder ur public/referenser – olika typer av jobb. */
const IMAGE_SLUGS = ["badrum-dusch-kommod", "altan-sjonara-hus", "golv-fiskbensmonster-hall"];

const PARAGRAPH = "mt-5 text-[1.0625rem] leading-[1.7] text-graphite";
const H2 = "display text-display-sm text-graphite";

/** Faktaruta i sidopanelen – bara uppgifter som går att kontrollera (Bolagsverket, Skatteverket). */
function FactBox() {
  const { footer, contact, company } = siteContent;
  const rows: { label: string; value: React.ReactNode }[] = [
    { label: "Företag", value: footer.companyName },
    { label: "Org.nr", value: footer.orgNumber },
    { label: "Registrerat", value: company.foundingYear },
    { label: "Skatt", value: company.taxStatus },
    { label: "Kontaktperson", value: contact.personName },
    {
      label: "Telefon",
      value: (
        <a href={`tel:${contact.phoneTelDigits}`} className="link">
          {contact.phoneDisplay}
        </a>
      ),
    },
    {
      label: "E-post",
      value: (
        <a href={`mailto:${contact.email}`} className="link break-all">
          {contact.email}
        </a>
      ),
    },
    { label: "Adress", value: <address className="not-italic">{contact.address}</address> },
  ];

  return (
    <section aria-labelledby="facts-heading" className="rounded-lg border border-line bg-paper p-6">
      <h2 id="facts-heading" className="font-display text-base font-bold text-graphite">
        Fakta om företaget
      </h2>
      <dl className="mt-3 divide-y divide-line text-[0.9375rem]">
        {rows.map((row) => (
          <div key={row.label} className="grid grid-cols-[7.5rem_1fr] gap-3 py-2.5">
            <dt className="text-ink-muted">{row.label}</dt>
            <dd className="font-medium text-graphite">{row.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export default function AboutPage() {
  const { process } = siteContent.homePage;
  const images = IMAGE_SLUGS.map(getReferens).filter((r): r is Referens => Boolean(r));
  const groups = SERVICE_GROUPS.map((group) => ({
    ...group,
    pages: group.slugs.map(getServicePage).filter((p): p is ServicePage => Boolean(p)),
  }));

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "@id": `${PAGE_URL}#sida`,
      url: PAGE_URL,
      name: TITLE,
      description: DESCRIPTION,
      inLanguage: "sv-SE",
      isPartOf: { "@id": `${SITE_URL}/#webbplats` },
      about: { "@id": `${SITE_URL}/#foretag` },
      mainEntity: { "@id": `${SITE_URL}/#foretag` },
    },
    breadcrumbJsonLd(CRUMBS, PAGE_URL),
  ];

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <PageHeader
        title="Om JJ Bygg & Entreprenad"
        lead="Vi är ett byggföretag i Boden. Vi renoverar, bygger till och bygger nytt åt privatpersoner, företag och föreningar i Boden, Luleå och övriga Norrbotten."
        crumbs={CRUMBS}
      />

      <ArticleLayout aside={<FactBox />}>
        <section>
          <h2 className={H2}>Ett lokalt byggföretag i Boden</h2>
          <p className={PARAGRAPH}>
            JJ Bygg & Entreprenad AB registrerades 2010 och har sin bas på Kallkällvägen i Boden. Företaget är godkänt
            för F-skatt. Det betyder att vi själva betalar skatt och avgifter för vårt arbete, och att du som beställare
            inte behöver göra det.
          </p>
          <p className={PARAGRAPH}>
            Vi gör det mesta inom bygg, från ett nytt badrum eller golv till tillbyggnader, garage och hela hus. Jobben
            finns i första hand i Boden och Luleå, men vi tar också uppdrag längre bort i länet.
          </p>
        </section>

        <section>
          <h2 className={H2}>En och samma kontaktperson</h2>
          <p className={PARAGRAPH}>
            {siteContent.contact.personName} äger företaget och är den du pratar med, från första samtalet till
            genomgången när jobbet är klart. Det är han som kommer ut på hembesöket, skriver offerten och håller i
            arbetet. Du behöver inte förklara samma sak för flera personer, och du vet vem du ska ringa om något dyker
            upp.
          </p>
          <p className={PARAGRAPH}>
            Behövs rörmokare, elektriker eller andra yrkesgrupper samordnar vi dem, så att du fortfarande har en kontakt
            för hela projektet.
          </p>
        </section>

        <section>
          <h2 className={H2}>Vem vi bygger åt och var</h2>
          <p className={PARAGRAPH}>
            Vi bygger åt privatpersoner, företag och föreningar – villaägare som vill renovera, familjer som behöver mer
            plats, fritidshusägare och mindre fastighetsägare.
          </p>
          <p className={PARAGRAPH}>
            De flesta uppdragen finns i{" "}
            <Link href={locationHref("boden")} className="link">
              Boden
            </Link>
            ,{" "}
            <Link href={locationHref("savast")} className="link">
              Sävast
            </Link>{" "}
            och{" "}
            <Link href={locationHref("lulea")} className="link">
              Luleå
            </Link>
            . Vi tar också jobb i{" "}
            <Link href={locationHref("norrbotten")} className="link">
              övriga Norrbotten
            </Link>
            , till exempel i Älvsbyn, Kalix, Piteå och Jokkmokk, när projektet passar.
          </p>
        </section>

        <section aria-labelledby="process-heading">
          <h2 id="process-heading" className={H2}>
            Så arbetar vi
          </h2>
          <p className={PARAGRAPH}>
            Arbetet går till på samma sätt oavsett om det gäller ett badrum eller en tillbyggnad. Vi svarar på
            förfrågningar inom 1–2 vardagar.
          </p>
          <ol className="mt-6 space-y-5">
            {process.map((step, i) => (
              <li key={step.title} className="flex gap-4">
                <span
                  className="display flex h-10 w-10 shrink-0 items-center justify-center rounded bg-sand-deep text-lg text-brand-strong"
                  aria-hidden
                >
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-display text-lg font-bold leading-tight text-graphite">
                    <span className="sr-only">Steg {i + 1}: </span>
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-[1.0625rem] leading-[1.7] text-graphite">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className={PARAGRAPH}>
            ROT-avdraget – 30 procent av arbetskostnaden, högst 50 000 kronor per person och år – drar vi direkt på
            fakturan. Du betalar alltså bara din del, och vi begär resten från Skatteverket.
          </p>
        </section>

        <section aria-labelledby="services-heading">
          <h2 id="services-heading" className={H2}>
            Vad vi gör
          </h2>
          <p className={PARAGRAPH}>
            Här är tjänsterna i fyra grupper. På varje sida står hur arbetet går till och vad som påverkar priset. Alla
            tjänster finns också samlade under{" "}
            <Link href="/tjanster" className="link">
              Tjänster
            </Link>
            .
          </p>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {groups.map((group) => (
              <div key={group.id}>
                <h3 className="font-display text-lg font-bold text-graphite">
                  <Link href={`/tjanster#${group.id}`} className="transition-colors hover:text-brand-strong">
                    {group.title}
                  </Link>
                </h3>
                <ul className="mt-2 space-y-1.5 text-[0.9375rem]">
                  {group.pages.map((page) => (
                    <li key={page.slug}>
                      <Link href={`/tjanster/${page.slug}`} className="link">
                        {page.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {images.length > 0 ? (
          <section aria-labelledby="jobs-heading">
            <h2 id="jobs-heading" className={H2}>
              Från våra jobb
            </h2>
            <p className={PARAGRAPH}>Bilderna är från jobb vi själva har gjort.</p>
            <ul className="mt-6 grid grid-cols-3 gap-3 sm:gap-4">
              {images.map((item) => (
                <li key={item.slug}>
                  <Link href={`/referenser#${item.slug}`} className="group block">
                    <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-sand-deep">
                      <Image
                        src={item.image.src}
                        alt={item.alt}
                        fill
                        loading="lazy"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        sizes="(max-width: 640px) 33vw, 220px"
                      />
                    </div>
                    <span className="mt-2 block text-sm font-semibold text-graphite group-hover:text-brand-strong">
                      {item.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-6">
              <Link href="/referenser" className="link inline-flex items-center gap-1.5">
                Se alla utförda arbeten
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </p>
          </section>
        ) : null}
      </ArticleLayout>

      <CtaBand
        title="Vill du veta vad ditt projekt kostar?"
        subline="Beskriv vad du vill göra i formuläret eller ring Jesper. Hembesöket och offerten är kostnadsfria och utan förpliktelser."
      />
    </main>
  );
}
