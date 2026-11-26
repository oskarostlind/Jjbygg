# SEO för jjbyggboden.se

Senast uppdaterad: 2026-11-26. Kanonisk adress är `https://www.jjbyggboden.se` (apex redirectar till www – `lib/seo.ts`).

## Sidkarta och målsökord

Alla sidor är statiska (SSG/ISR) och ligger i `app/sitemap.ts`. Innehållet är handskrivet per sida – byt aldrig till en mall som bara byter ortnamn (doorway pages).

| Sida | Primärt sökord | Sekundära sökord | Innehåll i |
| --- | --- | --- | --- |
| `/` | byggföretag boden, byggfirma boden | byggföretag luleå, snickare boden, hantverkare boden, jj bygg | `lib/site-content.ts` + CMS, Boden-sektionen i `lib/locations-content.ts` (`BODEN_SECTION`) |
| `/tjanster` | byggtjänster boden luleå | (översikt över alla 16 tjänster, grupperade) | `app/tjanster/page.tsx`, grupper i `SERVICE_GROUPS` |
| `/tjanster/nybyggnation-tillbyggnad` | tillbyggnad boden luleå | bygga hus, fritidshus (garage, grund och attefallshus har egna sidor) | `lib/services-content.ts` |
| `/tjanster/renovering` | renovering boden luleå | ytskikt, ändrad planlösning (kök, totalrenovering, golv och bastu har egna sidor) | `lib/services-content.ts` |
| `/tjanster/badrumsrenovering` | badrumsrenovering boden luleå | renovera badrum, tätskikt | `lib/services-content.ts` |
| `/tjanster/altan-uteplats` | bygga altan boden luleå | uterum, trädäck | `lib/services-content.ts` |
| `/tjanster/takbyte-platarbeten` | takbyte boden luleå | takläggare, plåtslagare, byta tak, plåttak, snörasskydd | `lib/services-content.ts` |
| `/tjanster/totalentreprenad` | totalentreprenad boden luleå | byggentreprenör, totalentreprenör | `lib/services-content.ts` |
| `/tjanster/koksrenovering` | köksrenovering boden luleå | renovera kök, byta kök, köksmontering | `lib/services-content.ts` |
| `/tjanster/totalrenovering` | totalrenovering boden luleå | renovera hus, invändig renovering, stambyte villa | `lib/services-content.ts` |
| `/tjanster/golvlaggning` | golvläggning boden luleå | lägga golv, parkett, klickgolv, fiskbensparkett | `lib/services-content.ts` |
| `/tjanster/bastu` | bygga bastu boden luleå | bastubygge, bastu inomhus/utomhus, renovera bastu | `lib/services-content.ts` |
| `/tjanster/garage-carport` | bygga garage boden luleå | carport, förråd | `lib/services-content.ts` |
| `/tjanster/grund-betongplatta` | gjuta platta, husgrund boden luleå | betongplatta, grundläggning | `lib/services-content.ts` |
| `/tjanster/fonster-dorrar` | fönsterbyte boden luleå | byta fönster, byta ytterdörr | `lib/services-content.ts` |
| `/tjanster/fasad-tillaggsisolering` | fasadrenovering boden luleå | byta panel, fasadbyte, tilläggsisolering | `lib/services-content.ts` |
| `/tjanster/attefallshus-friggebod` | attefallshus boden luleå | friggebod, gäststuga, komplementbyggnad | `lib/services-content.ts` |
| `/tjanster/snickare` | snickare boden, snickare luleå | snickeriarbeten, hantverkare | `lib/services-content.ts` |
| `/byggfirma/lulea` | byggföretag luleå | byggfirma luleå, snickare luleå, hantverkare luleå | `lib/locations-content.ts` |
| `/byggfirma/norrbotten` | byggföretag norrbotten, byggfirma norrbotten | byggfirma älvsbyn / kalix / piteå / jokkmokk | `lib/locations-content.ts` |
| `/byggfirma/savast` | byggföretag sävast | invändig renovering sävast, totalrenovering sävast, badrumsrenovering sävast | `lib/locations-content.ts` |
| `/tjanster/nybyggnation-tillbyggnad/boden` | tillbyggnad boden | bygga garage boden, attefallshus boden | `lib/service-location-content.ts` |
| `/tjanster/renovering/boden` | renovering boden | köksrenovering boden, renovera hus boden | `lib/service-location-content.ts` |
| `/tjanster/badrumsrenovering/boden` | badrumsrenovering boden | renovera badrum boden | `lib/service-location-content.ts` |
| `/tjanster/altan-uteplats/boden` | altanbygge boden, bygga altan boden | uterum boden | `lib/service-location-content.ts` |
| `/tjanster/takbyte-platarbeten/boden` | takbyte boden | takläggare boden, plåtslagare boden, plåttak boden | `lib/service-location-content.ts` |
| `/tjanster/totalentreprenad/boden` | totalentreprenad boden | byggentreprenör boden | `lib/service-location-content.ts` |
| `/tjanster/nybyggnation-tillbyggnad/lulea` | tillbyggnad luleå | bygga garage luleå, fritidshus luleå skärgård | `lib/service-location-content.ts` |
| `/tjanster/renovering/lulea` | renovering luleå | köksrenovering luleå, renovera radhus luleå | `lib/service-location-content.ts` |
| `/tjanster/badrumsrenovering/lulea` | badrumsrenovering luleå | renovera badrum luleå, badrum bostadsrätt luleå | `lib/service-location-content.ts` |
| `/tjanster/altan-uteplats/lulea` | bygga altan luleå | uterum luleå, altan strandskydd | `lib/service-location-content.ts` |
| `/tjanster/takbyte-platarbeten/lulea` | takbyte luleå | takläggare luleå, plåtslagare luleå, plåttak luleå | `lib/service-location-content.ts` |
| `/tjanster/totalentreprenad/lulea` | totalentreprenad luleå | byggentreprenör luleå | `lib/service-location-content.ts` |
| `/guider` | vad kostar renovering/bygge (översikt) | prisguider badrum, tak, altan, tillbyggnad | `lib/guider-content.ts` (`GUIDES`), `app/guider/page.tsx` |
| `/guider/vad-kostar-badrumsrenovering` | vad kostar en badrumsrenovering | renovera badrum kostnad, badrum pris per kvm | `lib/guider-content.ts` |
| `/guider/vad-kostar-takbyte` | vad kostar ett takbyte | takbyte kostnad per kvm, byta tak pris | `lib/guider-content.ts` |
| `/guider/vad-kostar-altan` | vad kostar det att bygga altan | bygga altan pris per kvm, altan kostnad | `lib/guider-content.ts` |
| `/guider/vad-kostar-tillbyggnad` | vad kostar en tillbyggnad | tillbyggnad pris per kvm, bygga till hus kostnad | `lib/guider-content.ts` |
| `/referenser` | utförda arbeten byggfirma boden | altan, badrum, bastu, betongplatta – bilder från egna jobb | `lib/referenser-content.ts` + `public/referenser/` |
| `/offert` | offert byggfirma boden | (konvertering, inte ranking) | `app/offert` |
| `/om-oss` | jj bygg boden, om jj bygg & entreprenad | byggföretag boden sedan 2010 (förtroende, inte ranking) | `app/om-oss/page.tsx` |
| `/kontakt` | jj bygg kontakt, jj bygg telefon | öppettider, adress (navigering, inte ranking) | `app/kontakt/page.tsx` + `siteContent.contact` |
| `/nyheter`, `/nyheter/[slug]` | – (CMS) | listas i sitemap bara när inlägg finns | sitecms |

