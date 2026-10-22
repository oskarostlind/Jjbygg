import Image from "next/image";
import Link from "next/link";
import { unstable_noStore as noStore } from "next/cache";
import { MapPin, Mail, Phone } from "lucide-react";
import { editable } from "sitecms-next";
import { siteContent } from "@/lib/site-content";
import { resolveContactPhoneFromEnv, parseSwedishMobileTenDigits, formatSwedishMobileDisplay } from "@/lib/contact";
import { getCmsContent, blockValue, hasPublishedPosts } from "@/lib/cms";
import { SERVICE_PAGES } from "@/lib/services-content";

const { footer } = siteContent;
const FALLBACK_CONTACT_NAME = "Jesper Johansson";

const footerLink =
  "rounded text-ink-onDark/80 transition-colors hover:text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-graphite";

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
    : envPhone ?? {
        display: siteContent.contact.phoneDisplay,
        telDigits: siteContent.contact.phoneTelDigits,
      };

  const envEmail = process.env.JESPER_EMAIL?.trim();
  const cmsEmail = blockValue(content, "footer.email", "");
  const contactEmail = cmsEmail || envEmail || siteContent.contact.email;

  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
  const year = new Date().getFullYear();

  return (
    <footer className="surface-dark border-t-4 border-brand">
      <div className="wrap py-14 md:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Logga + företag */}
          <div className="lg:col-span-4">
            <Image
              src={siteContent.logo.primaryWhite}
              alt={siteContent.logo.imageAlt}
              width={160}
              height={203}
              className="h-auto w-36 md:w-40"
            />
            <p className="mt-6 max-w-xs text-[0.9375rem] leading-relaxed text-ink-onDark/75">{footer.tagline}</p>
            <p className="mt-4 text-sm text-ink-onDark/60">
              <span {...editable("home", "footer.company")}>{companyName}</span>
              <br />
              Org.nr <span {...editable("home", "footer.orgnr")}>{orgNumber}</span>
            </p>
          </div>

          {/* Tjänster */}
          <nav className="lg:col-span-3" aria-labelledby="footer-services">
            <h2 id="footer-services" className="font-display text-base font-bold text-paper">
              Tjänster
            </h2>
            <ul className="mt-4 space-y-2.5 text-[0.9375rem]">
              {SERVICE_PAGES.map((page) => (
                <li key={page.slug}>
                  <Link href={`/tjanster/${page.slug}`} className={footerLink}>
                    {page.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Kontakt */}
          <div className="lg:col-span-3">
            <h2 className="font-display text-base font-bold text-paper">Kontakt</h2>
            <p className="mt-4 text-[0.9375rem] font-semibold text-paper" {...editable("home", "footer.contactName")}>
              {contactName}
            </p>
            <ul className="mt-3 space-y-3 text-[0.9375rem]">
              <li>
                <a href={`tel:${phone.telDigits}`} className={`${footerLink} inline-flex items-center gap-2.5`}>
                  <Phone className="h-4 w-4 shrink-0 text-brand" aria-hidden />
                  <span {...editable("home", "footer.phone")}>{phone.display}</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${contactEmail}`} className={`${footerLink} inline-flex items-center gap-2.5`}>
                  <Mail className="h-4 w-4 shrink-0 text-brand" aria-hidden />
                  <span {...editable("home", "footer.email")}>{contactEmail}</span>
                </a>
              </li>
              <li>
                <a
                  href={mapsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${footerLink} inline-flex items-start gap-2.5`}
                >
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden />
                  <address className="not-italic" {...editable("home", "footer.address")}>
                    {address}
                  </address>
                </a>
              </li>
            </ul>
            {footer.postAddress && (footer.postAddress as string) !== (footer.address as string) && (
              <p className="mt-3 text-sm text-ink-onDark/55">Post: {footer.postAddress}</p>
            )}
          </div>

          {/* Genvägar */}
          <nav className="lg:col-span-2" aria-labelledby="footer-shortcuts">
            <h2 id="footer-shortcuts" className="font-display text-base font-bold text-paper">
              Genvägar
            </h2>
            <ul className="mt-4 space-y-2.5 text-[0.9375rem]">
              <li>
                <Link href="/" className={footerLink}>
                  Start
                </Link>
              </li>
              <li>
                <Link href="/tjanster" className={footerLink}>
                  Tjänster
                </Link>
              </li>
              {showNews ? (
                <li>
                  <Link href="/nyheter" className={footerLink}>
                    Nyheter
                  </Link>
                </li>
              ) : null}
              <li>
                <Link href="/offert" className={`${footerLink} font-semibold text-paper`}>
                  Begär offert
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-ink-onDark/15 pt-6 text-sm text-ink-onDark/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {companyName}
          </p>
          <p>{footer.contactPrompt || "Kostnadsfri offert och hembesök i Boden och Luleå."}</p>
        </div>
      </div>
    </footer>
  );
}
