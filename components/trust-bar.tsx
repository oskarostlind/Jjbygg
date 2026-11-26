import { ArrowUpRight } from "lucide-react";
import { siteContent } from "@/lib/site-content";
import { cn } from "@/lib/utils";

type TrustBarProps = {
  /**
   * "hero": sandfärgad list som sitter i underkanten av startsidans hero.
   * "footer": diskret textrad på mörk botten i sidfoten.
   */
  variant: "hero" | "footer";
  className?: string;
};

/**
 * Förtroenderad med korta, belagda punkter (siteContent.trustBar) och en länk
 * till Google-profilen där omdömena syns. Inga betyg eller antal – profilen
 * visar det själv.
 */
export function TrustBar({ variant, className }: TrustBarProps) {
  const items = siteContent.trustBar;
  const googleLabel = "Omdömen på Google";
  const googleHref = siteContent.google.reviewsUrl;

  if (variant === "footer") {
    return (
      <ul
        className={cn(
          "flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-ink-onDark/70",
          className
        )}
        aria-label="Om företaget"
      >
        {items.map((item) => (
          <li key={item} className="inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 shrink-0 rounded-sm bg-brand" aria-hidden />
            {item}
          </li>
        ))}
        <li className="inline-flex items-center gap-2">
          <span className="h-1.5 w-1.5 shrink-0 rounded-sm bg-brand" aria-hidden />
          <a
            href={googleHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded text-ink-onDark/80 underline decoration-ink-onDark/30 underline-offset-4 transition-colors hover:text-paper hover:decoration-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-graphite"
          >
            {googleLabel}
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
            <span className="sr-only">(öppnas i ny flik)</span>
          </a>
        </li>
      </ul>
    );
  }

  // Hårlinjer via gap-px på linjefärgad botten: fungerar både i två spalter (mobil) och fem.
  const cell =
    "flex items-center gap-2.5 bg-sand px-3 py-3 font-display text-sm font-bold text-graphite sm:px-4 md:justify-center md:px-3 md:py-4 md:text-[0.9375rem]";

  return (
    <ul
      className={cn("grid grid-cols-2 gap-px border-x border-t border-line bg-line md:grid-cols-5", className)}
      aria-label="Om företaget"
    >
      {items.map((item) => (
        <li key={item} className={cell}>
          <span className="h-2.5 w-2.5 shrink-0 rounded-sm bg-brand" aria-hidden />
          {item}
        </li>
      ))}
      <li className={cn(cell, "col-span-2 md:col-span-1")}>
        <span className="h-2.5 w-2.5 shrink-0 rounded-sm bg-brand" aria-hidden />
        <a
          href={googleHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 rounded underline decoration-graphite/30 decoration-2 underline-offset-4 transition-colors hover:text-brand-strong hover:decoration-brand-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-strong focus-visible:ring-offset-2 focus-visible:ring-offset-sand"
        >
          {googleLabel}
          <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden />
          <span className="sr-only">(öppnas i ny flik)</span>
        </a>
      </li>
    </ul>
  );
}
