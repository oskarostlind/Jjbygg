/**
 * Utförda arbeten – bilder från JJ Byggs egna jobb (public/referenser).
 *
 * Används av /referenser, sektionen "Från våra jobb" på tjänstesidorna,
 * "Utförda arbeten" på startsidan och korten på /tjanster.
 *
 * Skriv bara det som faktiskt syns på bilden eller som kunden har bekräftat.
 * Hitta inte på ort, mått, pris, tidsåtgång eller materialmärken. När Jesper
 * lämnar sådana uppgifter fylls de i per projekt – se docs/SEO.md.
 *
 * Bilderna är 1170 px breda. Visa dem aldrig bredare än så (ingen helskärms-hero).
 */

export type ReferensKategori = "Altan & uteplats" | "Badrum" | "Bastu" | "Golv" | "Renovering" | "Grund & betong";

export type Referens = {
  slug: string;
  title: string;
  /** 1–2 meningar: vad som syns och vilken typ av arbete det är. */
  description: string;
  image: { src: string; width: number; height: number };
  /** Beskrivande alt-text med arbetstyp – utan ort så länge orten inte är bekräftad. */
  alt: string;
  category: ReferensKategori;
  /**
   * Slug i SERVICE_PAGES (lib/services-content.ts) för den mest specifika tjänsten.
   * /referenser länkar hit, och bilden används på den tjänstens kort på /tjanster.
   */
  service: string;
  /**
   * Fler tjänstesidor där bilden också visas under "Från våra jobb" (t.ex. den
   * bredare tjänsten "renovering" för en bastu). Ger ingen kortbild på /tjanster.
   */
  alsoServices?: string[];
  /** Sätt på den bild som ska användas på tjänstens kort på /tjanster (annars tas tjänstens första). */
  cardImage?: boolean;
};

/** ISO-datum då listan senast ändrades – styr lastModified i sitemapen. */
export const REFERENSER_UPDATED = "2026-11-26";

/** Ordningen är den som visas på /referenser (liggande och stående varvas för jämna spalter). */
export const REFERENSER: Referens[] = [
  {
    slug: "altan-sjonara-hus",
    title: "Altan vid sjönära hus",
    description:
      "Nytt trädäck i tryckimpregnerat virke längs husets långsida och vidare ut mot vattnet, med insynsskydd i ena änden. Bilden är tagen under bygget – spillvirket ligger kvar på gräsmattan.",
    image: { src: "/referenser/altan-sjonara-hus.jpg", width: 1170, height: 878 },
    alt: "Nybyggd altan i tryckimpregnerat trä runt ett mörkt hus vid en sjö, med virke kvar på gräsmattan",
    category: "Altan & uteplats",
    service: "altan-uteplats",
  },
  {
    slug: "badrum-dusch-kommod",
    title: "Badrum med duschvägg och kommod",
    description:
      "Färdigt badrum med duschhörna i frostat glas och takdusch, svart kommod med spegelskåp och belysning, golvstående toalett och mörk våtrumsmatta på golvet.",
    image: { src: "/referenser/badrum-dusch-kommod.jpg", width: 1170, height: 1560 },
    alt: "Renoverat badrum med duschvägg i frostat glas, takdusch, svart kommod med spegelskåp och golvstående toalett",
    category: "Badrum",
    service: "badrumsrenovering",
  },
  {
    slug: "bastu-panel-lavar",
    title: "Bastu med träpanel och lavar",
    description:
      "Nybyggd bastu under snedtak, med ljus träpanel på väggar och tak, lavar i två nivåer och ett fönster som släpper in dagsljus.",
    image: { src: "/referenser/bastu-panel-lavar.jpg", width: 1170, height: 1560 },
    alt: "Nybyggd bastu med ljus träpanel på väggar och snedtak, lavar i två nivåer och ett litet fönster",
    category: "Bastu",
    service: "bastu",
    alsoServices: ["renovering"],
  },
  {
    slug: "betongplatta-gjutning-kvall",
    title: "Gjuten betongplatta",
    description:
      "Stor betongplatta som just har gjutits, fotograferad på kvällen. Formvirket med stöttor står kvar runt kanten och arbetsplatsen är inhägnad med byggstaket.",
    image: { src: "/referenser/betongplatta-gjutning-kvall.jpg", width: 1170, height: 875 },
    alt: "Nygjuten stor betongplatta på kvällen med formvirke runt kanten och byggstaket i bakgrunden",
    category: "Grund & betong",
    service: "grund-betongplatta",
    alsoServices: ["nybyggnation-tillbyggnad"],
  },
  {
    slug: "golv-fiskbensmonster-hall",
    title: "Golv i fiskbensmönster",
    description:
      "Nytt golv lagt i fiskbensmönster genom hallen och vidare in i nästa rum, med vita golvlister mot väggarna.",
    image: { src: "/referenser/golv-fiskbensparkett-hall.jpg", width: 1170, height: 1560 },
    alt: "Nylagt golv i fiskbensmönster i en hall med vita golvlister och dörröppning mot nästa rum",
    category: "Golv",
    service: "golvlaggning",
    alsoServices: ["renovering"],
  },
  {
    slug: "betongplatta-husgrund",
    title: "Husgrund – gjuten platta",
    description:
      "Färdiggjuten platta på mark till en husgrund. Rör och slangar är ingjutna och sticker upp där installationerna ska anslutas.",
    image: { src: "/referenser/betongplatta-husgrund.jpg", width: 1170, height: 878 },
    alt: "Färdig gjuten betongplatta till husgrund med ingjutna rör och skogsbryn i bakgrunden",
    category: "Grund & betong",
    service: "grund-betongplatta",
    alsoServices: ["nybyggnation-tillbyggnad"],
    cardImage: true,
  },
];

export function getReferens(slug: string): Referens | undefined {
  return REFERENSER.find((r) => r.slug === slug);
}

/**
 * Projekt som visas på en tjänstesida (slug i SERVICE_PAGES): först de som har
 * tjänsten som `service`, sedan de som anger den i `alsoServices`. Tom lista om inga finns.
 */
export function referenserFor(serviceSlug: string): Referens[] {
  return [
    ...REFERENSER.filter((r) => r.service === serviceSlug),
    ...REFERENSER.filter((r) => r.service !== serviceSlug && r.alsoServices?.includes(serviceSlug)),
  ];
}

/**
 * Egen bild till små tjänstekort (t.ex. listan på /tjanster) – projektet med
 * cardImage, annars tjänstens första. Bara projekt med tjänsten som `service`
 * räknas (inte `alsoServices`), så att samma bild inte hamnar på två kort.
 * Returnerar undefined om tjänsten saknar egna bilder, så att anroparen kan
 * falla tillbaka på stockfoto eller ikonruta.
 */
export function serviceCardImage(serviceSlug: string): { src: string; alt: string } | undefined {
  const items = REFERENSER.filter((r) => r.service === serviceSlug);
  const first = items.find((r) => r.cardImage) ?? items[0];
  return first ? { src: first.image.src, alt: first.alt } : undefined;
}
