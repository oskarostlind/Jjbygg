import Link from "next/link";
import { siteContent } from "@/lib/site-content";

const { footer } = siteContent;

export function Footer() {
  return (
    <footer className="w-full border-t border-primary/20 bg-primary py-12 text-primary-foreground">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Företag */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-primary-foreground/70">
              Företag
            </h3>
            <p className="mt-2 font-semibold">{footer.companyName}</p>
            <p className="text-sm text-primary-foreground/80">{footer.tagline}</p>
            <p className="mt-1 text-sm text-primary-foreground/80">
              Org.nr {footer.orgNumber}
            </p>
          </div>

          {/* Adress */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-primary-foreground/70">
              Adress
            </h3>
            <address className="mt-2 not-italic text-sm text-primary-foreground/90">
              {footer.address}
            </address>
            {footer.postAddress && (footer.postAddress as string) !== (footer.address as string) && (
              <p className="mt-1 text-sm text-primary-foreground/80">
                Post: {footer.postAddress}
              </p>
            )}
          </div>

          {/* Kontakt */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-primary-foreground/70">
              Kontakt
            </h3>
            <div className="mt-2 space-y-1 text-sm">
              {footer.phone ? (
                <p>
                  <a
                    href={`tel:${String(footer.phone).replace(/\s/g, "")}`}
                    className="text-primary-foreground/90 hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-primary rounded"
                  >
                    {footer.phone}
                  </a>
                </p>
              ) : (
                <p className="text-primary-foreground/70">Telefon – uppdateras snart</p>
              )}
              {footer.email ? (
                <p>
                  <a
                    href={`mailto:${footer.email}`}
                    className="text-primary-foreground/90 hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-primary rounded"
                  >
                    {footer.email}
                  </a>
                </p>
              ) : (
                <p className="text-primary-foreground/70">Skicka förfrågan via formuläret nedan</p>
              )}
            </div>
          </div>

          {/* CTA */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-primary-foreground/70">
              Offert
            </h3>
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
