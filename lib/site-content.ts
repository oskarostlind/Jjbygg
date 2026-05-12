/**
 * Central plats för logotyper, bilder och texter.
 * Byta värden här när slutgiltiga tillgångar finns – inga ändringar i komponenter behövs.
 */

export const siteContent = {
  logo: {
    /** Officiell logotyp (header + favicon). */
    primary: "/logo.png",
    favicon: "/logo.png",
    /** Alt-text för logotyp (SEO / tillgänglighet). */
    imageAlt: "Logotyp JJ Bygg & Entreprenad AB – byggfirma i Boden",
  },
  images: {
    /** Hero-/bannerbild på startsidan eller offertsidan. */
    hero: "/hero-placeholder.svg",
    /** Alt-text för hero (SEO). */
    heroAlt:
      "Nybyggnad, renovering och tillbyggnad i Boden – JJ Bygg & Entreprenad AB",
    /** Ev. bilder för footer eller info-sektioner. */
    footer: "/footer-placeholder.jpg",
  },
  meta: {
    title: "JJ Bygg & Entreprenad AB | Professionell byggfirma i Boden",
    description:
      "JJ Bygg & Entreprenad AB hjälper dig med nybyggnad, renovering och tillbyggnad i Boden med omnejd. Kvalitet, transparens och lokalt engagemang.",
    keywords:
      "JJ Bygg & Entreprenad AB, byggfirma Boden, Boden, Luleå, Älvsbyn, nybyggnad, renovering, ROT, entreprenad",
  },
  hero: {
    title: "Begär en offert",
    subtitle: "Fyll i formuläret nedan så återkommer vi till dig.",
    /** Rubrik för hero på startsidan (enda h1; innehåller nyckelfras för SEO). */
    headline: "Bygg & Entreprenad i Boden – kvalitet och trygghet för ditt projekt",
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
