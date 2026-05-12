import type { Metadata } from "next";
import { siteContent } from "@/lib/site-content";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { LocalBusinessJsonLd } from "@/components/layout/local-business-json-ld";
import "./globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://placeholder-jj-entreprenad.se";
const LOGO_PATH = siteContent.logo.primary;

export const metadata: Metadata = {
  title: siteContent.meta.title,
  description: siteContent.meta.description,
  keywords: siteContent.meta.keywords,
  icons: {
    icon: LOGO_PATH,
    shortcut: LOGO_PATH,
    apple: LOGO_PATH,
  },
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
      <body className="flex min-h-screen flex-col">
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
