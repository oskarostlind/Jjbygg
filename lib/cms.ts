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

/* ---------------------------------------------------------------------- */
/* Nyheter (blogginlägg)                                                  */
/* ---------------------------------------------------------------------- */

export type CmsPost = {
  slug: string;
  title: string;
  excerpt: string | null;
  coverImage: string | null;
  content: string;
  publishedAt: string | null;
};

const CMS_POSTS_PATH = "/api/v1/sites/jjbygg/posts";

function cmsBaseUrl(): string | null {
  const baseUrl = process.env.CMS_API_URL?.trim();
  const apiKey = process.env.CMS_API_KEY?.trim();
  if (!baseUrl || !apiKey) {
    return null;
  }
  return baseUrl.replace(/\/+$/, "");
}

function cmsHeaders(): Record<string, string> | null {
  const apiKey = process.env.CMS_API_KEY?.trim();
  if (!apiKey) {
    return null;
  }
  return { "x-api-key": apiKey };
}

function firstNonEmptyString(...values: unknown[]): string | null {
  for (const value of values) {
    if (typeof value === "string" && value.trim().length > 0) {
      return value.trim();
    }
  }
  return null;
}

/**
 * Normaliserar ett obekant post-objekt från CMS:et till vår interna form.
 * Tolererar flera möjliga fältnamn (camelCase/snake_case) så att sajten
 * inte kraschar om CMS-svaret ser lite annorlunda ut än förväntat.
 * Returnerar null om objektet saknar det absolut nödvändigaste (slug/title),
 * eller om posten uttryckligen är markerad som opublicerad.
 */
function normalizeCmsPost(raw: unknown): CmsPost | null {
  if (!raw || typeof raw !== "object") {
    return null;
  }
  const r = raw as Record<string, unknown>;

  const slug = firstNonEmptyString(r.slug, r.postSlug, r.id);
  const title = firstNonEmptyString(r.title, r.name);
  if (!slug || !title) {
    return null;
  }

  // Om ett status-/published-fält finns, respektera det. Saknas det antas
  // API-svaret redan vara begränsat till publikt innehåll (samma princip
  // som getCmsContent).
  if (typeof r.status === "string" && r.status.trim().length > 0) {
    const status = r.status.trim().toLowerCase();
    if (status !== "published" && status !== "publicerad") {
      return null;
    }
  } else if (typeof r.published === "boolean" && r.published !== true) {
    return null;
  }

  const excerpt = firstNonEmptyString(r.excerpt, r.summary, r.description, r.ingress);
  const coverImage = firstNonEmptyString(
    r.coverImage,
    r.cover_image,
    r.coverImageUrl,
    r.image,
    r.imageUrl,
    r.ogImage
  );
  const content = firstNonEmptyString(r.content, r.body, r.markdown, r.text) ?? "";
  const publishedAt = firstNonEmptyString(
    r.publishedAt,
    r.published_at,
    r.createdAt,
    r.created_at,
    r.date
  );

  return { slug, title, excerpt, coverImage, content, publishedAt };
}

function sortPostsByDateDesc(posts: CmsPost[]): CmsPost[] {
  return [...posts].sort((a, b) => {
    const aTime = a.publishedAt ? Date.parse(a.publishedAt) : NaN;
    const bTime = b.publishedAt ? Date.parse(b.publishedAt) : NaN;
    if (Number.isNaN(aTime) && Number.isNaN(bTime)) return 0;
    if (Number.isNaN(aTime)) return 1;
    if (Number.isNaN(bTime)) return -1;
    return bTime - aTime;
  });
}

/**
 * Hämtar publicerade nyhetsinlägg från CMS:et. Returnerar ALLTID en array –
 * aldrig null och kastar aldrig – så att /nyheter kan falla tillbaka på en
 * tom-state om CMS:et är nere, svarar fel eller nätverket failar.
 */
export async function getCmsPosts(): Promise<CmsPost[]> {
  const base = cmsBaseUrl();
  const headers = cmsHeaders();
  if (!base || !headers) {
    return [];
  }

  try {
    const res = await fetch(`${base}${CMS_POSTS_PATH}`, {
      headers,
      next: { revalidate: 60, tags: ["cms"] },
    });

    if (!res.ok) {
      return [];
    }

    const data = (await res.json()) as unknown;
    const rawPosts = Array.isArray((data as { posts?: unknown })?.posts)
      ? (data as { posts: unknown[] }).posts
      : Array.isArray(data)
        ? (data as unknown[])
        : [];

    const posts = rawPosts
      .map((p) => normalizeCmsPost(p))
      .filter((p): p is CmsPost => p !== null);

    return sortPostsByDateDesc(posts);
  } catch {
    // Nätverksfel, timeout, trasigt JSON-svar etc. – sajten ska aldrig krascha.
    return [];
  }
}

/**
 * Hämtar ett enskilt nyhetsinlägg via slug. Returnerar null vid ALLA typer
 * av fel (saknad config, 404, nätverksfel, trasig JSON) så att anroparen
 * kan visa notFound().
 */
export async function getCmsPost(slug: string): Promise<CmsPost | null> {
  const base = cmsBaseUrl();
  const headers = cmsHeaders();
  const cleanSlug = slug.trim();
  if (!base || !headers || !cleanSlug) {
    return null;
  }

  try {
    const res = await fetch(`${base}${CMS_POSTS_PATH}/${encodeURIComponent(cleanSlug)}`, {
      headers,
      // no-store: the detail page is force-dynamic and low-traffic; Next's
      // data cache serves stale entries indefinitely when revalidation hits
      // a 404, which kept deleted posts alive. Always fetch fresh.
      cache: "no-store",
    });

    if (!res.ok) {
      return null;
    }

    const data = (await res.json()) as unknown;
    const rawPost =
      data && typeof data === "object" && "post" in (data as Record<string, unknown>)
        ? (data as Record<string, unknown>).post
        : data;

    return normalizeCmsPost(rawPost);
  } catch {
    return null;
  }
}

/**
 * Feature-flagga: true om minst ett publicerat inlägg finns. Används av
 * Header/Footer för att visa/dölja nav-länken "Nyheter" utan att sajten
 * ändrar utseende när nyhetssektionen är tom.
 */
export async function hasPublishedPosts(): Promise<boolean> {
  const posts = await getCmsPosts();
  return posts.length > 0;
}
