# SEO för jjbyggboden.se

Senast uppdaterad: 2026-11-26. Kanonisk adress är `https://www.jjbyggboden.se` (apex redirectar till www – `lib/seo.ts`).

## Sidkarta och målsökord

Alla sidor är statiska (SSG/ISR) och ligger i `app/sitemap.ts`. Innehållet är handskrivet per sida – byt aldrig till en mall som bara byter ortnamn (doorway pages).

| Sida | Primärt sökord | Sekundära sökord | Innehåll i |
| --- | --- | --- | --- |
| `/` | byggföretag boden, byggfirma boden | byggföretag luleå, snickare boden, hantverkare boden, jj bygg | `lib/site-content.ts` + CMS, Boden-sektionen i `lib/locations-content.ts` (`BODEN_SECTION`) |
| `/tjanster` | byggtjänster boden luleå | snickare boden, snickare luleå | `app/tjanster/page.tsx` |
| `/tjanster/nybyggnation-tillbyggnad` | tillbyggnad boden luleå | bygga garage, attefallshus norrbotten | `lib/services-content.ts` |
| `/tjanster/renovering` | renovering boden luleå | köksrenovering, totalrenovering | `lib/services-content.ts` |
| `/tjanster/badrumsrenovering` | badrumsrenovering boden luleå | renovera badrum, tätskikt | `lib/services-content.ts` |
| `/tjanster/altan-uteplats` | bygga altan boden luleå | uterum, trädäck | `lib/services-content.ts` |
| `/tjanster/takbyte-platarbeten` | takbyte boden luleå | takläggare, plåtslagare, byta tak, plåttak, snörasskydd | `lib/services-content.ts` |
| `/tjanster/totalentreprenad` | totalentreprenad boden luleå | byggentreprenör, totalentreprenör | `lib/services-content.ts` |
| `/byggfirma/lulea` | byggföretag luleå | byggfirma luleå, snickare luleå, hantverkare luleå | `lib/locations-content.ts` |
| `/byggfirma/norrbotten` | byggföretag norrbotten, byggfirma norrbotten | byggfirma älvsbyn / kalix / piteå / jokkmokk | `lib/locations-content.ts` |
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
| `/referenser` | utförda arbeten byggfirma boden | altan, badrum, bastu, betongplatta – bilder från egna jobb | `lib/referenser-content.ts` + `public/referenser/` |
| `/offert` | offert byggfirma boden | (konvertering, inte ranking) | `app/offert` |
| `/nyheter`, `/nyheter/[slug]` | – (CMS) | listas i sitemap bara när inlägg finns | sitecms |

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

- Startsidan → alla sex tjänstesidor (`components/services.tsx`), de sex tjänst×Boden-sidorna (Boden-sektionen) och Luleå/Norrbotten via `components/service-areas.tsx` ("Vi finns i") och Boden-sektionen.
- Footern (alla sidor) → alla sex tjänstesidor + "Här arbetar vi" (Boden, Luleå, Norrbotten).
- `/tjanster` → varje tjänst och dess Boden- och Luleå-variant.
- Tjänstesida → sina tjänst×ort-varianter + `/byggfirma/norrbotten` ("… där du bor").
- Ortsida → tjänstelistan (länkar till tjänst×ort där sådan finns, annars tjänstesidan), "Våra tjänster i …" (kort), andra orter.
- Tjänst×ort → tjänstesidan, ortsidan, samma tjänst på andra orter, andra tjänster på samma ort.
- Brödsmulor (`components/breadcrumbs.tsx`, `breadcrumbJsonLd()`) med `BreadcrumbList`-JSON-LD på alla landningssidor.
- Länkblocken ovan ligger i sidopanelen (`components/sidebar-links.tsx`) bredvid offertkortet (`components/offer-card.tsx`); den delade markupen för ort- och tjänst×ort-sidorna finns i `components/seo-article.tsx` och följer tjänstesidans layout (`PageHeader`, `FaqList`, `CtaBand`).

### Strukturerad data

- `components/layout/local-business-json-ld.tsx` (alla sidor): `GeneralContractor` med adress, telefon i formatet `+46…`, geo (adressens koordinater), org.nr (`taxID`/`identifier`), `foundingDate` 2010, `areaServed` (Boden, Luleå = City; Norrbotten = AdministrativeArea), `hasOfferCatalog` över tjänsterna. `sameAs` är tom och utelämnas tills Google Business Profile, Facebook m.m. finns – fyll i `SAME_AS`. Ingen `openingHoursSpecification` eftersom öppettider saknas i innehållet; lägg till när Jesper bekräftat tider. Samma script innehåller ett `WebSite`-schema. Lägg aldrig till `aggregateRating` utan riktiga, verifierbara omdömen.
- Startsidan: `FAQPage` (allmänna frågor + Boden-frågorna i ett schema).
- Tjänstesidor, ortsidor och tjänst×ort: `Service` (+ `areaServed`), `BreadcrumbList`, `FAQPage`.
- Validera: https://search.google.com/test/rich-results och https://validator.schema.org.

## Utförda arbeten (`/referenser`)

Egna bilder från riktiga jobb. Datat ligger i `lib/referenser-content.ts` och används på fyra ställen: `/referenser`, sektionen "Från våra jobb" på tjänstesidorna och deras ortsvarianter (`components/referenser/service-referenser.tsx`), "Utförda arbeten" på startsidan (`components/referenser/home-referenser.tsx`) och korten på `/tjanster`. Sidan har `ItemList`/`ImageObject`-JSON-LD – inga recensioner eller betyg.

Lägg till ett nytt projekt:

1. Lägg bilden i `public/referenser/` som JPEG med beskrivande filnamn utan å/ä/ö (`altan-glasracke-villa.jpg`). Gärna 1600–2400 px bred. Beskär bort skärmdumpsramar, ansikten och registreringsskyltar.
2. Lägg en post i `REFERENSER` i `lib/referenser-content.ts`: `slug`, `title`, `description` (1–2 meningar), `image` (sökväg + faktisk bredd/höjd i pixlar), `alt`, `category` och `service` (slug i `lib/services-content.ts` – styr vilken tjänstesida bilden visas på och länkas till). Tjänstesidan visar tjänstens två första projekt. Kortet på `/tjanster` tar projektet med `cardImage: true`, annars tjänstens första.
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
4. Under första veckorna: kontrollera **Sidor** (indexering) att alla 25 adresser i sitemapen indexeras (`/referenser` är ny; `/byggfirma/boden` är borttagen och ska med tiden visas som "Sida med omdirigering"), och **Förbättringar** (FAQ, Brödsmulor) att strukturerad data godkänns.
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
   - Serviceområde: Boden, Luleå, Älvsbyn, Kalix, Piteå, Jokkmokk.
   - Tjänster: lägg in de sex tjänsterna med länk till respektive `/tjanster/...`-sida.
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
- Kontrollskript: starta `npm run build && npm run start` och kör `node scripts/check-seo.mjs http://localhost:3000`. Det kontrollerar status, en H1, title/description/canonical, JSON-LD, alt-texter, alla interna länkar från sitemapen, att ingen sida svarar `no-store`, att `#boden` finns på startsidan och att `/byggfirma/boden` svarar 308 → `/` utan att någon sida länkar dit. Utan databas lokalt: bygg med `npx next build` (`npm run build` kör `prisma db push`).

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
