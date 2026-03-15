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
    hero: "/hero-placeholder.svg",
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
    /** Rubrik för hero på startsidan */
    headline: "Bygg & renovering du kan lita på",
    /** Underrubrik / förklarande text i hero */
    subline: "Vi hjälper dig med nybyggnad, renovering och tillbyggnad – professionellt, transparent och med snabb återkoppling.",
    /** Text på CTA-knapp i hero */
    ctaText: "Begär en offert",
  },
  footer: {
    companyName: "JJ Bygg & Entreprenad AB",
    tagline: "Professionella bygg- och entreprenadtjänster",
    /** Valfri kontakttext (t.ex. "Kontakta oss för en kostnadsfri offert") */
    contactPrompt: "",
    /** Organisationsnummer (från Allabolag/Bolagsverket) */
    orgNumber: "556832-8362",
    /** Besöksadress */
    address: "Kallkällvägen 16 c, 961 96 Boden",
    /** Postadress (om avvikande från besöksadress) */
    postAddress: "c/o Jesper Johansson, Kallkällvägen 16 c, 961 96 Boden",
    /** Telefon (lämna tom tills nummer ska visas) */
    phone: "",
    /** E-post för allmän kontakt (lämna tom om ni bara vill använda offertformuläret) */
    email: "",
  },
  homePage: {
    servicesTitle: "Vad vi erbjuder",
    services: [
      "Nybyggnad",
      "Renovering",
      "Tillbyggnad",
      "Badrumsrenovering",
      "Köksrenovering",
      "ROT-avdrag",
    ],
    trustTitle: "Varför välja oss",
    trust: [
      "Professionella hantverkare",
      "Snabbt återkommande",
      "Transparenta priser",
    ],
    ctaTitle: "Redo att komma igång?",
    ctaSubline: "Skicka in din förfrågan så återkommer vi så snart vi kan.",
    ctaButtonText: "Begär en offert",
  },
} as const;

export type SiteContent = typeof siteContent;
