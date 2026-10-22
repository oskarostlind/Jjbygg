/**
 * Innehåll för ortsidorna under /byggfirma/[ort].
 *
 * Varje ort har egen handskriven text om lokala förhållanden (kommun, bygglov,
 * husbestånd, klimat, område). Skriv aldrig en generator som byter ortnamn –
 * det är "doorway pages" och straffas av Google.
 *
 * Inga påståenden om företaget (certifikat, antal projekt, kundcitat) läggs in
 * här förrän Jesper har bekräftat dem. Skriv "kontakta oss" i stället.
 */

import type { ServiceFaq, ServiceSection } from "@/lib/services-content";

export type LocationSlug = "boden" | "lulea" | "norrbotten";

export type LocationPage = {
  slug: LocationSlug;
  /** Ortnamn i nominativ: "Boden". */
  name: string;
  /** "i Boden", "i Luleå", "i Norrbotten". */
  inPhrase: string;
  /** schema.org-typ för areaServed. */
  areaType: "City" | "AdministrativeArea";
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

export const LOCATION_PAGES: LocationPage[] = [
  {
    slug: "boden",
    name: "Boden",
    inPhrase: "i Boden",
    areaType: "City",
    metaTitle: "Byggfirma i Boden – renovering, altan & takbyte | JJ Bygg",
    metaDescription:
      "JJ Bygg & Entreprenad är byggfirman i Boden för tillbyggnad, renovering, badrum, altan och takbyte. Lokalt, ROT-avdrag och kostnadsfritt hembesök.",
    h1: "Byggfirma i Boden",
    lead:
      "JJ Bygg & Entreprenad AB har sin bas i Boden. Vi bygger, renoverar och byter tak åt villaägare, fritidshusägare och företag i hela kommunen – från Sävast och Erikslund till Harads och Gunnarsbyn.",
    sections: [
      {
        heading: "Lokal byggfirma med Boden som hemmaplan",
        paragraphs: [
          "Att anlita en byggfirma från orten har praktiska fördelar. Vi känner till hur husen i Boden är byggda, vilka markförhållanden som är vanliga i olika stadsdelar och hur Bodens kommun hanterar bygglov och anmälningar. Hembesök kostar inget, och korta avstånd gör att vi kan komma förbi snabbt om något behöver stämmas av under projektets gång.",
          "Vi tar uppdrag i hela Bodens kommun: centrala Boden, Sävast, Sävastön, Erikslund, Hedenbacken, Prästholmen, Sanden, Svartbyn, Trångfors, Heden, Bredåker, Vittjärv, Harads och Gunnarsbyn. Bor du i byarna runt omkring går det också bra – hör av dig så berättar vi hur vi kan hjälpa till.",
        ],
      },
      {
        heading: "Det här hjälper vi till med i Boden",
        paragraphs: [
          "Vi arbetar med det mesta inom bygg på villor, fritidshus och mindre fastigheter. Läs mer om varje tjänst på respektive sida:",
        ],
        links: "services",
        list: [
          "Nybyggnation och tillbyggnad – garage, tillbyggnader, attefallshus och fritidshus",
          "Renovering och interiör – kök, ytskikt, planlösning och totalrenovering",
          "Badrum och våtrum – rivning, tätskikt, kakel och samordning av VVS och el",
          "Altaner och uteplatser – trädäck, uterum, räcken och staket",
          "Takbyten och plåtarbeten – nytt tak, hängrännor, snörasskydd och plåtdetaljer",
          "Totalentreprenad – en kontakt som håller i hela projektet",
        ],
      },
      {
        heading: "Husen i Boden – vad som är typiskt",
        paragraphs: [
          "En stor del av Bodens villabestånd byggdes under 1950-, 60- och 70-talen, inte minst i stadsdelar som Erikslund, Hedenbacken och Prästholmen. Många av husen är gedigna, men har nått den ålder där tak, fönster, badrum och elinstallationer behöver ses över. Det gör renovering, takbyte och badrumsrenovering till de vanligaste uppdragen i de centrala delarna.",
          "I Sävast och på Sävastön, mellan Boden och Luleå, har det byggts mycket nytt de senaste decennierna. Här handlar uppdragen oftare om tillbyggnader, garage, altaner och uterum på hus som är yngre men där familjen vuxit ur ytan. Runt Luleälven och i byarna norrut finns dessutom många fritidshus och äldre gårdar där både renovering och tillbyggnad är aktuella.",
          "Boden växer. Den pågående industrietableringen och nya bostadsområden gör att efterfrågan på hantverkare ökar. Planera därför ditt projekt i god tid – särskilt om du vill ha något klart till sommaren.",
        ],
      },
      {
        heading: "Klimatet i Boden ställer krav på bygget",
        paragraphs: [
          "Boden ligger i inlandet, några mil från kusten, och vintrarna är både långa och kalla. Tjälen går djupt – i oisolerad mark kan den nå ned mot två meter – och det påverkar allt från plintar under en altan till grundläggningen av ett nytt garage. En grund som inte är dimensionerad för tjälen kan börja röra sig redan efter några vintrar.",
          "Snölasten är bland de högsta i landet. Tak, uterum och carportar måste dimensioneras efter Boverkets snölastkarta för just den här delen av Norrbotten, och det är en av anledningarna till att plåttak är så vanliga här: snön glider av, och vikten är låg. Samtidigt betyder stora temperatursvängningar under vår och höst att plåtdetaljer, hängrännor och tätningar får jobba hårt.",
          "Byggsäsongen är kortare än söderut. Gjutning, markarbeten och takbyten planeras helst till barmarksperioden från maj till oktober, medan invändiga arbeten som kök, badrum och ytskikt går utmärkt att göra på vintern.",
        ],
      },
      {
        heading: "Bygglov i Bodens kommun",
        paragraphs: [
          "Bygglov, anmälan och förhandsbesked i Boden hanteras av Bodens kommun. Ansökan görs via kommunens e-tjänst på boden.se, där du också kan följa ditt ärende. Kommunen kan svara på om din fastighet omfattas av detaljplan, vilket avgör mycket av vad som får byggas utan lov.",
          "Tänk på att bygglov kräver ritningar, situationsplan och ofta en kontrollplan, och att handläggningen tar tid – räkna med flera veckor och ibland längre under vår och sommar. Vi hjälper dig gärna att förstå vilka handlingar som behövs för ditt projekt och kan ta fram underlag i samband med offerten.",
          "Vissa åtgärder är bygglovsbefriade för en- och tvåbostadshus: attefallshus upp till 30 kvadratmeter, friggebodar, mindre tillbyggnader på upp till 15 kvadratmeter och altaner under vissa mått. Flera av dem kräver ändå en anmälan och startbesked innan du får börja bygga.",
        ],
      },
      {
        heading: "ROT-avdrag för dig som bor i Boden",
        paragraphs: [
          "Äger du din villa, ditt radhus eller fritidshus i Boden kan du använda ROT-avdraget på arbetskostnaden för renovering, om- och tillbyggnad. Avdraget är 30 procent av arbetskostnaden upp till 50 000 kronor per person och år enligt nuvarande regler, och vi drar av det direkt på fakturan. Kontrollera alltid aktuella villkor på skatteverket.se. Observera att ROT inte gäller nybyggnad av helt nya byggnader.",
        ],
      },
      {
        heading: "Så kommer vi igång",
        paragraphs: [
          "Beskriv ditt projekt i vårt offertformulär eller ring oss. Vi bokar ett kostnadsfritt hembesök i Boden, går igenom vad du vill göra och vad som behöver kontrolleras med kommunen, och återkommer med en skriftlig offert där arbete och material redovisas var för sig.",
        ],
      },
    ],
    faq: [
      {
        question: "Vilka delar av Boden jobbar ni i?",
        answer:
          "Hela Bodens kommun – centrala Boden, Sävast, Sävastön, Erikslund, Hedenbacken, Prästholmen, Sanden, Svartbyn, Trångfors, Heden, Harads, Gunnarsbyn och byarna runt omkring. Vi tar också uppdrag i Luleå och övriga Norrbotten.",
      },
      {
        question: "Kostar hembesöket något?",
        answer:
          "Nej. Hembesök och offert i Boden är kostnadsfritt och utan förpliktelser. Vi tittar på plats, ställer frågor och återkommer med ett skriftligt förslag.",
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
    ],
    updated: "2026-10-22",
  },
  {
    slug: "lulea",
    name: "Luleå",
    inPhrase: "i Luleå",
    areaType: "City",
    metaTitle: "Byggfirma i Luleå – renovering, altan & takbyte | JJ Bygg",
    metaDescription:
      "Söker du byggfirma i Luleå? JJ Bygg & Entreprenad renoverar, bygger till, byter tak och bygger altaner i hela Luleå kommun. ROT-avdrag och gratis hembesök.",
    h1: "Byggfirma i Luleå",
    lead:
      "Luleå ligger en halvtimme från vår bas i Boden, och en stor del av våra uppdrag finns här: villor på Bergnäset och Björkskatan, radhus på Hertsön, sjönära fritidshus i skärgården och tillbyggnader i Sunderbyn. Vi kommer gärna ut på ett kostnadsfritt hembesök.",
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
    updated: "2026-10-22",
  },
  {
    slug: "norrbotten",
    name: "Norrbotten",
    inPhrase: "i Norrbotten",
    areaType: "AdministrativeArea",
    metaTitle: "Byggfirma i Norrbotten – Boden, Luleå & omnejd | JJ Bygg",
    metaDescription:
      "JJ Bygg & Entreprenad är byggfirman i Norrbotten med bas i Boden. Vi tar uppdrag i Boden, Luleå, Älvsbyn, Kalix, Piteå och Jokkmokk. Kostnadsfri offert.",
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
        list: ["Byggfirma i Boden – vår hemort", "Byggfirma i Luleå – en halvtimme bort"],
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
    updated: "2026-10-22",
  },
];

export function getLocationPage(slug: string): LocationPage | undefined {
  return LOCATION_PAGES.find((page) => page.slug === slug);
}

/** Orter som har tjänst×ort-sidor (regionsidan har inga). */
export const SERVICE_LOCATION_SLUGS: LocationSlug[] = ["boden", "lulea"];
