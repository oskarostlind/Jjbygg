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
    imageAlt: "JJ Bygg & Entreprenad AB – logotyp, byggfirma i Boden och Luleå",
  },
  images: {
    footer: "/footer-placeholder.jpg",
  },
  meta: {
    /** Kort titel utan upprepning (SEO: max ~580 px bredd i SERP). */
    title: "Bygg & entreprenad i Boden och Luleå | JJ Bygg",
    description:
      "JJ Bygg & Entreprenad AB utför nybyggnad, renovering, altaner och takbyte i Boden och Luleå. Kontakta oss för en kostnadsfri offert!",
    keywords:
      "JJ Bygg & Entreprenad AB, byggfirma Boden, byggfirma Luleå, nybyggnation, renovering, altan, takbyte, ROT, entreprenad, Norrbotten",
  },
  contact: {
    personName: "Jesper Johansson",
    phoneDisplay: "070-535 71 94",
    /** Endast siffror för tel:-länk (fallback om CONTACT_NUMBER saknas). */
    phoneTelDigits: "0705357194",
    email: "info@jjbyggboden.se",
    address: "Kallkällvägen 16 c, 961 96 Boden",
  },
  hero: {
    title: "Begär en offert",
    subtitle: "Fyll i formuläret nedan så återkommer vi till dig.",
    headline: "Professionell bygg & entreprenad i Boden och Luleå",
    subline:
      "JJ Bygg & Entreprenad AB hjälper dig med allt från nybyggnation och tillbyggnad till altaner och takbyten. Kvalitet, transparens och lokalt engagemang i hela Norrbotten.",
    ctaText: "Begär en offert",
  },
  footer: {
    companyName: "JJ Bygg & Entreprenad AB",
    tagline: "Professionella bygg- och entreprenadtjänster i Boden och Luleå",
    contactPrompt: "",
    orgNumber: "556832-8362",
    address: "Kallkällvägen 16 c, 961 96 Boden",
    postAddress: "c/o Jesper Johansson, Kallkällvägen 16 c, 961 96 Boden",
  },
  homePage: {
    servicesTitle: "Vad vi erbjuder",
    services: [
      {
        title: "Nybyggnation & Tillbyggnad",
        description: "Hus, garage, utbyggnader",
        iconKey: "nybyggnation",
      },
      {
        title: "Renovering & Interiör",
        description: "Kök, ytskikt, totalrenoveringar",
        iconKey: "renovering",
      },
      {
        title: "Badrum & Våtrum",
        description: "Med fokus på certifiering och kvalitet",
        iconKey: "badrum",
      },
      {
        title: "Altaner & Uteplatser",
        description: "Skräddarsydda trädäck, uterum och staket",
        iconKey: "altan",
      },
      {
        title: "Takbyten & Plåtarbeten",
        description: "Hållbara takbyten anpassade för det norrländska klimatet",
        iconKey: "tak",
      },
      {
        title: "Entreprenad & Planering",
        description: "Helhetsansvar, projektledning och lokala samarbetspartners",
        iconKey: "entreprenad",
      },
    ] as const,
    trustTitle: "Varför välja oss",
    trust: [
      "Professionella hantverkare",
      "Snabbt återkommande",
      "Transparenta priser",
    ],
    ctaTitle: "Redo att komma igång?",
    ctaSubline: "Skicka in din förfrågan så återkommer vi så snart vi kan.",
    ctaButtonText: "Begär en offert",
    faqTitle: "Vanliga frågor",
    faq: [
      {
        question: "Hur snabbt får jag svar på min offertförfrågan?",
        answer:
          "Vi strävar efter att återkomma inom 1–2 vardagar efter att du skickat in formuläret. Vid hög belastning kan det ibland ta lite längre tid; du får alltid en bekräftelse till din e-post när förfrågan har tagits emot.",
      },
      {
        question: "Är offerten kostnadsfri?",
        answer:
          "Ja – att begära offert via vår webbplats är kostnadsfri och förbindande. Vi går igenom dina önskemål och återkommer med förslag eller kompletterande frågor innan eventuell upphandling.",
      },
      {
        question: "Hur fungerar ROT-avdrag?",
        answer:
          "ROT-avdrag är en skattereduktion för godkända reparations-, underhålls- och ombyggnadsarbeten hos privatpersoner. Regler och belopp beslutas av riksdagen och administreras av Skatteverket. Vi informerar om vad som gäller för ditt projekt; kontrollera alltid aktuella villkor på skatteverket.se.",
      },
    ],
  },
  contactSection: {
    title: "Frågor eller funderingar? Hör av dig till Jesper!",
    rotTitle: "ROT-avdrag och kostnadsfria hembesök",
    rotBody:
      "Som privatperson kan du få ROT-avdrag på arbetskostnaden – vi drar av 30 % direkt på fakturan enligt gällande regler. Vi erbjuder kostnadsfria hembesök och rådgivning i både Boden och Luleå med omnejd, så att du får ett tydligt underlag innan projektet startar.",
  },
} as const;

export type SiteContent = typeof siteContent;

export type ServiceIconKey = (typeof siteContent.homePage.services)[number]["iconKey"];
