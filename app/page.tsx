import Link from "next/link";
import { siteContent } from "@/lib/site-content";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background py-12 px-4">
      <div className="mx-auto max-w-xl space-y-8 text-center">
        <h1 className="text-3xl font-bold text-primary">
          {siteContent.footer.companyName}
        </h1>
        <p className="text-muted-foreground">{siteContent.footer.tagline}</p>
        <p className="text-sm text-muted-foreground">{siteContent.meta.description}</p>
        <Button asChild size="lg">
          <Link href="/offert">{siteContent.hero.title}</Link>
        </Button>
      </div>
    </main>
  );
}
