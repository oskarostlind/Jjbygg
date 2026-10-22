import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { OG_IMAGE_PATH } from "@/lib/seo";
import { OffertPreviewProvider } from "@/components/offert/offert-preview";

const OFFERT_DESCRIPTION =
  "Skicka en offertförfrågan till JJ Bygg & Entreprenad AB för nybyggnad, renovering, altaner eller takbyte i Boden och Luleå. Vi återkommer snabbt.";

/** Matchar h1 på offertsidan för bättre SEO (Page Title ≈ innehåll). */
const OFFERT_TITLE = "Begär offert – bygg & renovering i Boden och Luleå";

export const metadata: Metadata = {
  title: { absolute: `${OFFERT_TITLE} | JJ Bygg` },
  description: OFFERT_DESCRIPTION,
  openGraph: {
    title: OFFERT_TITLE,
    description: OFFERT_DESCRIPTION,
    url: "/offert",
    siteName: "JJ Bygg & Entreprenad AB",
    locale: "sv_SE",
    type: "website",
    images: [{ url: OG_IMAGE_PATH, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: OFFERT_TITLE,
    description: OFFERT_DESCRIPTION,
    images: [OG_IMAGE_PATH],
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
  // sitecms förhandsgranskning (draft mode): formuläret visas men kan inte skickas.
  return <OffertPreviewProvider preview={draftMode().isEnabled}>{children}</OffertPreviewProvider>;
}
