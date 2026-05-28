import type { Metadata } from "next";

const OFFERT_TITLE = "Begär offert | JJ Bygg & Entreprenad AB";
const OFFERT_DESCRIPTION =
  "Skicka en offertförfrågan till JJ Bygg & Entreprenad AB för nybyggnad, renovering, altaner eller takbyte i Boden och Luleå. Vi återkommer snabbt.";

export const metadata: Metadata = {
  title: OFFERT_TITLE,
  description: OFFERT_DESCRIPTION,
  openGraph: {
    title: OFFERT_TITLE,
    description: OFFERT_DESCRIPTION,
    url: "/offert",
  },
  twitter: {
    card: "summary_large_image",
    title: OFFERT_TITLE,
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
