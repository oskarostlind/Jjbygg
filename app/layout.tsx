import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { siteContent } from "@/lib/site-content";
import { defaultMetadata } from "@/lib/seo";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { GoogleTagManager } from "@/components/layout/google-tag-manager";
import { LocalBusinessJsonLd } from "@/components/layout/local-business-json-ld";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

const LOGO_PATH = siteContent.logo.primary;

export const metadata: Metadata = {
  ...defaultMetadata,
  icons: {
    icon: LOGO_PATH,
    shortcut: LOGO_PATH,
    apple: LOGO_PATH,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv">
      <head>
        <LocalBusinessJsonLd />
      </head>
      <body className={`${inter.className} flex min-h-screen flex-col`}>
        <GoogleTagManager />
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
