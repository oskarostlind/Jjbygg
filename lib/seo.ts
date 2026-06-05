import type { Metadata } from "next";
import { siteContent } from "@/lib/site-content";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://placeholder-jj-entreprenad.se";

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

function absoluteUrl(path: string): string {
  return new URL(path, SITE_URL).toString();
}

const ogImageUrl = absoluteUrl(siteContent.logo.primary);

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
        width: 320,
        height: 265,
        alt: siteContent.logo.imageAlt,
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
