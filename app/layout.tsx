import type { Metadata } from "next";
import { siteContent } from "@/lib/site-content";
import "./globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://placeholder-jj-entreprenad.se";

export const metadata: Metadata = {
  title: siteContent.meta.title,
  description: siteContent.meta.description,
  keywords: siteContent.meta.keywords,
  openGraph: {
    title: siteContent.meta.title,
    description: siteContent.meta.description,
    url: SITE_URL,
    siteName: siteContent.footer.companyName,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteContent.meta.title,
    description: siteContent.meta.description,
  },
  alternates: {
    canonical: SITE_URL,
  },
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: siteContent.footer.companyName,
  description: siteContent.meta.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
