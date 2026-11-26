/**
 * Prisguiderna under /guider/[slug] – "Vad kostar …? Det här påverkar priset".
 *
 * Ägarens beslut: inga priser, prisintervall, timpriser eller kvadratmeterpriser.
 * Jobben varierar för mycket för att en siffra ska säga något om just läsarens
 * projekt. Guiderna förklarar i stället vad som avgör priset, så att läsaren kan
 * läsa sin offert och höra av sig. Enda beloppet är ROT-taket i ROT_NOTE.
 *
 * Regler och ROT kontrollerade mot boverket.se och skatteverket.se 2026-11-26.
 * Inga kvadratmetergränser för lovfria åtgärder (reglerna ändrades 1 december
 * 2025) och inga siffror för snözon eller tjäldjup.
 *
 * Påståenden om företaget (certifikat, garantier, egen behörighet för el/VVS)
 * läggs bara in när Jesper har bekräftat dem.
 */

import type { MetadataRoute } from "next";
import { ROT_NOTE, type ServiceFaq } from "./services-content.ts";

/** En rad i "Det här avgör priset": faktor → varför det spelar roll → vad du kan göra. */
export type GuideFactor = { factor: string; why: string; todo: string };

export type GuideSection = {
  /** Ankare för innehållsförteckningen. */
  id: string;
  heading: string;
  paragraphs: string[];
  factors?: GuideFactor[];
  list?: string[];
  /** Stycken efter listan/faktorerna. */
  after?: string[];
};

export type Guide = {
  slug: string;
  /** Kort namn för brödsmulor, kort och länkar. */
  name: string;
  /** Hela <title>, max 60 tecken, frågan + "| JJ Bygg". */
  metaTitle: string;
  metaDescription: string;
  h1: string;
  lead: string;
  /** 2–3 meningar överst – ett citerbart svar på frågan. */
  shortAnswer: string;
  /** Text på kortet på /guider. */
  cardText: string;
  sections: GuideSection[];
  faq: ServiceFaq[];
  /** Slug i SERVICE_PAGES – guiden länkar dit (och till tjänstens Boden/Luleå-sidor), tjänstesidan länkar tillbaka. */
  service: string;
  /** ISO-datum då guiden publicerades (Article.datePublished). */
  published: string;
  /** ISO-datum då texten senast uppdaterades – visas på sidan, i JSON-LD och i sitemapen. */
  updated: string;
};

const ROT_PERCENT =
  "Avdraget är 30 procent av arbetskostnaden, inte av material. Det är bara arbetad tid på plats som ger avdrag – material, resor, maskiner, utrustning och avfallshantering betalar du fullt ut.";

