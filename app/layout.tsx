import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { Archivo, Barlow } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { defaultMetadata, SEO_TITLE } from "@/lib/seo";
import { Header } from "@/components/header";
import { Footer } from "@/components/layout/footer";
import { GoogleTagManager } from "@/components/layout/google-tag-manager";
import { LocalBusinessJsonLd } from "@/components/layout/local-business-json-ld";
import { LeadSourceTracker } from "@/components/layout/lead-source-tracker";
import { SitecmsPreview } from "sitecms-next/preview";
import "./globals.css";

/**
 * Typografi: Archivo (bred, tung grotesk – rubriker, harmonierar med loggans
 * Montserrat ExtraBold) + Barlow (lättläst, lite industriell – brödtext).
 * Exponeras som CSS-variabler, se tailwind.config.ts (font-display / font-sans).
 */
const display = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
  variable: "--font-display",
});

const body = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-body",
});

export const metadata: Metadata = {
  ...defaultMetadata,
  title: {
    default: SEO_TITLE,
    template: "%s | JJ Bygg & Entreprenad AB",
  },
  // Google Search Console: HTML-taggverifiering via env (alternativ till DNS TXT hos Strato).
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // sitecms förhandsgranskning (draft mode): ingen spårning — kundens redigering
  // ska inte räknas som besök eller ge leadkällor.
  const preview = draftMode().isEnabled;

  return (
    <html lang="sv" className={`${display.variable} ${body.variable}`}>
      <body className="flex min-h-screen flex-col">
        <a
          href="#innehall"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-brand-strong focus:px-4 focus:py-2 focus:font-semibold focus:text-paper"
        >
          Hoppa till innehållet
        </a>
        {preview ? null : <GoogleTagManager />}
        <Header />
        <div id="innehall" className="flex-1">
          {children}
        </div>
        <Footer />
        <LocalBusinessJsonLd />
        {preview ? null : <LeadSourceTracker />}
        {preview ? null : <Analytics />}
        {/* Renderar ingenting utanför sitecms förhandsgranskning (draft mode). */}
        <SitecmsPreview />
      </body>
    </html>
  );
}
