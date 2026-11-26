/**
 * Innehåll för tjänstesidorna under /tjanster/[slug].
 *
 * Varje sida har egen handskriven text, egna avsnitt och egen FAQ – bara
 * renderingen (components/service-article.tsx) delas. Byt aldrig till en
 * generator som bara ersätter ett ord per sida: det räknas som "doorway pages".
 *
 * Påståenden om företaget (certifikat, garantier, priser) ska bara läggas in
 * här när Jesper har bekräftat dem.
 */

import type { ServiceIconKey } from "@/lib/site-content";

/** Länk från en sektion till en annan tjänstesida (slug i SERVICE_PAGES). */
export type ServiceSectionLink = { slug: string; note?: string };

export type ServiceSection = {
  heading: string;
  paragraphs: string[];
  list?: string[];
  /**
   * Länkar till andra tjänstesidor, sist i sektionen. Med `note` på raderna blir
   * det en punktlista ("Tjänst – note"), annars en rad "Läs mer: A · B".
   * Renderas på tjänstesidorna och, som punktlista, på ortsidorna (components/seo-article.tsx).
   */
  serviceLinks?: ServiceSectionLink[];
  /** Stycken efter listan/länkarna (bara tjänstesidorna). */
  after?: string[];
  /**
   * Gör listraderna till länkar: "services" länkar rad i till SERVICE_PAGES[i],
   * "locations" till startsidans Boden-sektion (/#boden) respektive /byggfirma/lulea.
   */
  links?: "services" | "locations";
};

export type ServiceFaq = { question: string; answer: string };

export type ServicePage = {
  slug: string;
  iconKey: ServiceIconKey;
  /** Kort namn för länkar, brödsmulor och kort. */
  name: string;
  /** Hela <title>, max ~60 tecken. */
  metaTitle: string;
  metaDescription: string;
  h1: string;
  lead: string;
  sections: ServiceSection[];
  faq: ServiceFaq[];
  related: string[];
  /** ISO-datum då texten senast uppdaterades – visas på sidan och i JSON-LD. */
  updated: string;
};

export const ROT_NOTE =
  "Som privatperson kan du få ROT-avdrag på arbetskostnaden – 30 % enligt nuvarande regler, upp till 50 000 kr per person och år. Vi drar av det direkt på fakturan. Kontrollera alltid aktuella villkor på skatteverket.se.";

