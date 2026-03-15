/**
 * Central plats för logotyper, bilder och texter.
 * Byta värden här när slutgiltiga tillgångar finns – inga ändringar i komponenter behövs.
 */

export const siteContent = {
  logo: {
    /** Sökväg till huvudlogotyp (t.ex. i header). Byt fil i public/ eller uppdatera sökväg. */
    primary: "/logo.svg",
    /** Alternativ logotyp (t.ex. ljus variant). */
    alt: "/logo-light.svg",
    /** Favicon. */
    favicon: "/favicon.ico",
  },
  images: {
    /** Hero-/bannerbild på startsidan eller offertsidan. */
    hero: "/hero-placeholder.jpg",
    /** Ev. bilder för footer eller info-sektioner. */
    footer: "/footer-placeholder.jpg",
  },
  meta: {
    title: "JJ Bygg & Entreprenad AB – Offertförfrågan",
    description:
      "Skicka din offertförfrågan till JJ Bygg & Entreprenad AB. Vi återkommer så snart vi kan.",
    keywords: "bygg, entreprenad, offert, renovering, ROT, byggföretag",
  },
  hero: {
    title: "Begär en offert",
    subtitle: "Fyll i formuläret nedan så återkommer vi till dig.",
  },
  footer: {
    companyName: "JJ Bygg & Entreprenad AB",
    tagline: "Professionella bygg- och entreprenadtjänster",
  },
} as const;

export type SiteContent = typeof siteContent;
