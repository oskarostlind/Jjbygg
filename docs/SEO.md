# SEO för jjbyggboden.se

Senast uppdaterad: 2026-10-22. Kanonisk adress är `https://www.jjbyggboden.se` (apex redirectar till www – `lib/seo.ts`).

## Sidkarta och målsökord

Alla sidor är statiska (SSG) och ligger i `app/sitemap.ts`. Innehållet är handskrivet per sida – byt aldrig till en mall som bara byter ortnamn (doorway pages).

| Sida | Primärt sökord | Sekundära sökord | Innehåll i |
| --- | --- | --- | --- |
| `/` | byggfirma boden, byggfirma luleå | bygg & entreprenad boden, jj bygg | `lib/site-content.ts` + CMS |
| `/tjanster` | byggtjänster boden luleå | snickare boden, snickare luleå | `app/tjanster/page.tsx` |
| `/tjanster/nybyggnation-tillbyggnad` | tillbyggnad boden luleå | bygga garage, attefallshus norrbotten | `lib/services-content.ts` |
| `/tjanster/renovering` | renovering boden luleå | köksrenovering, totalrenovering | `lib/services-content.ts` |
| `/tjanster/badrumsrenovering` | badrumsrenovering boden luleå | renovera badrum, tätskikt | `lib/services-content.ts` |
| `/tjanster/altan-uteplats` | bygga altan boden luleå | uterum, trädäck | `lib/services-content.ts` |
| `/tjanster/takbyte-platarbeten` | takbyte boden luleå | byta tak, plåttak, snörasskydd | `lib/services-content.ts` |
| `/tjanster/totalentreprenad` | totalentreprenad boden luleå | byggentreprenör, totalentreprenör | `lib/services-content.ts` |
| `/byggfirma/boden` | byggfirma boden | byggföretag boden, snickare boden, hantverkare boden | `lib/locations-content.ts` |
| `/byggfirma/lulea` | byggfirma luleå | byggföretag luleå, snickare luleå, hantverkare luleå | `lib/locations-content.ts` |
| `/byggfirma/norrbotten` | byggfirma norrbotten | byggfirma älvsbyn / kalix / piteå / jokkmokk | `lib/locations-content.ts` |
| `/tjanster/nybyggnation-tillbyggnad/boden` | tillbyggnad boden | bygga garage boden, attefallshus boden | `lib/service-location-content.ts` |
| `/tjanster/renovering/boden` | renovering boden | köksrenovering boden, renovera hus boden | `lib/service-location-content.ts` |
| `/tjanster/badrumsrenovering/boden` | badrumsrenovering boden | renovera badrum boden | `lib/service-location-content.ts` |
| `/tjanster/altan-uteplats/boden` | altanbygge boden, bygga altan boden | uterum boden | `lib/service-location-content.ts` |
| `/tjanster/takbyte-platarbeten/boden` | takbyte boden | byta tak boden, plåttak boden | `lib/service-location-content.ts` |
| `/tjanster/totalentreprenad/boden` | totalentreprenad boden | byggentreprenör boden | `lib/service-location-content.ts` |
| `/tjanster/nybyggnation-tillbyggnad/lulea` | tillbyggnad luleå | bygga garage luleå, fritidshus luleå skärgård | `lib/service-location-content.ts` |
| `/tjanster/renovering/lulea` | renovering luleå | köksrenovering luleå, renovera radhus luleå | `lib/service-location-content.ts` |
| `/tjanster/badrumsrenovering/lulea` | badrumsrenovering luleå | renovera badrum luleå, badrum bostadsrätt luleå | `lib/service-location-content.ts` |
| `/tjanster/altan-uteplats/lulea` | bygga altan luleå | uterum luleå, altan strandskydd | `lib/service-location-content.ts` |
| `/tjanster/takbyte-platarbeten/lulea` | takbyte luleå | byta tak luleå, plåttak luleå | `lib/service-location-content.ts` |
| `/tjanster/totalentreprenad/lulea` | totalentreprenad luleå | byggentreprenör luleå | `lib/service-location-content.ts` |
| `/offert` | offert byggfirma boden | (konvertering, inte ranking) | `app/offert` |
| `/nyheter`, `/nyheter/[slug]` | – (CMS) | listas i sitemap bara när inlägg finns | sitecms |

### Intern länkning

- Startsidan → ortsidor via `components/service-areas.tsx` ("Vi finns i").
- Tjänstesida → sina tjänst×ort-varianter + `/byggfirma/norrbotten` ("… där du bor").
- Ortsida → tjänstelistan (länkar till tjänst×ort där sådan finns, annars tjänstesidan), "Våra tjänster i …" (kort), andra orter.
- Tjänst×ort → tjänstesidan, ortsidan, samma tjänst på andra orter, andra tjänster på samma ort.
- Brödsmulor (`components/breadcrumbs.tsx`) med `BreadcrumbList`-JSON-LD på alla landningssidor.

### Strukturerad data

- `components/layout/local-business-json-ld.tsx` (alla sidor): `GeneralContractor` med adress, geo, `areaServed` (Boden, Luleå = City; Norrbotten = AdministrativeArea), `hasOfferCatalog` över tjänsterna. `sameAs` är tom och utelämnas tills Google Business Profile, Facebook m.m. finns – fyll i `SAME_AS`. Ingen `openingHoursSpecification` eftersom öppettider saknas i innehållet; lägg till när Jesper bekräftat tider.
- Tjänstesidor, ortsidor och tjänst×ort: `Service` (+ `areaServed`), `BreadcrumbList`, `FAQPage`.
- Validera: https://search.google.com/test/rich-results och https://validator.schema.org.

## Google Search Console

1. Gå till https://search.google.com/search-console och lägg till egendom. Välj **Domän** (`jjbyggboden.se`) – då täcks både apex och www.
2. Verifiera på ett av två sätt:
   - **DNS TXT (rekommenderas, domänegendom):** kopiera TXT-posten Google visar. Logga in på Strato → Domäner → jjbyggboden.se → DNS-inställningar → lägg till TXT-post på `@` med värdet `google-site-verification=…`. Vänta några minuter–timmar och klicka Verifiera.
   - **HTML-tagg (URL-prefix-egendom `https://www.jjbyggboden.se`):** kopiera värdet i `content="…"` ur metataggen Google ger. Sätt miljövariabeln `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` i Vercel (Production) till det värdet och deploya om. `app/layout.tsx` skriver då ut `<meta name="google-site-verification">`. Klicka Verifiera.
3. **Skicka in sitemap:** Search Console → Webbplatskartor → ange `https://www.jjbyggboden.se/sitemap.xml` → Skicka.
4. Under första veckorna: kontrollera **Sidor** (indexering) att alla 24 adresser i sitemapen indexeras, och **Förbättringar** (FAQ, Brödsmulor) att strukturerad data godkänns.
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

## Teknisk status (2026-10-22)

- Alla sidor renderas med `lang="sv"`, ingen `hreflang` (bara svenska).
- Bilder via `next/image`, `formats: avif, webp` i `next.config.mjs`.
- `robots.txt`: disallow `/api/` och `/offert/tack`.
- Nya routes är SSG (`generateStaticParams`, `dynamicParams = false`).
- Kontrollskript: starta `npm run build && npm run start` och kör `node scripts/check-seo.mjs http://localhost:3000`. Det kontrollerar status, en H1, title/description/canonical, JSON-LD, alt-texter och alla interna länkar från sitemapen.

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
