import Link from "next/link";
import { Phone } from "lucide-react";
import { unstable_noStore as noStore } from "next/cache";
import { siteContent } from "@/lib/site-content";
import { resolveContactPhoneFromEnv } from "@/lib/contact";
import { Button } from "@/components/ui/button";
import { hasPublishedPosts } from "@/lib/cms";
import { BrandLockup } from "@/components/layout/brand-lockup";
import { MobileNav, type NavItem } from "@/components/layout/mobile-nav";

export async function Header() {
  noStore();
  const phoneFromEnv = resolveContactPhoneFromEnv();
  const phoneDisplay = phoneFromEnv?.display ?? siteContent.contact.phoneDisplay;
  const phoneTel = phoneFromEnv?.telDigits ?? siteContent.contact.phoneTelDigits;
  // Feature-flagga via innehåll: nav-länken visas endast om det finns minst
  // ett publicerat nyhetsinlägg i CMS:et. Inga inlägg → länken syns inte.
  const showNews = await hasPublishedPosts();

  const items: NavItem[] = [
    { href: "/tjanster", label: "Tjänster" },
    ...(showNews ? [{ href: "/nyheter", label: "Nyheter" }] : []),
    { href: "/offert", label: "Begär offert" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-line bg-sand/95 backdrop-blur supports-[backdrop-filter]:bg-sand/85">
      <div className="wrap flex h-[var(--header-h)] items-center justify-between gap-4">
        <BrandLockup priority />

        <nav className="hidden items-center gap-1 md:flex" aria-label="Huvudnavigation">
          {items
            .filter((item) => item.href !== "/offert")
            .map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded px-3 py-2 text-[0.9375rem] font-semibold text-graphite transition-colors hover:text-brand-strong"
              >
                {item.label}
              </Link>
            ))}
          <a
            href={`tel:${phoneTel}`}
            className="ml-2 inline-flex items-center gap-2 rounded px-3 py-2 font-display text-[0.9375rem] font-bold text-graphite transition-colors hover:text-brand-strong"
            aria-label={`Ring ${phoneDisplay}`}
          >
            <Phone className="h-4 w-4 shrink-0" aria-hidden />
            <span>{phoneDisplay}</span>
          </a>
          <Button asChild className="ml-2">
            <Link href="/offert">Begär offert</Link>
          </Button>
        </nav>

        <div className="flex items-center gap-1 md:hidden">
          <a
            href={`tel:${phoneTel}`}
            className="inline-flex h-11 w-11 items-center justify-center rounded bg-brand-strong text-paper transition-colors hover:bg-brand-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-strong focus-visible:ring-offset-2"
            aria-label={`Ring ${phoneDisplay}`}
          >
            <Phone className="h-5 w-5" aria-hidden />
          </a>
          <MobileNav items={items} phoneDisplay={phoneDisplay} phoneTel={phoneTel} />
        </div>
      </div>
    </header>
  );
}
