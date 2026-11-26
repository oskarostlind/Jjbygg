/**
 * Central plats för logotyper, bilder och texter.
 * Byta värden här när slutgiltiga tillgångar finns – inga ändringar i komponenter behövs.
 */

export const siteContent = {
  logo: {
    /** Hela dekalen (märke + ordbild) i loggans röda – används i strukturerad data och på ljus bakgrund. */
    primary: "/logo.svg",
    /** Hela dekalen i vitt – footer och andra mörka ytor. */
    primaryWhite: "/logo-white.svg",
    /** Bara märket (kvadratiskt) – header, favicon. */
    mark: "/logo-mark.svg",
    markWhite: "/logo-mark-white.svg",
    favicon: "/logo-mark.svg",
    /** Alt-text för logotyp (SEO / tillgänglighet). */
    imageAlt: "JJ Bygg & Entreprenad AB – logotyp, byggfirma i Boden och Luleå",
  },
  meta: {
    /** Kort titel utan upprepning (SEO: max ~580 px bredd i SERP). */
    title: "Byggföretag i Boden & Luleå – byggfirma JJ Bygg",
    /** Max 155 tecken. */
    description:
      "Byggföretag och byggfirma i Boden och Luleå. JJ Bygg gör renovering, tillbyggnad, tak, badrum och altan. Begär kostnadsfri offert utan förpliktelser.",
  },
  contact: {
    personName: "Jesper Johansson",
    phoneDisplay: "070-535 71 94",
    /** Värdet efter "tel:" i internationellt format (fallback om CONTACT_NUMBER saknas). */
    phoneTelDigits: "+46705357194",
    email: "info@jjbyggboden.se",
    address: "Kallkällvägen 16 c, 961 96 Boden",
    /** Öppettider enligt Google-företagsprofilen. Ändras de där – ändra här också. */
    openingHours: [
      { days: "Måndag–fredag", hours: "07–17" },
      { days: "Lördag–söndag", hours: "Stängt" },
    ],
    /** Svarstid på förfrågningar (samma löfte som i FAQ:n). */
    responseTime: "Vi svarar på förfrågningar inom 1–2 vardagar.",
  },
  /** Google-företagsprofilen. Visa aldrig betyg eller antal omdömen på sajten. */
  google: {
    /** Sökningen som visar profilen med omdömena. */
    reviewsUrl: "https://www.google.com/search?q=JJ+Bygg+%26+Entreprenad+AB+Boden",
    /** Öppnar dialogen där kunden skriver ett omdöme. */
    writeReviewUrl: "https://g.page/r/CZf0jOWtak9zEBM/review",
  },
  /** Bolagsuppgifter (belagda: Bolagsverket/Skatteverket). Lägg inte till något här utan underlag. */
  company: {
    foundingYear: "2010",
    taxStatus: "Godkänt för F-skatt",
  },
  /**
   * Förtroenderaden (components/trust-bar.tsx) under hero och i sidfoten.
   * Bara belagda uppgifter – inga betyg, certifikat eller antal jobb.
   */
  trustBar: ["Registrerat 2010", "Godkänt för F-skatt", "ROT dras på fakturan", "Kostnadsfritt hembesök"],
  hero: {
    title: "Begär en offert",
    subtitle: "Fyll i formuläret nedan så återkommer vi till dig.",
    headline: "Byggföretag i Boden och Luleå",
    subline:
      "JJ Bygg & Entreprenad AB hjälper dig med allt från nybyggnation och tillbyggnad till altaner och takbyten. Kvalitet, transparens och lokalt engagemang i hela Norrbotten.",
    ctaText: "Begär en offert",
    /** Punkterna under rubriken på /offert (startsidan har förtroenderaden, se trustBar). */
    badges: ["Kostnadsfri offert", "ROT-avdrag 30 %", "Boden & Luleå"],
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
        description: "Kakel, tätskikt och nya ytskikt",
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
    processTitle: "Så går det till",
    processIntro:
      "Från första samtalet till färdigt bygge – du vet alltid vad som händer härnäst och vad det kostar.",
    process: [
      {
        title: "Berätta om projektet",
        body: "Fyll i offertformuläret eller ring Jesper direkt. Beskriv vad du vill göra, ungefär när och gärna med några bilder.",
      },
      {
        title: "Kostnadsfritt hembesök",
        body: "Vi kommer ut, tittar på platsen och går igenom dina önskemål. Här reder vi ut bygglov, material och vad som påverkar priset.",
      },
      {
        title: "Tydlig offert",
        body: "Du får en skriftlig offert med vad som ingår, tidplan och ROT-avdrag draget direkt på fakturan. Du vet vad det kostar innan vi börjar.",
      },
      {
        title: "Vi bygger – du följer med",
        body: "Arbetet planeras efter säsong och klimat. Du får löpande besked under hela bygget, och vi avslutar med en gemensam genomgång.",
      },
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
          "Ja – att begära offert via vår webbplats är kostnadsfritt och helt utan förpliktelser. Vi går igenom dina önskemål och återkommer med förslag eller kompletterande frågor innan eventuell upphandling.",
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

/** Ikonnycklar för de sex tjänstekorten på startsidan (CMS-styrda titlar, se cmsServices). */
export type HomeServiceIconKey = (typeof siteContent.homePage.services)[number]["iconKey"];

/**
 * Alla tjänsteikoner (components/service-icon.tsx). De sex första hör till
 * startsidans kort; övriga till tjänstesidor som bara finns i lib/services-content.ts.
 */
export type ServiceIconKey =
  | HomeServiceIconKey
  | "kok"
  | "totalrenovering"
  | "golv"
  | "bastu"
  | "garage"
  | "grund"
  | "fonster"
  | "fasad"
  | "attefall"
  | "snickare";