export const GUIDES: Guide[] = [
  {
    slug: "vad-kostar-badrumsrenovering",
    name: "Vad kostar en badrumsrenovering?",
    metaTitle: "Vad kostar en badrumsrenovering? Det avgör priset | JJ Bygg",
    metaDescription:
      "Vad påverkar priset på en badrumsrenovering? Storlek, rivning, tätskikt, rör och el, material och bostadsrätt eller villa – och hur du får rätt offert.",
    h1: "Vad kostar en badrumsrenovering? Det här påverkar priset",
    lead:
      "Vi publicerar inga schablonpriser för badrum, eftersom de säger mer om ett genomsnittligt badrum än om ditt. Här går vi i stället igenom vad som avgör kostnaden, så att du kan läsa en offert med rätt ögon.",
    shortAnswer:
      "Vad en badrumsrenovering kostar beror främst på badrummets storlek, hur mycket som måste rivas och byggas upp under ytskikten, om rör, golvbrunn och el ska flyttas och vilka material du väljer. Två badrum med samma yta kan därför hamna långt ifrån varandra i pris. Ett fast pris kan vi ge först efter ett hembesök, när vi har sett rummet och vet vad som ska göras.",
    cardText:
      "Storlek, rivning, tätskikt och golvbrunn, rör och el, materialval och om det är en villa eller bostadsrätt – det här styr vad ditt badrum kostar.",
    sections: [
      {
        id: "det-har-avgor-priset",
        heading: "Det här avgör priset",
        paragraphs: [
          "I ett badrum möts vatten, avlopp, el, ventilation och tätskikt på liten yta, och det mesta av arbetet hamnar bakom kaklet. Det här är faktorerna som brukar skilja mest mellan två offerter.",
        ],
        factors: [
          {
            factor: "Storlek och planlösning",
            why: "Större yta betyder mer tätskikt, kakel och arbetstid. Ett litet badrum blir ändå inte billigare i samma takt, eftersom golvbrunn, rör, el och inredning behövs oavsett storlek.",
            todo: "Mät golvet och takhöjden och rita en enkel skiss med dörr, fönster och var toalett, dusch och handfat sitter i dag.",
          },
          {
            factor: "Rivning och underlag",
            why: "Allt rivs ner till stomme så att tätskiktet kan byggas upp rätt. Först då ser vi om golv, väggskivor eller bjälklag behöver bytas. Det är den största osäkerheten i ett badrumsjobb.",
            todo: "Berätta hur gammalt badrummet är och om det har renoverats ovanpå ett äldre. Fotografera fuktfläckar, spruckna fogar och golvbrunnen.",
          },
          {
            factor: "Tätskikt och golvbrunn",
            why: "Tätskiktet är det som skyddar huset mot vattenskador, och golvbrunnen ska passa ihop med det. En gammal brunn byts i regel, och behöver golvet nytt fall mot brunnen blir underlagsarbetet större.",
            todo: "Välj inte bort det här för att spara. Fråga i stället vilka branschregler arbetet följer och vilken dokumentation du får när jobbet är klart.",
          },
          {
            factor: "Rör, el och ventilation",
            why: "VVS och el utförs av behöriga installatörer som vi samordnar. Kostnaden beror på skicket på befintliga rör och elledningar, om du vill ha golvvärme och handdukstork och om frånluften behöver förbättras.",
            todo: "Säg från början vad du vill ha – golvvärme, fler uttag, belysning, handdukstork – så kommer det med i offerten i stället för som tillägg.",
          },
          {
            factor: "Flytt av installationer",
            why: "Att flytta toalett, dusch eller golvbrunn innebär nya rördragningar och ofta ingrepp i golvet.",
            todo: "Fundera på om den nya planlösningen verkligen kräver flytt, eller om samma placering fungerar med bättre inredning.",
          },
          {
            factor: "Material och inredning",
            why: "Kakel och klinker skiljer sig mycket i pris och i hur lång tid de tar att sätta. Stora plattor kräver ett mycket plant underlag. Våtrumsmatta är ofta ett enklare alternativ.",
            todo: "Bestäm material innan offerten blir slutlig, eller be om offert på ett par alternativ. Beställ tidigt – leveranstider är en vanlig orsak till förseningar.",
          },
          {
            factor: "Badrum i källaren",
            why: "I källaren kommer fukt från mark och väggar in i bilden, och ibland ligger avloppet för högt för att vattnet ska kunna rinna ut av egen kraft. Då kan det behövas en pump.",
            todo: "Berätta om källaren har haft fuktproblem och visa var avloppsledningen går ut.",
          },
          {
            factor: "Bostadsrätt eller villa",
            why: "I en bostadsrätt behöver du oftast styrelsens tillstånd innan rör och avlopp ändras, och föreningen kan ha egna krav på utförande och dokumentation. Trapphus och bortforsling kräver också mer planering.",
            todo: "Kontakta föreningen tidigt och be om deras regler för badrumsrenovering. Skicka med dem när du begär offert.",
          },
          {
            factor: "Tidpunkt",
            why: "Ett badrum kan renoveras året om, men varje lager måste torka innan nästa läggs på. Ska badrummet vara klart till ett visst datum behöver materialet finnas på plats i tid.",
            todo: "Hör av dig i god tid och var flexibel med starten om det går. Har huset bara ett badrum, planera för en tillfällig lösning.",
          },
        ],
      },
      {
        id: "norrbotten",
        heading: "Badrum i Boden och Luleå",
        paragraphs: [
          "En skillnad här uppe är leveranserna: kakel, blandare och inredning som inte finns i lager i Boden eller Luleå beställs ofta söderifrån, och då blir både frakt och leveranstid längre. Ju tidigare materialet är bestämt, desto mindre risk att bygget står still.",
          "Många hus i Boden och Luleå är byggda på 1950–1970-talen och har badrum som renoverats flera gånger, ofta lager på lager. Golvvärme är något de flesta vill ha i ett norrländskt badrum, och den bör planeras in från början.",
        ],
      },
      {
        id: "rot",
        heading: "ROT-avdrag på badrummet",
        paragraphs: [
          ROT_NOTE,
          ROT_PERCENT +
            " Kakel, porslin, blandare och tätskiktsmaterial ger alltså inget avdrag. Därför redovisar vi arbete och material var för sig i offerten, så att du ser vad avdraget gäller.",
          "I en bostadsrätt gäller avdraget arbete inne i lägenheten som du har underhållsansvar för enligt föreningens stadgar. Äger ni bostaden tillsammans kan ni dela på avdraget, men sammanlagt blir det aldrig mer än 30 procent av arbetskostnaden.",
        ],
      },
      {
        id: "rattvisande-pris",
        heading: "Så får du ett rättvisande pris",
        paragraphs: [
          "Ju mer vi vet innan vi kommer ut, desto bättre blir offerten. Skicka gärna med det här när du begär offert:",
        ],
        list: [
          "Bilder på hela rummet, golvbrunnen och där rör och el kommer in",
          "Mått på golv och takhöjd, och var dörr och fönster sitter",
          "Vad du vill ändra – dusch eller badkar, golvvärme, ny planlösning, inredning",
          "Om det är en villa eller en bostadsrätt, och i så fall föreningens regler",
          "När du vill att jobbet ska göras och om det finns ett annat badrum att använda under tiden",
        ],
        after: [
          "Sedan kommer vi på hembesök, som är kostnadsfritt i Boden och Luleå. Du får en skriftlig offert där det står vad som ingår och vad som inte gör det, med arbete och material var för sig. För privatpersoner utgår avtalet från Hantverkarformuläret.",
          "Efter rivningen går vi igenom underlaget med dig innan uppbyggnaden börjar. Hittar vi något oväntat, eller vill du byta kakel under arbetet, stämmer vi av ändringen skriftligt innan vi fortsätter.",
        ],
      },
      {
        id: "fallgropar",
        heading: "Vanliga fallgropar",
        paragraphs: ["Det här är saker som gör att två offerter ser lika ut men inte är det:"],
        list: [
          "Offerten anger bara timpris och ungefärlig tid – då vet du inte vad badrummet kostar förrän det är klart",
          "Det framgår inte vem som gör rör och el, eller om det ingår",
          "Rivning, bortforsling och container saknas",
          "Kakel, porslin och inredning är inte specificerade, så det är oklart vilken nivå priset gäller",
          "Ingenting sägs om hur skador som upptäcks efter rivningen hanteras",
          "Ingen dokumentation av tätskiktet utlovas",
        ],
      },
    ],
    faq: [
      {
        question: "Kan ni ge ett ungefärligt pris per kvadratmeter?",
        answer:
          "Nej, och det är inte för att vara svåra. Ett pris per kvadratmeter säger lite om ett badrum, eftersom golvbrunn, rör, el och inredning behövs oavsett storlek och ingen vet vad som finns under ytskikten innan rummet är sett. En siffra utan hembesök blir lätt fel. Skicka bilder och mått, så kan vi ofta säga vad som påverkar ditt pris mest redan innan vi kommer ut.",
      },
      {
        question: "Hur lång tid tar en badrumsrenovering?",
        answer:
          "Räkna med att badrummet är ur bruk i flera veckor, eftersom varje lager behöver torka innan nästa läggs på. Du får en tidplan för just ditt badrum tillsammans med offerten.",
      },
      {
        question: "Blir det billigare om jag river själv?",
        answer:
          "Det kan det bli, men stäm av med oss först. Rivningen ska göras utan att underlaget skadas, och ROT-avdraget gäller bara arbete som vi utför.",
      },
      {
        question: "Ingår rör och el i priset?",
        answer:
          "Det ska framgå av offerten. Hos oss utförs VVS och el av behöriga installatörer som vi samordnar, så att du har en kontakt genom hela projektet. Jämför du offerter, kontrollera att alla har räknat med installationerna.",
      },
      {
        question: "Får jag ROT-avdrag för badrum i en bostadsrätt?",
        answer:
          "Ja, för arbete inne i lägenheten som du har underhållsansvar för enligt föreningens stadgar. Avdraget gäller arbetskostnaden, inte material. Kontrollera alltid aktuella villkor på skatteverket.se.",
      },
    ],
    service: "badrumsrenovering",
    published: "2026-11-26",
    updated: "2026-11-26",
  },
  {
    slug: "vad-kostar-takbyte",
    name: "Vad kostar ett takbyte?",
    metaTitle: "Vad kostar ett takbyte? Det här påverkar priset | JJ Bygg",
    metaDescription:
      "Vad påverkar priset på ett takbyte? Takets yta och lutning, material, underlag, plåtarbeten och snörasskydd – och vad som gäller för tak i Norrbotten.",
    h1: "Vad kostar ett takbyte? Det här påverkar priset",
    lead:
      "Ett takbyte är ett av de större underhållsjobben på ett hus, och det är rimligt att vilja veta vad det kostar innan man ringer. Vi lämnar inga schablonpriser, men vi kan förklara vad som styr priset – och var osäkerheten ligger.",
    shortAnswer:
      "Vad ett takbyte kostar beror på takets yta och form, lutningen, vilket material du väljer, hur mycket av underlaget som behöver bytas och hur mycket plåtarbete som ingår runt skorsten, ränndalar och fönster. Hur råspont och läkt mår vet ingen säkert förrän det gamla taket är rivet. Ett fast pris kan vi därför lämna först efter att vi har sett taket på plats, och i offerten står det hur eventuella skador i underlaget hanteras.",
    cardText:
      "Takets yta och form, lutning, material, underlaget, plåtdetaljer och snörasskydd – och varför ett tak i Norrbotten ska klara mer snö.",
    sections: [
      {
        id: "det-har-avgor-priset",
        heading: "Det här avgör priset",
        paragraphs: [
          "Två villor med lika stor takyta kan få helt olika offerter, eftersom mycket av arbetet sitter i detaljerna: anslutningar, plåt, underlag och åtkomst.",
        ],
        factors: [
          {
            factor: "Takets yta och form",
            why: "Större yta betyder mer material och arbetstid, men formen spelar lika stor roll. Ett enkelt sadeltak går fortare än ett tak med valm, takkupor, ränndalar och många vinklar, där varje anslutning ska tätas och kläs med plåt.",
            todo: "Skicka bilder på taket från flera håll och husets mått eller ritningar om du har dem.",
          },
          {
            factor: "Lutning och åtkomst",
            why: "Ett brant tak kräver mer säkerhetsutrustning och tar längre tid att arbeta på. Husets höjd, var ställningen kan stå och hur nära material kan levereras påverkar också.",
            todo: "Berätta om det finns hinder runt huset – uterum, staket, slänter eller en trång infart.",
          },
          {
            factor: "Takmaterial",
            why: "Plåt, betongpannor, tegelpannor och papp skiljer sig i materialpris, vikt och arbetstid. Takets lutning avgör vilka material som fungerar, och byter du till ett tyngre material behöver det kontrolleras att takstolarna klarar den nya belastningen.",
            todo: "Fundera på vad du vill ha, men låt oss bedöma vad som passar ditt tak innan du bestämmer dig. Be gärna om offert på två alternativ.",
          },
          {
            factor: "Underlaget – råspont, läkt och underlagstak",
            why: "När det gamla taktäckningsmaterialet är borta ser vi om råsponten är fuktskadad eller mjuk. Skadade delar ska bytas, och det är den största osäkerheten i ett takbyte.",
            todo: "Gå upp på vinden innan vi kommer. Fuktfläckar, mögel eller mörka partier på råsponten är bra att fotografera och berätta om.",
          },
          {
            factor: "Plåtarbeten och takavvattning",
            why: "Fotplåt, vindskivor, ränndalar, skorstensbeslag och genomföringar byts i samband med takbytet – det är ofta där läckor börjar. Hängrännor och stuprör byts ofta samtidigt. Ju fler detaljer, desto mer arbete.",
            todo: "Kontrollera att offerten säger vilka plåtdetaljer som ingår och om rännor och stuprör är med.",
          },
          {
            factor: "Snörasskydd, takstegar och säkerhet",
            why: "Mot entréer, gångvägar och parkeringar behövs snörasskydd, och takstegar och glidskydd gör att taket kan skottas och sotas säkert. Det är delar som ofta saknas i en enkel offert.",
            todo: "Tala om var folk går och bilar står, så tar vi med det som behövs.",
          },
          {
            factor: "Rivning och bortforsling",
            why: "Ett gammalt tak blir en stor mängd avfall som ska rivas, sorteras och forslas bort, och taket ska vara tätt varje kväll medan arbetet pågår.",
            todo: "Kontrollera att rivning, container och bortforsling finns med i priset.",
          },
          {
            factor: "Det som görs samtidigt",
            why: "När taket ändå är öppet är det ett bra tillfälle att byta takfönster eller se över ventilationen på vinden. Det kostar mer i stunden men mindre än ett separat jobb senare.",
            todo: "Säg vad du funderar på, så kan offerten visa det som tillval.",
          },
        ],
      },
      {
        id: "norrbotten",
        heading: "Tak i Norrbotten",
        paragraphs: [
          "Ett tak i Boden eller Luleå ska bära mer snö än ett tak längre söderut. Bärande delar dimensioneras för snölasten på platsen enligt Boverkets regler, och det är en anledning till att materialvalet inte bara är en smaksak. Plåt är vanligt här eftersom snön glider av lättare och vikten är låg – men just därför behövs snörasskydd där snön inte får rasa ner.",
          "Is och smältvatten sliter på takfot, hängrännor och stuprör. Rännor som är för klena eller sitter med fel lutning leder till att vatten rinner längs fasaden eller samlas vid grunden under snösmältningen.",
          "Byggsäsongen är kort. Ett helt takbyte planeras helst till barmarkssäsongen, från sen vår till tidig höst, och den tiden fylls tidigt. Material som inte finns i lager i Boden eller Luleå kan ha längre leveranstid. Hör av dig under vintern om taket ska bytas till sommaren.",
        ],
      },
      {
        id: "bygglov",
        heading: "Behöver jag bygglov för att byta tak?",
        paragraphs: [
          "Reglerna ändrades 1 december 2025. På ett småhus krävs nu normalt varken bygglov eller anmälan för att byta taktäckningsmaterial, även om det nya taket ser annorlunda ut eller är av ett annat material. Ändringen ska ändå göras varsamt och passa in i omgivningen.",
          "I vissa fall krävs bygglov ändå, till exempel om huset eller området är särskilt värdefullt eller om detaljplanen har bestämmelser om utökad lovplikt. Påverkas bärande delar som takstolarna väsentligt kan det krävas en anmälan. Vi stämmer av med Bodens eller Luleå kommun vad som gäller för ditt hus innan arbetet börjar.",
        ],
      },
      {
        id: "rot",
        heading: "ROT-avdrag på takbytet",
        paragraphs: [
          ROT_NOTE,
          ROT_PERCENT +
            " Plåt, pannor, läkt och underlagstak ger inget avdrag, inte heller hyran av ställning eller container. Själva arbetet med att montera och montera ner ställningen räknas däremot som arbete. I offerten står arbete och material var för sig.",
        ],
      },
      {
        id: "rattvisande-pris",
        heading: "Så får du ett rättvisande pris",
        paragraphs: ["Skicka gärna med det här när du begär offert:"],
        list: [
          "Bilder på taket från flera håll, på skorsten och anslutningar och från vinden",
          "Husets mått eller ritningar, om du har dem",
          "Vilket material som finns i dag och vad du funderar på",
          "Om det läcker eller finns fuktfläckar, och var",
          "När du vill att taket ska bytas",
        ],
        after: [
          "Sedan tittar vi på taket på plats – hembesöket är kostnadsfritt i Boden och Luleå. Du får en skriftlig offert där det framgår vilka plåtdetaljer, vilken rivning och vilket underlag som ingår, och hur byte av skadad råspont hanteras om vi hittar sådan. För privatpersoner utgår avtalet från Hantverkarformuläret, och ändringar under arbetet stäms av skriftligt innan de görs.",
        ],
      },
      {
        id: "fallgropar",
        heading: "Vanliga fallgropar",
        paragraphs: ["Det här är vanliga skäl till att ett takbyte blir dyrare än offerten:"],
        list: [
          "Offerten anger bara timpris och ungefärlig tid",
          "Det står inte hur skadad råspont eller läkt hanteras och debiteras",
          "Plåtdetaljer, hängrännor eller snörasskydd är inte med",
          "Rivning, container och bortforsling saknas",
          "Ställning och säkerhetsutrustning är inte nämnda",
        ],
      },
    ],
    faq: [
      {
        question: "Kan ni ge ett ungefärligt pris per kvadratmeter tak?",
        answer:
          "Nej. Ytan är bara en av flera faktorer – form, lutning, plåtdetaljer, åtkomst och framför allt underlagets skick påverkar lika mycket, och underlaget ser vi inte förrän det gamla taket är rivet. En kvadratmetersiffra skulle ge dig en falsk trygghet. Skicka bilder på taket och från vinden, så kan vi berätta vad som kommer att påverka ditt pris mest.",
      },
      {
        question: "Hur vet jag om underlaget behöver bytas?",
        answer:
          "Säkert vet man det först när det gamla materialet är borta. Fuktfläckar på vinden, mjuka partier i råsponten och läckor vid skorsten eller ränndal är tecken på att delar kan behöva bytas. I offerten skriver vi hur sådant hanteras, så att du vet vad som gäller innan vi börjar.",
      },
      {
        question: "När på året är det bäst att byta tak?",
        answer:
          "Från sen vår till tidig höst. Mindre reparationer går att göra även vintertid, men ett helt takbyte planeras helst till barmarkssäsongen.",
      },
      {
        question: "Behöver jag bygglov för att byta från pannor till plåt?",
        answer:
          "Normalt inte på ett småhus sedan reglerna ändrades 1 december 2025. Undantag finns, till exempel för särskilt värdefulla hus och områden. Kontrollera med Bodens eller Luleå kommun, eller fråga oss så stämmer vi av det för ditt hus.",
      },
      {
        question: "Får jag ROT-avdrag för takbyte?",
        answer:
          "Ja, om du äger huset och bor i det. Avdraget gäller arbetskostnaden – inte takmaterial, plåt eller hyra av ställning. Kontrollera alltid aktuella villkor på skatteverket.se.",
      },
    ],
    service: "takbyte-platarbeten",
    published: "2026-11-26",
    updated: "2026-11-26",
  },
  {
    slug: "vad-kostar-altan",
    name: "Vad kostar det att bygga altan?",
    metaTitle: "Vad kostar det att bygga altan? Det avgör priset | JJ Bygg",
    metaDescription:
      "Vad påverkar priset när du bygger altan? Storlek, höjd, grund och tjäle, virke, räcken, tak och inglasning – och när ROT-avdrag och bygglov gäller.",
    h1: "Vad kostar det att bygga altan? Det här påverkar priset",
    lead:
      "En altan kan vara ett enkelt trädäck vid ytterdörren eller en upphöjd konstruktion i flera nivåer med tak och glas. Därför lämnar vi inga kvadratmeterpriser. Här är det som avgör vad just din altan kostar.",
    shortAnswer:
      "Vad det kostar att bygga altan beror på storlek och höjd över marken, vilken grundläggning tomten kräver, vilket virke du väljer och vad som ska ingå utöver själva däcket – räcken, trappor, tak eller inglasning. Marken under altanen är ofta det som skiljer mest mellan två tomter. Ett fast pris kan vi lämna först efter att vi har sett platsen.",
    cardText:
      "Storlek och höjd, grund och tjäle, virke, räcken och trappor, tak och inglasning – och när altanen ger ROT-avdrag.",
    sections: [
      {
        id: "det-har-avgor-priset",
        heading: "Det här avgör priset",
        paragraphs: [
          "Det som syns är trallen, men en stor del av kostnaden sitter under den. Det här är faktorerna som brukar skilja mest mellan två altaner.",
        ],
        factors: [
          {
            factor: "Storlek och form",
            why: "Fler kvadratmeter betyder mer virke och arbetstid. En rak rektangel längs husväggen går fortare än en altan med hörn, vinklar eller flera nivåer, där varje skarv ska kapas och passas in.",
            todo: "Mät upp ytan du tänker dig och markera den gärna med snören på tomten. Då ser du också hur den fungerar med möbler och grill.",
          },
          {
            factor: "Höjd över marken",
            why: "En altan som ligger högt behöver kraftigare bärlinor, räcke och trappa. På en sluttande tomt kan altanen ligga nära marken vid huset och högt i andra änden.",
            todo: "Fotografera platsen från flera håll så att lutningen syns, och berätta hur högt dörren ut till altanen sitter.",
          },
          {
            factor: "Grundläggning och mark",
            why: "Altanen står på plintar eller en annan grund som ska bära den i många år. Lerig mark, berg, sten eller mark som håller kvar vatten kräver olika lösningar. Det är den del som avgör om altanen står rakt efter tio vintrar.",
            todo: "Berätta vad du vet om marken – om det är lera, berg eller fyllning, och om vatten brukar bli stående.",
          },
          {
            factor: "Virke och material",
            why: "Tryckimpregnerat virke är vanligast och prisvärt. Det finns alternativ som kräver mindre underhåll men kostar mer. Bredd och tjocklek på trallen och hur den skruvas påverkar också både pris och utseende.",
            todo: "Fundera på hur mycket underhåll du vill lägga ner. Be gärna om offert på två materialval.",
          },
          {
            factor: "Räcken, trappor och ramper",
            why: "Räcken, trappor och ramper tar mycket arbete i förhållande till sin storlek. Glasräcke, smide eller trä ger stor skillnad i pris.",
            todo: "Bestäm var det ska vara trappa och om du vill ha räcke även där det inte behövs.",
          },
          {
            factor: "Tak, skärmtak och inglasning",
            why: "Ett tak över altanen ska klara snölasten, och en inglasning gör altanen till ett uterum. Det är där priset ökar mest, och där reglerna för bygglov blir andra.",
            todo: "Säg från början om du vill ha tak eller glas, även om det byggs senare. Då kan grunden dimensioneras för det direkt.",
          },
          {
            factor: "Rivning av gammal altan",
            why: "En gammal altan ska rivas och forslas bort. Ibland går det att bygga vidare på en befintlig grund, men bara om den är i gott skick.",
            todo: "Skicka bilder på den gamla altanen, gärna under den, så kan vi bedöma om något går att återanvända.",
          },
          {
            factor: "Åtkomst och tidpunkt",
            why: "Måste allt material bäras in för hand, eller behövs maskin för att gräva för plintarna, tar det längre tid. Försommaren är den mest efterfrågade perioden.",
            todo: "Berätta hur man kommer fram till platsen och var på året du helst vill bygga.",
          },
        ],
      },
      {
        id: "norrbotten",
        heading: "Altan i Norrbotten",
        paragraphs: [
          "I Norrbotten rör sig marken med tjälen. Särskilt lera och silt kan lyfta en plint som inte är rätt grundlagd, och en altan på för grunda plintar kan börja luta redan efter några vintrar. Vi väljer grundläggning efter marken på just din tomt, och det är en del av priset som inte går att snåla på.",
          "Snön ska också med i planeringen. En altan som ligger mot ett tak där snön rasar ner behöver tåla det, och ett tak eller ett uterum dimensioneras för snölasten på platsen. Säsongen är kort, så den som vill ha altanen klar till midsommar bör höra av sig under vintern eller tidig vår.",
        ],
      },
      {
        id: "bygglov",
        heading: "Behöver altanen bygglov?",
        paragraphs: [
          "Reglerna ändrades 1 december 2025. Inom detaljplan är det altanens höjd över marken och avståndet till huset som avgör om det krävs bygglov. Utanför detaljplan finns inte samma mått att förhålla sig till. Ska altanen byggas nära tomtgränsen behövs grannens skriftliga medgivande, och nära järnväg eller i särskilt värdefulla miljöer kan bygglov krävas ändå.",
          "Får altanen tak eller glas kan den i stället räknas som en byggnad eller tillbyggnad, med andra regler. Även när inget lov behövs ska altanen anpassas till omgivningen och inte innebära betydande olägenhet för grannarna. Vi stämmer av med Bodens eller Luleå kommun vad som gäller för din tomt.",
        ],
      },
      {
        id: "rot",
        heading: "ROT-avdrag på altanen",
        paragraphs: [
          ROT_NOTE,
          ROT_PERCENT +
            " ROT gäller när altanen byggs ihop med huset. För en fristående altan, ett pooldäck eller ett staket ges inget avdrag. Bygger vi både altan och staket redovisar vi delarna var för sig.",
        ],
      },
      {
        id: "rattvisande-pris",
        heading: "Så får du ett rättvisande pris",
        paragraphs: ["Skicka gärna med det här när du begär offert:"],
        list: [
          "Bilder på platsen från flera håll, så att lutning och anslutning mot huset syns",
          "Ungefärliga mått och en enkel skiss",
          "Vilket material du tänker dig och om du vill ha räcke, trappa, tak eller glas",
          "Vad du vet om marken",
          "När du vill att altanen ska vara klar",
        ],
        after: [
          "Sedan tittar vi på platsen – hembesöket är kostnadsfritt i Boden och Luleå. Du får en skriftlig offert där grundläggning, material, räcken och trappor står var för sig, så att du ser vad som påverkar priset och kan välja bort eller till. För privatpersoner utgår avtalet från Hantverkarformuläret, och ändringar stäms av skriftligt innan de görs.",
        ],
      },
      {
        id: "fallgropar",
        heading: "Vanliga fallgropar",
        paragraphs: ["Det här är vanliga skäl till att altanen blir dyrare eller sämre än tänkt:"],
        list: [
          "Offerten anger bara timpris och ungefärlig tid",
          "Det står inte hur altanen grundläggs, bara hur stor den blir",
          "Rivning och bortforsling av den gamla altanen saknas",
          "Räcken och trappor är inte specificerade",
          "Tak eller glas planeras in efteråt, när grunden redan är byggd för en altan utan tak",
        ],
      },
    ],
    faq: [
      {
        question: "Kan ni ge ett ungefärligt pris per kvadratmeter altan?",
        answer:
          "Nej. Grunden, höjden, räcken och trappor påverkar priset minst lika mycket som ytan, och en liten altan högt upp kan kosta mer än en stor nära marken. Ett kvadratmeterpris utan att ha sett tomten blir därför missvisande. Skicka bilder och ungefärliga mått, så berättar vi vad som kommer att påverka ditt pris mest.",
      },
      {
        question: "Behöver jag bygglov för altanen?",
        answer:
          "Många altaner kan byggas utan bygglov, men inte alla. Höjden över marken, avståndet till huset och tomtgränsen och om altanen får tak eller glas avgör. Kontrollera med Bodens eller Luleå kommun, eller fråga oss så stämmer vi av det för din tomt.",
      },
      {
        question: "Får jag ROT-avdrag för en ny altan?",
        answer:
          "Ja, om altanen byggs ihop med huset du äger och bor i. Avdraget gäller arbetskostnaden, inte virket. För fristående altaner och staket ges inget avdrag. Kontrollera alltid aktuella villkor på skatteverket.se.",
      },
      {
        question: "Är tryckimpregnerat eller ett material med mindre underhåll billigast i längden?",
        answer:
          "Det beror på hur mycket underhåll du är beredd att lägga ner. Tryckimpregnerat är billigare att bygga men behöver rengöras och oljas med några års mellanrum. Vi går igenom för- och nackdelar utifrån hur du vill använda altanen.",
      },
      {
        question: "När ska jag höra av mig om altanen ska vara klar till sommaren?",
        answer:
          "Under vintern eller tidig vår. Då hinner vi titta på platsen, stämma av eventuellt lov och beställa material innan försommaren, som är den mest efterfrågade perioden.",
      },
    ],
    service: "altan-uteplats",
    published: "2026-11-26",
    updated: "2026-11-26",
  },
  {
    slug: "vad-kostar-tillbyggnad",
    name: "Vad kostar en tillbyggnad?",
    metaTitle: "Vad kostar en tillbyggnad? Det här påverkar priset | JJ Bygg",
    metaDescription:
      "Vad påverkar priset på en tillbyggnad? Storlek, grund och tjäle, anslutning till huset, installationer, bygglov och handlingar – och när ROT-avdrag gäller.",
    h1: "Vad kostar en tillbyggnad? Det här påverkar priset",
    lead:
      "En tillbyggnad kan vara ett sovrum, ett större kök, ett badrum eller ett uterum som går att använda året om. Spannet är så stort att ett schablonpris inte säger något om ditt projekt. Här är det som avgör vad det kostar.",
    shortAnswer:
      "Vad en tillbyggnad kostar beror på storlek och användning, vilken grund marken kräver, hur tillbyggnaden ska anslutas till befintligt hus och tak och om den ska ha vatten, avlopp och el – ett nytt badrum eller kök kostar mer än ett sovrum. Till det kommer ritningar, kommunens avgifter och kontroller när bygglov eller anmälan krävs. Ett fast pris kan vi ge först efter hembesök, när vi har sett huset och tomten och vet vad kommunen kräver.",
    cardText:
      "Storlek och användning, grund och tjäle, anslutning till huset, installationer, bygglov och handlingar – det här styr vad tillbyggnaden kostar.",
    sections: [
      {
        id: "det-har-avgor-priset",
        heading: "Det här avgör priset",
        paragraphs: [
          "En tillbyggnad blir ofta dyrare per kvadratmeter än ett nytt hus, eftersom den ska anslutas till en befintlig stomme, ett befintligt tak och befintliga installationer. Det här är de faktorer som styr priset mest.",
        ],
        factors: [
          {
            factor: "Storlek och användning",
            why: "Ett sovrum eller ett allrum är enklast. Ett kök eller badrum kräver vatten, avlopp, el och ventilation och blir därför dyrare per kvadratmeter.",
            todo: "Beskriv vad rummet ska användas till och om användningen kan ändras längre fram. Det är billigare att förbereda för vatten och avlopp från början.",
          },
          {
            factor: "Grundläggning och mark",
            why: "Tillbyggnaden behöver en grund som klarar tjälen och fungerar ihop med husets befintliga grund. Platta, krypgrund eller plintar beror på mark och hus, och schakt, dränering och fyllning kan bli en stor del av kostnaden.",
            todo: "Ta reda på vilken grund huset har i dag och berätta vad du vet om marken. Gamla ritningar är till stor hjälp.",
          },
          {
            factor: "Anslutning till befintligt hus",
            why: "Tak, väggar och golv ska kopplas ihop med det befintliga så att det blir tätt och ser ut att höra ihop. En ny öppning i ytterväggen påverkar ofta bärande delar.",
            todo: "Fundera på hur tillbyggnaden ska nås inifrån huset och om taket ska byggas ihop med det befintliga eller få en egen form.",
          },
          {
            factor: "El, VVS, ventilation och värme",
            why: "Installationerna utförs av behöriga installatörer som vi samordnar. Kapaciteten i husets el, värmesystem och ventilation avgör om det räcker att förlänga det som finns eller om något behöver byggas om.",
            todo: "Berätta hur huset värms i dag och om du har haft problem med säkringar, värme eller fukt.",
          },
          {
            factor: "Material och standard",
            why: "Fönster, dörrar, fasad, golv och inredning väljer du själv, och nivån styr priset. Ska fasaden matcha den befintliga kan det bli dyrare än att välja något nytt.",
            todo: "Samla bilder på det du gillar och bestäm vilka delar som måste matcha huset.",
          },
          {
            factor: "Ritningar, lov och kontroller",
            why: "Kräver tillbyggnaden bygglov eller anmälan behövs ritningar och ofta konstruktionsberäkningar, kommunen tar ut avgifter, och beroende på projektets storlek krävs en kontrollansvarig och en kontrollplan.",
            todo: "Fråga tidigt vad som behövs för just ditt projekt, så att handlingarna kommer med i planeringen och i budgeten.",
          },
          {
            factor: "Tidpunkt och säsong",
            why: "Grund och markarbeten görs helst under den varmare delen av året. När tillbyggnaden väl är tät kan invändiga arbeten fortsätta under vintern. Handläggning av lov tar tid och kan flytta starten.",
            todo: "Hör av dig flera månader innan du vill börja bygga, gärna innan ritningarna är klara.",
          },
        ],
      },
      {
        id: "norrbotten",
        heading: "Tillbyggnad i Norrbotten",
        paragraphs: [
          "Tjälen är den största skillnaden mot att bygga längre söderut. Grunden ska klara tjällyft och får inte röra sig annorlunda än husets grund, annars syns det som sprickor och dörrar som kärvar där det nya möter det gamla. Grundläggningen anpassas efter marken på tomten, och den delen går inte att snåla på.",
          "Taket ska dimensioneras för snölasten på platsen. Där ett lägre tak ansluter till ett högre kan snö samlas, och det ska konstruktionen klara. Klimatskalet ska vara tätt och välisolerat för att hålla nere uppvärmningen.",
          "Säsongen för grundarbeten är kort, och material som inte finns i lager i Boden eller Luleå kan ha längre leveranstid.",
        ],
      },
      {
        id: "bygglov",
        heading: "Bygglov och anmälan",
        paragraphs: [
          "Reglerna för vad du får bygga till utan bygglov ändrades 1 december 2025. En mindre tillbyggnad på ett småhus kan göras utan bygglov om den håller sig inom vissa mått, inte blir högre än husets taknock och placeras tillräckligt långt från tomtgränsen eller har grannens skriftliga medgivande. Tidigare lovfria tillbyggnader på huset, till exempel en attefallstillbyggnad eller ett skärmtak, räknas in.",
          "Även när bygglov inte behövs kan det krävas en anmälan till kommunen – till exempel om du drar in vatten och avlopp, installerar ventilation eller en eldstad, eller om husets bärande delar påverkas väsentligt. Då behövs startbesked innan arbetet börjar. Nära järnväg, i anslutning till totalförsvarets områden och i särskilt värdefulla miljöer kan bygglov krävas ändå.",
          "Som byggherre har du ansvaret för att tillbyggnaden uppfyller kraven även när inget lov behövs. Vi går igenom vad som gäller för din tomt och stämmer av med Bodens eller Luleå kommun innan något ritas klart.",
        ],
      },
      {
        id: "rot",
        heading: "ROT-avdrag på tillbyggnaden",
        paragraphs: [
          ROT_NOTE,
          ROT_PERCENT,
          "ROT gäller tillbyggnad av ett befintligt bostadshus om någon av tillbyggnadens sidor sitter ihop med husets yttervägg till minst 75 procent, eller om det finns en dörr emellan. Avdraget gäller inte de första fem åren efter det år huset byggdes färdigt, och aldrig för en helt ny fristående byggnad. Äger ni huset tillsammans kan var och en använda sitt avdrag.",
        ],
      },
      {
        id: "rattvisande-pris",
        heading: "Så får du ett rättvisande pris",
        paragraphs: ["Skicka gärna med det här när du begär offert:"],
        list: [
          "Bilder på huset och platsen där tillbyggnaden ska stå",
          "Ritningar på huset om du har dem, och skisser eller ritningar på tillbyggnaden",
          "Vad rummet ska användas till och ungefärlig storlek",
          "Vad du vet om grunden och marken",
          "När du vill börja och om bygglov redan är sökt",
        ],
        after: [
          "Sedan kommer vi på hembesök, kostnadsfritt i Boden och Luleå. Du får en skriftlig offert där grund, stomme, tak, installationer och handlingar står var för sig och där det framgår vad som inte ingår. För privatpersoner utgår avtalet från Hantverkarformuläret, och ändringar stäms av skriftligt innan de görs.",
        ],
      },
      {
        id: "fallgropar",
        heading: "Vanliga fallgropar",
        paragraphs: ["Det här är vanliga skäl till att en tillbyggnad blir dyrare än planerat:"],
        list: [
          "Offerten anger bara timpris och ungefärlig tid",
          "Grund och markarbeten saknas eller står som ”tillkommer”",
          "Anslutningen till befintligt tak och vägg är inte beskriven",
          "Ritningar, konstruktionsberäkningar och kommunens avgifter är inte med i budgeten",
          "El, VVS och ventilation står som tillval utan att det framgår vad de omfattar",
          "Ändringar under bygget görs muntligt och syns först på fakturan",
        ],
      },
    ],
    faq: [
      {
        question: "Kan ni ge ett ungefärligt pris per kvadratmeter?",
        answer:
          "Nej. En tillbyggnad blir ofta dyrare per kvadratmeter än ett nytt hus, och skillnaden mellan ett sovrum och ett badrum av samma storlek är stor. Grund, anslutning till huset och installationer väger tyngre än ytan. Vi ger hellre ett pris som håller efter ett hembesök än en siffra som inte gör det.",
      },
      {
        question: "Behöver jag bygglov för en tillbyggnad?",
        answer:
          "Inte alltid. Sedan 1 december 2025 kan en mindre tillbyggnad på ett småhus göras utan bygglov, men det finns gränser för storlek, höjd och placering, och anmälan kan krävas ändå. Kontrollera med Bodens eller Luleå kommun, eller fråga oss vid hembesöket så stämmer vi av vad som gäller.",
      },
      {
        question: "Får jag ROT-avdrag för en tillbyggnad?",
        answer:
          "Ja, för arbetskostnaden när tillbyggnaden byggs ihop med ett befintligt bostadshus som du äger och bor i. Det gäller inte de första fem åren efter att huset byggdes färdigt, och inte för material. Kontrollera alltid aktuella villkor på skatteverket.se.",
      },
      {
        question: "Vad ingår utöver själva bygget?",
        answer:
          "Ofta ritningar, konstruktionsberäkningar, kommunens avgifter, kontrollansvarig, markarbeten och installationer. Fråga alltid vad som ingår i offerten.",
      },
      {
        question: "Hur tidigt ska jag höra av mig?",
        answer:
          "Gärna flera månader innan du vill börja bygga. Ritningar och kommunens handläggning tar tid, och sommarsäsongen fylls snabbt.",
      },
    ],
    service: "nybyggnation-tillbyggnad",
    published: "2026-11-26",
    updated: "2026-11-26",
  },
];

/** ISO-datum då översiktssidan /guider ändrades. */
export const GUIDER_UPDATED = "2026-11-26";

export function getGuide(slug: string): Guide | undefined {
  return GUIDES.find((guide) => guide.slug === slug);
}

/** Guiden som hör till en tjänstesida (slug i SERVICE_PAGES), om det finns någon. */
export function guideForService(serviceSlug: string): Guide | undefined {
  return GUIDES.find((guide) => guide.service === serviceSlug);
}

/** Sitemap-poster för /guider och varje guide (sprids in i app/sitemap.ts). */
export function guideSitemapEntries(siteUrl: string): MetadataRoute.Sitemap {
  const latest = [GUIDER_UPDATED, ...GUIDES.map((guide) => guide.updated)].reduce((a, b) => (a > b ? a : b));
  return [
    {
      url: `${siteUrl}/guider`,
      lastModified: new Date(latest),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    ...GUIDES.map((guide) => ({
      url: `${siteUrl}/guider/${guide.slug}`,
      lastModified: new Date(guide.updated),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
