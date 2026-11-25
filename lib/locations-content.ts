/**
 * Orter och innehåll för ortsidorna under /byggfirma/[ort].
 *
 * Varje ort har egen handskriven text om lokala förhållanden (kommun, bygglov,
 * husbestånd, klimat, område). Skriv aldrig en generator som byter ortnamn –
 * det är "doorway pages" och straffas av Google.
 *
 * Boden har ingen egen ortsida: startsidan är sidan för "byggföretag/byggfirma
 * i Boden" (sektionen #boden, se BODEN_SECTION nedan och
 * components/home/boden-section.tsx). /byggfirma/boden redirectar permanent
 * till / (next.config.mjs). Två sidor med samma sökord delade på visningarna
 * och sänkte rankingen – lägg inte tillbaka en Boden-ortsida.
 *
 * Inga påståenden om företaget (certifikat, antal projekt, kundcitat) läggs in
 * här förrän Jesper har bekräftat dem. Skriv "kontakta oss" i stället.
 */

import type { ServiceFaq, ServiceSection } from "@/lib/services-content";

export type LocationSlug = "boden" | "lulea" | "norrbotten";

/** Grunddata om en ort – räcker för länkar, brödsmulor och areaServed. */
export type Location = {
  slug: LocationSlug;
  /** Ortnamn i nominativ: "Boden". */
  name: string;
  /** "i Boden", "i Luleå", "i Norrbotten". */
  inPhrase: string;
  /** schema.org-typ för areaServed. */
  areaType: "City" | "AdministrativeArea";
};

export type LocationPage = Location & {
  /** Hela <title>, max 60 tecken. */
  metaTitle: string;
  /** Max 155 tecken. */
  metaDescription: string;
  h1: string;
  lead: string;
  sections: ServiceSection[];
  faq: ServiceFaq[];
  /** Andra orter som listas som "Vi tar uppdrag i" (bara regionsidan). */
  alsoServing?: string[];
  /** ISO-datum då texten senast uppdaterades. */
  updated: string;
};

/** Hemorten. Har tjänst×ort-sidor (/tjanster/[slug]/boden) men ingen egen ortsida. */
const BODEN: Location = { slug: "boden", name: "Boden", inPhrase: "i Boden", areaType: "City" };

/**
 * Boden-sektionen på startsidan (#boden). Texten kommer från den tidigare
 * ortsidan /byggfirma/boden, nedkortad till det som är specifikt för Boden.
 */
