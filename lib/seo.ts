import type { Metadata } from "next";
import { siteContent } from "@/lib/site-content";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://placeholder-jj-entreprenad.se";

export const SEO_TITLE = "JJ Bygg & Entreprenad AB | Professionell byggfirma i Boden";

export const SEO_DESCRIPTION =
  "JJ Bygg & Entreprenad AB hjälper dig med nybyggnad, renovering och tillbyggnad i Boden med omnejd. Kvalitet, transparens och lokalt engagemang.";

const SEO_KEYWORDS: string[] = [
  "JJ Bygg & Entreprenad AB",
  "byggfirma Boden",
  "byggföretag Boden",
  "Boden",
  "Luleå",
  "Älvsbyn",
  "nybyggnad",
  "renovering",
  "tillbyggnad",
  "badrumsrenovering",
  "köksrenovering",
  "ROT-avdrag",
  "entreprenad",
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
        width: 1792,
        height: 1487,
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