### Tjänstesidorna (2026-11-26: 6 → 16)

Search Console visade visningar på sökningar utan egen sida (köksrenovering, golvläggning, bastu, garage, fönsterbyte, snickare m.fl.), så tio tjänstesidor lades till i `SERVICE_PAGES`. Regler:

- **De sex ursprungliga tjänsterna ligger först i `SERVICE_PAGES`, i oförändrad ordning.** Ortsidornas listor med `links: "services"` länkar rad *i* till `SERVICE_PAGES[i]`. Lägg nya tjänster sist. `tests/services-content.test.ts` vaktar ordningen.
- **Inga `/boden`- eller `/lulea`-varianter av de tio nya tjänsterna.** Tjänst×ort-sidorna finns bara för de sex ursprungliga; fler blir tunna dubbletter. Nya tjänstesidor har "Boden och Luleå" i title/H1 och länkar till orterna ("Här arbetar vi") i stället.
- Ny tjänst = en post i `SERVICE_PAGES` (egen handskriven text, 550–750 ord, 3–4 frågor), en ikon i `ServiceIconKey` (`lib/site-content.ts`) + `components/service-icon.tsx`, och sluggen i en grupp i `SERVICE_GROUPS`. Routen, sitemapen, footern, mobilmenyn, startsidans "Fler tjänster" och `hasOfferCatalog` följer med automatiskt.
- Länkar mellan tjänstesidor: `related` (sidopanelen "Andra tjänster") och `serviceLinks` på en sektion (raden "Läs mer: …" eller en punktlista med `note`).
- **Inga priser, prisintervall eller timpriser** (ägarens beslut) – skriv vad som påverkar priset. Enda beloppet är ROT-taket i `ROT_NOTE`. ROT gäller inte nybyggda fristående byggnader (garage, friggebod, attefallshus, fristående bastu) – de sidorna säger det uttryckligen.
- **Inga kvadratmetergränser för bygglovsbefriade byggnader.** Reglerna ändrades 1 december 2025; sidorna hänvisar till avstämning med Bodens/Luleå kommun. Samma sak för strandskydd, snölast och tjäldjup (inga siffror).
- Sidhuvudena delar på de fem stockfotona i `public/hero/`. På `/tjanster` får en tjänst egen bild (`serviceCardImage`), annars stockfoto (bara de sex ursprungliga) eller en ikonruta.

