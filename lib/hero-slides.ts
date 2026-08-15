/** En hero-slide: bildkälla (lokal path eller extern URL, t.ex. CMS/blob) och alt-text. */
export type HeroSlide = {
  src: string;
  alt: string;
};

/** Alla hero-bilder i /public/hero – används i karusellen på startsidan. */
export const HERO_SLIDES: readonly HeroSlide[] = [
  {
    src: "/hero/benjamin-lehman-EJU7A__krX0-unsplash.jpg",
    alt: "Byggfirma i Boden och Luleå – nybyggnation och entreprenad i Norrbotten",
  },
  {
    src: "/hero/quilia-j86QX1TMNaw-unsplash.jpg",
    alt: "Byggprojekt och tillbyggnad i Boden – JJ Bygg & Entreprenad AB",
  },
  {
    src: "/hero/callum-hill-NGGkGzslIaM-unsplash.jpg",
    alt: "Altanbygge och uteplats i Boden och Luleå – trädäck och uterum",
  },
  {
    src: "/hero/yves-cedric-schulze-o-ANXY28n_w-unsplash.jpg",
    alt: "Takbyte och plåtarbeten i Norrbotten – byggfirma JJ Bygg",
  },
  {
    src: "/hero/scandinavian home renovation.jpg",
    alt: "Renovering och interiör i Boden – kök och totalrenovering",
  },
];

export const HERO_SLIDE_INTERVAL_MS = 10_000;
