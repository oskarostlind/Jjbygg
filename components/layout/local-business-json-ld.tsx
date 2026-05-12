import { unstable_noStore as noStore } from "next/cache";
import { siteContent } from "@/lib/site-content";
import { resolveContactPhoneFromEnv } from "@/lib/contact";
import { SEO_DESCRIPTION, SITE_URL } from "@/lib/seo";

/** Visningsnummer om CONTACT_NUMBER saknas vid build (strukturerad data ska inte bli tomt). */
const TELEPHONE_FALLBACK = "070-535 71 94";

/**
 * Ungefärlig punkt i Boden (närområde centrum) – inte mätvärde för navigation.
 * Uppdatera vid behov om ni vill anknyta närmare fastighet.
 */
const BODEN_APPROX_GEO = {
  "@type": "GeoCoordinates" as const,
  latitude: 65.8251,
  longitude: 21.6889,
};

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
  "@type": "LocalBusiness";
  name: string;
  url: string;
  description: string;
  image: string[];
  telephone: string;
  address: PostalAddressLd;
  geo: typeof BODEN_APPROX_GEO;
  areaServed: string[];
};

export function LocalBusinessJsonLd() {
  noStore();
  const phone = resolveContactPhoneFromEnv();
  const logoUrl = new URL(siteContent.logo.primary, SITE_URL).toString();

  const data: LocalBusinessLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteContent.footer.companyName,
    url: SITE_URL,
    description: SEO_DESCRIPTION,
    image: [logoUrl],
    telephone: phone?.display ?? TELEPHONE_FALLBACK,
    address: postalAddressFromFooterLine(siteContent.footer.address),
    geo: BODEN_APPROX_GEO,
    areaServed: ["Boden", "Luleå", "Älvsbyn"],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
