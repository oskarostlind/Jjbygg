"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone, X } from "lucide-react";
import { cn } from "@/lib/utils";

export type NavItem = { href: string; label: string };

type MobileNavProps = {
  items: NavItem[];
  phoneDisplay: string;
  phoneTel: string;
};

/**
 * Mobilmeny (under md). Knappen ligger i headern; panelen fälls ned under
 * den och täcker resten av skärmen. Stängs vid navigering och Escape.
 */
export function MobileNav({ items, phoneDisplay, phoneTel }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const panelId = useId();

  // Stäng när användaren navigerat.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Escape stänger; lås scroll bakom panelen.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        className="inline-flex h-11 w-11 items-center justify-center rounded text-graphite transition-colors hover:bg-sand-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-strong"
      >
        {open ? <X className="h-6 w-6" aria-hidden /> : <Menu className="h-6 w-6" aria-hidden />}
        <span className="sr-only">{open ? "Stäng menyn" : "Öppna menyn"}</span>
      </button>

      <div
        id={panelId}
        hidden={!open}
        className={cn(
          "fixed inset-x-0 bottom-0 top-[var(--header-h)] z-40 flex flex-col overflow-y-auto border-t border-line bg-sand",
          open ? "animate-in fade-in-0 slide-in-from-top-2 duration-200" : ""
        )}
      >
        <nav aria-label="Huvudnavigation" className="px-4 pt-2">
          <ul className="divide-y divide-line">
            {items.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "display flex items-center justify-between py-5 text-2xl text-graphite",
                      active && "text-brand-strong"
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="mt-auto space-y-3 border-t border-line bg-sand-deep/60 p-4 pb-8">
          <a
            href={`tel:${phoneTel}`}
            className="flex h-13 min-h-[3.25rem] items-center justify-center gap-3 rounded border-2 border-graphite font-display text-lg font-bold text-graphite"
          >
            <Phone className="h-5 w-5" aria-hidden />
            {phoneDisplay}
          </a>
          <Link
            href="/offert"
            className="flex h-13 min-h-[3.25rem] items-center justify-center rounded bg-brand-strong font-display text-lg font-bold text-paper"
          >
            Begär kostnadsfri offert
          </Link>
          <p className="text-center text-sm text-ink-muted">Boden &amp; Luleå med omnejd</p>
        </div>
      </div>
    </div>
  );
}
