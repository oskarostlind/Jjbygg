import { siteContent } from "@/lib/site-content";
import { resolveContactPhoneFromEnv } from "@/lib/contact";
import { SEO_DESCRIPTION, SITE_URL, ogImageUrl } from "@/lib/seo";
import { SERVICE_PAGES } from "@/lib/services-content";
import { LOCATIONS, areaServedLd } from "@/lib/locations-content";

/** Internationellt format (+46…) om CONTACT_NUMBER saknas vid build (strukturerad data ska inte bli tomt). */
const TELEPHONE_FALLBACK = siteContent.contact.phoneTelDigits;

/** Koordinater för adressen Kallkällvägen 16 c, 961 96 Boden. */
const ADDRESS_GEO = {
  "@type": "GeoCoordinates" as const,
  latitude: 65.8593,
  longitude: 21.5864,
};

/**
 * Sociala profiler / kataloger (Google Business Profile, Facebook, Instagram, Hitta, Eniro…).
 * Tom tills Jesper bekräftat adresserna – utelämnas då ur JSON-LD (tomma värden är ogiltiga).
 */
const SAME_AS: string[] = ["https://g.page/r/CZf0jOWtak9zEBM"];

/**
 * Öppettider läggs bara till om de finns i site-content/CMS. Finns inte i dag,
 * därför ingen openingHoursSpecification (påhittade tider är värre än inga).
 */

type PostalAddressLd = {
  "@type": "PostalAddress";
  streetAddress: string;
  postalCode: string;
  addressLocality: string;
  addressCountry: string;
};

function postalAddressFromFooterLine(line: string): PostalAddressLd {
  const match = line.match(/^(.*),\s*(\d{3}\s*\d{2})\s+(.+)$/);
  if (!match) {
    return {
      "@type": "PostalAddress",
      streetAddress: line,
      postalCode: "",
      addressLocality: "Boden",
      addressCountry: "SE",
    };
  }
  return {
    "@type": "PostalAddress",
    streetAddress: match[1].trim(),
    postalCode: match[2].replace(/\s+/g, " ").trim(),
    addressLocality: match[3].trim(),
    addressCountry: "SE",
  };
}

type LocalBusinessLd = {
  "@context": "https://schema.org";
  "@type": "GeneralContractor";
  "@id": string;
  name: string;
  legalName: string;
  url: string;
  description: string;
  logo: string;
  image: string[];
  telephone: string;
  email: string;
  /** Organisationsnummer. */
  taxID: string;
  identifier: { "@type": "PropertyValue"; propertyID: string; value: string };
  foundingDate: string;
  address: PostalAddressLd;
  geo: typeof ADDRESS_GEO;
  areaServed: ReturnType<typeof areaServedLd>[];
  sameAs?: string[];
  founder?: { "@type": "Person"; name: string };
  hasOfferCatalog: {
    "@type": "OfferCatalog";
    name: string;
    itemListElement: { "@type": "Offer"; itemOffered: { "@type": "Service"; name: string; url: string } }[];
  };
};

export function LocalBusinessJsonLd() {
  const phone = resolveContactPhoneFromEnv();
  const logoUrl = new URL(siteContent.logo.primary, SITE_URL).toString();

  const data: LocalBusinessLd = {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    "@id": `${SITE_URL}/#foretag`,
    name: siteContent.footer.companyName,
    legalName: siteContent.footer.companyName,
    url: SITE_URL,
    description: SEO_DESCRIPTION,
    logo: logoUrl,
    image: [ogImageUrl, logoUrl],
    telephone: phone?.telDigits ?? TELEPHONE_FALLBACK,
    email: siteContent.contact.email,
    taxID: siteContent.footer.orgNumber,
    identifier: {
      "@type": "PropertyValue",
      propertyID: "Organisationsnummer",
      value: siteContent.footer.orgNumber,
    },
    foundingDate: siteContent.company.foundingYear,
    address: postalAddressFromFooterLine(siteContent.footer.address),
    geo: ADDRESS_GEO,
    areaServed: LOCATIONS.map(areaServedLd),
    ...(SAME_AS.length > 0 ? { sameAs: SAME_AS } : {}),
    founder: { "@type": "Person", name: siteContent.contact.personName },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Bygg- och entreprenadtjänster",
      itemListElement: SERVICE_PAGES.map((page) => ({
        "@type": "Offer" as const,
        itemOffered: {
          "@type": "Service" as const,
          name: page.name,
          url: `${SITE_URL}/tjanster/${page.slug}`,
        },
      })),
    },
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#webbplats`,
    url: SITE_URL,
    name: siteContent.footer.companyName,
    alternateName: "JJ Bygg",
    inLanguage: "sv-SE",
    publisher: { "@id": `${SITE_URL}/#foretag` },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify([data, website]) }}
    />
  );
}