### Sävast, Om oss och Kontakt (2026-11-26)

- **Sävast** gav ~170 visningar på tre månader i Search Console ("byggföretag sävast", "invändig renovering sävast", "totalrenovering sävast", "badrumsrenovering sävast") utan egen sida. `/byggfirma/savast` är en tredje post i `LOCATION_PAGES` med egen text (tätort i Bodens kommun, ca 7 km söder om Bodens centrum längs väg 97 mot Luleå, nära Luleälven, gränsar mot Sunderbyn). Den följer automatiskt med i "Vi finns i", footerns "Här arbetar vi", `areaServed` (som `Place` med `containedInPlace` Boden), sitemapen och tjänstesidornas ortlänkar.
- **Sävast får inga tjänst×ort-sidor** (`SERVICE_LOCATION_SLUGS` är fortfarande Boden och Luleå; `tests/locations-content.test.ts` vaktar det). Ortsidan länkar i stället till tjänstesidorna via `serviceLinks` (punktlista i texten + sidopanelen "Läs mer om tjänsterna").
- Skriv inte om E4 – den går inte genom Sävast.
- `/om-oss` och `/kontakt` är statiska sidor med `AboutPage` respektive `ContactPage` som pekar på företagsnoden `${SITE_URL}/#foretag`. Faktarutan, öppettiderna och svarstiden kommer ur `siteContent` (`company`, `contact.openingHours`, `contact.responseTime`). Inget porträtt – lägg in ett när Jesper skickar ett.
- **Förtroenderaden** (`components/trust-bar.tsx`, punkterna i `siteContent.trustBar`) ligger i underkanten av startsidans hero (ersatte de tre badges som nu bara visas på `/offert`) och i sidfoten. Länken "Omdömen på Google" går till en Google-sökning som visar profilen (`siteContent.google.reviewsUrl`); `/kontakt` länkar till skriv-omdöme-länken (`writeReviewUrl`). Visa aldrig betyg eller antal omdömen på sajten.
- Huvudmenyn har "Kontakt" från 1024 px (lg); "Om oss" finns bara i mobilmenyn och footerns Genvägar.

### Prisguiderna (`/guider`, 2026-11-26)

Prisfrågor ("vad kostar det att renovera ett badrum", "takbyte kostnad per kvm") är de sökningar där AI-svar och Google AI Overviews oftast visas. Fyra guider svarar på dem utan att ange priser. Regler:

