import { MetadataRoute } from "next";
import { getCmsPosts } from "@/lib/cms";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://placeholder-jj-entreprenad.se";

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
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 1,
    },
    {
      url: `${SITE_URL}/offert`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/nyheter`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
    ...postEntries,
  ];
}
