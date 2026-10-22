import { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // /offert/tack finns inte som route i dag; listas ändå så att en framtida
      // tacksida (efter skickat formulär) inte indexeras.
      disallow: ["/api/", "/offert/tack"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