- **Inga belopp, prisintervall, timpriser eller kvadratmeterpriser** – samma beslut som för tjänstesidorna. Enda beloppet är ROT-taket i `ROT_NOTE` (exporteras från `lib/services-content.ts` och återanvänds). `tests/guider-content.test.ts` vaktar belopp, mått, utropstecken, title ≤ 60/description ≤ 155 tecken, 900–1300 ord och 4–5 frågor.
- Varje guide har samma delar: **Kort svar** överst (2–3 citerbara meningar), "Det här avgör priset" (faktor → varför → vad du kan göra), Norrbotten, bygglov där det är relevant, ROT, "Så får du ett rättvisande pris", "Vanliga fallgropar", "Läs mer" (tjänstesidan + dess Boden/Luleå-sidor + `/referenser`) och FAQ.
- Schema: `Article` (författare/utgivare = `#foretag`, `datePublished`/`dateModified`, `sv-SE`), `BreadcrumbList`, `FAQPage`. Översikten har `CollectionPage` med `ItemList`.
- En guide hör till en tjänst (`service`). Tjänstesidan visar rutan "Guide" (`components/guide-link.tsx`) när tjänsten har en guide. Guiderna finns i sitemapen (`guideSitemapEntries`), footerns Genvägar och `/llms.txt`.
- Bygglovstexterna följer reglerna från 1 december 2025 (Boverkets vägledning "Vad får jag bygga utan bygglov?") utan kvadratmeter- eller metergränser. ROT-texterna följer skatteverket.se (30 procent från 2026, bara arbetskostnad, altan och tillbyggnad bara när de sitter ihop med huset). Kontrollera båda vid regeländringar och uppdatera `updated`.
- Ny guide = en post i `GUIDES` med egen handskriven text. Routen, sitemapen, översikten, llms.txt och länken från tjänstesidan följer med automatiskt.

### Boden ligger på startsidan (2026-11-26)

Efter omgörningen 22 oktober konkurrerade `/` och `/byggfirma/boden` om samma sökningar och delade på visningarna ("byggföretag boden" föll från position 8 till 24 i Search Console). Därför:

- Startsidan är sajtens enda sida för "byggföretag/byggfirma i Boden". Sektionen `#boden` (`components/home/boden-section.tsx`, text i `BODEN_SECTION`) har stadsdelar, klimat/byggsäsong, bygglov och länkar till de sex tjänst×Boden-sidorna. Frågorna om Boden ligger i startsidans enda FAQ-lista och enda `FAQPage`-schema.
- `/byggfirma/boden` redirectar permanent (308) till `/` (`next.config.mjs`), finns inte i sitemapen och genereras inte. Lägg inte tillbaka sidan.
- Boden finns kvar som ort i `LOCATIONS` (tjänst×ort-sidorna och `areaServed`). Länka alltid via `locationHref(slug)` – Boden ger `/#boden`, övriga `/byggfirma/[ort]`.
- "byggföretag" söks mer än "byggfirma" (396 mot 166 visningar för Boden), så title/H1 leder med "Byggföretag" och har "byggfirma" som andraord.
- **Title, description och H1 på startsidan kan överskridas av sitecms.** Fallback-värdena i `lib/site-content.ts` gäller bara om CMS:et saknar värde – se nycklarna under "CMS-nycklar" nedan.

### CMS-nycklar som styr startsidans sökord

| Var i sitecms | Nyckel | Ska vara |
| --- | --- | --- |
| SEO → sidan `home` → titel | `seo[home].title` | Byggföretag i Boden & Luleå – byggfirma JJ Bygg |
| SEO → sidan `home` → beskrivning | `seo[home].description` | Byggföretag och byggfirma i Boden och Luleå. JJ Bygg gör renovering, tillbyggnad, tak, badrum och altan. Begär kostnadsfri offert utan förpliktelser. |
| Sidan `home` → block | `hero.title` | Byggföretag i Boden och Luleå |

Kontrollera också att `faq.a2` (offertfrågan) säger "utan förpliktelser" och inte "förbindande".

### Intern länkning