export const BODEN_SECTION = {
  heading: "Byggföretag i Boden",
  intro:
    "JJ Bygg & Entreprenad AB är en byggfirma med Boden som hemmaplan. Härifrån tar vi uppdrag i hela kommunen – och i Luleå, en halvtimme bort.",
  paragraphs: [
    "Vi bygger, renoverar och byter tak åt villaägare, fritidshusägare och företag. Kontaktperson är Jesper Johansson, och det är honom du pratar med oavsett om du behöver en snickare till en ny altan eller ett byggföretag som håller ihop en hel tillbyggnad.",
    "Boden växer, och efterfrågan på hantverkare är stor. Hör därför av dig i god tid – gärna under vintern om bygget ska stå klart till sommaren.",
  ],
  topics: [
    {
      heading: "Stadsdelar och byar",
      paragraphs: [
        "Vi tar uppdrag i centrala Boden, Sävast, Sävastön, Erikslund, Hedenbacken, Prästholmen, Sanden, Svartbyn, Trångfors, Heden, Bredåker, Vittjärv, Harads och Gunnarsbyn – och i byarna runt omkring.",
        "Många villor i Erikslund, Hedenbacken och Prästholmen byggdes på 1950-, 60- och 70-talen och har nått åldern då tak, fönster och badrum behöver ses över. I Sävast och på Sävastön är husen yngre. Där handlar det oftare om tillbyggnad, garage, altan eller uterum.",
      ],
    },
    {
      heading: "Klimat och byggsäsong",
      paragraphs: [
        "Boden ligger i inlandet, och vintrarna är långa och kalla. Tjälen kan nå ned mot två meter i oisolerad mark, och snölasten hör till de högsta i landet. Det avgör hur djupt plintarna under en altan ska gå och hur tak, uterum och carportar dimensioneras.",
        "Markarbeten, gjutning och takbyten planerar vi helst till barmarksperioden från maj till oktober. Kök, badrum och annat invändigt arbete går utmärkt att göra på vintern.",
      ],
    },
    {
      heading: "Bygglov i Bodens kommun",
      paragraphs: [
        "Bygglov, anmälan och förhandsbesked hanteras av Bodens kommun, och ansökan gör du i kommunens e-tjänst på boden.se. Räkna med att handläggningen tar flera veckor, ibland längre under vår och sommar.",
        "Vi hjälper dig att reda ut om projektet kräver bygglov eller anmälan och kan ta fram underlag i samband med offerten.",
      ],
    },
  ],
  /** Läggs efter startsidans allmänna frågor i samma FAQ-lista och samma FAQPage-schema. */
  faq: [
    {
      question: "Vilka delar av Boden jobbar ni i?",
      answer:
        "Hela Bodens kommun – centrala Boden, Sävast, Sävastön, Erikslund, Hedenbacken, Prästholmen, Sanden, Svartbyn, Trångfors, Heden, Harads, Gunnarsbyn och byarna runt omkring. Vi tar också uppdrag i Luleå och övriga Norrbotten.",
    },
    {
      question: "Hjälper ni till med bygglovet hos Bodens kommun?",
      answer:
        "Ja, vi hjälper dig att reda ut om projektet kräver bygglov eller anmälan och vilka handlingar kommunen vill ha. Själva ansökan gör du som fastighetsägare via kommunens e-tjänst, men vi kan ta fram underlag och svara på frågor under handläggningen.",
    },
    {
      question: "Kan man bygga på vintern i Boden?",
      answer:
        "Ja, invändiga arbeten som kök, badrum och ytskikt fungerar utmärkt vintertid. Grundläggning, altaner och takbyten planeras däremot helst till barmarkssäsongen. Hör av dig under vintern så hinner vi planera in sommarens arbeten.",
    },
    {
      question: "Tar ni uppdrag från företag och föreningar i Boden?",
      answer:
        "Ja. Vi bygger och renoverar åt privatpersoner, företag, föreningar och mindre fastighetsägare. Beskriv projektet i offertformuläret så hör vi av oss.",
    },
  ] satisfies ServiceFaq[],
  /** ISO-datum då texten senast uppdaterades – styr lastModified för / i sitemapen. */
  updated: "2026-11-26",
};

