import { previewFrameHeaders } from "sitecms-next/preview";

/**
 * Origins som får visa sajten i en iframe (sitecms-panelens live-förhandsgranskning),
 * via CSP frame-ancestors. Sajten sätter ingen X-Frame-Options (skulle blockera panelen).
 * localhost:3000 = sitecms lokalt, bara utanför produktion. Headers räknas ut vid build.
 */
const SITECMS_PANEL_ORIGINS = [
  "https://sitecms.se",
  "https://www.sitecms.se",
  "https://sitecms-zeta.vercel.app",
  ...(process.env.NODE_ENV !== "production" ? ["http://localhost:3000"] : []),
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
        pathname: "/**",
      },
    ],
  },
  async headers() {
    return [{ source: "/:path*", headers: previewFrameHeaders(SITECMS_PANEL_ORIGINS) }];
  },
};

export default nextConfig;
