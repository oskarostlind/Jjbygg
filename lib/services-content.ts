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

export type ServiceSection = {
  heading: string;
  paragraphs: string[];
  list?: string[];
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

const ROT_NOTE =
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
    related: ["totalentreprenad", "takbyte-platarbeten", "altan-uteplats"],
    updated: "2026-09-25",
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
      "Från ett nytt kök till en totalrenovering av hela huset. Vi hjälper dig att planera i rätt ordning, så att du slipper riva upp det som nyss blev klart.",
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
    related: ["badrumsrenovering", "totalentreprenad", "nybyggnation-tillbyggnad"],
    updated: "2026-09-25",
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
      "Dags att byta tak i Boden eller Luleå? JJ Bygg byter tak och plåtdetaljer anpassat för norrländsk snö och kyla. ROT-avdrag och kostnadsfri offert.",
    h1: "Takbyte och plåtarbeten i Boden och Luleå",
    lead:
      "Taket är husets viktigaste skydd, och i Norrbotten får det jobba hårt: tung snö, is, stora temperaturskillnader och vår med smältvatten. Vi byter tak som är byggda för att klara det.",
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
          "Byter du till samma material och färg krävs normalt inget bygglov. Ändras husets utseende påtagligt – till exempel från pannor till plåt i ett område med detaljplan – kan bygglov behövas. Fråga kommunen innan.",
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
    updated: "2026-09-25",
  },
  {
    slug: "totalentreprenad",
    iconKey: "entreprenad",
    name: "Entreprenad & planering",
    metaTitle: "Totalentreprenad i Boden och Luleå | JJ Bygg",
    metaDescription:
      "Vill du ha en kontakt för hela byggprojektet? JJ Bygg tar helhetsansvar som totalentreprenör i Boden och Luleå – planering, samordning och kvalitet.",
    h1: "Entreprenad och projektledning i Boden och Luleå",
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
    updated: "2026-09-25",
  },
];

export function getServicePage(slug: string): ServicePage | undefined {
  return SERVICE_PAGES.find((page) => page.slug === slug);
}

export function servicePageByIconKey(iconKey: ServiceIconKey): ServicePage | undefined {
  return SERVICE_PAGES.find((page) => page.iconKey === iconKey);
}