/** Ortsidorna under /byggfirma/[ort] (Boden ligger på startsidan, se ovan). */
export const LOCATION_PAGES: LocationPage[] = [
  {
    slug: "lulea",
    name: "Luleå",
    inPhrase: "i Luleå",
    areaType: "City",
    metaTitle: "Byggföretag i Luleå – byggfirma, renovering & tak | JJ Bygg",
    metaDescription:
      "Söker du byggföretag i Luleå? Byggfirman JJ Bygg & Entreprenad renoverar, bygger till, byter tak och bygger altaner i hela Luleå kommun. Gratis hembesök.",
    h1: "Byggföretag i Luleå",
    lead:
      "Luleå ligger en halvtimme från vår bas i Boden, och en stor del av våra uppdrag finns här: villor på Bergnäset och Björkskatan, radhus på Hertsön, sjönära fritidshus i skärgården och tillbyggnader i Sunderbyn. Oavsett om du söker en snickare till altanen eller hantverkare för en hel renovering kommer vi gärna ut på ett kostnadsfritt hembesök.",
    sections: [
      {
        heading: "Byggfirma som jobbar i hela Luleå kommun",
        paragraphs: [
          "Från Boden till centrala Luleå är det drygt tre mil längs väg 97 – en halvtimmes bilresa. Det gör att vi kan ta uppdrag i Luleå lika smidigt som på hemmaplan, utan långa restider som läggs på fakturan. Vi arbetar i hela kommunen: centrum, Bergnäset, Hertsön, Björkskatan, Porsön, Notviken, Mjölkudden, Gammelstad, Södra och Norra Sunderbyn, Råneå, Antnäs, Måttsund, Ersnäs och Sunderbyn.",
          "Luleå är Norrbottens största stad, med universitet, stora industrier och en bostadsmarknad som förändras snabbt. Många hus byter ägare, och nya ägare vill ofta renovera, bygga till eller byta tak. Samtidigt är efterfrågan på hantverkare hög, så det lönar sig att höra av sig i god tid.",
        ],
      },
      {
        heading: "Det här hjälper vi till med i Luleå",
        paragraphs: ["Vi utför det mesta inom bygg på villor, radhus, fritidshus och mindre fastigheter:"],
        links: "services",
        list: [
          "Nybyggnation och tillbyggnad – tillbyggnader, garage, attefallshus och fritidshus",
          "Renovering och interiör – kök, ytskikt, ändrad planlösning och totalrenovering",
          "Badrumsrenovering – rivning, tätskikt, kakel och samordning av VVS och el",
          "Altaner och uteplatser – trädäck, inglasade uterum, räcken och staket",
          "Takbyte och plåtarbeten – nytt tak, hängrännor, snörasskydd och plåtdetaljer",
          "Totalentreprenad – en kontakt som håller ihop hela projektet",
        ],
      },
      {
        heading: "Husen i Luleå – från Hertsön till Bergnäset",
        paragraphs: [
          "Stora delar av Luleås villa- och radhusområden byggdes på 1960- och 70-talen, när staden växte med stålverket och universitetet. Hertsön, Björkskatan, Porsön och delar av Notviken har många hus från den perioden – ofta välbyggda, men med originalbadrum, originaltak och fönster som nu passerat sin livslängd. Här är badrumsrenovering, takbyte och energirenovering de vanligaste uppdragen.",
          "På Bergnäset, i Gammelstad och i de äldre delarna av staden finns villor från 1920- till 50-talen med träfasader och torpargrund. Sådana hus kräver kunskap om äldre konstruktioner – vad som bär, var fukt brukar samlas och hur man tilläggsisolerar utan att skapa nya problem. I Gammelstad är dessutom kyrkstaden ett världsarv och området runt omkring riksintresse, vilket gör att ändringar av fasad och tak ofta kräver bygglov och en varsam hand.",
          "I Sunderbyn, Antnäs, Måttsund och längs kusten har det byggts många nya villor de senaste tjugo åren. Där handlar uppdragen oftare om altaner, uterum, garage och tillbyggnader när familjen behöver mer yta.",
        ],
      },
      {
        heading: "Kustklimat, snö och mark i Luleå",
        paragraphs: [
          "Luleå ligger vid Bottenviken, och det märks i vädret. Vinden från havet är hårdare än i Boden, och fuktig luft under höst och vår sliter mer på fasader, trädäck och plåtdetaljer. Takplåt, infästningar och räcken behöver vara dimensionerade och monterade för blåst, inte bara för snö.",
          "Snön är ändå den största lasten. Luleå tillhör de områden i Sverige där Boverkets snölastvärden är som högst, och ett tak eller uterum som är ritat för södra Sverige håller inte här. Tjälen går djupt även vid kusten, så plintar och grunder måste gå under tjäldjupet eller isoleras så att marken under dem inte fryser.",
          "Markförhållandena varierar mer i Luleå än i Boden. Nära vatten och på gammal sjöbotten finns silt och lera som sätter sig, medan andra områden står på morän och berg. Innan vi gjuter en grund eller sätter plintar vill vi därför veta vad som finns under gräsmattan – ibland räcker en provgrop, ibland behövs en geoteknisk undersökning.",
        ],
      },
      {
        heading: "Bygglov i Luleå kommun",
        paragraphs: [
          "Bygglov och anmälan i Luleå hanteras av Luleå kommun, och ansökan görs via kommunens e-tjänst på lulea.se. Där kan du också söka förhandsbesked om du vill bygga nytt på en tomt utanför detaljplan. Kommunen har kartor över detaljplaner och riksintressen som är bra att titta på innan du planerar en tillbyggnad eller ett nytt tak i avvikande material.",
          "Bor du nära vatten – och det gör många i Luleå – kan strandskyddet påverka vad som får byggas. Strandskyddet gäller normalt 100 meter från strandlinjen och kräver dispens för nya byggnader och ibland även för altaner och bryggor. Fråga kommunen tidigt, så slipper du planera om.",
          "Handläggningstiden varierar med årstid och ärendemängd. Lämna in kompletta handlingar – ritningar, situationsplan och kontrollplan – så går det fortare. Vi hjälper dig gärna att ta fram underlag i samband med offerten.",
        ],
      },
      {
        heading: "ROT-avdrag i Luleå",
        paragraphs: [
          "Som villa-, radhus- eller fritidshusägare i Luleå kan du använda ROT-avdraget för renovering, om- och tillbyggnad. Avdraget är 30 procent av arbetskostnaden upp till 50 000 kronor per person och år enligt nuvarande regler, och vi drar av det direkt på fakturan. Bor du i bostadsrätt gäller ROT bara för arbeten inne i lägenheten, och styrelsen behöver oftast godkänna större ingrepp. Kontrollera aktuella villkor på skatteverket.se.",
        ],
      },
      {
        heading: "Så kommer vi igång",
        paragraphs: [
          "Skicka en förfrågan via offertformuläret eller ring. Vi bokar ett kostnadsfritt hembesök i Luleå, går igenom projektet på plats och återkommer med en skriftlig offert där arbete och material redovisas separat. Har du bilder eller ritningar kan du bifoga dem direkt i formuläret.",
        ],
      },
    ],
    faq: [
      {
        question: "Tar ni uppdrag i hela Luleå kommun?",
        answer:
          "Ja – centrum, Bergnäset, Hertsön, Björkskatan, Porsön, Notviken, Gammelstad, Sunderbyn, Råneå, Antnäs, Måttsund och byarna däremellan. Vi tar även uppdrag i skärgården när det går att komma dit med material.",
      },
      {
        question: "Kostar det extra att ni kommer från Boden?",
        answer:
          "Hembesöket i Luleå är kostnadsfritt. Resan mellan Boden och Luleå tar en halvtimme, och vi planerar arbetsdagarna så att restiden inte blir en kostnad för dig. Alla kostnader framgår av offerten.",
      },
      {
        question: "Jobbar ni med bostadsrättsföreningar i Luleå?",
        answer:
          "Ja. Vi tar uppdrag från både privatpersoner, föreningar och företag. För arbeten i en bostadsrätt behöver du normalt styrelsens godkännande – kontakta föreningen innan du begär offert.",
      },
      {
        question: "Behöver jag bygglov för att byta tak i Luleå?",
        answer:
          "Byter du till samma material och färg krävs normalt inget bygglov. Ändrar du takets utseende påtagligt, eller bor i ett område med detaljplan eller kulturvärden som Gammelstad, kan bygglov behövas. Luleå kommun svarar på vad som gäller för din fastighet.",
      },
    ],
    updated: "2026-11-26",
  },
  {
    slug: "norrbotten",
    name: "Norrbotten",
    inPhrase: "i Norrbotten",
    areaType: "AdministrativeArea",
    metaTitle: "Byggföretag i Norrbotten – Boden, Luleå & omnejd | JJ Bygg",
    metaDescription:
      "JJ Bygg är ett byggföretag i Norrbotten med bas i Boden. Vi tar uppdrag i Boden, Luleå, Älvsbyn, Kalix, Piteå och Jokkmokk. Kostnadsfri offert.",
    h1: "Byggfirma i Norrbotten",
    lead:
      "Vi har vår bas i Boden och arbetar främst i Boden och Luleå, men tar också uppdrag i övriga Norrbotten – Älvsbyn, Kalix, Piteå, Jokkmokk och byarna däremellan. Beskriv ditt projekt så berättar vi om vi kan hjälpa till.",
    sections: [
      {
        heading: "Våra huvudorter: Boden och Luleå",
        paragraphs: [
          "De flesta av våra uppdrag finns i Bodens och Luleå kommuner, där vi kan göra hembesök med kort varsel och känner till både husbestånd och kommunernas bygglovshantering. Läs mer om hur vi arbetar på respektive ort:",
        ],
        links: "locations",
        list: ["Byggföretag i Boden – vår hemort", "Byggföretag i Luleå – en halvtimme bort"],
      },
      {
        heading: "Vi tar uppdrag i Älvsbyn, Kalix, Piteå och Jokkmokk",
        paragraphs: [
          "Norrbotten är stort, och många bor en bit från de större orterna. Vi tar uppdrag i Älvsbyn, Kalix, Piteå och Jokkmokk samt i byarna längs älvdalarna och kusten när projektet passar – till exempel ett takbyte, en tillbyggnad, en badrumsrenovering eller ett fritidshus som ska rustas upp.",
          "Älvsbyn ligger knappt fem mil från Boden längs väg 94 och nås lätt för både hembesök och längre projekt. Kalix ligger åtta mil österut längs E4 från Luleå, med många fritidshus längs Kalixälven och kusten. Piteå ligger drygt fem mil söder om Luleå och har ett stort bestånd av villor och fritidshus i Öjebyn, Norrfjärden och längs Piteälven. Jokkmokk ligger femton mil nordväst om Boden längs väg 97, där fjällnära fritidshus och äldre gårdar ofta behöver tak, fönster och tillbyggnader som klarar riktigt stora snömängder.",
          "Vid längre avstånd planerar vi arbetet i sammanhängande perioder i stället för korta återbesök, så att restiden inte driver upp kostnaden. Hur det påverkar priset framgår alltid av offerten – inga överraskningar i efterhand.",
        ],
      },
      {
        heading: "Det här bygger vi i Norrbotten",
        paragraphs: ["Samma tjänster oavsett var i länet du bor:"],
        links: "services",
        list: [
          "Nybyggnation och tillbyggnad – garage, tillbyggnader, attefallshus och fritidshus",
          "Renovering och interiör – kök, ytskikt och totalrenovering",
          "Badrum och våtrum – tätskikt, kakel och samordning av VVS och el",
          "Altaner och uteplatser – trädäck, uterum och staket",
          "Takbyten och plåtarbeten – tak, hängrännor och snörasskydd",
          "Totalentreprenad – helhetsansvar från bygglov till slutbesked",
        ],
      },
      {
        heading: "Att bygga i Norrbotten – snö, tjäle och korta säsonger",
        paragraphs: [
          "Norrbotten är det län i Sverige där klimatet ställer högst krav på byggnader. Snölasten är bland de högsta i landet, och i inlandet och fjällnära områden som Jokkmokk ännu högre än vid kusten. Tak, uterum, carportar och altantak måste dimensioneras efter Boverkets snölastkarta för exakt den plats huset står på – en ritning gjord för Mälardalen fungerar inte här.",
          "Tjälen går djupt, ofta mot två meter i oisolerad mark, och allt som står på marken behöver antingen grundläggas under tjäldjupet eller isoleras så att marken under inte fryser. Det gäller husgrunder, garage, altaner och till och med staketstolpar. Kustkommunerna Luleå, Piteå och Kalix har dessutom mer vind och fuktigare luft, vilket sliter på fasader och plåt.",
          "Byggsäsongen för markarbeten, grunder, altaner och tak är i praktiken maj till oktober. Invändiga arbeten går att göra året runt. Vill du ha något klart till sommaren är vintern rätt tid att höra av sig, så hinner vi planera, beställa material och söka de lov som behövs.",
        ],
      },
      {
        heading: "Bygglov och ROT i länets kommuner",
        paragraphs: [
          "Varje kommun i Norrbotten hanterar sina egna bygglov och anmälningar – Bodens kommun, Luleå kommun, Älvsbyns kommun, Kalix kommun, Piteå kommun och Jokkmokks kommun har alla e-tjänster på sina webbplatser där ansökan görs och ärendet kan följas. Reglerna i plan- och bygglagen är desamma i hela landet, men detaljplaner, strandskydd och riksintressen skiljer sig åt mellan orterna. Vi hjälper dig att reda ut vad som gäller för din fastighet.",
          "ROT-avdraget är statligt och fungerar likadant oavsett kommun: 30 procent av arbetskostnaden upp till 50 000 kronor per person och år enligt nuvarande regler, direkt avdraget på fakturan. Det gäller renovering, om- och tillbyggnad av bostäder och fritidshus du äger – inte nybyggnad. Kontrollera aktuella villkor på skatteverket.se.",
        ],
      },
      {
        heading: "Hör av dig med ditt projekt",
        paragraphs: [
          "Beskriv vad du vill göra och var huset ligger i offertformuläret, så återkommer vi med besked om vi kan ta uppdraget och hur vi i så fall lägger upp det. Hembesök i Boden och Luleå är alltid kostnadsfria; för längre avstånd kommer vi överens om upplägg innan vi åker ut.",
        ],
      },
    ],
    faq: [
      {
        question: "Hur långt från Boden tar ni uppdrag?",
        answer:
          "Främst Boden och Luleå, men vi tar även uppdrag i Älvsbyn, Kalix, Piteå och Jokkmokk när projektet passar. Beskriv projektet och var det ligger, så ger vi besked.",
      },
      {
        question: "Blir det dyrare om jag bor långt från Boden?",
        answer:
          "Restiden kan påverka priset, men vi planerar arbetet i sammanhängande perioder för att hålla nere den. Exakt vad som gäller framgår av offerten innan du bestämmer dig.",
      },
      {
        question: "Renoverar ni fritidshus i Norrbotten?",
        answer:
          "Ja. Fritidshus i skärgården, längs älvarna och fjällnära är vanliga uppdrag – ofta takbyte, tillbyggnad eller nytt badrum. Tänk på att ROT-avdraget även gäller fritidshus du äger.",
      },
      {
        question: "Gör ni hembesök utanför Boden och Luleå?",
        answer:
          "Ja, men för längre avstånd kommer vi överens om upplägget först. Skicka gärna bilder och en beskrivning i offertformuläret, så kan vi ofta ge ett första besked utan att åka ut.",
      },
    ],
    alsoServing: ["Älvsbyn", "Kalix", "Piteå", "Jokkmokk"],
    updated: "2026-11-26",
  },
];

/** Alla orter vi arbetar på – för areaServed, länkar och tjänst×ort-sidorna. */
export const LOCATIONS: Location[] = [BODEN, ...LOCATION_PAGES];

export function getLocation(slug: string): Location | undefined {
  return LOCATIONS.find((location) => location.slug === slug);
}

export function getLocationPage(slug: string): LocationPage | undefined {
  return LOCATION_PAGES.find((page) => page.slug === slug);
}

/** Länk till ortens sida: Boden är startsidans sektion #boden, övriga /byggfirma/[ort]. */
export function locationHref(slug: LocationSlug): string {
  return slug === "boden" ? "/#boden" : `/byggfirma/${slug}`;
}

/** Orter som har tjänst×ort-sidor (regionsidan har inga). */
export const SERVICE_LOCATION_SLUGS: LocationSlug[] = ["boden", "lulea"];
