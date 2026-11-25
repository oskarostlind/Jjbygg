import { MetadataRoute } from "next";
import { getCmsPosts } from "@/lib/cms";
import { SERVICE_PAGES } from "@/lib/services-content";
import { BODEN_SECTION, LOCATION_PAGES } from "@/lib/locations-content";
import { SERVICE_LOCATION_PAGES } from "@/lib/service-location-content";
import { REFERENSER_UPDATED } from "@/lib/referenser-content";

import { SITE_URL } from "@/lib/seo";

/** Senaste ISO-datumet i en lista. */
function latest(dates: string[]): Date {
  return new Date(dates.reduce((a, b) => (a > b ? a : b)));
}

/**
 * lastModified för sidor utan eget datum i innehållsfilerna. Uppdatera när
 * sidans innehåll ändras – Google litar bara på datum som stämmer.
 */
const OFFERT_UPDATED = "2026-10-22";
const TJANSTER_UPDATED = "2026-11-26";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // getCmsPosts() kraschar aldrig – returnerar tom array om CMS:et är nere,
  // så sitemapen faller tillbaka till de statiska sidorna.
  const posts = await getCmsPosts();

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/nyheter/${post.slug}`,
    lastModified: post.publishedAt ? new Date(post.publishedAt) : new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    {
      url: SITE_URL,
      // Startsidans Boden-sektion (/byggfirma/boden redirectar hit och listas inte).
      lastModified: new Date(BODEN_SECTION.updated),
      changeFrequency: "monthly" as const,
      priority: 1,
    },
    {
      url: `${SITE_URL}/offert`,
      lastModified: new Date(OFFERT_UPDATED),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/tjanster`,
      lastModified: latest([TJANSTER_UPDATED, ...SERVICE_PAGES.map((page) => page.updated)]),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/referenser`,
      lastModified: new Date(REFERENSER_UPDATED),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    ...SERVICE_PAGES.map((page) => ({
      url: `${SITE_URL}/tjanster/${page.slug}`,
      lastModified: new Date(page.updated),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...LOCATION_PAGES.map((page) => ({
      url: `${SITE_URL}/byggfirma/${page.slug}`,
      lastModified: new Date(page.updated),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...SERVICE_LOCATION_PAGES.map((page) => ({
      url: `${SITE_URL}/tjanster/${page.service}/${page.location}`,
      lastModified: new Date(page.updated),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    {
      url: `${SITE_URL}/integritet`,
      changeFrequency: "yearly" as const,
      priority: 0.2,
    },
    // Nyhetssidan listas bara när det finns inlägg – en tom sida ska inte indexeras.
    ...(posts.length > 0
      ? [
          {
            url: `${SITE_URL}/nyheter`,
            lastModified: new Date(),
            changeFrequency: "weekly" as const,
            priority: 0.6,
          },
        ]
      : []),
    ...postEntries,
  ];
}
