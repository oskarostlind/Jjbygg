import Link from "next/link";
import Image from "next/image";
import { siteContent } from "@/lib/site-content";
import { Button } from "@/components/ui/button";

export function Header() {
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
              width={1792}
              height={1487}
              className="block h-full w-auto max-w-[min(100%,280px)] object-contain object-left md:max-w-[min(100%,320px)]"
              sizes="(max-width: 768px) 200px, 280px"
              priority
            />
          </span>
        </Link>
        <nav className="flex items-center gap-4" aria-label="Huvudnavigation">
          <Link
            href="/"
            className="text-sm font-medium text-primary-foreground/90 hover:text-primary-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-primary rounded px-2 py-1"
          >
            Hem
          </Link>
          <Button asChild variant="default" size="sm" className="bg-accent hover:bg-accent/90">
            <Link href="/offert">Begär offert</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