- Startsidan → alla 16 tjänstesidor (`components/services.tsx`: sex kort + raden "Fler tjänster" med övriga), de sex tjänst×Boden-sidorna (Boden-sektionen) och Luleå/Norrbotten/Sävast via `components/service-areas.tsx` ("Vi finns i") och Boden-sektionen.
- Footern (alla sidor) → alla 16 tjänstesidor (egen rad i fyra spalter) + "Alla tjänster" + "Här arbetar vi" (Boden, Luleå, Norrbotten, Sävast) + Genvägar (bl.a. Om oss och Kontakt) + förtroenderaden.
- `/om-oss` → Boden, Sävast, Luleå, Norrbotten, alla tjänstesidor (i de fyra grupperna), `/referenser`.
- `/tjanster` → varje tjänst, grupperade under fyra rubriker (`SERVICE_GROUPS`), och Boden-/Luleå-varianten för de sex som har sådana.
- Tjänstesida → sina tjänst×ort-varianter + `/byggfirma/norrbotten` ("… där du bor"); tjänster utan ortvarianter → Boden (`/#boden`), Luleå och Norrbotten ("Här arbetar vi"). Dessutom `related` och `serviceLinks` till närliggande tjänster – `/tjanster/snickare` länkar till alla övriga.
- Guide (`/guider/[slug]`) → sin tjänstesida och dess Boden/Luleå-sidor, `/referenser`, `/offert` och de andra guiderna; tjänstesidan → sin guide (rutan "Guide"). Footern → `/guider`.
- `/referenser` → den mest specifika tjänsten per bild (bastu, golvläggning, grund & betongplatta …).
- Ortsida → tjänstelistan (länkar till tjänst×ort där sådan finns, annars tjänstesidan), "Våra tjänster i …" (kort; för Sävast "Läs mer om tjänsterna" med tjänstesidorna ur `serviceLinks`), andra orter.
- Tjänst×ort → tjänstesidan, ortsidan, samma tjänst på andra orter, andra tjänster på samma ort.
- Brödsmulor (`components/breadcrumbs.tsx`, `breadcrumbJsonLd()`) med `BreadcrumbList`-JSON-LD på alla landningssidor.
- Länkblocken ovan ligger i sidopanelen (`components/sidebar-links.tsx`) bredvid offertkortet (`components/offer-card.tsx`); den delade markupen för ort- och tjänst×ort-sidorna finns i `components/seo-article.tsx` och följer tjänstesidans layout (`PageHeader`, `FaqList`, `CtaBand`).

### Strukturerad data

- `components/layout/local-business-json-ld.tsx` (alla sidor): `GeneralContractor` med adress, telefon i formatet `+46…`, geo (adressens koordinater), org.nr (`taxID`/`identifier`), `foundingDate` 2010, `areaServed` (Boden, Luleå = City; Norrbotten = AdministrativeArea; Sävast = Place med `containedInPlace` Boden, via `areaServedLd()`), `hasOfferCatalog` över tjänsterna, `openingHoursSpecification` måndag–fredag 07–17 (samma som Google-profilen och `siteContent.contact.openingHours` – ändra båda). `sameAs` har Google-profilen; lägg till Facebook m.m. i `SAME_AS` när de finns. Samma script innehåller ett `WebSite`-schema. Lägg aldrig till `aggregateRating` utan riktiga, verifierbara omdömen.
- Startsidan: `FAQPage` (allmänna frågor + Boden-frågorna i ett schema).
- `/om-oss`: `AboutPage` + `BreadcrumbList`; `/kontakt`: `ContactPage` + `BreadcrumbList`. Båda har `about`/`mainEntity` → `${SITE_URL}/#foretag`.
- Tjänstesidor, ortsidor och tjänst×ort: `Service` (+ `areaServed`), `BreadcrumbList`, `FAQPage`.
- Validera: https://search.google.com/test/rich-results och https://validator.schema.org.

## Utförda arbeten (`/referenser`)

Egna bilder från riktiga jobb. Datat ligger i `lib/referenser-content.ts` och används på fyra ställen: `/referenser`, sektionen "Från våra jobb" på tjänstesidorna och deras ortsvarianter (`components/referenser/service-referenser.tsx`), "Utförda arbeten" på startsidan (`components/referenser/home-referenser.tsx`) och korten på `/tjanster`. Sidan har `ItemList`/`ImageObject`-JSON-LD – inga recensioner eller betyg.

Lägg till ett nytt projekt:

1. Lägg bilden i `public/referenser/` som JPEG med beskrivande filnamn utan å/ä/ö (`altan-glasracke-villa.jpg`). Gärna 1600–2400 px bred. Beskär bort skärmdumpsramar, ansikten och registreringsskyltar.
2. Lägg en post i `REFERENSER` i `lib/referenser-content.ts`: `slug`, `title`, `description` (1–2 meningar), `image` (sökväg + faktisk bredd/höjd i pixlar), `alt`, `category` och `service` (slug i `lib/services-content.ts` för den mest specifika tjänsten – dit länkar `/referenser`, och bilden blir tjänstens kortbild på `/tjanster`). Ska bilden också visas på en bredare tjänstesida anges den i `alsoServices` (bastubilden: `service: "bastu"`, `alsoServices: ["renovering"]`). Tjänstesidan visar de två första projekten, egna före lånade. Kortet på `/tjanster` tar projektet med `cardImage: true`, annars tjänstens första – aldrig ett lånat.
3. Uppdatera `REFERENSER_UPDATED` (styr `lastModified` i sitemapen). Startsidans urval ändras i `HOME_SLUGS` i `home-referenser.tsx`.

Skriv bara det som syns på bilden eller som Jesper har bekräftat – hitta inte på ort, mått, pris eller tid. Det här gör ett projekt bättre (för både besökare och lokal sökning), så fråga efter det:

- **Ort eller stadsdel** ("Altan i Sävast", "Badrum i Bergnäset") – i titel, beskrivning och alt-text. Det är den starkaste lokala signalen och saknas helt på de sex första bilderna.
- **Vad som gjordes** – rivning, tätskikt, material, vad som var svårt.
- **Tidsåtgång** och ungefär när jobbet gjordes (år/säsong).
- Kundens godkännande att bilden visas. Citat från kund bara om kunden själv har skrivit det.

De sex första bilderna är bara 1170 px breda (beskurna ur skärmdumpar). De visas därför aldrig bredare än ca 670 px och används inte i sidhuvudena, som fortfarande har stockfoton ur `public/hero/`. Byt dem när Jesper skickar originalfiler i full upplösning.

## Google Search Console

1. Gå till https://search.google.com/search-console och lägg till egendom. Välj **Domän** (`jjbyggboden.se`) – då täcks både apex och www.
2. Verifiera på ett av två sätt:
   - **DNS TXT (rekommenderas, domänegendom):** kopiera TXT-posten Google visar. Logga in på Strato → Domäner → jjbyggboden.se → DNS-inställningar → lägg till TXT-post på `@` med värdet `google-site-verification=…`. Vänta några minuter–timmar och klicka Verifiera.
   - **HTML-tagg (URL-prefix-egendom `https://www.jjbyggboden.se`):** kopiera värdet i `content="…"` ur metataggen Google ger. Sätt miljövariabeln `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` i Vercel (Production) till det värdet och deploya om. `app/layout.tsx` skriver då ut `<meta name="google-site-verification">`. Klicka Verifiera.
3. **Skicka in sitemap:** Search Console → Webbplatskartor → ange `https://www.jjbyggboden.se/sitemap.xml` → Skicka.
4. Under första veckorna: kontrollera **Sidor** (indexering) att alla 43 adresser i sitemapen indexeras (`/referenser`, de tio tjänstesidorna, `/byggfirma/savast`, `/om-oss` och `/kontakt` från 2026-11-26 är nya; `/byggfirma/boden` är borttagen och ska med tiden visas som "Sida med omdirigering"), och **Förbättringar** (FAQ, Brödsmulor) att strukturerad data godkänns.
5. Begär indexering manuellt för de nya landningssidorna via URL-granskning om de inte plockats upp inom två veckor.

## Google Business Profile

Lokala sökningar ("byggfirma boden") visar kartpaketet överst. En profil är viktigare än all on-page-SEO för de sökningarna.

1. https://business.google.com → Hantera nu → sök efter "JJ Bygg & Entreprenad AB" (kan finnas som oanspråkad profil) eller skapa ny.
2. Uppgifter – **exakt samma NAP som på sajten** (`lib/site-content.ts`):
   - Namn: JJ Bygg & Entreprenad AB
   - Adress: Kallkällvägen 16 c, 961 96 Boden (välj "Jag levererar varor och tjänster till kunder" och dölj gatuadressen om kunder inte ska besöka den)
   - Telefon: 070-535 71 94
   - Webbplats: https://www.jjbyggboden.se
   - Primär kategori: **Byggfirma** (eng. General contractor). Sekundära: Snickare, Takläggare, Badrumsrenovering, Byggentreprenör.
   - Serviceområde: Boden, Sävast, Luleå, Älvsbyn, Kalix, Piteå, Jokkmokk.
   - Öppettider: måndag–fredag 07–17 (står även på `/kontakt` och i JSON-LD).
   - Tjänster: lägg in tjänsterna (alla 16 går bra) med länk till respektive `/tjanster/...`-sida.
