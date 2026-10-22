/**
 * Innehåll för tjänst × ort-sidorna under /tjanster/[slug]/[ort].
 *
 * Bara kombinationer med eget, lokalt innehåll (minst ~300 ord) finns här.
 * Saknas en kombination renderas ingen sida (dynamicParams = false), och
 * tjänstesidan länkar bara till de ortvarianter som finns.
 *
 * Texterna är handskrivna per kombination – inte en mall med utbytt ortnamn.
 * Påståenden om företaget läggs in först när Jesper har bekräftat dem.
 */

import type { ServiceFaq, ServiceSection } from "@/lib/services-content";
import type { LocationSlug } from "@/lib/locations-content";

export type ServiceLocationPage = {
  service: string;
  location: LocationSlug;
  /** Hela <title>, max 60 tecken. */
  metaTitle: string;
  /** Max 155 tecken. */
  metaDescription: string;
  h1: string;
  lead: string;
  sections: ServiceSection[];
  faq: ServiceFaq[];
  updated: string;
};

export const SERVICE_LOCATION_PAGES: ServiceLocationPage[] = [
  // ---------------------------------------------------------------- Boden
  {
    service: "nybyggnation-tillbyggnad",
    location: "boden",
    metaTitle: "Tillbyggnad & nybyggnation i Boden | JJ Bygg",
    metaDescription:
      "Bygga till huset, nytt garage eller attefallshus i Boden? JJ Bygg grundlägger för tjäle, hjälper med bygglov hos Bodens kommun och lämnar fast offert.",
    h1: "Nybyggnation och tillbyggnad i Boden",
    lead:
      "Ett extra sovrum i Erikslund, ett varmgarage i Sävast eller ett attefallshus på tomten i Svartbyn. Vi bygger nytt och bygger till i hela Bodens kommun – dimensionerat för inlandets tjäle och snö.",
    sections: [
      {
        heading: "Vanliga byggprojekt i Boden",
        paragraphs: [
          "I de äldre villaområdena – Erikslund, Hedenbacken, Prästholmen – är husen ofta från 1950- till 70-talen och byggda efter den tidens behov. En tillbyggnad med ett större kök, ett extra badrum eller ett sovrum på markplan är det vanligaste sättet att få huset att fungera för en modern familj utan att flytta. I Sävast och på Sävastön, där husen är yngre, handlar det oftare om garage, carport, uterum och attefallshus.",
          "Ett garage i Boden är sällan bara en bilplats. Skoter, släpvagn, vinterdäck och en verkstadshörna behöver också få plats, och många vill ha det uppvärmt. Ett varmgarage ska isoleras som ett bostadshus och grundläggas därefter – vi hjälper dig att väga kostnaden mot nyttan innan du bestämmer storlek.",
        ],
      },
      {
        heading: "Grundläggning i Bodens inlandsklimat",
        paragraphs: [
          "Boden ligger i inlandet och vintrarna är kallare än vid kusten. Tjälen går djupt, och en grund som inte tar hänsyn till det kan lyfta och spricka. För tillbyggnader är det särskilt viktigt eftersom den nya delen ska sitta ihop med ett hus som redan har satt sig. Vi väljer grundläggning – platta på mark med tjälisolering, plintar under tjäldjup eller krypgrund – efter markförhållandena på just din tomt. På de sandiga åsarna runt Boden är förutsättningarna ofta goda, medan tomter nära Luleälven kan behöva mer förarbete.",
          "Gjutning och markarbeten planeras till barmarkssäsongen. Står stommen tät innan vintern kan invändiga arbeten fortsätta i kylan, så ett projekt som startar i maj kan ofta vara inflyttningsklart till vårvintern.",
        ],
      },
      {
        heading: "Bygglov hos Bodens kommun",
        paragraphs: [
          "Tillbyggnader och nya byggnader kräver i regel bygglov från Bodens kommun. Ansökan görs via kommunens e-tjänst på boden.se, där ärendet också kan följas. För en- och tvåbostadshus finns undantag: attefallshus upp till 30 kvadratmeter, attefallstillbyggnad upp till 15 kvadratmeter och friggebod kräver inte bygglov men oftast en anmälan och startbesked. Detaljplanen för ditt område kan dock begränsa vad som får göras – i Boden gäller detaljplan i tätorten men sällan i byarna.",
          "Vi hjälper dig att ta fram ritningar och underlag till ansökan i samband med offerten, och vid större projekt kan vi föreslå kontrollansvarig. Räkna med flera veckors handläggning, mer under våren när många söker samtidigt.",
        ],
      },
      {
        heading: "Pris och ROT för tillbyggnad i Boden",
        paragraphs: [
          "Priset styrs av storlek, grundläggning, hur tillbyggnaden ansluter till befintligt hus och vilka installationer som behövs. Vi lämnar offert efter kostnadsfritt hembesök. ROT-avdraget gäller om- och tillbyggnad av ditt befintliga hus – 30 procent av arbetskostnaden upp till 50 000 kronor per person och år enligt nuvarande regler – men inte helt nya byggnader som garage eller attefallshus. Kontrollera villkoren på skatteverket.se.",
        ],
      },
    ],
    faq: [
      {
        question: "Får jag bygga attefallshus på min tomt i Boden?",
        answer:
          "På de flesta tomter med en- eller tvåbostadshus, ja. Attefallshuset får vara upp till 30 kvadratmeter och kräver anmälan och startbesked från Bodens kommun innan bygget startar. Detaljplan och avstånd till grannar kan påverka.",
      },
      {
        question: "När på året bör en tillbyggnad i Boden starta?",
        answer:
          "Markarbeten och gjutning görs bäst från maj till oktober. Börja planera och söka bygglov under vintern så är handlingarna klara när tjälen går ur marken.",
      },
    ],
    updated: "2026-10-22",
  },
  {
    service: "renovering",
    location: "boden",
    metaTitle: "Renovering i Boden – kök, ytskikt & äldre hus | JJ Bygg",
    metaDescription:
      "Renovera villa eller fritidshus i Boden? JJ Bygg renoverar kök, ytskikt och hela hus från 50–70-talen – med ROT-avdrag direkt på fakturan. Gratis hembesök.",
    h1: "Renovering i Boden",
    lead:
      "Många hus i Boden byggdes för femtio–sjuttio år sedan och står nu inför sin andra eller tredje renovering. Vi hjälper dig att göra rätt saker i rätt ordning – från nytt kök till totalrenovering.",
    sections: [
      {
        heading: "Bodens villor från 50-, 60- och 70-talen",
        paragraphs: [
          "Boden växte kraftigt som garnisonsstad under efterkrigstiden, och det syns i husbeståndet. Erikslund, Hedenbacken, Prästholmen och Sanden har kvarter efter kvarter med villor från 1950- till 70-talen – ofta med källare, originalkök och en planlösning med många små rum. De här husen är i grunden välbyggda, men har nått den ålder där ytskikt, fönster, el och badrum behöver ses över samtidigt.",
          "När vi renoverar ett äldre hus i Boden börjar vi med att titta på husets historia. Lager av tapeter och golv, gamla eternitfasader, isolering som sjunkit ihop och elinstallationer från flera decennier är vanliga fynd. Därför bokar vi in en kontrollpunkt efter rivning, så att uppbyggnaden kan anpassas efter vad som faktiskt finns bakom väggarna.",
        ],
      },
      {
        heading: "Renovera för ett kallare klimat",
        paragraphs: [
          "Uppvärmning är en stor del av boendekostnaden i Boden, och en renovering är det bästa tillfället att göra något åt det. När väggar och tak ändå öppnas kan vi tilläggsisolera, täta klimatskalet och byta fönster till energiglas. Det ger lägre kostnader varje vinter och ett jämnare inomhusklimat. Vi ser också över ventilationen – ett tätare hus behöver fungerande frånluft för att inte få fuktproblem.",
          "Invändiga renoveringar är ett utmärkt vinterprojekt. Medan altaner och tak väntar på barmark kan kök, golv, väggar och tak inomhus göras klart under de mörka månaderna, så att huset står färdigt när sommaren kommer.",
        ],
      },
      {
        heading: "Köksrenovering i Boden",
        paragraphs: [
          "Köket är det rum flest vill byta. I äldre hus i Boden innebär det ofta att en vägg mot vardagsrummet öppnas upp, att el och VVS dras om och att golvet jämnas av innan nya skåp monteras. Vi samordnar elektriker och rörmokare så att du har en kontakt, och kontrollerar att det kök du valt faktiskt får plats med rätt mått innan vi river.",
        ],
      },
      {
        heading: "Bygglov, pris och ROT",
        paragraphs: [
          "Invändiga renoveringar kräver normalt inget bygglov. Ändras fasad, fönster eller takform kan det krävas i områden med detaljplan – fråga Bodens kommun via e-tjänsten på boden.se. Priset beror på hur mycket som rivs, om installationer flyttas och vilka material du väljer; vi redovisar arbete och material separat i offerten. Som privatperson får du ROT-avdrag på arbetskostnaden, 30 procent upp till 50 000 kronor per person och år enligt nuvarande regler, direkt på fakturan.",
        ],
      },
    ],
    faq: [
      {
        question: "Kan ni renovera medan vi bor kvar i huset?",
        answer:
          "Oftast ja, när ett eller två rum renoveras i taget. Vid totalrenovering av ett helt hus är det enklare att bo någon annanstans under de tyngsta veckorna. Vi gör en tidplan tillsammans så att du vet vad som händer när.",
      },
      {
        question: "Vad är viktigast att renovera först i ett 60-talshus?",
        answer:
          "Det som skyddar huset: tak, fasad, dränering och fönster – och sedan badrum och el. Ytskikt och kök kommer sist. Vid hembesöket hjälper vi dig att prioritera utifrån husets skick.",
      },
    ],
    updated: "2026-10-22",
  },
  {
    service: "badrumsrenovering",
    location: "boden",
    metaTitle: "Badrumsrenovering i Boden – tätskikt & kakel | JJ Bygg",
    metaDescription:
      "Nytt badrum i Boden? JJ Bygg river, bygger nytt tätskikt, lägger kakel och samordnar VVS och el. Dokumenterat enligt branschregler, ROT-avdrag på fakturan.",
    h1: "Badrumsrenovering i Boden",
    lead:
      "Ett badrum från 60- eller 70-talet har gjort sitt. Vi renoverar badrum i hela Bodens kommun – från rivning till färdigt kakel – med tätskikt som håller och dokumentation du kan visa försäkringsbolaget.",
    sections: [
      {
        heading: "Badrummen i Bodens äldre hus",
        paragraphs: [
          "I villorna från 1950- till 70-talen i Erikslund, Hedenbacken och Prästholmen är badrummen ofta små, placerade i källaren eller mitt i huset, och byggda innan dagens tätskiktsregler fanns. Gjutna golv med gamla golvbrunnar, plastmatta som släppt i hörnen och avsaknad av fungerande frånluft är vanligt. Det syns sällan utifrån, men bakom kaklet kan fukten ha arbetat i åratal.",
          "Källarbadrum är särskilt känsliga. Här möts fukt från marken och fukt från duschen, och i ett hus med otillräcklig dränering kan ett nytt badrum snabbt få problem om underlaget inte åtgärdas först. Vi kontrollerar alltid underlag och fuktnivåer efter rivning innan något nytt byggs upp.",
        ],
      },
      {
        heading: "Tätskikt, golvbrunn och dokumentation",
        paragraphs: [
          "Det viktigaste i ett badrum är det som inte syns: tätskiktet. Vi bygger upp golv och väggar enligt branschreglerna för våtrum och använder VVS-installatörer som arbetar enligt Säker Vatten för rör och golvbrunn. Gamla gjutjärnsbrunnar byts nästan alltid – de är sällan kompatibla med moderna tätskikt. När badrummet är klart får du dokumentation över hur det byggts, vilket försäkringsbolaget kan fråga efter vid en skada och köparen vid en framtida försäljning.",
          "Golvvärme är nästan självklart i ett nytt badrum i Boden. Vintrarna är långa, och ett varmt golv gör dessutom att badrummet torkar snabbare efter dusch. Elektrisk golvvärme är enklast vid renovering; vattenburen passar om huset redan har det.",
        ],
      },
      {
        heading: "Planering och tid",
        paragraphs: [
          "Badrumsrenovering är ett bra vinterprojekt i Boden – allt arbete sker inomhus. Räkna med att badrummet är ur bruk i flera veckor eftersom varje lager måste torka innan nästa läggs på. Har huset bara ett badrum hjälper vi till att planera en tillfällig lösning. Välj kakel, blandare och porslin tidigt; leveranstider till Norrbotten kan vara längre än till södra Sverige.",
        ],
      },
      {
        heading: "Pris och ROT för badrum i Boden",
        paragraphs: [
          "Priset påverkas av badrummets storlek, om golvbrunn och rör behöver flyttas, och av materialval. Vi lämnar fast offert efter kostnadsfritt hembesök. ROT-avdraget ger dig 30 procent av arbetskostnaden upp till 50 000 kronor per person och år enligt nuvarande regler, direkt på fakturan. Kontrollera aktuella villkor på skatteverket.se.",
        ],
      },
    ],
    faq: [
      {
        question: "Behövs bygglov för badrumsrenovering i Boden?",
        answer:
          "Nej, inte för att renovera ett befintligt badrum. Bygger du ett nytt badrum där det inte funnits ett tidigare, eller ändrar avlopp och ventilation väsentligt, kan en anmälan till Bodens kommun krävas. Vi hjälper dig att reda ut det.",
      },
      {
        question: "Kan ni renovera ett källarbadrum?",
        answer:
          "Ja, men vi kontrollerar först fukt i golv och väggar och att dräneringen fungerar. Annars riskerar det nya badrummet att få problem underifrån.",
      },
    ],
    updated: "2026-10-22",
  },
  {
    service: "altan-uteplats",
    location: "boden",
    metaTitle: "Bygga altan i Boden – trädäck & uterum | JJ Bygg",
    metaDescription:
      "Altan, trädäck eller uterum i Boden? JJ Bygg grundlägger under tjäldjup och dimensionerar för Norrbottens snö. Vi reder ut bygglovet. Gratis offert.",
    h1: "Bygga altan i Boden",
    lead:
      "Sommaren i Boden är kort, ljus och värd varje minut utomhus. Vi bygger altaner, trädäck och uterum i hela kommunen – med plintar som står kvar efter vintern och tak som klarar snön.",
    sections: [
      {
        heading: "Plintar och tjäle – det som avgör i Boden",
        paragraphs: [
          "Det vanligaste felet på altaner i Boden är inte trallen utan grunden. Inlandets tjäle går djupt, och plintar som satts för grunt lyfts varje vinter och sätter sig varje vår. Efter några år lutar altanen, dörren tar i och räcket glappar. Vi grundlägger därför antingen under tjäldjup eller med isolerade plintar som hindrar marken under dem från att frysa, beroende på tomtens förutsättningar.",
          "På de sandiga markerna runt Boden dränerar marken bra, vilket gör jobbet enklare. Närmare Luleälven och i lägre partier kan det finnas finkornig jord som håller vatten – där tar vi extra höjd för tjällyft. En provgrop vid hembesöket säger ofta det mesta.",
        ],
      },
      {
        heading: "Snö från taket och snö på taket",
        paragraphs: [
          "Tänk på var snön från hustaket landar. En altan under takfoten utan snörasskydd på taket får ta emot stora mängder is och snö under vintern, och räcken och möbler kan skadas. Antingen placerar vi altanen med det i åtanke eller monterar snörasskydd på taket samtidigt.",
          "Vill du ha tak över altanen eller ett uterum måste det dimensioneras för snölasten i Boden, som är bland de högsta i Sverige. Det påverkar dimensionen på reglar och stolpar och är inget man kan ta från en standardritning gjord för södra Sverige. Ett uterum med isolerglas och värme förlänger säsongen rejält – april och september blir plötsligt användbara månader.",
        ],
      },
      {
        heading: "Midnattssol, mygg och läge",
        paragraphs: [
          "I Boden går solen knappt ner i juni, och en altan i väster- eller nordvästerläge fångar kvällssolen länge. Samtidigt är myggen en realitet nära älven och i skogskanten – ett uterum med nät eller glas gör att altanen används även de kvällar då det surrar som mest.",
        ],
      },
      {
        heading: "Bygglov för altan i Boden",
        paragraphs: [
          "Sedan 2019 får du bygga en altan utan bygglov om den är högst 1,8 meter över marken, ligger inom 3,6 meter från bostadshuset och minst 4,5 meter från tomtgränsen. Högre altaner, tak, inglasning och uterum kräver oftast bygglov eller anmälan hos Bodens kommun. Fråga kommunen via e-tjänsten på boden.se, eller låt oss reda ut det vid hembesöket. ROT-avdraget gäller altanbygge på befintligt hus.",
        ],
      },
    ],
    faq: [
      {
        question: "Hur djupt måste plintarna gå i Boden?",
        answer:
          "Antingen under tjäldjupet, som i Boden kan vara mot två meter i oisolerad mark, eller med isolerade plintar som hindrar tjälen från att gå under dem. Vi väljer metod efter din tomt.",
      },
      {
        question: "Kan ni bygga altanen på hösten?",
        answer:
          "Ja, september och oktober är ofta en lugnare period och altanen står klar till nästa säsong. Grundläggningen vill vi göra innan tjälen kommer.",
      },
    ],
    updated: "2026-10-22",
  },
  {
    service: "takbyte-platarbeten",
    location: "boden",
    metaTitle: "Takbyte i Boden – plåttak & snörasskydd | JJ Bygg",
    metaDescription:
      "Byta tak i Boden? JJ Bygg byter tak på villor och fritidshus, dimensionerat för inlandets snölast, med nya plåtdetaljer och snörasskydd. ROT-avdrag.",
    h1: "Takbyte i Boden",
    lead:
      "Taken i Boden bär några av landets tyngsta snölaster vinter efter vinter. Vi byter tak på villor, garage och fritidshus i hela kommunen – med underlag, plåt och snörasskydd gjorda för inlandsklimatet.",
    sections: [
      {
        heading: "Vad snön gör med taken i Boden",
        paragraphs: [
          "Boden ligger i inlandet, där snön kommer tidigt, stannar länge och sällan smälter bort mellan snöfallen. Ett tak kan bära över ett ton snö per tio kvadratmeter en vinter med mycket nederbörd. Det sliter på takstolar, råspont och infästningar, och gör att ett tak som är femtio år gammalt – vilket många i Erikslund, Hedenbacken och Prästholmen är – ofta har skador som inte syns förrän man river.",
          "Vid ett takbyte river vi gammal taktäckning, kontrollerar råspont och läkt och byter det som är mjukt eller fuktskadat. Nytt underlagstak läggs innan den nya täckningen monteras. Alla plåtdetaljer – fotplåt, vindskivor, ränndalar, genomföringar – byts samtidigt; det är där de flesta läckor börjar.",
        ],
      },
      {
        heading: "Plåttak eller pannor i Boden?",
        paragraphs: [
          "Plåttak är det vanligaste valet i Boden av goda skäl: snön glider av lättare, vikten är låg och underhållet litet. Betong- och tegelpannor fungerar också bra och ger ett traditionellt utseende, men håller kvar snön längre och väger mer, vilket ska stämmas av mot takstolarnas bärförmåga. Takets lutning avgör mycket – på flacka tak med låg lutning är plåt med god tätning i regel det säkrare valet.",
          "Oavsett material är snörasskydd över entréer, gångvägar och parkeringar en säkerhetsfråga, inte ett tillval. Takstege och glidskydd för sotaren hör också till ett komplett tak. Vi monterar dem i samband med bytet.",
        ],
      },
      {
        heading: "Isbildning, kallvind och ventilation",
        paragraphs: [
          "Istappar vid takfoten och is i hängrännorna beror oftast på att värme läcker upp från huset, smälter snön på taket och låter vattnet frysa igen vid den kalla takfoten. Lösningen är inte värmekabel utan bättre isolering och ventilation av vinden. Vid ett takbyte går vi igenom vindens isolering och luftning, så att det nya taket inte får samma problem som det gamla.",
        ],
      },
      {
        heading: "Bygglov, säsong och ROT",
        paragraphs: [
          "Byter du till samma material och färg behövs normalt inget bygglov. Byter du från pannor till plåt eller ändrar färg påtagligt i ett område med detaljplan kan Bodens kommun kräva lov – fråga via e-tjänsten på boden.se. Takbyten görs från sen vår till tidig höst; vi planerar så att taket är tätt varje kväll. ROT-avdraget ger 30 procent på arbetskostnaden upp till 50 000 kronor per person och år enligt nuvarande regler.",
        ],
      },
    ],
    faq: [
      {
        question: "Måste jag skotta taket i Boden?",
        answer:
          "Ett tak som är dimensionerat för Bodens snölast ska klara en normal vinter utan skottning. Efter extremt snörika perioder, eller på äldre tak med okänd bärförmåga, kan det ändå behövas. Är du osäker – hör av dig så tittar vi.",
      },
      {
        question: "Hur lång tid tar ett takbyte på en villa i Boden?",
        answer:
          "Oftast en till ett par veckor beroende på takets storlek, väder och hur mycket av underlaget som behöver bytas. Du får en tidplan i offerten.",
      },
    ],
    updated: "2026-10-22",
  },
  {
    service: "totalentreprenad",
    location: "boden",
    metaTitle: "Totalentreprenad i Boden – en kontakt för bygget | JJ Bygg",
    metaDescription:
      "Totalentreprenad i Boden: JJ Bygg tar helhetsansvar för planering, bygglov, hantverkare och resultat. För villaägare, företag och föreningar.",
    h1: "Totalentreprenad i Boden",
    lead:
      "När flera yrkesgrupper ska samsas om ett bygge i Boden behöver någon hålla i helheten. Som totalentreprenör tar vi ansvar för planering, bygglov, samordning och resultat – du har en kontakt från första mötet till slutbesked.",
    sections: [
      {
        heading: "Därför efterfrågas totalentreprenad i Boden just nu",
        paragraphs: [
          "Boden växer för första gången på länge. Industrietableringen, nya bostadsområden och ett ökat intresse för att bo kvar och bygga om gör att både hantverkare och kommunens bygglovshandläggare har mycket att göra. I det läget är det en stor fördel att ha en entreprenör som planerar i god tid, bokar underentreprenörer tidigt och håller ihop tidplanen – i stället för att du själv ska jaga elektriker, rörmokare och markentreprenör som alla är fullbokade.",
          "Vi arbetar med lokala samarbetspartners i Boden och Luleå som vi anlitat tidigare, och vi vet vilka ledtider som gäller för material som ska fraktas till Norrbotten.",
        ],
      },
      {
        heading: "Det här ingår när vi tar helhetsansvar i Boden",
        paragraphs: [],
        list: [
          "Kostnadsfritt hembesök i Boden och genomgång av behov, budget och tidplan",
          "Underlag till bygglov eller anmälan hos Bodens kommun, och förslag på kontrollansvarig när det krävs",
          "Upphandling och samordning av el, VVS, mark, plåt och andra yrkesgrupper",
          "Tidplan anpassad efter Bodens byggsäsong – mark och tak på barmark, invändigt under vintern",
          "En fast kontaktperson, löpande avstämningar och skriftliga ändringsbesked",
          "Egenkontroller, dokumentation, slutbesiktning och hjälp att begära slutbesked",
        ],
      },
      {
        heading: "Typiska totalentreprenader i Bodens kommun",
        paragraphs: [
          "En tillbyggnad med nytt badrum i Erikslund där el, VVS, grund, stomme och tak ska samordnas. Ett fritidshus vid älven eller i Harads som ska rustas från grunden med nytt tak, nya fönster och nytt kök. Ett varmgarage i Sävast som kräver markarbete, gjutning, stomme, el och port. Eller en lokal i centrala Boden som ett företag vill bygga om. Gemensamt är att projekten har flera beroenden – och att resultatet blir bättre när en part planerar ordningen.",
        ],
      },
      {
        heading: "Avtal, pris och ROT",
        paragraphs: [
          "För privatpersoner använder vi Hantverkarformuläret som grund, och för företag och föreningar branschens allmänna bestämmelser som ABT. Avtalet anger omfattning, pris, tidplan och betalningsplan, och ändringar stäms alltid av skriftligt innan de utförs. Privatpersoner får ROT-avdrag på arbetskostnaden vid om- och tillbyggnad, 30 procent upp till 50 000 kronor per person och år enligt nuvarande regler. Vi lämnar offert efter hembesök.",
        ],
      },
    ],
    faq: [
      {
        question: "Hur tidigt ska jag kontakta er för ett större projekt i Boden?",
        answer:
          "Gärna ett halvår innan du vill börja bygga, särskilt om projektet kräver bygglov och ska starta på våren. Då hinner vi planera, söka lov och boka underentreprenörer.",
      },
      {
        question: "Tar ni totalentreprenader åt företag i Boden?",
        answer:
          "Ja, vi tar uppdrag från både privatpersoner, företag och föreningar. Beskriv projektet i offertformuläret så återkommer vi.",
      },
    ],
    updated: "2026-10-22",
  },

  // ---------------------------------------------------------------- Luleå
  {
    service: "nybyggnation-tillbyggnad",
    location: "lulea",
    metaTitle: "Tillbyggnad & nybyggnation i Luleå | JJ Bygg",
    metaDescription:
      "Bygga till, nytt garage eller fritidshus i Luleå? JJ Bygg hjälper med bygglov och strandskydd, grundlägger för kustens mark och lämnar fast offert.",
    h1: "Nybyggnation och tillbyggnad i Luleå",
    lead:
      "Från en tillbyggnad på Bergnäset till ett nytt fritidshus i skärgården. Vi bygger nytt och bygger till i hela Luleå kommun – med grundläggning anpassad för kustens mark och ritningar som klarar snön.",
    sections: [
      {
        heading: "Byggprojekt i Luleås olika delar",
        paragraphs: [
          "I de äldre villaområdena – Bergnäset, Notviken, delar av Gammelstad – är tillbyggnader det vanligaste uppdraget: ett rum till, ett större kök eller ett badrum på markplan i ett hus från 1930- till 50-talen. På Hertsön, Björkskatan och Porsön, där husen är från 60- och 70-talen, handlar det ofta om garage, uterum och att öppna upp planlösningen. I Sunderbyn, Antnäs, Måttsund och längs kusten byggs det mycket nytt, och där efterfrågas garage, attefallshus och gäststugor på tomter som redan har ett modernt hus.",
          "Luleå har också en stor skärgård och många sjönära tomter. Fritidshus på öarna och längs Lule älv kräver planering av transporter och ofta särskild hänsyn till strandskydd, men är fullt möjliga att bygga och bygga till.",
        ],
      },
      {
        heading: "Mark och grundläggning vid kusten",
        paragraphs: [
          "Markförhållandena i Luleå varierar mer än i Boden. Mycket av staden ligger på gammal havsbotten med silt och lera som kan sätta sig, medan andra delar står på morän och berg. Landhöjningen gör dessutom att strandnära mark ofta är ung och lös. Innan vi gjuter en platta eller sätter plintar vill vi veta vad som finns under gräsmattan – en provgrop räcker ibland, i andra fall behövs en geoteknisk undersökning. Det kostar lite i början men förhindrar sprickor och sättningar senare.",
          "Tjälen går djupt även vid kusten, och snölasten är bland de högsta i landet. Grund, stomme och tak dimensioneras för Luleå, inte efter en typritning från söder.",
        ],
      },
      {
        heading: "Bygglov och strandskydd i Luleå kommun",
        paragraphs: [
          "Bygglov söks hos Luleå kommun via e-tjänsten på lulea.se, där du också kan begära förhandsbesked för tomter utanför detaljplan. Attefallshus, attefallstillbyggnad och friggebod är bygglovsbefriade för en- och tvåbostadshus men kräver i regel anmälan och startbesked. I Gammelstad, nära världsarvet, och i andra områden med kulturvärden ställer kommunen högre krav på utformning.",
          "Strandskyddet gäller normalt 100 meter från strandlinjen vid hav, sjöar och vattendrag, och Luleå har gott om strand. Nya byggnader inom strandskyddat område kräver dispens, och det gäller ofta även gäststugor och större altaner. Vi hjälper dig att ta reda på vad som gäller för din tomt innan vi ritar.",
        ],
      },
      {
        heading: "Pris och ROT",
        paragraphs: [
          "Vi lämnar offert efter kostnadsfritt hembesök i Luleå. ROT-avdraget gäller om- och tillbyggnad av ditt befintliga hus – 30 procent av arbetskostnaden upp till 50 000 kronor per person och år enligt nuvarande regler – men inte helt nya byggnader. Kontrollera villkoren på skatteverket.se.",
        ],
      },
    ],
    faq: [
      {
        question: "Kan ni bygga på en ö i Luleå skärgård?",
        answer:
          "Ja, om det går att få dit material och maskiner. Transporter planeras i god tid, ofta med båt på sommaren eller över is på vintern beroende på plats. Beskriv tomten i offertformuläret så ger vi besked.",
      },
      {
        question: "Behöver jag strandskyddsdispens för en tillbyggnad?",
        answer:
          "Ligger huset inom 100 meter från vatten kan det behövas, även för tillbyggnader och altaner. Luleå kommun prövar dispensen. Fråga tidigt – det påverkar både tidplan och utformning.",
      },
    ],
    updated: "2026-10-22",
  },
  {
    service: "renovering",
    location: "lulea",
    metaTitle: "Renovering i Luleå – villa, radhus & kök | JJ Bygg",
    metaDescription:
      "Renovera i Luleå? JJ Bygg renoverar 70-talsvillor på Hertsön, äldre hus på Bergnäset och kök i hela kommunen. ROT-avdrag på fakturan, gratis hembesök.",
    h1: "Renovering i Luleå",
    lead:
      "Luleås hus är lika olika som stadens delar – 70-talsradhus på Hertsön, sekelskifteshus på Bergnäset och nybyggda villor i Sunderbyn. Vi renoverar kök, ytskikt och hela hus i hela kommunen, planerat i rätt ordning.",
    sections: [
      {
        heading: "Hertsön, Björkskatan och 70-talshusen",
        paragraphs: [
          "När Luleå växte med stålverket och universitetet byggdes hela stadsdelar på några få år. Hertsön, Björkskatan, Porsön och delar av Notviken har tusentals villor och radhus från 1960- och 70-talen, många med samma grundplan och samma material. Det betyder att vi ofta vet vad som väntar bakom väggarna: originalkök, badrum från byggåret, platsbyggda garderober och ibland material som kräver särskild hantering vid rivning.",
          "Det vanligaste önskemålet i de här husen är att öppna upp planlösningen – ta bort väggen mellan kök och vardagsrum och göra ett större, ljusare rum. Vi kontrollerar vilka väggar som bär innan vi river, och drar om el och ventilation så att det nya köket fungerar.",
        ],
      },
      {
        heading: "Äldre hus på Bergnäset och i Gammelstad",
        paragraphs: [
          "På Bergnäset, i Gammelstad och i de äldre delarna av centrum finns villor från 1920- till 50-talen med träfasad, torpargrund och ofta flera lager av tidigare renoveringar. Här handlar jobbet lika mycket om att förstå huset som att bygga nytt: var fukten samlas under golvet, vad som faktiskt bär och hur man tilläggsisolerar utan att stänga in fukt i konstruktionen. Nära kyrkstaden i Gammelstad, som är världsarv, kan ändringar av fasad och fönster kräva bygglov och anpassning till områdets karaktär.",
        ],
      },
      {
        heading: "Renovera för kustklimatet",
        paragraphs: [
          "Luleå är blåsigare och fuktigare än inlandet, och fasader, fönster och entréer får mer stryk. När vi renoverar invändigt passar vi på att titta på klimatskalet: fönster som släpper in drag, fasadpartier som behöver bytas och ventilation som inte räcker till. Tilläggsisolering och nya energiglas sänker uppvärmningskostnaden varje vinter, och en renovering är det billigaste tillfället att göra det.",
        ],
      },
      {
        heading: "Radhus, bostadsrätt, pris och ROT",
        paragraphs: [
          "Många radhus i Luleå ägs via bostadsrättsförening. Då behöver styrelsen oftast godkänna större ingrepp, och ROT gäller bara arbeten inne i den egna bostaden. I villa och äganderadhus gäller ROT på hela arbetskostnaden – 30 procent upp till 50 000 kronor per person och år enligt nuvarande regler, direkt på fakturan. Invändig renovering kräver normalt inget bygglov; fasad- och fönsterändringar kan kräva det i områden med detaljplan. Vi lämnar offert efter kostnadsfritt hembesök.",
        ],
      },
    ],
    faq: [
      {
        question: "Kan ni ta bort väggen mellan kök och vardagsrum i ett 70-talshus?",
        answer:
          "Oftast ja, men vi kontrollerar först om väggen är bärande. Är den det ersätts den med en balk som dimensioneras för lasten. Vi samordnar även el och ventilation som ofta går i väggen.",
      },
      {
        question: "Vad gäller för renovering i en bostadsrätt i Luleå?",
        answer:
          "Kontakta styrelsen innan du begär offert – många föreningar kräver godkännande för kök, badrum och ändrade väggar. ROT-avdraget gäller bara arbete inne i din egen bostad.",
      },
    ],
    updated: "2026-10-22",
  },
  {
    service: "badrumsrenovering",
    location: "lulea",
    metaTitle: "Badrumsrenovering i Luleå – villa, radhus & BRF | JJ Bygg",
    metaDescription:
      "Nytt badrum i Luleå? JJ Bygg renoverar badrum i villor, radhus och bostadsrätter – tätskikt enligt branschregler, dokumentation och ROT-avdrag.",
    h1: "Badrumsrenovering i Luleå",
    lead:
      "Tusentals badrum i Luleå är från 60- och 70-talen och har passerat sin livslängd. Vi renoverar badrum i villor, radhus och bostadsrätter i hela kommunen – med tätskikt som håller och dokumentation som försäkringsbolaget vill se.",
    sections: [
      {
        heading: "Badrummen på Hertsön, Björkskatan och Porsön",
        paragraphs: [
          "De stora villa- och radhusområdena som byggdes när Luleå växte som mest har ofta badrum från byggåret eller från en första renovering på 80- eller 90-talet. Plastmatta som släppt vid golvbrunnen, kakel på gipsskiva utan ordentligt tätskikt och golvbrunnar som inte går att ansluta till moderna tätskikt är vanliga fynd. Många hus har dessutom ett extra badrum eller en tvättstuga i samma skick.",
          "Eftersom husen i ett område ofta är byggda på samma sätt kan vi i regel ge en ganska träffsäker bild av vad som väntar redan vid hembesöket – men vi bokar alltid in en kontroll efter rivning innan uppbyggnaden börjar.",
        ],
      },
      {
        heading: "Radhus och bostadsrätt – vad gäller?",
        paragraphs: [
          "Luleå har många radhus och lägenheter som ägs via bostadsrättsförening. Badrummet är då oftast ditt ansvar som bostadsrättshavare, men stammar, avlopp och ventilation är föreningens. Styrelsen behöver i regel godkänna renoveringen i förväg, och vissa föreningar har krav på vilka branschregler som ska följas och vill ha dokumentation när arbetet är klart. Hör med din förening innan du begär offert, så kan vi anpassa upplägget efter deras regler. I radhus med gemensamma väggar planerar vi också bullrande arbeten så att grannarna vet när det sker.",
        ],
      },
      {
        heading: "Tätskikt, ventilation och fukt vid kusten",
        paragraphs: [
          "Vi bygger badrum enligt branschreglerna för våtrum, med VVS-installatörer som arbetar enligt Säker Vatten. Gamla golvbrunnar byts, och tätskiktet dokumenteras med bilder och intyg som du kan visa försäkringsbolaget och en framtida köpare. Luleås fuktiga kustklimat gör ventilationen extra viktig: ett badrum med dålig frånluft får kondens som på sikt bryter ner fogar och tätskikt. Vi ser över frånluften i varje badrumsrenovering och föreslår golvvärme, som både ger komfort och torkar golvet snabbare.",
        ],
      },
      {
        heading: "Pris, tid och ROT",
        paragraphs: [
          "Räkna med att badrummet är ur bruk i flera veckor; varje lager behöver torka. Välj kakel och porslin tidigt eftersom leveranstider till Norrbotten kan vara långa. Priset styrs av storlek, om rör och golvbrunn flyttas och av materialval – vi lämnar fast offert efter kostnadsfritt hembesök i Luleå. ROT-avdraget ger 30 procent på arbetskostnaden upp till 50 000 kronor per person och år enligt nuvarande regler; i bostadsrätt bara för arbete inne i lägenheten.",
        ],
      },
    ],
    faq: [
      {
        question: "Får jag renovera badrummet i min bostadsrätt i Luleå?",
        answer:
          "I regel ja, men styrelsen ska oftast godkänna det först och kan ställa krav på utförande och dokumentation. Kontakta föreningen innan du begär offert.",
      },
      {
        question: "Får jag intyg på tätskiktet?",
        answer:
          "Ja, du får dokumentation över hur badrummet är byggt. Det är värdefullt både för försäkringen och vid försäljning.",
      },
    ],
    updated: "2026-10-22",
  },
  {
    service: "altan-uteplats",
    location: "lulea",
    metaTitle: "Bygga altan i Luleå – trädäck, uterum & sjönära | JJ Bygg",
    metaDescription:
      "Altan eller uterum i Luleå? JJ Bygg bygger trädäck och inglasade uterum som klarar kustens vind, snö och tjäle – och reder ut bygglov och strandskydd.",
    h1: "Bygga altan i Luleå",
    lead:
      "Kvällssol över Bottenviken, ett uterum som stänger ute vinden och ett trädäck som står kvar rakt efter vintern. Vi bygger altaner och uteplatser i hela Luleå kommun – från Hertsön till skärgården.",
    sections: [
      {
        heading: "Vind, salt och fukt – kustens krav på altanen",
        paragraphs: [
          "Luleå ligger vid havet, och en altan här får mer vind och fuktigare luft än en i Boden. Det påverkar både materialval och konstruktion. Trall och räcken behöver virke som tål fukt, infästningar som inte rostar och god luftning under däcket så att det torkar ut mellan regnen. Räcken och uterumsglas ska dessutom vara förankrade för blåst, inte bara för att se bra ut.",
          "Ett inglasat uterum är ofta ännu mer värt i Luleå än i inlandet. Vinden gör att en öppen altan är svår att använda många kvällar, medan ett uterum med skjutglas förlänger säsongen från april till oktober – och en isolerad variant ännu längre.",
        ],
      },
      {
        heading: "Tjäle, snö och mark i Luleå",
        paragraphs: [
          "Även vid kusten går tjälen djupt. Plintarna ska antingen ned under tjäldjupet eller isoleras så att marken under inte fryser, annars lyfter altanen varje vinter. Många tomter i Luleå ligger på gammal havsbotten med silt eller lera som rör sig mer än morän – där tar vi extra höjd i grundläggningen. Vi gräver gärna en provgrop vid hembesöket.",
          "Tak över altanen och uterumstak dimensioneras efter snölasten i Luleå, som är bland de högsta i landet. Tänk också på var snön från hustaket landar – ett snörasskydd på taket skyddar både altan och glas.",
        ],
      },
      {
        heading: "Sjönära tomt? Strandskydd och bygglov",
        paragraphs: [
          "Luleå har strand nästan överallt – hav, älv, sjöar och skärgård. Ligger tomten inom 100 meter från vatten gäller strandskyddet, och en altan eller ett uterum kan kräva dispens från Luleå kommun även om det annars vore bygglovsbefriat. Utanför strandskyddat område får en altan byggas utan lov om den är högst 1,8 meter över marken, inom 3,6 meter från huset och minst 4,5 meter från tomtgränsen. Tak, inglasning och uterum kräver oftast bygglov eller anmälan. Vi hjälper dig att reda ut vad som gäller för din tomt via kommunens e-tjänst på lulea.se.",
        ],
      },
      {
        heading: "Läge, säsong och ROT",
        paragraphs: [
          "Placera altanen efter kvällssolen och i lä för de vanligaste vindarna – på många tomter i Luleå betyder det en vinkel mot huset eller ett vindskydd på en sida. Vill du ha altanen klar till midsommar är vintern rätt tid att höra av sig. ROT-avdraget gäller altan och uterum på befintligt hus, 30 procent på arbetskostnaden upp till 50 000 kronor per person och år enligt nuvarande regler.",
        ],
      },
    ],
    faq: [
      {
        question: "Vilket virke håller bäst nära havet i Luleå?",
        answer:
          "Tryckimpregnerat virke i rätt klass fungerar bra om däcket luftas och underhålls. Det finns även underhållsfria alternativ som kostar mer. Vi går igenom för- och nackdelar vid hembesöket.",
      },
      {
        question: "Behöver jag strandskyddsdispens för en altan?",
        answer:
          "Ligger tomten inom 100 meter från vatten kan det behövas, beroende på var altanen placeras och om tomten redan är ianspråktagen. Luleå kommun prövar det. Fråga innan du bestämmer placering.",
      },
    ],
    updated: "2026-10-22",
  },
  {
    service: "takbyte-platarbeten",
    location: "lulea",
    metaTitle: "Takbyte i Luleå – plåttak för snö och kustvind | JJ Bygg",
    metaDescription:
      "Byta tak i Luleå? JJ Bygg byter tak och plåtdetaljer dimensionerade för Bottenvikens snölast och vind. Nya hängrännor och snörasskydd. ROT-avdrag.",
    h1: "Takbyte i Luleå",
    lead:
      "Taken i Luleå ska klara både tung snö och hårda vindar från Bottenviken. Vi byter tak på villor, radhus och fritidshus i hela kommunen – med infästningar, plåt och avvattning anpassade för kustklimatet.",
    sections: [
      {
        heading: "Snö och vind – dubbel belastning vid kusten",
        paragraphs: [
          "I Boden är det snön som styr takets dimensionering. I Luleå tillkommer vinden. Stormar från Bottenviken sliter i takplåt, vindskivor och nockplåt, och ett tak som är monterat med för få eller fel infästningar kan tappa plåtar i en höststorm. Vi monterar därför plåt och plåtdetaljer med infästningar dimensionerade för vindlasten i Luleå, och viker och tätar kanter så att vinden inte får grepp.",
          "Snölasten är ändå bland de högsta i landet. Råspont, läkt och takstolar kontrolleras vid rivning, och det som är fuktskadat eller försvagat byts innan det nya taket läggs. På de många 60- och 70-talshusen på Hertsön, Björkskatan och Porsön är det ofta första gången taket byts, och underlaget behöver då nästan alltid åtgärdas delvis.",
        ],
      },
      {
        heading: "Plåt, pannor och fuktig kustluft",
        paragraphs: [
          "Plåttak är vanligast i Luleå: snön glider av, vikten är låg och det tål vind bra när det är rätt monterat. Den fuktiga, ibland saltmättade luften från havet gör att plåtens ytbehandling och kvaliteten på skruvar och beslag spelar större roll än i inlandet – vi använder material avsedda för kustnära miljö. Betong- och tegelpannor fungerar också, men väger mer och håller kvar snö längre. Takets lutning, husets stil och eventuell detaljplan – särskilt nära Gammelstads kyrkstad – påverkar valet.",
        ],
      },
      {
        heading: "Hängrännor, stuprör och snörasskydd",
        paragraphs: [
          "Under snösmältningen ska stora mängder vatten bort från huset, och i Luleå tillkommer slagregn från sidan. Hängrännor med rätt dimension och lutning, stuprör som leder bort från grunden och ordentliga fotplåtar förhindrar att vatten rinner längs fasaden eller samlas vid husgrunden. Snörasskydd över entréer, gångvägar och parkering är en säkerhetsfråga, och takstege och glidskydd ingår i ett komplett tak. Vi byter alltid plåtdetaljerna vid ett takbyte i stället för att återanvända gamla – det är där läckor börjar.",
        ],
      },
      {
        heading: "Bygglov, säsong och ROT",
        paragraphs: [
          "Samma material och färg kräver normalt inget bygglov. Byte från pannor till plåt eller en påtaglig färgändring kan kräva lov i områden med detaljplan eller kulturvärden – fråga Luleå kommun via e-tjänsten på lulea.se. Takbyten görs från sen vår till tidig höst, och vi planerar så att taket är tätt varje kväll även om vädret vid kusten slår om. ROT-avdraget ger 30 procent på arbetskostnaden upp till 50 000 kronor per person och år enligt nuvarande regler.",
        ],
      },
    ],
    faq: [
      {
        question: "Tappar plåttak plåtar i storm?",
        answer:
          "Inte om de är monterade med infästningar dimensionerade för vindlasten och med tätade kanter. Skador uppstår oftast på äldre tak med för få eller rostiga skruvar. Vi kontrollerar och monterar för Luleås vindförhållanden.",
      },
      {
        question: "Kan ni byta tak på ett radhus i Luleå?",
        answer:
          "Ja. I radhus med gemensamt tak behöver grannar eller föreningen ofta vara med på beslutet, och arbetet planeras så att skarvarna mot grannarnas tak blir täta. Kontakta föreningen innan du begär offert.",
      },
    ],
    updated: "2026-10-22",
  },
  {
    service: "totalentreprenad",
    location: "lulea",
    metaTitle: "Totalentreprenad i Luleå – helhetsansvar | JJ Bygg",
    metaDescription:
      "Totalentreprenad i Luleå: JJ Bygg tar helhetsansvar från bygglov till slutbesked för villaägare, bostadsrättsföreningar och företag. Gratis offert.",
    h1: "Totalentreprenad i Luleå",
    lead:
      "Ett byggprojekt i Luleå involverar ofta många parter – kommunen, föreningen, elektriker, rörmokare, markentreprenör och grannar. Som totalentreprenör håller vi ihop allt och är din enda kontakt från första möte till slutbesked.",
    sections: [
      {
        heading: "Totalentreprenad i en stad där mycket byggs",
        paragraphs: [
          "Luleå är Norrbottens största stad, och här pågår stora industri- och bostadsprojekt parallellt. Det gör att hantverkare, maskiner och material är efterfrågade, och att kommunens bygglovshandläggning periodvis har långa köer. För dig som vill bygga till, bygga om eller rusta ett fritidshus betyder det att planering i god tid är avgörande. Som totalentreprenör bokar vi underentreprenörer tidigt, beställer material med marginal för leveranstider till Norrbotten och lägger en tidplan som tar hänsyn till Luleås byggsäsong.",
          "Vi har vår bas i Boden, en halvtimme från Luleå, och arbetar med samarbetspartners i båda städerna.",
        ],
      },
      {
        heading: "Det här ingår i vårt helhetsansvar i Luleå",
        paragraphs: [],
        list: [
          "Kostnadsfritt hembesök i Luleå och genomgång av behov, budget och tidplan",
          "Underlag till bygglov, anmälan eller strandskyddsdispens hos Luleå kommun, och kontrollansvarig när det krävs",
          "Kontakt med bostadsrättsförening eller samfällighet när projektet kräver deras godkännande",
          "Upphandling och samordning av el, VVS, mark, plåt och andra yrkesgrupper",
          "En fast kontaktperson, löpande avstämningar och skriftliga ändringsbesked",
          "Egenkontroller, dokumentation, slutbesiktning och hjälp att begära slutbesked",
        ],
      },
      {
        heading: "Typiska totalentreprenader i Luleå kommun",
        paragraphs: [
          "En totalrenovering av ett 70-talshus på Hertsön där kök, badrum, el, fönster och tak görs i ett sammanhang. En tillbyggnad på Bergnäset som ska anslutas till ett äldre hus med torpargrund. Ett fritidshus i skärgården eller längs Lule älv som ska rustas med nytt tak, nytt badrum och ny altan, där transporter och strandskydd ska lösas. Eller en lokalanpassning åt ett företag i centrala Luleå. Gemensamt är att projekten blir billigare och lugnare när en part äger ordningen och tidplanen.",
        ],
      },
      {
        heading: "Avtal, pris och ROT",
        paragraphs: [
          "Privatpersoner får avtal enligt Hantverkarformuläret; företag och föreningar enligt branschens allmänna bestämmelser som ABT. Omfattning, pris, tidplan och betalningsplan är tydliga från start, och ändringar stäms alltid av skriftligt innan de utförs. ROT-avdraget gäller privatpersoners om- och tillbyggnad av befintlig bostad, 30 procent på arbetskostnaden upp till 50 000 kronor per person och år enligt nuvarande regler. Offert lämnas efter hembesök.",
        ],
      },
    ],
    faq: [
      {
        question: "Tar ni uppdrag åt bostadsrättsföreningar i Luleå?",
        answer:
          "Ja. För föreningar använder vi avtal enligt ABT och kan ta helhetsansvar för till exempel takbyte, fönsterbyte eller renovering av gemensamma utrymmen. Beskriv projektet i offertformuläret.",
      },
      {
        question: "Hur lång tid tar bygglovet i Luleå?",
        answer:
          "Det varierar med årstid och ärendemängd; räkna med flera veckor och ibland längre under våren. Kompletta handlingar från start kortar tiden. Vi hjälper till med underlaget.",
      },
    ],
    updated: "2026-10-22",
  },
];

export function getServiceLocationPage(service: string, location: string): ServiceLocationPage | undefined {
  return SERVICE_LOCATION_PAGES.find((page) => page.service === service && page.location === location);
}

export function serviceLocationPagesFor(service: string): ServiceLocationPage[] {
  return SERVICE_LOCATION_PAGES.filter((page) => page.service === service);
}

export function serviceLocationPagesIn(location: string): ServiceLocationPage[] {
  return SERVICE_LOCATION_PAGES.filter((page) => page.location === location);
}
