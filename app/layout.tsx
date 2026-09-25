import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { defaultMetadata, SEO_TITLE } from "@/lib/seo";
import { Header } from "@/components/header";
import { Footer } from "@/components/layout/footer";
import { GoogleTagManager } from "@/components/layout/google-tag-manager";
import { LocalBusinessJsonLd } from "@/components/layout/local-business-json-ld";
import { LeadSourceTracker } from "@/components/layout/lead-source-tracker";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: true,
  preload: true,
});

export const metadata: Metadata = {
  ...defaultMetadata,
  title: {
    default: SEO_TITLE,
    template: "%s | JJ Bygg & Entreprenad AB",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv" className={inter.className}>
      <body className="flex min-h-screen flex-col">
        <GoogleTagManager />
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
        <LocalBusinessJsonLd />
        <LeadSourceTracker />
        <Analytics />
      </body>
    </html>
  );
}
