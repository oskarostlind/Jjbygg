import Link from "next/link";
import Image from "next/image";
import { siteContent } from "@/lib/site-content";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary/20 bg-primary">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-primary rounded">
          <Image
            src={siteContent.logo.primary}
            alt={siteContent.footer.companyName}
            width={120}
            height={40}
            className="h-8 w-auto object-contain"
            priority
          />
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
