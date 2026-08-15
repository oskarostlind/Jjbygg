/**
 * Headless CMS-integration (SiteCMS).
 *
 * VIKTIGT: getCmsContent() FÅR ALDRIG kasta ett ohanterat fel eller låta sajten
 * krascha. Om CMS:et är nere, svarar fel, eller nätverket failar ska funktionen
 * returnera null – anroparna faller då tillbaka på det befintliga statiska
 * innehållet i lib/site-content.ts. Kundsajten ska aldrig visa tomt innehåll.
 */

export type CmsBlockType = "text" | "richtext" | "image" | string;

export type CmsBlock = {
  key: string;
  type: CmsBlockType;
  value: string;
};

export type CmsPage = {
  slug: string;
  title: string;
  blocks: CmsBlock[];
};

export type CmsService = {
  title: string;
  description: string;
  price?: string | number | null;
};

export type CmsSeoEntry = {
  pageSlug: string;
  title: string;
  description: string;
  ogImage?: string | null;
};

export type CmsContent = {
  site: { name: string; domain: string };
  pages: CmsPage[];
  services: CmsService[];
  seo: CmsSeoEntry[];
};

const CMS_CONTENT_PATH = "/api/v1/sites/jjbygg/content";

/**
 * Hämtar innehåll från CMS:et. Returnerar null vid ALLA typer av fel
 * (saknad config, nätverksfel, icke-200-svar, trasig JSON) så att
 * anroparna kan falla tillbaka på statiskt innehåll.
 */
export async function getCmsContent(): Promise<CmsContent | null> {
  const baseUrl = process.env.CMS_API_URL?.trim();
  const apiKey = process.env.CMS_API_KEY?.trim();

  if (!baseUrl || !apiKey) {
    return null;
  }

  try {
    const url = `${baseUrl.replace(/\/+$/, "")}${CMS_CONTENT_PATH}`;
    const res = await fetch(url, {
      headers: { "x-api-key": apiKey },
      next: { revalidate: 60, tags: ["cms"] },
    });

    if (!res.ok) {
      return null;
    }

    const data = (await res.json()) as CmsContent | null;

    if (!data || !Array.isArray(data.pages)) {
      return null;
    }

    return data;
  } catch {
    // Nätverksfel, timeout, trasigt JSON-svar etc. – sajten ska aldrig krascha.
    return null;
  }
}

/**
 * Läser ut ett textvärde för en block-nyckel på en given sida.
 * Faller tillbaka på `fallback` om CMS-innehåll saknas, sidan/blocket
 * inte hittas, eller värdet är tomt.
 */
export function blockValue(
  content: CmsContent | null,
  key: string,
  fallback: string,
  pageSlug = "home"
): string {
  if (!content) {
    return fallback;
  }

  const page = content.pages.find((p) => p.slug === pageSlug);
  if (!page) {
    return fallback;
  }

  const block = page.blocks.find((b) => b.key === key);
  if (!block || typeof block.value !== "string") {
    return fallback;
  }

  const value = block.value.trim();
  return value.length > 0 ? value : fallback;
}

/**
 * Slår ihop CMS-tjänster med det statiska fallback-arrayet positionellt,
 * så att fält som inte finns i CMS-svaret (t.ex. iconKey) behålls från
 * fallback. Om CMS inte levererar tjänster (eller listan är tom) används
 * fallback oförändrad.
 */
export function cmsServices<T extends { title: string; description: string }>(
  content: CmsContent | null,
  fallback: readonly T[]
): T[] {
  if (!content || !Array.isArray(content.services) || content.services.length === 0) {
    return [...fallback];
  }

  return fallback.map((fallbackItem, i) => {
    const cmsItem = content.services[i];
    if (!cmsItem) {
      return fallbackItem;
    }

    const title = typeof cmsItem.title === "string" ? cmsItem.title.trim() : "";
    const description = typeof cmsItem.description === "string" ? cmsItem.description.trim() : "";

    return {
      ...fallbackItem,
      title: title.length > 0 ? title : fallbackItem.title,
      description: description.length > 0 ? description : fallbackItem.description,
    };
  });
}

/** Hämtar SEO-metadata för en sida ur CMS-svaret, eller null om saknas. */
export function cmsSeo(content: CmsContent | null, pageSlug = "home"): CmsSeoEntry | null {
  if (!content || !Array.isArray(content.seo)) {
    return null;
  }
  return content.seo.find((entry) => entry.pageSlug === pageSlug) ?? null;
}