export const SERVICE_PAGES: ServicePage[] = [
  {
    slug: "nybyggnation-tillbyggnad",
    iconKey: "nybyggnation",
    name: "Nybyggnation & tillbyggnad",
    metaTitle: "Nybyggnation & tillbyggnad i Boden och Luleå | JJ Bygg",
    metaDescription:
      "Bygga hus, garage eller tillbyggnad i Boden eller Luleå? JJ Bygg tar dig från bygglov till slutbesked. Kostnadsfritt hembesök och offert.",
    h1: "Nybyggnation och tillbyggnad i Boden och Luleå",
    lead:
      "Ett nytt garage, en tillbyggnad som ger familjen ett rum till eller ett helt nytt hus – vi bygger för norrbottniskt klimat och håller dig informerad från första skiss till nyckelöverlämning.",
    sections: [
      {
        heading: "Vad vi bygger",
        paragraphs: [
          "Vi tar oss an både mindre och större nybyggen i Boden, Luleå och närliggande orter. Vanliga uppdrag är tillbyggnader av villor, garage och carportar, förråd och gäststugor samt fritidshus.",
        ],
        list: [
          "Tillbyggnad av villa – nytt sovrum, större kök eller extra badrum",
          "Garage, carport och förråd",
          "Attefallshus och friggebodar",
          "Fritidshus och gäststugor",
          "Grundläggning, stomme och tak i egen regi eller som del av en totalentreprenad",
        ],
        after: [
          "Garage, grund och komplementbyggnader har egna sidor där vi går igenom vad som är särskilt för just dem.",
        ],
        serviceLinks: [
          { slug: "garage-carport" },
          { slug: "grund-betongplatta" },
          { slug: "attefallshus-friggebod" },
        ],
      },
      {
        heading: "Så går ett byggprojekt till",
        paragraphs: [
          "Det mesta av tiden i ett nybygge går åt innan första spadtaget. Därför börjar vi alltid med ett hembesök där vi går igenom tomten, dina önskemål och vad som krävs av kommunen.",
          "För de flesta nybyggnader och tillbyggnader behövs bygglov och startbesked från Bodens eller Luleå kommun. Beroende på projektets storlek krävs också en kontrollansvarig och en kontrollplan. Vi hjälper dig att förstå vilka handlingar som behövs och när, så att bygget inte står still i väntan på ett papper.",
          "När startbeskedet är klart planerar vi material, leveranser och underentreprenörer så att arbetet kan löpa utan onödiga uppehåll. Efter färdigställandet begär du slutbesked från kommunen – först då får byggnaden tas i bruk.",
        ],
      },
      {
        heading: "Byggt för Norrbottens klimat",
        paragraphs: [
          "Tjäle, stora snömängder och långa kalla perioder ställer andra krav än längre söderut. Grunden ska klara tjällyft, taket ska dimensioneras för snölasten enligt Boverkets regler och klimatskalet ska vara tätt för att hålla nere uppvärmningskostnaden.",
          "Säsongen spelar också roll. Gjutning och markarbeten planeras helst till den varmare delen av året, medan invändiga arbeten kan fortsätta under vintern när huset väl är tätt.",
        ],
      },
      {
        heading: "Garage och carport",
        paragraphs: [
          "Ett garage i Norrbotten är mer än en plats för bilen. Många vill ha utrymme för skoter, verktyg och vinterdäck, och kanske en arbetsbänk. Tänk igenom hur du vill använda det innan du bestämmer storlek – det är betydligt billigare att bygga några kvadratmeter extra från början än att bygga till senare.",
          "Ska garaget vara uppvärmt behöver det isoleras som ett bostadshus, och då påverkas både grund, väggar och tak. Ett kallgarage eller en carport är enklare och billigare, men ger inte samma möjlighet att meka eller förvara saker som inte tål kyla. Vi hjälper dig att väga för- och nackdelarna.",
          "Placeringen spelar också roll: garageport i söderläge smälter fram snabbare på våren, och en uppfart som går att ploga utan att snön hamnar framför porten sparar mycket arbete under vintern.",
        ],
      },
      {
        heading: "Vad kostar det?",
        paragraphs: [
          "Priset avgör storlek, grundläggning, materialval och hur mycket du vill göra själv. En tillbyggnad blir ofta dyrare per kvadratmeter än ett nytt hus, eftersom den ska anslutas till befintlig stomme, tak och installationer. Därför lämnar vi alltid en offert efter hembesök i stället för schablonpriser.",
          ROT_NOTE +
            " Observera att ROT gäller om-, till- och påbyggnad av befintligt hus – inte helt nya byggnader.",
        ],
      },
    ],
    faq: [
      {
        question: "Behöver jag bygglov för en tillbyggnad?",
        answer:
          "I de flesta fall ja. Vissa mindre tillbyggnader kan göras med anmälan enligt attefallsreglerna, men det beror på storlek, placering och detaljplan. Kontakta Bodens eller Luleå kommun, eller fråga oss vid hembesöket så hjälper vi dig att reda ut vad som gäller.",
      },
      {
        question: "Kan ni ta hela ansvaret, från ritning till färdigt hus?",
        answer:
          "Ja. Vi kan ta projektet som totalentreprenad där vi samordnar alla hantverkare och leveranser, eller bygga delar av det om du själv vill ha kvar samordningen.",
      },
      {
        question: "Hur tidigt ska jag höra av mig?",
        answer:
          "Gärna flera månader innan du vill börja bygga. Handläggningen av bygglov tar tid, och sommarsäsongen fylls snabbt.",
      },
    ],
    related: ["garage-carport", "grund-betongplatta", "attefallshus-friggebod", "totalentreprenad", "altan-uteplats"],
    updated: "2026-11-26",
  },
  {
    slug: "renovering",
    iconKey: "renovering",
    name: "Renovering & interiör",
    metaTitle: "Renovering i Boden och Luleå – kök & ytskikt | JJ Bygg",
    metaDescription:
      "Köksrenovering, ytskikt eller totalrenovering i Boden och Luleå. JJ Bygg planerar, river och bygger upp – med ROT-avdrag direkt på fakturan.",
    h1: "Renovering och interiör i Boden och Luleå",
    lead:
      "Från en köksrenovering till en totalrenovering av hela huset. Vi hjälper dig att planera i rätt ordning, så att du slipper riva upp det som nyss blev klart.",
    sections: [
      {
        heading: "Renoveringar vi gör",
        paragraphs: [
          "Vi renoverar villor, radhus och fritidshus i Boden, Luleå och omnejd. Uppdragen varierar från ett enskilt rum till hela hus som byggs om från grunden.",
        ],
        list: [
          "Köksrenovering – rivning, nya väggar, montering av stommar och bänkskivor",
          "Nya ytskikt – golv, väggar, tak och lister",
          "Flytta eller ta bort väggar och öppna upp planlösningen",
          "Byte av fönster och dörrar",
          "Totalrenovering av äldre hus",
        ],
        after: [
          "De vanligaste renoveringarna har egna sidor med mer om arbetsgång och vad som påverkar priset.",
        ],
        serviceLinks: [
          { slug: "koksrenovering" },
          { slug: "totalrenovering" },
          { slug: "golvlaggning" },
          { slug: "bastu" },
        ],
      },
      {
        heading: "Planera i rätt ordning",
        paragraphs: [
          "Den vanligaste – och dyraste – missen vid renovering är fel ordningsföljd. El och VVS ska dras innan väggar stängs, fönsterbyte bör göras före ny puts eller panel, och golvet läggs sist av allt. Vi gör en tidplan tillsammans med dig och samordnar elektriker och rörmokare så att varje moment kommer i rätt tur.",
          "I äldre hus hittar man ofta överraskningar när väggar och golv öppnas: fuktskador, gammal isolering eller elinstallationer som inte längre håller. Därför bokar vi alltid in en kontrollpunkt efter rivning, där vi går igenom vad vi hittat innan uppbyggnaden börjar.",
        ],
      },
      {
        heading: "Köksrenovering steg för steg",
        paragraphs: [
          "Ett kök är ofta husets mest komplicerade rum eftersom el, vatten, avlopp och ventilation möts på liten yta. Så här brukar det gå till:",
        ],
        list: [
          "Hembesök och mätning – vi går igenom planlösning och önskemål",
          "Val av kök och vitvaror – du väljer, vi kontrollerar att måtten fungerar",
          "Rivning och eventuella ändringar av väggar",
          "El, VVS och ventilation dras om vid behov",
          "Ytskikt på golv, väggar och tak",
          "Montering av skåp, bänkskivor och vitvaror",
        ],
      },
      {
        heading: "Renovera ett äldre hus",
        paragraphs: [
          "Många hus i Boden och Luleå byggdes på 1950–1970-talen och har fått flera omgångar av renoveringar sedan dess. Det betyder ofta lager på lager av golv, tapeter och skivor – och ibland material som kräver särskild hantering vid rivning. Vi tittar på husets historia innan vi börjar, så att rätt åtgärder planeras in från början.",
          "Passa också på att se över det som inte syns. När väggar ändå öppnas är det ett bra tillfälle att tilläggsisolera, byta gamla elledningar eller förbättra ventilationen. Det kostar lite extra i stunden men sparar både pengar och besvär på sikt, särskilt i ett kallt klimat där uppvärmningen är en stor del av boendekostnaden.",
          "Bor du i ett hus med kulturhistoriskt värde eller i ett område med detaljplan kan vissa ändringar av exteriören kräva bygglov. Fråga kommunen tidigt om du planerar nya fönster, ny fasad eller ändrad takform.",
        ],
      },
      {
        heading: "Pris och ROT-avdrag",
        paragraphs: [
          "Kostnaden styrs mest av hur mycket som ska rivas, om installationer behöver flyttas och vilka material du väljer. Vi lämnar en tydlig offert där arbete och material redovisas var för sig.",
          ROT_NOTE,
        ],
      },
    ],
    faq: [
      {
        question: "Kan vi bo kvar under renoveringen?",
        answer:
          "Ofta ja, särskilt när bara ett eller två rum renoveras. Vid köksrenovering brukar vi hjälpas åt att ordna ett tillfälligt kök. Vid totalrenovering av hela huset är det oftast smidigare att bo någon annanstans under de tyngsta veckorna.",
      },
      {
        question: "Hur lång tid tar en köksrenovering?",
        answer:
          "Det beror på omfattningen och leveranstiden för köket. Vid hembesöket får du en tidplan anpassad efter just ditt projekt.",
      },
      {
        question: "Kan jag göra delar av jobbet själv?",
        answer:
          "Ja, till exempel rivning eller målning. Säg det när du begär offert så räknar vi med det. Tänk på att ROT-avdraget bara gäller arbete som utförs av oss.",
      },
    ],
    related: ["koksrenovering", "totalrenovering", "golvlaggning", "bastu", "badrumsrenovering"],
    updated: "2026-11-26",
  },
  {
    slug: "badrumsrenovering",
    iconKey: "badrum",
    name: "Badrum & våtrum",
    metaTitle: "Badrumsrenovering i Boden och Luleå | JJ Bygg",
    metaDescription:
      "Renovera badrum i Boden eller Luleå? Vi river, bygger nytt tätskikt och samordnar VVS och el. Kostnadsfritt hembesök och ROT-avdrag på fakturan.",
    h1: "Badrumsrenovering i Boden och Luleå",
    lead:
      "Ett badrum ska hålla tätt i många år. Det är därför det är det rum där hantverket spelar störst roll – och där fel blir dyrast att rätta i efterhand.",
    sections: [
      {
        heading: "Vad ingår i en badrumsrenovering?",
        paragraphs: [
          "En komplett badrumsrenovering innebär att allt rivs ner till stomme, så att underlaget kan kontrolleras och ett nytt tätskikt byggas upp. Vi samordnar rörmokare och elektriker så att du bara har en kontakt genom hela projektet.",
        ],
        list: [
          "Rivning av gamla ytskikt, porslin och inredning",
          "Kontroll av underlag och eventuella fuktskador",
          "Nya golvbrunnar och rördragningar via behörig VVS-installatör",
          "Nytt tätskikt på golv och väggar",
          "Kakel, klinker eller våtrumsmatta",
          "Montering av dusch, toalett, handfat, kommod och belysning",
        ],
      },
      {
        heading: "Tätskiktet är det viktigaste",
        paragraphs: [
          "Det du ser – kakel och porslin – är inte det som håller vattnet ute ur väggen. Det gör tätskiktet bakom. Ett fel där syns sällan förrän det har läckt länge, och då är skadan ofta stor.",
          "I Sverige finns branschregler för hur våtrum ska byggas, till exempel GVK och BBV för tätskikt och Säker Vatten för VVS-installationer. Fråga alltid den du anlitar vilka regler arbetet följer och be om dokumentation när jobbet är klart – det är viktigt både för försäkringen och vid en framtida husförsäljning. Vi går igenom vad som gäller för ditt badrum redan vid hembesöket.",
        ],
      },
      {
        heading: "Planering och tidsåtgång",
        paragraphs: [
          "Ett badrum tar längre tid än många tror, eftersom varje lager behöver torka innan nästa läggs på. Räkna med att badrummet är ur bruk i flera veckor. Har huset bara ett badrum är det bra att planera för en tillfällig lösning.",
          "Välj gärna kakel, blandare och inredning tidigt. Leveranstider är den vanligaste orsaken till att ett badrumsprojekt drar ut på tiden.",
        ],
      },
      {
        heading: "Välja material och inredning",
        paragraphs: [
          "Kakel och klinker är det vanligaste valet och håller länge om underlaget och tätskiktet är rätt gjorda. Stora plattor ger färre fogar och ett lugnare intryck, men kräver ett mycket plant underlag. Våtrumsmatta är ett billigare alternativ som också ger ett tätt och lättskött golv.",
          "Tänk på golvvärme – i ett norrländskt badrum är varma golv något de flesta uppskattar varje morgon, och det hjälper golvet att torka snabbare efter dusch. Vägghängd toalett och kommod gör det enklare att städa, och en duschvägg i glas tar mindre plats visuellt än ett duschkabinett.",
          "Ventilationen är lätt att glömma men viktig. Ett badrum utan fungerande frånluft får kondens, och fukt som stannar kvar är det som bryter ner både fogar och material. Vi ser över ventilationen som en del av varje badrumsrenovering.",
        ],
      },
      {
        heading: "Pris och ROT-avdrag",
        paragraphs: [
          "Priset påverkas av badrummets storlek, om golvbrunn och rör behöver flyttas, och vilket kakel och porslin du väljer. Vi lämnar fast offert efter hembesök.",
          ROT_NOTE,
        ],
      },
    ],
    faq: [
      {
        question: "Hur vet jag om mitt badrum behöver renoveras?",
        answer:
          "Varningstecken är spruckna fogar, lösa plattor, mögel i hörn, dålig lukt från golvbrunnen eller ett badrum som är äldre än 20–25 år. Är du osäker kan vi titta på det vid ett kostnadsfritt hembesök.",
      },
      {
        question: "Kan man lägga nytt kakel på det gamla?",
        answer:
          "Det avråder vi oftast från. Då går det inte att kontrollera eller förnya tätskiktet bakom, och det är tätskiktet som skyddar huset mot vattenskador.",
      },
      {
        question: "Gör ni rör- och elarbetet själva?",
        answer:
          "VVS och el utförs av behöriga installatörer som vi samordnar. Du har en kontakt – oss – genom hela projektet.",
      },
    ],
    related: ["renovering", "totalentreprenad", "nybyggnation-tillbyggnad"],
    updated: "2026-09-25",
  },
  {
    slug: "altan-uteplats",
    iconKey: "altan",
    name: "Altaner & uteplatser",
    metaTitle: "Bygga altan i Boden och Luleå – altan & uterum | JJ Bygg",
    metaDescription:
      "Drömmer du om en ny altan, ett uterum eller staket i Boden eller Luleå? JJ Bygg bygger skräddarsytt och hållbart. Begär kostnadsfri offert.",
    h1: "Altaner och uteplatser i Boden och Luleå",
    lead:
      "Sommaren i Norrbotten är kort men ljus – en bra altan gör att du får ut mest möjligt av den. Vi bygger altaner, trädäck, uterum och staket som klarar både midnattssol och snötunga vintrar.",
    sections: [
      {
        heading: "Vi bygger",
        paragraphs: [
          "Varje tomt och hus är olika, så vi ritar altanen efter hur ni vill använda den: morgonkaffe i solen, plats för grillen eller ett inglasat uterum som förlänger säsongen.",
        ],
        list: [
          "Altaner och trädäck i tryckimpregnerat virke eller andra material",
          "Altaner i flera nivåer och på sluttande tomt",
          "Uterum och inglasade altaner",
          "Räcken, trappor och ramper",
          "Staket, plank och insynsskydd",
        ],
      },
      {
        heading: "Grunden avgör hur länge altanen håller",
        paragraphs: [
          "Det som syns är trallen, men det som avgör livslängden är grunden. I Norrbotten rör sig marken med tjälen, och en altan på för grunda plintar kan börja luta redan efter några vintrar. Vi väljer grundläggning efter markförhållandena på just din tomt.",
          "Ett tak eller ett uterum ska dessutom klara snölasten. Därför dimensioneras bärande delar efter var i landet huset står, inte efter en standardritning.",
        ],
      },
      {
        heading: "Behöver jag bygglov för altanen?",
        paragraphs: [
          "Många altaner kan byggas utan bygglov, men inte alla. Det som brukar avgöra är höjden över marken, avståndet till tomtgränsen och om altanen får tak eller glas. Detaljplanen kan också ha egna regler.",
          "Kontrollera med Bodens eller Luleå kommun innan du bestämmer dig – eller fråga oss vid hembesöket så hjälper vi dig att reda ut vad som gäller för din tomt.",
        ],
      },
      {
        heading: "Uterum – förläng säsongen",
        paragraphs: [
          "Ett uterum eller en inglasad altan kan ge flera extra månader utomhus per år. I april och september, när solen värmer men vinden fortfarande är kall, blir ett inglasat rum en av husets mest använda platser.",
          "Det finns två huvudvarianter. Ett oisolerat uterum med enkelglas skyddar mot vind och regn men följer utetemperaturen under vintern. Ett isolerat uterum med isolerglas och eventuell värme blir i praktiken en tillbyggnad och kan användas större delen av året – men kräver oftast bygglov och kostar mer.",
          "Oavsett variant ska taket klara snön. Ett glastak eller ett tak med låg lutning behöver dimensioneras med marginal, och snöröjning av taket bör vara möjlig utan att man behöver klättra på glaset.",
        ],
      },
      {
        heading: "När ska man bygga?",
        paragraphs: [
          "De flesta vill ha altanen klar till midsommar, och därför fylls försommaren snabbt. Hör av dig under vintern eller tidig vår, så hinner vi planera och beställa material i god tid. Sensommar och höst är ofta en lugnare period för att bygga – och då står altanen klar direkt till nästa säsong.",
          ROT_NOTE,
        ],
      },
    ],
    faq: [
      {
        question: "Vilket virke är bäst för en altan?",
        answer:
          "Tryckimpregnerat virke är vanligast och prisvärt. Det finns också alternativ som kräver mindre underhåll men kostar mer. Vi går igenom för- och nackdelar utifrån hur mycket underhåll du vill lägga ner.",
      },
      {
        question: "Hur mycket underhåll kräver en altan?",
        answer:
          "En trätrall mår bra av att rengöras och oljas eller laseras med några års mellanrum. Bra dränering och luftning under altanen förlänger livslängden mycket.",
      },
      {
        question: "Kan ni bygga ut en befintlig altan?",
        answer:
          "Ja, om den befintliga konstruktionen är i gott skick. Vi kontrollerar grund och bärlinor först, så att det nya inte byggs på något som snart behöver bytas.",
      },
    ],
    related: ["nybyggnation-tillbyggnad", "takbyte-platarbeten", "renovering"],
    updated: "2026-09-25",
  },
  {
    slug: "takbyte-platarbeten",
    iconKey: "tak",
    name: "Takbyten & plåtarbeten",
    metaTitle: "Takbyte i Boden och Luleå – tak & plåtarbeten | JJ Bygg",
    metaDescription:
      "Söker du takläggare i Boden eller Luleå? JJ Bygg byter tak och plåtdetaljer anpassat för norrländsk snö och kyla. ROT-avdrag och kostnadsfri offert.",
    h1: "Takbyte och plåtarbeten i Boden och Luleå",
    lead:
      "Taket är husets viktigaste skydd, och i Norrbotten får det jobba hårt: tung snö, is, stora temperaturskillnader och vår med smältvatten. Vi byter tak som är byggda för att klara det. Letar du efter takläggare eller plåtslagare i Boden eller Luleå gör vi både takbytet och plåtarbetena runt det.",
    sections: [
      {
        heading: "Tecken på att taket behöver bytas",
        paragraphs: [
          "Ett tak håller länge, men inte för alltid. Håll utkik efter följande:",
        ],
        list: [
          "Spruckna, lösa eller porösa takpannor",
          "Rost eller lösa skruvar på plåttak",
          "Fuktfläckar på vinden eller i taket inomhus",
          "Mossa och lav som håller kvar fukt",
          "Sviktande takfot eller bräder som känns mjuka",
          "Taket har passerat sin förväntade livslängd",
        ],
      },
      {
        heading: "Så går ett takbyte till",
        paragraphs: [
          "Vid ett takbyte river vi det gamla taktäckningsmaterialet och kontrollerar underlaget. Skadade råspont och läkt byts ut, och ett nytt underlagstak läggs innan den nya taktäckningen monteras. Plåtdetaljer som fotplåt, vindskivor, ränndalar och genomföringar byts samtidigt – det är ofta där läckor börjar.",
          "Vi planerar arbetet så att taket är tätt varje kväll, och täcker vid behov med presenning om vädret slår om.",
        ],
      },
      {
        heading: "Välja takmaterial",
        paragraphs: [
          "Vanliga material är betongpannor, tegelpannor, plåt och papp. Plåt är populärt i Norrbotten eftersom snön glider av lättare och vikten är låg. Pannor ger ett traditionellt utseende och lång livslängd. Vilket som passar beror på takets lutning, husets stil och budget – och ibland på detaljplanen.",
          "Glöm inte snörasskydd och takstegar. På tak mot entréer, gångvägar och parkeringar är snörasskydd en säkerhetsfråga.",
        ],
      },
      {
        heading: "Plåtarbeten och takavvattning",
        paragraphs: [
          "Läckor börjar sällan mitt på takytan. De börjar vid skorstenen, i ränndalen, runt takfönster eller vid anslutningar mot väggar – där plåtdetaljerna ska leda bort vattnet. Därför byter vi alltid plåtdetaljer i samband med ett takbyte i stället för att återanvända gamla.",
          "Hängrännor och stuprör har en tuff uppgift i Norrbotten. Snö och is kan tynga ner rännorna under vintern, och under snösmältningen ska stora mängder vatten ledas bort från husgrunden. Rännor som är för klena, fel monterade eller sitter med fel lutning leder till att vatten rinner längs fasaden eller samlas vid grunden.",
          "Vi hjälper också till med plåtarbeten utan fullständigt takbyte, till exempel nya fönsterbleck, byte av hängrännor och stuprör eller ny inklädnad av skorsten.",
        ],
      },
      {
        heading: "Bygglov, pris och ROT",
        paragraphs: [
          "Sedan den 1 december 2025 krävs normalt varken bygglov eller anmälan för att byta taktäckning på ett småhus, även om du byter från pannor till plåt eller ändrar färg. Undantagen är hus och områden med särskilt kulturhistoriskt värde eller där kommunen har infört utökad lovplikt, och om bärande delar i taket ändras. Vi stämmer av med kommunen innan vi börjar.",
          "Priset beror på takets yta, lutning, material och hur mycket av underlaget som behöver bytas. Vi lämnar offert efter att ha sett taket på plats. " +
            ROT_NOTE,
        ],
      },
    ],
    faq: [
      {
        question: "När på året kan man byta tak?",
        answer:
          "Bäst är från sen vår till tidig höst. Mindre reparationer går att göra även vintertid, men ett helt takbyte planeras helst till barmarkssäsongen.",
      },
      {
        question: "Hur lång tid tar ett takbyte?",
        answer:
          "För en vanlig villa oftast någon eller några veckor, beroende på väder, takets storlek och hur mycket av underlaget som behöver bytas.",
      },
      {
        question: "Behöver jag vara hemma under takbytet?",
        answer:
          "Nej, men det är bra om vi når dig om vi hittar något oväntat, till exempel fuktskador i underlaget.",
      },
    ],
    related: ["nybyggnation-tillbyggnad", "totalentreprenad", "renovering"],
    updated: "2026-11-26",
  },
  {
    slug: "totalentreprenad",
    iconKey: "entreprenad",
    name: "Entreprenad & planering",
    metaTitle: "Totalentreprenad i Boden och Luleå | JJ Bygg",
    metaDescription:
      "Vill du ha en kontakt för hela byggprojektet? JJ Bygg tar helhetsansvar som totalentreprenör i Boden och Luleå – planering, samordning och kvalitet.",
    h1: "Totalentreprenad i Boden och Luleå",
    lead:
      "Ett byggprojekt med flera hantverkare kräver någon som håller i trådarna. Som totalentreprenör tar vi ansvaret för planering, samordning och resultat – du har en kontakt från start till slut.",
    sections: [
      {
        heading: "Vad är en totalentreprenad?",
        paragraphs: [
          "I en totalentreprenad ansvarar entreprenören för både utförandet och stora delar av projekteringen. Du beskriver vad du vill ha, och vi tar fram lösningen, anlitar och samordnar alla hantverkare och ser till att resultatet blir som avtalat.",
          "Alternativet är en utförandeentreprenad, där du som beställare själv tar fram ritningar och beskrivningar och vi bygger enligt dem. Båda fungerar – vilken som passar beror på hur mycket du själv vill och kan styra.",
        ],
      },
      {
        heading: "Det här ingår när vi tar helhetsansvar",
        paragraphs: [],
        list: [
          "Genomgång av behov, budget och tidplan",
          "Hjälp med underlag till bygglov och kontakt med kommunen",
          "Upphandling och samordning av el, VVS, mark och andra yrkesgrupper",
          "Löpande avstämningar och en fast kontaktperson",
          "Egenkontroller och dokumentation under bygget",
          "Slutbesiktning och överlämning",
        ],
      },
      {
        heading: "Så går ett projekt till med oss",
        paragraphs: [
          "Allt börjar med ett samtal och ett kostnadsfritt hembesök i Boden, Luleå eller närområdet. Där går vi igenom vad du vill uppnå, vilken budget du har och när projektet behöver vara klart. Utifrån det tar vi fram ett förslag och en offert där det tydligt framgår vad som ingår och vad som inte gör det.",
          "När avtalet är klart gör vi en tidplan som visar i vilken ordning arbetena sker och när du behöver fatta beslut – till exempel om materialval eller inredning. Under bygget har du en fast kontaktperson och får löpande besked om hur arbetet går och om något oväntat dyker upp.",
          "Ändringar under projektets gång är vanliga och inget problem, men de ska alltid stämmas av skriftligt med pris och påverkan på tidplanen innan de utförs. Då vet båda parter vad som gäller när slutfakturan kommer.",
        ],
      },
      {
        heading: "Tydliga avtal skyddar båda parter",
        paragraphs: [
          "För privatpersoner används ofta Hantverkarformuläret, ett standardavtal framtaget av Konsumentverket och branschen. För företag och bostadsrättsföreningar används vanligen branschens allmänna bestämmelser, som AB och ABT. Ett skriftligt avtal med tydlig omfattning, pris, tidplan och betalningsplan är grunden för ett projekt utan överraskningar.",
        ],
      },
      {
        heading: "För privatpersoner och företag",
        paragraphs: [
          "Vi tar uppdrag från både privatpersoner, företag och föreningar i Boden, Luleå och omnejd. För privatpersoner kan ROT-avdrag göras på arbetskostnaden vid om- och tillbyggnad av befintlig bostad.",
          ROT_NOTE,
        ],
      },
    ],
    faq: [
      {
        question: "Blir det dyrare med en totalentreprenör?",
        answer:
          "Samordningen kostar, men den sparar ofta pengar genom färre misstag, bättre planering och att hantverkarna kommer i rätt ordning. Du slipper också själv lägga tid på att jaga och koordinera olika firmor.",
      },
      {
        question: "Tar ni uppdrag från företag och föreningar?",
        answer:
          "Ja. Vi bygger och renoverar åt både privatpersoner, företag och föreningar. Beskriv projektet i offertformuläret så hör vi av oss.",
      },
      {
        question: "Vilket område arbetar ni i?",
        answer:
          "Främst Boden och Luleå med omnejd. Har du ett projekt en bit utanför – hör av dig, så berättar vi om vi kan ta det.",
      },
    ],
    related: ["nybyggnation-tillbyggnad", "renovering", "badrumsrenovering"],
    updated: "2026-11-26",
  },
  // De sex första är de ursprungliga tjänsterna. Ordningen på dem får inte ändras:
  // listor med `links: "services"` (ortsidorna) länkar rad i till SERVICE_PAGES[i],
  // och bara de sex har tjänst×ort-sidor (lib/service-location-content.ts).
  {
    slug: "koksrenovering",
    iconKey: "kok",
    name: "Köksrenovering",
    metaTitle: "Köksrenovering i Boden och Luleå – byta kök | JJ Bygg",
    metaDescription:
      "Renovera eller byta kök i Boden eller Luleå? JJ Bygg river, bygger om och monterar köket och samordnar el och rör. Kostnadsfritt hembesök och offert.",
    h1: "Köksrenovering i Boden och Luleå",
    lead:
      "Nytt kök i ett äldre hus eller bara nya luckor och bänkskiva – vi tar hand om rivning, snickeri och köksmontering och ser till att elektriker och rörmokare kommer i rätt ordning.",
    sections: [
      {
        heading: "Det här gör vi i köket",
        paragraphs: [
          "Vi renoverar kök i villor, radhus, lägenheter och fritidshus i Boden, Luleå och övriga Norrbotten. Ibland räcker det att byta det som syns, ibland ska hela rummet göras om från stommen. Vi gör båda, och säger till om vi tycker att du lägger pengarna på fel sak.",
        ],
        list: [
          "Rivning av gammalt kök, golv och väggbeklädnad",
          "Flytta, ta bort eller bygga nya väggar – till exempel öppna upp mot vardagsrummet",
          "Nytt golv, nya väggytor, tak och lister",
          "Köksmontering: stommar, luckor, bänkskivor, socklar och täcksidor",
          "Inbyggnad av vitvaror och anpassning runt fläkt och ventilation",
          "Byte av enbart luckor, bänkskiva och stänkskydd när stommarna är bra",
        ],
      },
      {
        heading: "Så går en köksrenovering till",
        paragraphs: [
          "Vi börjar med ett hembesök där vi mäter rummet, tittar på var vatten, avlopp, el och ventilation sitter i dag och pratar igenom hur du vill använda köket. Köket köper du var du vill – hos en köksleverantör eller på ett byggvaruhus. Skicka gärna ritningen till oss innan du beställer, så kontrollerar vi att måtten stämmer mot rummet och inte bara mot planritningen.",
          "Sedan följer arbetet en fast ordning. Först rivning, därefter ändringar av väggar. Elektriker och rörmokare drar sitt medan väggarna står öppna. Efter det kommer ytskikten: väggar, tak och det golv som ska ligga under skåpen. Sist monteras stommar, bänkskiva, luckor och vitvaror, och installatörerna kommer tillbaka för att koppla in spis, diskmaskin och blandare.",
          "Bänkskivor i sten och komposit måttas ofta först när stommarna står på plats, och sedan tillkommer leveranstid innan skivan kan monteras. Det räknar vi in i tidplanen från början, så att du vet hur länge du är utan diskbänk.",
          "Under tiden behöver du någonstans att laga mat. De flesta ställer en kokplatta och en mikro i ett annat rum och diskar i badrummet eller tvättstugan. Säg till om du vill att den gamla diskbänken ska sitta kvar så länge det går, så planerar vi rivningen efter det.",
        ],
      },
      {
        heading: "El, vatten och ventilation",
        paragraphs: [
          "Köket är det rum där flest installationer möts på liten yta. Vi gör snickeriet och monteringen och anlitar behöriga installatörer för el och rör. Du har en kontakt, och vi ansvarar för att de kommer vid rätt tillfälle.",
          "Att flytta diskbänken eller spisen till en annan vägg går nästan alltid, men det kostar mer än att låta dem stå kvar eftersom avlopp, vatten och el måste dras om. I äldre hus kan elen behöva ses över när köket får induktionshäll och fler maskiner än det en gång byggdes för. Det tar vi upp redan vid hembesöket, inte när väggen är riven.",
          "Tänk också på ventilationen. Köksfläkten ska fungera ihop med husets övriga ventilation, och i ett kallt klimat där fönstren är stängda större delen av året märks det snabbt om den inte gör det.",
        ],
      },
      {
        heading: "Vad påverkar priset?",
        paragraphs: [
          "Det som väger tyngst är hur mycket som ändras bakom ytan. Ett kök där skåp och vitvaror hamnar på samma platser som förut är betydligt enklare än ett där planlösningen görs om. Därefter kommer valet av kök och bänkskiva, golvmaterial och hur underlaget ser ut när det gamla är rivet – sneda väggar och golv i äldre hus tar tid att räta upp.",
          "Vi lämnar offert efter hembesök, med arbete och material redovisade var för sig. Vill du riva eller måla själv räknar vi med det.",
          ROT_NOTE + " Avdraget gäller arbetet, inte själva köket och vitvarorna.",
        ],
      },
    ],
    faq: [
      {
        question: "Kan ni montera ett kök som jag har köpt själv?",
        answer:
          "Ja. Vi monterar kök oavsett var det är köpt. Låt oss gärna se ritningen före beställning, så hinner vi upptäcka om något mått eller en rördragning behöver ändras.",
      },
      {
        question: "Hur länge är vi utan kök?",
        answer:
          "Det beror på hur mycket som ska göras om och på leveranstiden för kök och bänkskiva. Vid hembesöket får du en tidplan där det framgår vilka veckor köket inte går att använda, och vi hjälps åt att ordna ett tillfälligt kök under tiden.",
      },
      {
        question: "Måste hela köket bytas?",
        answer:
          "Nej. Är stommarna hela och planlösningen fungerar kan det räcka med nya luckor, bänkskiva, stänkskydd och blandare. Vi säger vad vi tycker när vi har sett köket.",
      },
      {
        question: "Gör ni el- och rörarbetet?",
        answer:
          "El och rör utförs av behöriga installatörer som vi anlitar och samordnar. Snickeri och montering gör vi själva, och du har en kontakt genom hela renoveringen.",
      },
    ],
    related: ["renovering", "golvlaggning", "totalrenovering", "badrumsrenovering"],
    updated: "2026-11-26",
  },
  {
    slug: "totalrenovering",
    iconKey: "totalrenovering",
    name: "Totalrenovering",
    metaTitle: "Totalrenovering i Boden och Luleå – renovera hus | JJ Bygg",
    metaDescription:
      "Ska du renovera hus i Boden eller Luleå? JJ Bygg totalrenoverar villor och fritidshus – rivning, snickeri, ytskikt och samordning av el och rör.",
    h1: "Totalrenovering av hus i Boden och Luleå",
    lead:
      "När flera rum, installationerna och kanske planlösningen ska göras om samtidigt lönar det sig att behandla huset som ett enda projekt. Vi planerar ordningen, gör byggarbetet och håller ihop övriga hantverkare.",
    sections: [
      {
        heading: "När är det en totalrenovering?",
        paragraphs: [
          "Vi kallar det totalrenovering när större delen av huset berörs: ytskikt i alla rum, kök och badrum, och ofta även el, rör och isolering. Det är vanligt när man har köpt ett äldre hus som inte är rört på länge, när man tar över ett föräldrahem eller när en fritidsstuga ska bli åretruntbostad.",
          "Gränsen går ungefär där arbetena börjar påverka varandra – när golvet i hallen inte kan läggas förrän köket är rivet och elen är omdragen. Ska du göra om ett rum i taget passar sidorna om de enskilda arbetena bättre.",
        ],
        list: [
          "Rivning ner till stomme där det behövs",
          "Ny planlösning – flyttade väggar, nya dörröppningar, inredd vind eller källare",
          "Tilläggsisolering och nya fönster när väggarna ändå är öppna",
          "Nytt kök och nya badrum",
          "Golv, väggar, tak, lister och innerdörrar i hela huset",
        ],
        serviceLinks: [{ slug: "koksrenovering" }, { slug: "badrumsrenovering" }, { slug: "golvlaggning" }],
      },
      {
        heading: "Ordningen avgör",
        paragraphs: [
          "En invändig renovering av ett helt hus går från det som inte syns till det som syns: rivning, ändringar i stommen, el och rör, isolering och skivor, våtrum, målning, golv och till sist kök, lister och dörrar. Byts ordningen får något rivas upp igen.",
          "Efter rivningen stannar vi upp och går igenom huset tillsammans med dig. Det är först då man ser hur stommen mår, om det finns fukt i syllar eller bjälklag och hur gamla installationerna faktiskt är. Offerten bygger på det som går att se vid hembesöket. Det som dyker upp bakom ytan prissätter vi skriftligt innan vi går vidare, så att du kan välja.",
          "Bärande väggar kan flyttas eller öppnas, men det kräver en konstruktionslösning och normalt en anmälan till kommunen innan arbetet börjar. Detsamma gäller väsentliga ändringar av ventilation, vatten och avlopp samt nya eldstäder. Vi hjälper till med underlaget till Bodens eller Luleå kommun.",
        ],
      },
      {
        heading: "Äldre hus i Norrbotten",
        paragraphs: [
          "Många villor i Boden och Luleå har renoverats i omgångar sedan de byggdes. Bakom en vägg kan det sitta flera lager skivor och tapeter, och i en del hus finns material som måste hanteras på särskilt sätt vid rivning. Är det osäkert vad en skiva eller matta innehåller tas prov innan den rivs.",
          "Kylan gör att energifrågan väger tyngre här än längre söderut. När väggar och vindsbjälklag ändå är åtkomliga är det ett bra tillfälle att tilläggsisolera och täta, men det måste göras så att fukt inte stängs in i konstruktionen. Ett äldre hus som görs tätare behöver också fungerande ventilation. Vi går igenom vad som är rimligt för just ditt hus i stället för att isolera så mycket som får plats.",
          "I äldre villor är vatten- och avloppsrören ofta lika gamla som huset. Ska badrum och kök ändå göras om brukar det vara läge att byta rören samtidigt – ett stambyte i villaskala. Det gör en behörig VVS-installatör som vi samordnar, liksom elektrikern som ser över elcentral och ledningar.",
          "Vintern är ingen nackdel för invändigt arbete. Så länge huset är tätt och uppvärmt renoverar vi inne året runt, och utvändiga delar som fönster och fasad lägger vi till barmarksperioden.",
        ],
      },
      {
        heading: "Vad påverkar priset?",
        paragraphs: [
          "Husets yta spelar roll, men mindre än man tror. Det som styr är hur djupt renoveringen går: om det räcker med nya ytor eller om stomme, isolering och installationer ska åtgärdas, hur många våtrum huset har och om planlösningen ändras. Materialvalen i kök, badrum och golv är den del du själv påverkar mest.",
          "Vi lämnar en offert där arbete och material redovisas var för sig och där det står vad som inte ingår. Större projekt delar vi gärna upp i etapper med avstämning efter varje, och vill du att vi tar hela ansvaret inklusive installatörer gör vi det som totalentreprenad.",
          ROT_NOTE + " Äger ni huset tillsammans kan var och en använda sitt avdrag.",
        ],
      },
    ],
    faq: [
      {
        question: "Kan vi bo kvar under en totalrenovering?",
        answer:
          "Under de tyngsta veckorna – rivningen, och när kök och badrum är ur bruk samtidigt – är det oftast bättre att bo någon annanstans. Går det att renovera ett plan i taget kan man ibland bo kvar hela tiden. Vi lägger upp tidplanen efter vad som fungerar för er.",
      },
      {
        question: "Hur lång tid tar det att renovera ett helt hus?",
        answer:
          "Det beror på hur mycket som ska göras bakom ytskikten och på leveranstider för kök, fönster och badrumsinredning. Räkna i månader snarare än veckor. Du får en tidplan med etapper tillsammans med offerten.",
      },
      {
        question: "Ska man renovera allt på en gång eller i etapper?",
        answer:
          "Allt på en gång går fortast och ger minst dubbelarbete. Etapper sprider kostnaden men kräver att ordningen är genomtänkt, så att det som blev klart förra året inte måste rivas upp. Vi hjälper dig att lägga etapperna i rätt följd.",
      },
      {
        question: "Vad gör ni själva och vad anlitar ni andra för?",
        answer:
          "Byggarbetet – rivning, snickeri och montering – gör vi själva. El och rör utförs av behöriga installatörer, och vi samordnar dem så att du har en kontakt.",
      },
    ],
    related: ["renovering", "koksrenovering", "badrumsrenovering", "fasad-tillaggsisolering", "totalentreprenad"],
    updated: "2026-11-26",
  },
  {
    slug: "golvlaggning",
    iconKey: "golv",
    name: "Golvläggning",
    metaTitle: "Golvläggning i Boden och Luleå – lägga golv | JJ Bygg",
    metaDescription:
      "Lägga golv i Boden eller Luleå? JJ Bygg lägger parkett, klickgolv och fiskbensparkett, river gamla golv och riktar underlaget. Kostnadsfri offert.",
    h1: "Golvläggning i Boden och Luleå",
    lead:
      "Ett golv blir aldrig bättre än underlaget det ligger på. Vi river det gamla, riktar upp det som behöver riktas och lägger parkett, klickgolv eller fiskbensmönster med lister som sluter tätt.",
    sections: [
      {
        heading: "Golv vi lägger",
        paragraphs: [
          "Vi lägger trägolv och andra torra golv i bostäder, fritidshus och lokaler i Boden, Luleå och övriga Norrbotten – från ett enstaka sovrum till alla golv i ett hus.",
        ],
        list: [
          "Parkett – flerskiktsparkett med klickfog eller limmad mot underlaget",
          "Fiskbensparkett och andra mönsterlagda golv",
          "Klickgolv i laminat och vinyl",
          "Massiva trägolv",
          "Rivning av gamla golv, avjämning och nya golvskivor",
          "Golvlister, trösklar och anpassning av dörrar",
        ],
        after: [
          "Golv i badrum och andra våtrum är en annan sak, eftersom de kräver tätskikt. Det beskriver vi på sidan om badrumsrenovering.",
        ],
        serviceLinks: [{ slug: "badrumsrenovering" }],
      },
      {
        heading: "Underlaget först",
        paragraphs: [
          "Det mesta av jobbet i en golvläggning syns inte när den är klar. Ett klickgolv på ojämnt underlag börjar knarra och fogarna kan släppa, och en limmad parkett kräver ännu planare yta. Därför börjar vi med att kontrollera underlaget med rätskiva och åtgärdar det som behövs – slipar, spacklar, skruvar fast skivor som rör sig eller lägger nya.",
          "Ligger det flera gamla golv ovanpå varandra river vi oftast ut dem. Det ger rätt höjd mot trösklar och andra rum, och vi får se hur undergolvet mår. På betongplattor och i källare kontrolleras fukten innan något trägolv läggs, och en fuktspärr läggs där golvtypen kräver det.",
          "Lister och trösklar tas bort innan golvet läggs. Gamla lister går ibland att återanvända, men ofta blir det snyggare med nya som täcker rörelsefogen ordentligt.",
          "Har du eller vill du ha golvvärme väljer vi ett golv som är godkänt för det. Alla trägolv tål inte värmen, och tjocka golv släpper igenom den sämre. Elektrisk golvvärme kopplas in av behörig elektriker.",
        ],
      },
      {
        heading: "Klickgolv, parkett eller fiskben?",
        paragraphs: [
          "Klickgolv i laminat eller vinyl är tåligt, går fort att lägga och passar i hallar, kök och barnrum där slitaget är störst. Flerskiktsparkett ger en riktig träyta och kan slipas om – hur många gånger beror på slitskiktets tjocklek. Ett massivt trägolv håller mycket länge men rör sig mer med årstiderna.",
          "Fiskbensparkett läggs stav för stav från en mittlinje, och varje vägg, dörröppning och tröskel måste passas in mot mönstret. Det tar längre tid än ett rakt lagt golv och ger mer spill, vilket märks på både arbetstid och materialåtgång. Resultatet avgörs i början: är första raden en aning sned syns det i hela rummet.",
          "Oavsett golvtyp bestämmer vi läggriktning och var skarvar och övergångar hamnar innan vi börjar, så att golvet löper snyggt genom dörröppningar och mellan rum.",
        ],
      },
      {
        heading: "Trägolv och torr vinterluft",
        paragraphs: [
          "Trä tar upp och avger fukt. I Norrbotten är inomhusluften mycket torr under de kalla månaderna och fuktigare på sommaren, så ett trägolv krymper och sväller mer här än i ett mildare klimat. Vi låter golvet ligga i rummet och anpassa sig innan det läggs, följer tillverkarens anvisningar om rörelsefog mot väggar och trösklar och delar av stora ytor där det behövs. Små springor mellan brädorna i februari är normalt och går tillbaka till sommaren.",
          "Efter gjutning eller spackling måste byggfukten hinna torka ut innan trägolvet kommer in. Golv som läggs för tidigt är en vanlig orsak till att brädor reser sig, så hellre några dagars väntan än ett golv som måste läggas om.",
        ],
      },
      {
        heading: "Vad påverkar priset?",
        paragraphs: [
          "Ytan är utgångspunkten, men underarbetet avgör ofta mer: om gamla golv ska rivas, hur mycket som behöver avjämnas och hur många dörröppningar, hörn och trappsteg som ska passas in. Mönsterläggning tar längre tid än rak läggning. Golvmaterialet väljer du själv, och där är spannet stort.",
          "Vi mäter upp på plats och lämnar offert med arbete och material var för sig. " + ROT_NOTE,
        ],
      },
    ],
    faq: [
      {
        question: "Kan man lägga nytt golv ovanpå det gamla?",
        answer:
          "Ibland. Ett plant och fast golv kan fungera som underlag för klickgolv, men höjden mot trösklar, dörrar och angränsande rum måste stämma. Gamla plastmattor och golv som sviktar river vi hellre ut. Vi avgör det när vi har sett golvet.",
      },
      {
        question: "Vad är skillnaden mellan klickgolv och limmad parkett?",
        answer:
          "Ett klickgolv ligger löst – flytande – på ett underlagsmaterial och hålls ihop av fogarna. Limmad parkett sitter fast i undergolvet, känns stummare att gå på och leder golvvärme bra, men ställer högre krav på underlaget och tar längre tid att lägga.",
      },
      {
        question: "Lägger ni golv som jag har köpt själv?",
        answer:
          "Ja. Hör av dig innan du beställer, så räknar vi ut åtgången med rätt spillmarginal och kontrollerar att golvet passar underlaget och eventuell golvvärme.",
      },
      {
        question: "Hur snart kan vi möblera?",
        answer:
          "Ett klickgolv går att gå på direkt och kan möbleras när listerna sitter. Limmade och ytbehandlade golv behöver härda först. Hur länge står i tillverkarens anvisning, och vi säger till vad som gäller för ditt golv.",
      },
    ],
    related: ["renovering", "koksrenovering", "totalrenovering", "snickare"],
    updated: "2026-11-26",
  },
  {
    slug: "bastu",
    iconKey: "bastu",
    name: "Bastu",
    metaTitle: "Bygga bastu i Boden och Luleå – bastubygge | JJ Bygg",
    metaDescription:
      "Bygga bastu inomhus eller på tomten i Boden eller Luleå? JJ Bygg bygger och renoverar bastur – panel, lavar, isolering och ventilation.",
    h1: "Bygga bastu i Boden och Luleå",
    lead:
      "En bastu i källaren, intill badrummet eller som egen stuga på tomten. Vi bygger nya bastur och renoverar gamla, med isolering, ventilation och träslag som är valda för värmen.",
    sections: [
      {
        heading: "Bastur vi bygger",
        paragraphs: [
          "I Norrbotten hör bastun till huset för många, och vi bygger den där den får plats: i ett hörn av källaren, i ett utbyggt badrum, på vinden under snedtaket eller som fristående byggnad vid huset eller stugan.",
        ],
        list: [
          "Bastu inomhus – i källare, badrum, tvättstuga eller på vind",
          "Fristående bastu och bastustuga på tomten, med eller utan omklädningsrum",
          "Vedeldad bastu vid fritidshus",
          "Renovering av äldre bastu – ny panel, nya lavar, nytt aggregat",
          "Bastudörrar, glaspartier och belysning",
        ],
      },
      {
        heading: "Så bygger vi en bastu inomhus",
        paragraphs: [
          "En bastu är ett litet rum med hårda krav. Väggar och tak isoleras med material som tål värmen, och innanför isoleringen sätts en ångspärr av aluminiumfolie med tejpade skarvar så att fukten inte vandrar ut i husets stomme. Därefter kommer en luftspalt, och sist panelen.",
          "Till panel och lavar används träslag som tål värme och fukt utan att kåda eller bli för heta mot huden. Asp, al och värmebehandlat trä är vanliga val. Lavarna bygger vi på plats efter rummets mått, så att sitthöjden hamnar rätt i förhållande till aggregatet och taket – det är uppe under taket värmen finns.",
          "Ventilationen avgör om bastun blir behaglig eller kvav. Tilluften tas in vid aggregatet och frånluften placeras så att luften hinner cirkulera genom rummet. Efter badet ska bastun kunna torka ut ordentligt, annars får panelen kort livslängd.",
          "Golvet i duschen och utrymmet utanför bastun är våtrum och byggs med tätskikt som i ett badrum. Ligger bastun i ett badrum som ändå ska renoveras gör vi båda på samma gång.",
        ],
        serviceLinks: [{ slug: "badrumsrenovering" }],
      },
      {
        heading: "Elaggregat eller vedeldat",
        paragraphs: [
          "Ett elektriskt bastuaggregat väljs efter rummets volym. Stora glasytor och oisolerade väggar av sten eller betong kräver mer effekt. Aggregatet ansluts av behörig elinstallatör, som vi anlitar, och tillverkarens skyddsavstånd till lavar och väggar styr hur vi bygger runt det.",
          "En vedeldad bastuugn ger en annan värme och fungerar utan el, vilket gör den vanlig vid stugor. Den kräver skorsten och skydd mot brännbart material. En ny eldstad ska anmälas till kommunen innan den installeras och besiktas innan den får användas. Vi hjälper till med underlaget.",
        ],
      },
      {
        heading: "Fristående bastu: bygglov och placering",
        paragraphs: [
          "En bastustuga på tomten räknas som en komplementbyggnad. Mindre sådana kan ofta byggas utan bygglov, men reglerna för bygglovsbefriade åtgärder ändrades den 1 december 2025, och vad som gäller beror på byggnadens storlek, avståndet till tomtgränsen och detaljplanen. Vi stämmer av med Bodens eller Luleå kommun vad som gäller för just din tomt innan något byggs.",
          "Många vill ha bastun nära vattnet. Där gäller ofta strandskydd, och då kan det behövas dispens från kommunen även för en liten byggnad. Ta reda på det tidigt – det är svårt att lösa i efterhand.",
          "En fristående bastu behöver en grund som klarar djup tjäle och ett tak som bär stora snölaster, precis som andra byggnader här uppe. Tänk också på vägen dit i januari: en bastu som ligger nära huset, med en gång som är lätt att skotta, blir använd året runt.",
        ],
      },
      {
        heading: "Vad påverkar priset?",
        paragraphs: [
          "Storlek, träslag i panel och lavar, val av aggregat och hur mycket glas du vill ha. För en bastu inomhus spelar det stor roll vad som finns i rummet i dag – om väggar ska byggas, om el måste dras fram och om golvet behöver tätskikt. För en fristående bastu tillkommer grund, tak, ytterväggar och eventuell skorsten.",
          "Vi lämnar offert efter att ha sett platsen. " +
            ROT_NOTE +
            " Det gäller en bastu som byggs eller renoveras i din befintliga bostad. En helt ny fristående bastubyggnad räknas som nybyggnation och ger inte ROT-avdrag.",
        ],
      },
    ],
    faq: [
      {
        question: "Kan man bygga bastu i ett vanligt badrum?",
        answer:
          "Ja, om ytan räcker. Bastun byggs som ett eget isolerat rum i rummet, och golv och väggar runt omkring ska ha tätskikt. Enklast är att göra det när badrummet ändå renoveras.",
      },
      {
        question: "Hur stor behöver en bastu vara?",
        answer:
          "Det viktiga är lavarna. Vill du kunna ligga ner behöver en lave vara lika lång som du, och för två personer som sitter räcker en liten bastu långt. Vi ritar lavarna efter hur många ni brukar vara och efter takhöjden.",
      },
      {
        question: "Går det att renovera en gammal bastu i stället för att bygga ny?",
        answer:
          "Oftast. Panel, lavar och aggregat kan bytas var för sig. När panelen ändå är nere kontrollerar vi isolering och ångspärr, eftersom det är där äldre bastur brukar ha brister.",
      },
      {
        question: "Behövs bygglov för en bastu på tomten?",
        answer:
          "Det beror på storlek, placering och detaljplan, och nära vatten även på strandskyddet. Reglerna för bygglovsbefriade byggnader ändrades den 1 december 2025. Vi stämmer av med Bodens eller Luleå kommun innan vi börjar.",
      },
    ],
    related: ["badrumsrenovering", "renovering", "attefallshus-friggebod", "snickare"],
    updated: "2026-11-26",
  },
  {
    slug: "garage-carport",
    iconKey: "garage",
    name: "Garage & carport",
    metaTitle: "Bygga garage i Boden och Luleå – carport | JJ Bygg",
    metaDescription:
      "Bygga garage, carport eller förråd i Boden eller Luleå? JJ Bygg bygger från grund till port, för norrbottnisk snö och tjäle. Kostnadsfri offert.",
    h1: "Bygga garage och carport i Boden och Luleå",
    lead:
      "Bil, skoter, släp och vinterdäck ska få plats, och porten ska gå att öppna även efter en natts snöfall. Vi bygger garage, carportar och förråd från grund till färdig byggnad.",
    sections: [
      {
        heading: "Det här bygger vi",
        paragraphs: [
          "Vi bygger garage, carportar och förråd åt villaägare och fritidshusägare i Boden, Luleå och övriga Norrbotten. De flesta bygger vi på plats efter ritning, och har du köpt en byggsats monterar vi den.",
        ],
        list: [
          "Enkel- och dubbelgarage, fristående eller ihopbyggda med huset",
          "Varmgarage med isolering, eller kallgarage",
          "Carport, med eller utan förråd i bakkant",
          "Fristående förråd, vedbod och skoterbod",
          "Ombyggnad av befintligt garage – ny port, nytt tak, isolering",
        ],
      },
      {
        heading: "Från platta till port",
        paragraphs: [
          "Ett garage börjar med marken. Matjorden schaktas bort, en bärande och dränerande bädd läggs ut och plattan gjuts med isolering som håller tjälen borta från konstruktionen. Markarbetet samordnar vi med maskinentreprenör, och gjutningen gör vi under barmarksperioden.",
          "När plattan har härdat reser vi stommen, lägger tak och klär väggarna. Takstolarna dimensioneras för snölasten på orten – ett garagetak har ofta låg lutning och får bära mycket snö en hel vinter. Sist kommer port, dörrar, fönster och plåtdetaljer, och elen dras in av behörig elektriker.",
          "En carport är enklare: stolpar, bärlinor och tak. Men stolparna måste stå på en grund som inte rör sig med tjälen, och taket ska klara samma snö som ett garage. En carport som är byggd för klent brukar visa det efter första riktiga snövintern.",
          "Ett förråd eller en vedbod klarar sig ofta med plintar eller en enkel bädd i stället för gjuten platta. Ska det stå tunga saker där, som en skoter eller en fyrhjuling, bygger vi golvet för den lasten.",
        ],
        serviceLinks: [{ slug: "grund-betongplatta" }],
      },
      {
        heading: "Val som är svåra att ändra i efterhand",
        paragraphs: ["Några saker lönar det sig att bestämma innan ritningen är klar:"],
        list: [
          "Storlek. Mät inte bara bilen – räkna med öppna dörrar, takbox, släpvagn och hyllor längs väggen.",
          "Portens höjd och bredd. En skoter på släp eller en högre bil kräver mer än standardmått.",
          "Varmt eller kallt. Ska garaget värmas upp isoleras platta, väggar och tak från början; att göra det senare blir dyrare.",
          "Fall i golvet. Smältvatten från bilen ska rinna undan och inte bli stående mot väggarna.",
          "El. Tänk på motorvärmare, laddbox och belysning innan väggarna kläs.",
          "Snön. Placera porten så att uppfarten går att ploga och så att snön från taket inte rasar ner framför den.",
        ],
      },
      {
        heading: "Bygglov och placering",
        paragraphs: [
          "Ett garage eller en carport kräver i många fall bygglov. Mindre komplementbyggnader kan få byggas utan lov, men reglerna för bygglovsbefriade åtgärder ändrades den 1 december 2025, och vad som gäller beror på byggnadens storlek, hur nära tomtgränsen den hamnar och vad detaljplanen säger. Vi stämmer av med Bodens eller Luleå kommun vad som gäller för just din tomt innan vi ritar färdigt.",
          "Ska byggnaden stå nära grannens gräns behövs i regel grannens medgivande, och nära väg kan kommunen ha synpunkter på utfarten. Räkna med handläggningstiden när du planerar: hör av dig under vintern om garaget ska stå klart till hösten.",
        ],
      },
      {
        heading: "Vad påverkar priset?",
        paragraphs: [
          "Storleken, om garaget ska vara isolerat, markförhållandena på tomten och valet av port, fasad och tak. Dålig mark eller berg gör grunden dyrare än byggnadens storlek antyder. En carport kostar mindre än ett garage eftersom väggar, port och ofta platta faller bort. Byggs garaget ihop med huset tillkommer anslutningen mot befintlig vägg och tak.",
          "Vi lämnar offert efter att ha sett tomten. ROT-avdrag ges inte för nybyggnation, och dit räknas ett helt nytt fristående garage eller en ny carport.",
          "Annorlunda är det om du renoverar eller bygger om ett garage som redan står på tomten. " + ROT_NOTE,
        ],
      },
    ],
    faq: [
      {
        question: "Behöver jag bygglov för garage eller carport?",
        answer:
          "Ofta, men inte alltid. Det beror på storlek, placering och detaljplan, och reglerna för bygglovsbefriade byggnader ändrades den 1 december 2025. Vi stämmer av med Bodens eller Luleå kommun innan bygget planeras.",
      },
      {
        question: "När på året bygger ni garage?",
        answer:
          "Mark och gjutning gör vi under barmarksperioden. Är plattan gjuten före vintern kan stomme, tak och inredning byggas även när det är kallt.",
      },
      {
        question: "Kan garaget byggas ihop med huset?",
        answer:
          "Ja. Då räknas det som en tillbyggnad, och väggen mot bostaden får brandkrav som påverkar material och dörrar. I gengäld får du en varm väg in till bilen.",
      },
      {
        question: "Får man ROT-avdrag för ett nytt garage?",
        answer:
          "Inte för ett helt nytt fristående garage, eftersom det räknas som nybyggnation. Vid renovering eller ombyggnad av ett befintligt garage kan avdraget gälla. Kontrollera aktuella regler på skatteverket.se.",
      },
    ],
    related: ["nybyggnation-tillbyggnad", "grund-betongplatta", "attefallshus-friggebod", "takbyte-platarbeten"],
    updated: "2026-11-26",
  },
  {
    slug: "grund-betongplatta",
    iconKey: "grund",
    name: "Grund & betongplatta",
    metaTitle: "Gjuta platta & husgrund i Boden och Luleå | JJ Bygg",
    metaDescription:
      "Husgrund eller betongplatta i Boden eller Luleå? JJ Bygg gjuter platta på mark till hus, garage och tillbyggnader – isolerat mot tjäle. Kostnadsfri offert.",
    h1: "Husgrund och gjuten betongplatta i Boden och Luleå",
    lead:
      "Grunden är den del av bygget som är svårast att rätta till i efterhand. Vi formsätter, armerar och gjuter plattor till hus, garage och tillbyggnader, och bygger dem för mark som fryser djupt.",
    sections: [
      {
        heading: "Grunder vi gör",
        paragraphs: [
          "Vi gjuter betongplattor och bygger grunder i Boden, Luleå och övriga Norrbotten. Ofta är grunden första delen av ett bygge som vi sedan fortsätter med, men vi gjuter också åt den som bygger resten själv eller har köpt ett hus som levereras till färdig grund.",
        ],
        list: [
          "Platta på mark till villor och fritidshus",
          "Garageplatta och platta till carport, förråd och attefallshus",
          "Grund till tillbyggnad, anpassad mot husets befintliga grund",
          "Plintgrund till mindre byggnader, altaner och stugor",
          "Kantelement, isolering, armering och ingjutning av rör",
        ],
      },
      {
        heading: "Så går en gjutning till",
        paragraphs: [
          "Arbetet börjar med utsättning: var byggnaden ska stå och på vilken höjd. Därefter schaktas matjord och tjälfarligt material bort och ersätts med ett bärande lager av krossmaterial som packas i omgångar. Dränering och rör för vatten, avlopp och el läggs innan något gjuts. Schakt och fyllning samordnar vi med maskinentreprenör.",
          "På den packade bädden lägger vi isolering och kantelement eller formvirke, och sedan armering. Rör och slangar som ska upp genom plattan fixeras på rätt ställen. De måste stämma mot husritningen, för efter gjutningen går de inte att flytta. Ska huset ha vattenburen golvvärme läggs slingorna av VVS-installatören innan betongen kommer.",
          "Betongen levereras med bil, fördelas och dras av till rätt höjd, och ytan bearbetas efter vad som ska ligga på den. Sedan ska plattan härda. Den hålls fuktig eller täcks de första dygnen, och formen rivs när kanterna bär.",
          "Innan vi lämnar över plattan kontrollerar vi mått, diagonaler och höjder mot ritningen, så att nästa led kan börja direkt.",
        ],
      },
      {
        heading: "Tjäle och byggsäsong",
        paragraphs: [
          "I Norrbotten går tjälen djupt. Fryser marken under en grund kan den lyfta, och när den tinar sätter den sig ojämnt – det är så sprickor i väggar och dörrar som kärvar uppstår. En platta på mark skyddas genom att tjälfarligt material byts ut, att vatten leds bort och att isolering läggs både under plattan och ut från kanten, så att kylan inte når in under byggnaden. Ouppvärmda byggnader som kallgarage och carportar är mest utsatta, eftersom ingen värme läcker ner i marken.",
          "Vid en tillbyggnad anpassar vi den nya grunden mot den gamla, så att de två delarna rör sig så lika som möjligt och skarven mellan dem inte spricker upp.",
          "Vi gjuter helst under barmarksperioden. Betong som fryser innan den har härdat tappar hållfasthet, så vintergjutning kräver uppvärmning och täckning och blir dyrare. Planera grunden så att den är klar före frosten – stommen kan resas senare.",
          "Ligger tomten på lera eller silt, eller i en sluttning, kan en geoteknisk undersökning behövas innan grundläggningen bestäms. Det bedömer vi när vi har sett platsen.",
        ],
      },
      {
        heading: "Lov, mått och ansvar",
        paragraphs: [
          "En grund hör alltid till en byggnad, och det är byggnaden som prövas av kommunen. För de flesta nybyggen och tillbyggnader krävs bygglov och startbesked innan arbetet får börja, och kommunen kan kräva att byggnadens läge sätts ut av en mätningstekniker. Vi gjuter inte förrän startbeskedet finns.",
          "Har du köpt ett hus från en hustillverkare gjuter vi efter deras grundritning. Stäm av tidigt vem som ansvarar för mått, rörlägen och toleranser, så att huset passar när det kommer.",
        ],
      },
      {
        heading: "Vad påverkar priset?",
        paragraphs: [
          "Plattans yta är bara en del. Lika mycket avgör marken: hur mycket som måste schaktas bort och fyllas, om det finns berg eller mycket vatten och hur långt massorna ska köras. Därtill kommer isoleringens tjocklek, mängden armering, antalet rör som ska gjutas in och om plattan ska ha golvvärme. Framkomligheten för betongbilen spelar också in.",
          "Vi tittar på tomten innan vi lämnar offert. ROT-avdrag ges inte för nybyggnation, så grunden till ett nytt hus eller ett nytt fristående garage omfattas inte. För grundarbeten på ett befintligt hus kan reglerna se annorlunda ut – kontrollera på skatteverket.se eller fråga oss.",
        ],
      },
    ],
    faq: [
      {
        question: "När på året kan man gjuta en platta?",
        answer:
          "Bäst under barmarksperioden, från senvår till tidig höst. Det går att gjuta när det är kallt, men då måste betongen hållas varm tills den har härdat, och det kostar extra.",
      },
      {
        question: "Hur snart kan man bygga på plattan?",
        answer:
          "Stommen kan oftast börja resas inom någon vecka, beroende på temperaturen. Betongen fortsätter sedan att torka länge, och innan trägolv eller täta mattor läggs ska fukten i plattan kontrolleras.",
      },
      {
        question: "Gjuter ni även om någon annan bygger huset?",
        answer:
          "Ja. Vi gjuter efter din eller husleverantörens grundritning och lämnar över en färdig platta.",
      },
      {
        question: "Platta på mark eller plintar?",
        answer:
          "Bostadshus och garage byggs i regel på platta. Plintar passar lättare byggnader som altaner, förråd och enklare stugor. De måste stå frostfritt eller tjälisoleras för att inte lyfta.",
      },
    ],
    related: ["nybyggnation-tillbyggnad", "garage-carport", "attefallshus-friggebod", "totalentreprenad"],
    updated: "2026-11-26",
  },
  {
    slug: "fonster-dorrar",
    iconKey: "fonster",
    name: "Fönster & dörrar",
    metaTitle: "Fönsterbyte i Boden och Luleå – byta fönster | JJ Bygg",
    metaDescription:
      "Byta fönster eller ytterdörr i Boden eller Luleå? JJ Bygg mäter, monterar och tätar för norrbottnisk kyla. ROT-avdrag och kostnadsfri offert.",
    h1: "Fönsterbyte och dörrbyte i Boden och Luleå",
    lead:
      "Gamla fönster märks mest i januari: kallras längs golvet, is på insidan av glaset och en värmeräkning som sticker iväg. Vi byter fönster och ytterdörrar och lägger tiden på det som avgör resultatet – drevning, tätning och plåt.",
    sections: [
      {
        heading: "Vad vi byter",
        paragraphs: [
          "Vi byter fönster och dörrar i villor, radhus och fritidshus i Boden, Luleå och övriga Norrbotten – ett enstaka fönster som har ruttnat eller alla på en gång.",
        ],
        list: [
          "Fönster och fönsterdörrar i trä eller med aluminiumklädd utsida",
          "Ytterdörrar, altandörrar och skjutpartier",
          "Nya och förstorade fönsteröppningar",
          "Takfönster",
          "Fönsterbleck, foder, smygar och lister",
          "Innerdörrar och karmar",
        ],
      },
      {
        heading: "Så går ett fönsterbyte till",
        paragraphs: [
          "Vi mäter varje öppning på plats innan något beställs. Fönster tillverkas efter mått och har leveranstid, så beställningen görs i god tid före monteringen. Vid mätningen bestämmer vi också hur fönstren ska sitta i väggen, vilket styr hur smygar och bleck blir.",
          "På monteringsdagen tas det gamla fönstret ut med karmen. Vi kontrollerar virket runt öppningen – det är vanligt att nederkanten har tagit skada av vatten som runnit in bakom ett dåligt bleck – och byter det som är angripet. Det nya fönstret sätts i lod och våg, skruvas och drevas runt om. Fogen tätas på insidan så att fuktig inneluft inte tar sig ut i väggen, och skyddas på utsidan mot regn och vind.",
          "Sist kommer det som syns: nytt fönsterbleck, foder ute och smyg och foder inne. Vi tar ett fönster i taget och sätter det nya samma dag, så att huset inte står öppet över natten.",
        ],
      },
      {
        heading: "Fönster för kallt klimat",
        paragraphs: [
          "Hur bra ett fönster isolerar anges med U-värde – ju lägre, desto mindre värme släpper det ut. Moderna treglasfönster isolerar betydligt bättre än äldre tvåglasfönster, och skillnaden märks tydligast i kallt klimat: mindre drag vid golvet och en glasyta som inte känns kall att sitta intill.",
          "Men ett bra fönster hjälper inte om det sitter dåligt. Otäta fogar runt karmen ger både drag och risk för kondens inne i väggen, och i sträng kyla blir varje glipa kännbar. Därför är drevning och tätning den del av jobbet vi är mest noga med.",
          "Ett äldre hus som får täta fönster förlorar en del av den luft som tidigare kom in genom springorna. Har huset självdrag kan det behövas spaltventiler i de nya fönstren eller annan tilluft. Det går vi igenom innan du beställer.",
          "Fönster går att byta året runt eftersom varje öppning bara står öppen en kort stund, men under den kallaste perioden väljer vi dagar efter vädret. Fogmassor och färg har dessutom temperaturgränser, så det utvändiga kan få vänta till det blir mildare.",
        ],
      },
      {
        heading: "Ytterdörr och altandörr",
        paragraphs: [
          "En ytterdörr ska hålla tätt mot kylan och gå att öppna när det har snöat. Vi byter dörr med karm och tröskel, justerar så att den sluter mot tätningslisten hela vägen runt och ser över trappan och skärmtaket utanför om det behövs. Vid altandörrar och skjutpartier är tröskeln den känsliga punkten: den ska vara tät mot altanen men inte sitta så lågt att snö och smältvatten blir stående mot den.",
        ],
      },
      {
        heading: "Bygglov, pris och ROT",
        paragraphs: [
          "Byter du till fönster som ser ut som de gamla behövs normalt inget bygglov. Ändras husets utseende påtagligt – annan indelning, annan färg, nya öppningar – kan lov krävas inom detaljplan, och i områden med kulturhistoriskt värde är kraven hårdare. Reglerna för vad som får göras utan bygglov ändrades den 1 december 2025, så vi stämmer av med Bodens eller Luleå kommun när något ska ändras utvändigt.",
          "Priset styrs av antal och storlek, material och glas, hur fönstren öppnas och hur mycket som behöver lagas runt öppningarna. Fönster på övervåningen som kräver ställning tar längre tid. Vi lämnar offert efter att ha mätt på plats, med fönster och arbete redovisade var för sig.",
          ROT_NOTE,
        ],
      },
    ],
    faq: [
      {
        question: "Kan man byta fönster på vintern?",
        answer:
          "Ja. Vi byter ett fönster i taget och öppningen står bara öppen en kort stund. Vid sträng kyla flyttar vi hellre dagen, och utvändig fogning och målning kan behöva vänta till mildare väder.",
      },
      {
        question: "Ska man byta eller renovera gamla fönster?",
        answer:
          "Är karmar och bågar friska kan nya tätningslister, kitt och färg räcka långt, särskilt på hus där originalfönstren är en del av utseendet. Är träet rötskadat eller vill du få ner värmeförlusten ordentligt ger ett byte mer. Vi tittar på fönstren och säger vad vi skulle göra.",
      },
      {
        question: "Beställer ni fönstren eller gör jag det själv?",
        answer:
          "Båda går. Beställer vi ansvarar vi för att måtten stämmer. Köper du själv vill vi gärna mäta först – ett fönster som är tillverkat i fel mått går sällan att lämna tillbaka.",
      },
      {
        question: "Hur lång tid tar ett fönsterbyte?",
        answer:
          "Monteringen i en villa tar oftast några dagar till någon vecka, beroende på antal fönster och hur öppningarna ser ut. Leveranstiden från fabrik är i regel längre än själva arbetet, så beställ i god tid.",
      },
    ],
    related: ["fasad-tillaggsisolering", "renovering", "takbyte-platarbeten", "snickare"],
    updated: "2026-11-26",
  },
  {
    slug: "fasad-tillaggsisolering",
    iconKey: "fasad",
    name: "Fasad & tilläggsisolering",
    metaTitle: "Fasadrenovering i Boden och Luleå – byta panel | JJ Bygg",
    metaDescription:
      "Fasadrenovering, panelbyte eller tilläggsisolering i Boden eller Luleå? JJ Bygg byter fasad och isolerar för kallt klimat. Kostnadsfri offert.",
    h1: "Fasadrenovering och tilläggsisolering i Boden och Luleå",
    lead:
      "När panelen ändå ska bytas står väggen öppen, och bättre tillfälle att göra huset varmare kommer inte. Vi byter fasad, lagar det som har tagit skada bakom den och tilläggsisolerar.",
    sections: [
      {
        heading: "Det här gör vi",
        paragraphs: [
          "Vi renoverar fasader på villor, radhus, fritidshus och uthus i Boden, Luleå och övriga Norrbotten. Mest handlar det om träfasader, som är det vanligaste här.",
        ],
        list: [
          "Byte av hela eller delar av träpanelen – liggande, stående eller lockpanel",
          "Lagning av rötskador i panel, knutbrädor, foder och vindskivor",
          "Utvändig tilläggsisolering av ytterväggar i samband med fasadbyte",
          "Tilläggsisolering av vindsbjälklag",
          "Nytt vindskydd och luftspalt bakom panelen",
          "Plåtdetaljer: fönsterbleck, sockelplåt och anslutningar mot tak",
        ],
      },
      {
        heading: "Laga eller byta hela fasaden?",
        paragraphs: [
          "En träpanel som har fått underhåll håller i många decennier. Skadorna kommer där vatten blir stående: nederst mot sockeln, under fönster, vid knutar och där hängrännor har läckt. Är skadorna begränsade till sådana ställen räcker det att byta de brädorna och åtgärda orsaken.",
          "Är panelen sprucken och färgen flagnar över stora ytor, eller saknas luftspalt bakom, lönar det sig sällan att lappa. Har huset en äldre skivfasad kan skivorna innehålla asbest, och sådana får bara tas ner av den som har tillstånd. Det reder vi ut innan något rivs.",
          "Vi går runt huset med dig vid hembesöket och visar vad vi ser. Ofta är de sidor som får mest sol och slagregn i sämre skick än resten, och då går det att ta fasaden i etapper.",
        ],
      },
      {
        heading: "Så bygger vi en ny fasad",
        paragraphs: [
          "Den gamla panelen rivs och vi ser över vad som finns bakom: vindskydd, reglar och syll. Angripet virke byts. Ska väggen tilläggsisoleras läggs isoleringen utanpå den befintliga stommen, vilket bryter köldbryggorna i reglarna och håller den gamla väggen varm och torr. Utanpå det kommer vindskydd, en luftspalt som låter fasaden torka ut och till sist den nya panelen.",
          "En tjockare vägg påverkar allt som ansluter till den. Fönstren hamnar djupare in om de inte flyttas ut, vilket kräver bredare bleck och nya smygar, och takfoten blir kortare i förhållande till väggen. Är fönstren gamla är det klokt att byta dem samtidigt, så att de kan placeras rätt i den nya väggen och ställningen bara behöver resas en gång.",
          "Ändträ och kapsnitt målas innan brädan sätts upp, och panelen avslutas med luft mot sockelplåt och mark så att den inte suger upp vatten.",
        ],
        serviceLinks: [{ slug: "fonster-dorrar" }, { slug: "takbyte-platarbeten" }],
      },
      {
        heading: "Tilläggsisolering i kallt klimat",
        paragraphs: [
          "Med långa vintrar och sträng kyla gör isolering mer nytta här än i större delen av landet, och komforten ändras direkt: varmare väggar inåt ger mindre drag och jämnare temperatur. Vinden är ofta det första man ska titta på, eftersom värmen stiger och bjälklaget är lätt att komma åt.",
          "Isolering måste göras fuktsäkert. När vindsbjälklaget får mer isolering blir vinden kallare, och fuktig inneluft som läcker upp genom otätheter kan då kondensera mot yttertaket. Därför tätar vi genomföringar och vindslucka och kontrollerar att vinden är ventilerad innan vi fyller på. Av samma skäl isolerar vi helst ytterväggar från utsidan.",
          "Utvändigt arbete gör vi under barmarksperioden. Panel ska sättas upp och målas i torrt väder, och färgen har en lägsta temperatur.",
        ],
      },
      {
        heading: "Bygglov, pris och ROT",
        paragraphs: [
          "Att byta fasadmaterial eller färg, eller göra väggen tjockare, kan kräva bygglov inom detaljplan – särskilt om husets utseende ändras tydligt eller området har kulturhistoriskt värde. Reglerna för vad som får göras utan bygglov ändrades den 1 december 2025. Vi stämmer av med Bodens eller Luleå kommun vad som gäller för ditt hus innan material beställs.",
          "Priset beror på fasadens yta och husets höjd, vilken panel du väljer, hur mycket som är skadat bakom och om väggen ska isoleras. Ställningen är en egen post, och den går att dela med ett fönsterbyte eller takarbete som görs samtidigt.",
          ROT_NOTE,
        ],
      },
    ],
    faq: [
      {
        question: "Hur vet jag om panelen behöver bytas?",
        answer:
          "Tryck med en skruvmejsel nederst på brädorna, under fönstren och vid knutarna. Går den lätt in är träet rötskadat. Färg som flagnar ända in till träet och brädor som har kupat sig eller spruckit är andra tecken. Vi tittar gärna på fasaden och säger om det räcker att laga.",
      },
      {
        question: "Går det att tilläggsisolera utan att byta fasad?",
        answer:
          "Vinden går nästan alltid att isolera för sig. Ytterväggar kan isoleras inifrån, men det tar boyta och kräver nya ytskikt och noggrann fuktsäkring. Är panelen i gott skick är det oftast vinden man börjar med.",
      },
      {
        question: "Hamnar fönstren djupt in när väggen blir tjockare?",
        answer:
          "Ja, om de sitter kvar i sitt gamla läge. Antingen byggs smygar och bleck om, eller så flyttas fönstren ut i den nya väggen – enklast i samband med ett fönsterbyte.",
      },
      {
        question: "När på året kan fasaden bytas?",
        answer:
          "Från senvår till tidig höst. Panelen ska vara torr när den monteras och målas, och färgen kräver plusgrader.",
      },
    ],
    related: ["fonster-dorrar", "takbyte-platarbeten", "totalrenovering", "renovering"],
    updated: "2026-11-26",
  },
  {
    slug: "attefallshus-friggebod",
    iconKey: "attefall",
    name: "Attefallshus & friggebod",
    metaTitle: "Attefallshus & friggebod i Boden och Luleå | JJ Bygg",
    metaDescription:
      "Bygga attefallshus, friggebod eller gäststuga i Boden eller Luleå? JJ Bygg bygger på plats, från grund till färdigt hus. Kostnadsfritt hembesök.",
    h1: "Attefallshus och friggebod i Boden och Luleå",
    lead:
      "En gäststuga för sommarbesöken, ett kontor på tomten eller ett litet hus att hyra ut. Vi bygger komplementbyggnader anpassade efter tomten – och efter hur de ska användas i januari.",
    sections: [
      {
        heading: "Byggnader vi bygger",
        paragraphs: [
          "En komplementbyggnad är en mindre, fristående byggnad som hör till ett bostadshus. Vi bygger dem åt hus- och stugägare i Boden, Luleå och övriga Norrbotten, på plats efter ritning eller som monterad byggsats.",
        ],
        list: [
          "Attefallshus som gäststuga, kontor, ateljé eller uthyrningsbostad",
          "Friggebod och förråd",
          "Gäststuga och sovstuga vid fritidshus",
          "Bastustuga",
          "Vedbod, redskapsbod och lekstuga",
        ],
      },
      {
        heading: "Förråd eller bostad – skillnaden är stor",
        paragraphs: [
          "Det som avgör bygget är om huset ska vara uppvärmt och om någon ska bo i det. En friggebod för trädgårdsmöbler kan stå på plintar, ha oisolerade väggar och klara sig utan el. Ett attefallshus som ska användas som bostad året runt är ett litet riktigt hus: isolerad grund, väggar och tak uppbyggda som i en villa, ventilation, kök, badrum med tätskikt och anslutning till vatten, avlopp och el. El och rör utförs av behöriga installatörer som vi samordnar.",
          "Mellan de två finns gäststugan som bara används sommartid och kontoret som värms upp vid behov. Bestäm användningen tidigt, och tänk på vad huset kan bli längre fram. Att dra in vatten eller isolera i efterhand går, men blir dyrare än att förbereda för det från början – till exempel med tomrör i grunden.",
          "Vatten och avlopp är ofta den stora frågan. Har du enskilt avlopp behöver anläggningen klara den extra belastningen, och ändringar kan kräva tillstånd från kommunen. Ledningar i mark ska ligga frostfritt eller skyddas mot frysning.",
        ],
      },
      {
        heading: "Bygglov, anmälan och strandskydd",
        paragraphs: [
          "Attefallshus och friggebodar är exempel på byggnader som kan få uppföras utan bygglov. Reglerna för bygglovsbefriade åtgärder ändrades den 1 december 2025, och vi anger därför inga mått här. Vad du får bygga beror på byggnadens storlek och höjd, hur den ska användas, avståndet till tomtgränsen och vad som redan finns på tomten. Vissa byggnader kräver anmälan och startbesked även när bygglov inte behövs.",
          "Vi stämmer av med Bodens eller Luleå kommun vad som gäller för just din tomt innan vi ritar färdigt. Ska huset stå nära gränsen behövs i regel grannens medgivande, helst skriftligt.",
          "Vid sjöar, älvar och kust gäller strandskydd, och många fritidstomter i Norrbotten ligger inom strandskyddat område. Om dispens behövs, och om den kan ges, avgörs av kommunen. Också det stämmer vi av för din tomt – innan du lägger pengar på ritningar.",
        ],
      },
      {
        heading: "Byggt för vintern",
        paragraphs: [
          "Ett litet hus har stor yta mot det fria i förhållande till volymen och kyls snabbt ut. Ska det användas vintertid lönar sig bra isolering, täta anslutningar och fönster av samma kvalitet som i bostadshuset. Grunden bygger vi så att den klarar djup tjäle: isolerad platta för uppvärmda hus, plintar eller tjälisolerad bädd för de enklare.",
          "Taket dimensioneras för stora snölaster. Låga pulpettak är populära på attefallshus men samlar mycket snö, så takstolar och bärlinor räknas efter orten. Köper du en byggsats: kontrollera före beställning att den är dimensionerad för snölasten där du bor.",
          "Stugor som står ouppvärmda delar av vintern behöver kunna tömmas på vatten, och material och ytskikt ska tåla minusgrader inomhus.",
        ],
        serviceLinks: [{ slug: "grund-betongplatta" }, { slug: "bastu" }],
      },
      {
        heading: "Vad påverkar priset?",
        paragraphs: [
          "Mest avgör om huset ska ha vatten, avlopp, kök och badrum. Ett fullt utrustat attefallshus innehåller samma installationer som en villa på en bråkdel av ytan, och därför blir kostnaden per kvadratmeter högre än för ett vanligt hus. Därefter kommer grundläggning och markförhållanden, hur långt ledningarna ska dras, isoleringsnivå och materialval.",
          "Vi lämnar offert efter hembesök, och vill du att vi tar hela ansvaret med mark, el och rör gör vi det som totalentreprenad. ROT-avdrag ges inte för nybyggnation, och dit räknas ett nytt attefallshus, en ny friggebod eller en ny gäststuga. Kontrollera aktuella regler på skatteverket.se.",
        ],
      },
    ],
    faq: [
      {
        question: "Behöver jag bygglov för attefallshus eller friggebod?",
        answer:
          "Många sådana byggnader kan uppföras utan bygglov, men vissa kräver anmälan och startbesked. Reglerna ändrades den 1 december 2025 och beror på storlek, användning, placering och detaljplan. Vi stämmer av med Bodens eller Luleå kommun vad som gäller för din tomt.",
      },
      {
        question: "Bygger ni på plats eller monterar ni färdiga hus?",
        answer:
          "Båda. Platsbyggt går att anpassa helt efter tomten och efter bostadshusets utseende. En byggsats kan gå fortare, men kontrollera att den är dimensionerad för snölasten här.",
      },
      {
        question: "Kan man bo i ett attefallshus året runt i Norrbotten?",
        answer:
          "Ja, om det byggs som ett bostadshus – med isolerad grund, ordentlig isolering, ventilation och frostskyddade ledningar. En bostad prövas också hårdare av kommunen än ett förråd.",
      },
      {
        question: "Får man ROT-avdrag för ett attefallshus?",
        answer:
          "Inte när det byggs nytt, eftersom ROT-avdrag inte ges för nybyggnation. Kontrollera aktuella regler på skatteverket.se.",
      },
    ],
    related: ["nybyggnation-tillbyggnad", "garage-carport", "grund-betongplatta", "bastu"],
    updated: "2026-11-26",
  },
  {
    slug: "snickare",
    iconKey: "snickare",
    name: "Snickare",
    metaTitle: "Snickare i Boden och Luleå – stora & små jobb | JJ Bygg",
    metaDescription:
      "Behöver du en snickare i Boden eller Luleå? JJ Bygg gör snickeriarbeten inne och ute, små som stora. Kostnadsfritt hembesök och kostnadsfri offert.",
    h1: "Snickare i Boden och Luleå",
    lead:
      "En dörr som ska bytas, en vägg som ska flyttas eller ett helt hus som ska byggas. Vi är snickare i grunden och tar både jobb som är klara på en dag och jobb som tar en säsong.",
    sections: [
      {
        heading: "Snickeriarbeten vi hjälper till med",
        paragraphs: [
          "JJ Bygg & Entreprenad AB är en byggfirma i Boden, registrerad 2010 och godkänd för F-skatt. Vi tar uppdrag i Boden, Luleå och övriga Norrbotten åt privatpersoner, företag och föreningar, och kontaktperson är Jesper Johansson. Det här är exempel på vad du kan anlita oss som snickare för:",
        ],
        list: [
          "Invändigt: innerväggar, undertak, golv, lister, foder och innerdörrar",
          "Montering av kök, garderober och platsbyggd förvaring",
          "Trappor, räcken och inredning av vind eller källare",
          "Utvändigt: panel, vindskivor, foder, fönster och ytterdörrar",
          "Altaner, entrétrappor, staket och skärmtak",
          "Stommar, takstolar och bjälklag vid ny- och tillbyggnad",
          "Lagning av röt- och fuktskador i trä",
        ],
      },
      {
        heading: "Små jobb och stora",
        paragraphs: [
          "Ett vanligt skäl att tveka inför att ringa en byggfirma är att jobbet känns för litet. Det är det sällan. Ett par innerdörrar, en ny trappa till entrén eller lister i ett rum är riktiga snickeriarbeten, och vi säger rakt ut om och när vi kan ta dem. Har du flera småsaker är det klokt att samla dem på en lista, så gör vi dem vid samma tillfälle.",
          "Vid större arbeten – en tillbyggnad, ett nytt tak, en renovering av hela huset – är vi den som håller ihop bygget. Snickeriet gör vi själva, och till el och rör anlitar vi behöriga installatörer. Du har en kontakt oavsett hur många hantverkare som behövs.",
          "Oavsett storlek börjar det på samma sätt: du beskriver vad du vill ha gjort, gärna med ett par bilder, och vi kommer ut och tittar. Hembesöket kostar inget, och inte offerten heller.",
        ],
      },
      {
        heading: "Hitta rätt tjänst",
        paragraphs: [
          "För de vanligaste uppdragen har vi egna sidor som beskriver hur arbetet går till och vad som påverkar priset:",
        ],
        serviceLinks: [
          { slug: "koksrenovering", note: "rivning, ombyggnad och köksmontering" },
          { slug: "golvlaggning", note: "parkett, klickgolv och fiskbensmönster" },
          { slug: "badrumsrenovering", note: "tätskikt, kakel och samordning av rör och el" },
          { slug: "bastu", note: "inomhus eller som egen byggnad på tomten" },
          { slug: "renovering", note: "ytskikt, väggar och ändrad planlösning" },
          { slug: "totalrenovering", note: "när hela huset ska göras om" },
          { slug: "fonster-dorrar", note: "fönsterbyte och nya ytterdörrar" },
          { slug: "fasad-tillaggsisolering", note: "ny panel och varmare väggar" },
          { slug: "takbyte-platarbeten", note: "nytt tak, hängrännor och plåtdetaljer" },
          { slug: "altan-uteplats", note: "trädäck, uterum och staket" },
          { slug: "nybyggnation-tillbyggnad", note: "tillbyggnader och nya hus" },
          { slug: "garage-carport", note: "garage, carport och förråd" },
          { slug: "attefallshus-friggebod", note: "gäststugor och andra komplementbyggnader" },
          { slug: "grund-betongplatta", note: "husgrund och gjutna plattor" },
          { slug: "totalentreprenad", note: "en kontakt för hela projektet" },
        ],
        after: [
          "Hittar du inte ditt jobb i listan betyder det inte att vi inte gör det. Ring eller skriv några rader i offertformuläret.",
        ],
      },
      {
        heading: "Trä i norrbottniskt klimat",
        paragraphs: [
          "Att snickra här uppe innebär att räkna med årstiderna. Inomhusluften är mycket torr under vintern och fuktigare på sommaren, så trä rör sig. Lister, golv och dörrar ska monteras med plats att röra sig, annars spricker fogarna i februari. Utvändigt ska konstruktionerna klara djup tjäle och stora snölaster, och allt trä ska kunna torka upp efter snösmältningen.",
          "Säsongen styr också planeringen. Utvändiga jobb – altaner, fasader, tak och grunder – gör vi under barmarksperioden, och den blir fort fullbokad. Invändigt snickeri gör vi året runt, och vintern är ofta rätt tid för kök, golv och inredning. Hör av dig i god tid om jobbet måste göras en viss månad.",
        ],
      },
      {
        heading: "Vad påverkar priset?",
        paragraphs: [
          "Det som avgör är tiden jobbet tar, materialet och hur lätt det är att komma åt. Ett arbete på hög höjd som kräver ställning kostar mer än samma arbete i markplan, och i äldre hus tar det tid att anpassa nytt mot gammalt. Du får en skriftlig offert innan vi börjar, med arbete och material var för sig.",
          ROT_NOTE + " Avdraget gäller reparation, underhåll samt om- och tillbyggnad av en bostad du äger – inte nybyggnation.",
        ],
      },
    ],
    faq: [
      {
        question: "Tar ni små snickerijobb?",
        answer:
          "Ja. Beskriv jobbet i offertformuläret eller ring, så säger vi om och när vi kan ta det. Har du flera mindre saker gör vi dem gärna vid samma tillfälle.",
      },
      {
        question: "Vad är skillnaden mellan en snickare och en byggfirma?",
        answer:
          "Snickaren är hantverkaren som bygger i trä. En byggfirma har snickare men tar också ansvar för hela projektet: planering, material, andra hantverkare och kontakten med kommunen. Hos oss får du båda.",
      },
      {
        question: "Hur snabbt kan ni komma?",
        answer:
          "Det beror på säsongen och på hur stort jobbet är. Sommarhalvåret är mest uppbokat för utvändiga arbeten. Hör av dig, så får du ett rakt besked om när vi har tid.",
      },
      {
        question: "Arbetar ni utanför Boden och Luleå?",
        answer:
          "Ja, vi tar uppdrag i övriga Norrbotten också. Berätta var jobbet finns, så säger vi om vi kan ta det.",
      },
    ],
    related: ["renovering", "nybyggnation-tillbyggnad", "altan-uteplats", "fonster-dorrar", "totalentreprenad"],
    updated: "2026-11-26",
  },
];

