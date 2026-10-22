import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { SITE_URL } from "@/lib/seo";
import { cn } from "@/lib/utils";

export type Crumb = {
  /** Sökväg relativt sajtroten, t.ex. "/tjanster". Utelämnas på sista steget. */
  href?: string;
  label: string;
};

/** BreadcrumbList-JSON-LD för samma lista som visas i <Breadcrumbs />. */
export function breadcrumbJsonLd(crumbs: Crumb[], currentUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.label,
      item: crumb.href ? new URL(crumb.href, SITE_URL).toString() : currentUrl,
    })),
  };
}

type BreadcrumbsProps = {
  items: Crumb[];
  onDark?: boolean;
  className?: string;
};

/** Brödsmulor – sista posten är aktuell sida (ingen länk). */
export function Breadcrumbs({ items, onDark = false, className }: BreadcrumbsProps) {
  return (
    <nav aria-label="Brödsmulor" className={cn("text-sm", className)}>
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={`${item.label}-${i}`} className="flex items-center gap-1.5">
              {item.href && !last ? (
                <Link
                  href={item.href}
                  className={cn(
                    "rounded font-medium transition-colors",
                    onDark ? "text-ink-onDark/70 hover:text-paper" : "text-ink-muted hover:text-brand-strong"
                  )}
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current={last ? "page" : undefined}
                  className={cn("font-medium", onDark ? "text-paper" : "text-graphite")}
                >
                  {item.label}
                </span>
              )}
              {!last ? (
                <ChevronRight
                  className={cn("h-3.5 w-3.5", onDark ? "text-ink-onDark/40" : "text-concrete")}
                  aria-hidden
                />
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
