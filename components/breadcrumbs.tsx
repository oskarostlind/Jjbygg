import Link from "next/link";
import { SITE_URL } from "@/lib/seo";

export type Crumb = {
  name: string;
  /** Sökväg relativt sajtroten, t.ex. "/tjanster". Utelämnas på sista steget. */
  href?: string;
};

/** BreadcrumbList-JSON-LD för samma lista som visas i <Breadcrumbs />. */
export function breadcrumbJsonLd(crumbs: Crumb[], currentUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: crumb.href ? new URL(crumb.href, SITE_URL).toString() : currentUrl,
    })),
  };
}

type Props = {
  crumbs: Crumb[];
  /** Ljus text för mörk bakgrund (hero), annars standardfärger. */
  tone?: "light" | "default";
};

export function Breadcrumbs({ crumbs, tone = "light" }: Props) {
  const base = tone === "light" ? "text-primary-foreground/70" : "text-muted-foreground";
  const current = tone === "light" ? "text-primary-foreground/90" : "text-foreground";

  return (
    <nav aria-label="Brödsmulor" className={`text-sm ${base}`}>
      <ol className="flex flex-wrap items-center gap-1">
        {crumbs.map((crumb, i) => {
          const last = i === crumbs.length - 1;
          return (
            <li key={`${crumb.name}-${i}`} className="flex items-center gap-1">
              {i > 0 ? <span aria-hidden>›</span> : null}
              {last || !crumb.href ? (
                <span aria-current={last ? "page" : undefined} className={current}>
                  {crumb.name}
                </span>
              ) : (
                <Link href={crumb.href} className="hover:text-accent">
                  {crumb.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
