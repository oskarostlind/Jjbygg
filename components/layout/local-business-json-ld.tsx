import { unstable_noStore as noStore } from "next/cache";
import { siteContent } from "@/lib/site-content";
import { resolveContactPhoneFromEnv } from "@/lib/contact";

export function LocalBusinessJsonLd() {
  noStore();
  const phone = resolveContactPhoneFromEnv();
  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteContent.footer.companyName,
    description: siteContent.meta.description,
    ...(phone ? { telephone: phone.display } : {}),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
