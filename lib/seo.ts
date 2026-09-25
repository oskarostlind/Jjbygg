import type { Metadata } from "next";
import { siteContent } from "@/lib/site-content";

/**
 * Kanonisk adress. Hårdkodad med avsikt: apex (jjbyggboden.se) redirectar till www,
 * och canonical/sitemap får aldrig peka på en adress som redirectar.
 * Ändra bara här om primärdomänen i Vercel byts.
 */
export const SITE_URL = "https://www.jjbyggboden.se";

/** Delningsbild 1200×630 för Open Graph / Twitter. */
export const OG_IMAGE_PATH = "/og-image.jpg";

export const SEO_TITLE = siteContent.meta.title;

/** Samma som siteContent.meta.description (single source of truth). */
export const SEO_DESCRIPTION = siteContent.meta.description;

const SEO_KEYWORDS: string[] = [
  "JJ Bygg & Entreprenad AB",
  "byggfirma Boden",
  "byggfirma Luleå",
  "byggföretag Boden",
  "byggföretag Luleå",
  "Boden",
  "Luleå",
  "Norrbotten",
  "nybyggnation",
  "nybyggnad",
  "renovering",
  "tillbyggnad",
  "altan",
  "takbyte",
  "badrumsrenovering",
  "köksrenovering",
  "ROT-avdrag",
  "entreprenad",
  "totalentreprenad",
  "kostnadsfri offert",
  "bygg",
];

export function absoluteUrl(path: string): string {
  return new URL(path, SITE_URL).toString();
}

export const ogImageUrl = absoluteUrl(OG_IMAGE_PATH);

export const defaultMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SEO_TITLE,
  description: SEO_DESCRIPTION,
  keywords: SEO_KEYWORDS,
  robots: { index: true, follow: true },
  openGraph: {
    title: SEO_TITLE,
    description: SEO_DESCRIPTION,
    url: SITE_URL,
    siteName: siteContent.footer.companyName,
    type: "website",
    locale: "sv_SE",
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: "JJ Bygg & Entreprenad AB – bygg och entreprenad i Boden och Luleå",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SEO_TITLE,
    description: SEO_DESCRIPTION,
    images: [ogImageUrl],
  },
  alternates: {
    canonical: SITE_URL,
  },
};
