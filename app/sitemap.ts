import { MetadataRoute } from "next";
import { getCmsPosts } from "@/lib/cms";
import { SERVICE_PAGES } from "@/lib/services-content";

import { SITE_URL } from "@/lib/seo";

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
      changeFrequency: "monthly" as const,
      priority: 1,
    },
    {
      url: `${SITE_URL}/offert`,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/tjanster`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    ...SERVICE_PAGES.map((page) => ({
      url: `${SITE_URL}/tjanster/${page.slug}`,
      lastModified: new Date(page.updated),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
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
