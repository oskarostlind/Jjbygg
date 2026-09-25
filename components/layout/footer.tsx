import Link from "next/link";
import { unstable_noStore as noStore } from "next/cache";
import { siteContent } from "@/lib/site-content";
import { resolveContactPhoneFromEnv, parseSwedishMobileTenDigits, formatSwedishMobileDisplay } from "@/lib/contact";
import { getCmsContent, blockValue, hasPublishedPosts } from "@/lib/cms";
import { SERVICE_PAGES } from "@/lib/services-content";

const { footer } = siteContent;
const FALLBACK_CONTACT_NAME = "Jesper Johansson";

export async function Footer() {
  noStore();
  const content = await getCmsContent();
  // Feature-flagga via innehåll: samma regel som i Header – länken visas
  // bara om det finns minst ett publicerat nyhetsinlägg.
  const showNews = await hasPublishedPosts();

  const companyName = blockValue(content, "footer.company", footer.companyName);
  const orgNumber = blockValue(content, "footer.orgnr", footer.orgNumber);
  const address = blockValue(content, "footer.address", footer.address);
  const contactName = blockValue(content, "footer.contactName", FALLBACK_CONTACT_NAME);

  // Telefon: om CMS levererar ett giltigt svenskt mobilnummer används det
  // (både visning och tel:-länk härleds från samma värde). Annars behålls
  // den befintliga env-baserade upplösningen oförändrad.
  const envPhone = resolveContactPhoneFromEnv();
  const cmsPhoneRaw = blockValue(content, "footer.phone", "");
  const cmsPhoneDigits = cmsPhoneRaw ? parseSwedishMobileTenDigits(cmsPhoneRaw) : null;
  const phone = cmsPhoneDigits
    ? { display: formatSwedishMobileDisplay(cmsPhoneDigits), telDigits: cmsPhoneDigits }
    : envPhone;

  const envEmail = process.env.JESPER_EMAIL?.trim();
  const cmsEmail = blockValue(content, "footer.email", "");
  const contactEmail = cmsEmail || envEmail;

  return (
    <footer className="w-full border-t border-primary/20 bg-primary py-12 text-primary-foreground">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-primary-foreground/70">Företag</p>
            <p className="mt-2 font-semibold">{companyName}</p>
            <p className="text-sm text-primary-foreground/80">{footer.tagline}</p>
            <p className="mt-1 text-sm text-primary-foreground/80">Org.nr {orgNumber}</p>
            {showNews ? (
              <Link
                href="/nyheter"
                className="mt-3 inline-block text-sm font-medium text-primary-foreground/90 hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-primary rounded"
              >
                Nyheter
              </Link>
            ) : null}
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-primary-foreground/70">Tjänster</p>
            <ul className="mt-2 space-y-1 text-sm">
              {SERVICE_PAGES.map((page) => (
                <li key={page.slug}>
                  <Link
                    href={`/tjanster/${page.slug}`}
                    className="text-primary-foreground/90 hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-primary rounded"
                  >
                    {page.name}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-primary-foreground/70">Adress</p>
            <address className="mt-2 not-italic text-sm text-primary-foreground/90">
              {address}
            </address>
            {footer.postAddress && (footer.postAddress as string) !== (footer.address as string) && (
              <p className="mt-1 text-sm text-primary-foreground/80">Post: {footer.postAddress}</p>
            )}
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-primary-foreground/70">Kontakt</p>
            <div className="mt-2 space-y-2 text-sm">
              {phone && (
                <p>
                  <span className="block text-xs text-primary-foreground/70">{contactName}</span>
                  <a
                    href={`tel:${phone.telDigits}`}
                    className="text-primary-foreground/90 hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-primary rounded"
                  >
                    {phone.display}
                  </a>
                </p>
              )}
              {contactEmail ? (
                <p>
                  <a
                    href={`mailto:${contactEmail}`}
                    className="text-primary-foreground/90 hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-primary rounded"
                  >
                    {contactEmail}
                  </a>
                </p>
              ) : null}
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-primary-foreground/70">Offert</p>
            <p className="mt-2 text-sm text-primary-foreground/80">
              {footer.contactPrompt || "Begär en kostnadsfri offert – vi återkommer snabbt."}
            </p>
            <Link
              href="/offert"
              className="mt-3 inline-block rounded bg-accent px-4 py-2 text-sm font-medium text-accent-foreground hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-primary"
            >
              Begär en offert
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