3. Verifiering sker via vykort, telefon eller video beroende på vad Google erbjuder.
4. Efter verifiering: lägg in profilens publika URL i `SAME_AS` i `components/layout/local-business-json-ld.tsx`.
5. Lägg upp 5–10 foton (lagbild, pågående jobb, färdiga altaner/tak) och be nöjda kunder om recensioner – recensioner är den starkaste rankingfaktorn i kartpaketet.
6. Använd UTM på webbplatslänken i profilen (`?utm_source=google&utm_medium=gbp`) så att `LeadSourceTracker` kan särskilja profiltrafik från organisk.

## Teknisk status (2026-11-26)

- Alla sidor renderas med `lang="sv"`, ingen `hreflang` (bara svenska).
- Bilder via `next/image`, `formats: avif, webp` i `next.config.mjs`.
- `robots.txt`: disallow `/api/` och `/offert/tack`.
- Nya routes är SSG (`generateStaticParams`, `dynamicParams = false`).
- **Alla sidor utom `/nyheter/[slug]` och API-routes ska vara statiska/ISR** (○ eller ● i `next build`, `cache-control: s-maxage=…`). Tidigare gjorde `unstable_noStore()` i header, footer och JSON-LD hela sajten dynamisk (`no-store`), vilket bidrog till att 12 av 25 sidor inte indexerades. Anropa aldrig `noStore()`, `cookies()` eller `headers()` i layout, header eller footer. `draftMode().isEnabled` är ofarligt – sidan renderas per anrop bara i sitecms förhandsgranskning.
- CMS-innehåll uppdateras via ISR: `lib/cms.ts` hämtar med `revalidate: 60` och taggen `cms`, och `app/api/revalidate` rensar taggen när något sparas i sitecms.
- `CONTACT_NUMBER` läses vid build/ISR. Ändras variabeln i Vercel krävs en ny deploy.
- Alla `tel:`-länkar använder `+46705357194`.
- Ingen `meta keywords` (Google ignorerar den).
- `app/not-found.tsx`: egen 404-sida med länkar till start, tjänster och offert.
- Konverteringar i Vercel Analytics (egna händelser – kan kräva Pro-plan hos Vercel): `offert_skickad` när offertformuläret skickats (`components/offert/offert-success-view.tsx`) och `telefon_klick` vid klick på en `tel:`-länk (`components/layout/phone-click-tracker.tsx`).
- Kontrollskript: starta `npm run build && npm run start` och kör `node scripts/check-seo.mjs http://localhost:3000`. Det kontrollerar status, en H1, unik title, description/canonical, JSON-LD, alt-texter, alla interna länkar från sitemapen, att ingen sida svarar `no-store`, att `#boden` finns på startsidan och att `/byggfirma/boden` svarar 308 → `/` utan att någon sida länkar dit. Utan databas lokalt: bygg med `npx next build` (`npm run build` kör `prisma db push`).

## Månatlig checklista

- [ ] Search Console → Resultat: vilka sökord ger visningar/klick? Sidor med många visningar men låg CTR → skriv om title/description.
- [ ] Search Console → Sidor: inga nya "Ej indexerad"-fel. Åtgärda eventuella 404 eller omdirigeringar.
- [ ] Search Console → Förbättringar: FAQ och Brödsmulor utan fel.
- [ ] Google Business Profile: svara på recensioner, lägg upp ett inlägg/foto, kontrollera att NAP fortfarande stämmer.
- [ ] Kör `node scripts/check-seo.mjs` mot produktion (eller lokalt efter build) – inga brutna länkar.
- [ ] Uppdatera `updated` i innehållsfilerna när text ändras (styr `lastModified` i sitemapen).
- [ ] Kontrollera ROT-texten mot skatteverket.se (procent och tak ändras av riksdagen).
- [ ] Vercel Analytics / leadkälla i offertmejlen: vilka sidor ger förfrågningar?
- [ ] Nytt innehåll: ett nyhetsinlägg i CMS:et om ett avslutat projekt (med ort i rubriken) ger färska lokala signaler.
