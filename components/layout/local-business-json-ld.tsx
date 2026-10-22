import { unstable_noStore as noStore } from "next/cache";
import { siteContent } from "@/lib/site-content";
import { resolveContactPhoneFromEnv } from "@/lib/contact";
import { SEO_DESCRIPTION, SITE_URL, ogImageUrl } from "@/lib/seo";
import { SERVICE_PAGES } from "@/lib/services-content";
import { LOCATION_PAGES } from "@/lib/locations-content";

/** Visningsnummer om CONTACT_NUMBER saknas vid build (strukturerad data ska inte bli tomt). */
const TELEPHONE_FALLBACK = siteContent.contact.phoneDisplay;

/**
 * Ungefärlig punkt i Boden (närområde centrum) – inte mätvärde för navigation.
 * Uppdatera vid behov om ni vill anknyta närmare fastighet.
 */
const BODEN_APPROX_GEO = {
  "@type": "GeoCoordinates" as const,
  latitude: 65.8251,
  longitude: 21.6889,
};

/**
 * Sociala profiler / kataloger (Google Business Profile, Facebook, Instagram, Hitta, Eniro…).
 * Tom tills Jesper bekräftat adresserna – utelämnas då ur JSON-LD (tomma värden är ogiltiga).
 */
const SAME_AS: string[] = [];

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
  vatID?: string;
  address: PostalAddressLd;
  geo: typeof BODEN_APPROX_GEO;
  areaServed: { "@type": "City" | "AdministrativeArea"; name: string }[];
  sameAs?: string[];
  founder?: { "@type": "Person"; name: string };
  hasOfferCatalog: {
    "@type": "OfferCatalog";
    name: string;
    itemListElement: { "@type": "Offer"; itemOffered: { "@type": "Service"; name: string; url: string } }[];
  };
};

export function LocalBusinessJsonLd() {
  noStore();
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
    telephone: phone?.display ?? TELEPHONE_FALLBACK,
    email: siteContent.contact.email,
    address: postalAddressFromFooterLine(siteContent.footer.address),
    geo: BODEN_APPROX_GEO,
    areaServed: LOCATION_PAGES.map((location) => ({ "@type": location.areaType, name: location.name })),
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

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
