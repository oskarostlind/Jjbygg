import { SERVICE_PAGES } from "@/lib/services-content";
import { SITE_URL } from "@/lib/seo";
import { siteContent } from "@/lib/site-content";

/**
 * /llms.txt – kort faktablad i markdown för AI-assistenter.
 * Genereras statiskt vid build ur samma data som sajten, så att uppgifterna inte glider isär.
 * Bara belagda fakta: inga priser, certifikat eller omdömen.
 */
export const dynamic = "force-static";

export function GET() {
  const { footer, contact } = siteContent;
  const services = SERVICE_PAGES.map(
    (page) => `- [${page.name}](${SITE_URL}/tjanster/${page.slug}): ${page.metaDescription}`
  ).join("\n");

  const body = `# ${footer.companyName}

> ${footer.companyName} är ett byggföretag i Boden som tar uppdrag i Boden, Luleå och övriga Norrbotten. Företaget gör tillbyggnader och nybyggen, renoverar kök, badrum och hela hus, bygger altaner, byter tak och gjuter grund. Hembesök och offert är kostnadsfria.

## Fakta

- Företag: ${footer.companyName}, org.nr ${footer.orgNumber}, registrerat 2010, godkänt för F-skatt
- Kontaktperson: ${contact.personName}
- Telefon: ${contact.phoneDisplay}
- E-post: ${contact.email}
- Adress: ${contact.address}
- Arbetsområde: Boden, Luleå, Sävast, Älvsbyn, Piteå, Kalix, Jokkmokk och övriga Norrbotten
- Kunder: privatpersoner, företag och föreningar
- ROT-avdrag: dras direkt på fakturan för privatpersoner när arbetet ger rätt till det
- Offert: kostnadsfri och utan förpliktelser, begärs på ${SITE_URL}/offert eller per telefon
- Priser: lämnas i skriftlig offert efter hembesök; företaget publicerar inga prislistor

## Tjänster

${services}

## Mer

- [Utförda arbeten](${SITE_URL}/referenser): bilder från egna jobb
- [Byggföretag i Luleå](${SITE_URL}/byggfirma/lulea)
- [Byggföretag i Norrbotten](${SITE_URL}/byggfirma/norrbotten)
- [Begär offert](${SITE_URL}/offert)
`;

  return new Response(body, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
