import type { Metadata } from "next";
import { siteContent } from "@/lib/site-content";

const OFFERT_DESCRIPTION =
  "Skicka en offertförfrågan till JJ Bygg & Entreprenad AB för nybyggnad, renovering, altaner eller takbyte i Boden och Luleå. Vi återkommer snabbt.";

/** Matchar h1 på offertsidan för bättre SEO (Page Title ≈ innehåll). */
export const metadata: Metadata = {
  title: siteContent.hero.title,
  description: OFFERT_DESCRIPTION,
  openGraph: {
    title: `${siteContent.hero.title} | JJ Bygg & Entreprenad AB`,
    description: OFFERT_DESCRIPTION,
    url: "/offert",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteContent.hero.title} | JJ Bygg & Entreprenad AB`,
    description: OFFERT_DESCRIPTION,
  },
  alternates: {
    canonical: "/offert",
  },
};

export default function OffertLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
