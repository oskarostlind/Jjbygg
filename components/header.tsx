import Link from "next/link";
import Image from "next/image";
import { Phone } from "lucide-react";
import { unstable_noStore as noStore } from "next/cache";
import { siteContent } from "@/lib/site-content";
import { resolveContactPhoneFromEnv } from "@/lib/contact";
import { Button } from "@/components/ui/button";
import { hasPublishedPosts } from "@/lib/cms";

/** Intrinsic logo ratio (public/logo.png) – undvik fel proportioner i layout. */
const LOGO_WIDTH = 320;
const LOGO_HEIGHT = Math.round((LOGO_WIDTH * 1487) / 1792);

export async function Header() {
  noStore();
  const phoneFromEnv = resolveContactPhoneFromEnv();
  const phoneDisplay = phoneFromEnv?.display ?? siteContent.contact.phoneDisplay;
  const phoneTel = phoneFromEnv?.telDigits ?? siteContent.contact.phoneTelDigits;
  // Feature-flagga via innehåll: nav-länken visas endast om det finns minst
  // ett publicerat nyhetsinlägg i CMS:et. Inga inlägg → länken syns inte
  // och sajten ser ut exakt som idag.
  const showNews = await hasPublishedPosts();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary/20 bg-primary">
      <div className="mx-auto flex min-h-20 max-w-6xl items-center justify-between gap-4 px-4 py-2 md:min-h-24">
        <Link
          href="/"
          className="inline-flex max-w-full shrink-0 items-center bg-transparent focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-primary rounded"
        >
          <span
            className="block h-20 w-auto md:h-24"
            style={{
              filter:
                "drop-shadow(0 0 0.75px rgba(255,255,255,0.95)) drop-shadow(0 0 3px rgba(255,255,255,0.45))",
            }}
          >
            <Image
              src={siteContent.logo.primary}
              alt={siteContent.logo.imageAlt}
              width={LOGO_WIDTH}
              height={LOGO_HEIGHT}
              className="h-20 w-auto max-w-[min(100%,280px)] object-contain object-left md:h-24 md:max-w-[min(100%,320px)]"
              sizes="(max-width: 768px) 120px, 160px"
              priority
            />
          </span>
        </Link>
        <nav className="flex items-center gap-2 sm:gap-4" aria-label="Huvudnavigation">
          <Link
            href="/"
            className="hidden text-sm font-medium text-primary-foreground/90 hover:text-primary-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-primary rounded px-2 py-1 sm:inline"
          >
            Hem
          </Link>
          {showNews ? (
            <Link
              href="/nyheter"
              className="hidden text-sm font-medium text-primary-foreground/90 hover:text-primary-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-primary rounded px-2 py-1 sm:inline"
            >
              Nyheter
            </Link>
          ) : null}
          <a
            href={`tel:${phoneTel}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-primary-foreground transition hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-primary rounded"
            aria-label={`Ring ${phoneDisplay}`}
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-sm md:hidden">
              <Phone className="h-5 w-5" aria-hidden />
            </span>
            <span className="hidden items-center gap-2 md:inline-flex">
              <Phone className="h-4 w-4 shrink-0" aria-hidden />
              <span>{phoneDisplay}</span>
            </span>
          </a>
          <Button asChild variant="default" size="sm" className="shrink-0 bg-accent hover:bg-accent/90">
            <Link href="/offert">Begär offert</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
