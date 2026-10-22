# jjbyggboden.se

Hemsida för JJ Bygg & Entreprenad AB (Boden/Luleå). Next.js 14 (App Router),
Prisma mot Neon (PostgreSQL), Vercel Blob för bilder, Resend för e-post och
[sitecms](https://sitecms.se) (paketet `sitecms-next`) för innehåll och
offertförfrågningar. Driftas på Vercel.

```bash
npm install        # kör även `prisma generate`
npm run dev
npm run lint
npm run build
npm test           # node --test (Node ≥ 22.18)
```

Miljövariabler: se [`.env.example`](./.env.example).

## Offertförfrågningar (/offert)

Formuläret (tre steg) skickas till server actionen `app/actions/submit-offert.ts`,
som gör följande i ordning:

1. Validerar med Zod (`lib/validations/offert.ts`). Gränserna speglar sitecms
   egna regler (svenskt telefonnummer, beskrivning 10–3000 tecken, samtycke,
   startdatum ej bakåt i tiden) så att det som sparas lokalt också godkänns av CMS:et.
2. Spamkontroll: honeypot-fält och tidsfälla (< 3 s = bot). Spam får ett tyst
   `{ success: true }` utan att något sparas.
3. Laddar upp bilder till Vercel Blob och parallellt som bilagor i sitecms
   (`uploadQuoteAttachment`). Blob-URL:erna sparas i Neon.
4. Sparar förfrågan i Neon (`Offert`). Misslyckas detta får kunden ett fel.
5. **Dubbelskrivning till sitecms** (`submitQuoteRequest`, mappning i
   `lib/offert-to-quote.ts`). Förfrågan syns i panelen under *Förfrågningar*.
   CMS:ets id sparas i kolumnen `Offert.cmsQuoteId`. Fel mot CMS:et loggas
   (`console.error`, inkl. fältfel vid HTTP 400) men ger aldrig kunden ett fel.
6. Mejlar via Resend: bekräftelse till kunden och notifiering till `JESPER_EMAIL`.

### Dubbla mejl – viktigt

sitecms mejlar också företaget (+ kvitto till kunden) **om** "E-post för
förfrågningar" är ifyllt för sajten i sitecms-panelen. Sajten mejlar redan via
Resend. **Sätt därför INTE notify-e-post i sitecms-panelen för jjbygg så länge
sajtens egna Resend-mejl är på** – annars får Jesper dubbla mejl. Vill man i
framtiden låta sitecms sköta mejlen: ta bort Resend-anropen i server actionen
först, fyll sedan i e-posten i panelen.

### Testa mappningen

`npm test` kör `tests/offert-to-quote.test.ts`, som bekräftar att payloaden
från `lib/offert-to-quote.ts` passerar en kopia av sitecms validering
(`tests/fixtures/sitecms-quote-validation.ts`). Uppdatera kopian när sitecms
ändrar sina regler. Med `OFFERT_DEBUG=1` loggar server actionen payloaden som
skickas till sitecms (bara lokalt – innehåller personuppgifter).

### Databas

Schemat ligger i `prisma/schema.prisma`; migrationer i `prisma/migrations/`.
Vid deploy med ny migration: `npx prisma migrate deploy` mot Neon
(`DATABASE_URL`). Vercel-bygget kör bara `prisma generate` (postinstall).

## Integritet

`/integritet` beskriver vilka uppgifter som samlas in via offertformuläret och
länkas från samtyckesrutan i steg 3 samt från sidfoten.
