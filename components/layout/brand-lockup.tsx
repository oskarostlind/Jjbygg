import Image from "next/image";
import Link from "next/link";
import { siteContent } from "@/lib/site-content";
import { cn } from "@/lib/utils";

type BrandLockupProps = {
  /** Vit variant för mörka ytor. */
  onDark?: boolean;
  className?: string;
  /** Prioritera laddning (header ovanför vikningen). */
  priority?: boolean;
};

/**
 * Märket + ordbild i text. Dekalen (public/logo.svg) är hög och passar
 * inte i en låg header – där används märket ensamt tillsammans med namnet
 * satt i Archivo, som ligger nära loggans Montserrat ExtraBold.
 */
export function BrandLockup({ onDark = false, className, priority = false }: BrandLockupProps) {
  return (
    <Link
      href="/"
      className={cn(
        "inline-flex items-center gap-3 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-strong focus-visible:ring-offset-2",
        onDark ? "focus-visible:ring-offset-graphite" : "focus-visible:ring-offset-sand",
        className
      )}
      aria-label="JJ Bygg & Entreprenad AB – till startsidan"
    >
      <Image
        src={onDark ? siteContent.logo.markWhite : siteContent.logo.mark}
        alt=""
        width={40}
        height={40}
        className="h-9 w-9 shrink-0 md:h-10 md:w-10"
        priority={priority}
      />
      <span
        className={cn(
          "display flex flex-col leading-none",
          onDark ? "text-ink-onDark" : "text-graphite"
        )}
        aria-hidden
      >
        <span className="text-[1.0625rem] uppercase tracking-[0.04em] md:text-lg">JJ Bygg</span>
        <span className="mt-0.5 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] opacity-80 md:text-xs">
          &amp; Entreprenad
        </span>
      </span>
    </Link>
  );
}