/**
 * Gruppering på /tjanster. Varje slug i SERVICE_PAGES ska finnas i exakt en grupp
 * (kontrolleras i tests/services-content.test.ts).
 */
export const SERVICE_GROUPS: { id: string; title: string; intro: string; slugs: string[] }[] = [
  {
    id: "bygga-nytt",
    title: "Bygga nytt och bygga till",
    intro: "Från grund till färdig byggnad – hus, tillbyggnader, garage och mindre byggnader på tomten.",
    slugs: ["nybyggnation-tillbyggnad", "garage-carport", "attefallshus-friggebod", "grund-betongplatta"],
  },
  {
    id: "renovera-inne",
    title: "Renovera inne",
    intro: "Ett rum i taget eller hela huset på en gång.",
    slugs: ["renovering", "koksrenovering", "badrumsrenovering", "totalrenovering", "golvlaggning", "bastu"],
  },
  {
    id: "ute-tak-fasad",
    title: "Ute, tak och fasad",
    intro: "Det som ska stå emot snö, smältvatten och kyla.",
    slugs: ["altan-uteplats", "takbyte-platarbeten", "fasad-tillaggsisolering", "fonster-dorrar"],
  },
  {
    id: "snickare-helhet",
    title: "Snickare och helhetsansvar",
    intro: "Enstaka snickerijobb – eller en kontakt som håller ihop hela projektet.",
    slugs: ["snickare", "totalentreprenad"],
  },
];

export function getServicePage(slug: string): ServicePage | undefined {
  return SERVICE_PAGES.find((page) => page.slug === slug);
}

export function servicePageByIconKey(iconKey: ServiceIconKey): ServicePage | undefined {
  return SERVICE_PAGES.find((page) => page.iconKey === iconKey);
}
