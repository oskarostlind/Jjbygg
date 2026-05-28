import Link from "next/link";
import Image from "next/image";
import { siteContent } from "@/lib/site-content";
import { Button } from "@/components/ui/button";

export function Hero() {
  const { hero, images } = siteContent;

  return (
    <section className="relative bg-primary">
      <div className="relative mx-auto max-w-6xl px-4 py-16 md:py-24 lg:grid lg:grid-cols-2 lg:items-center lg:gap-12">
        <div className="relative z-10 text-center lg:text-left">
          <h1 className="text-4xl font-bold tracking-tight text-primary-foreground md:text-5xl">
            {hero.headline}
          </h1>
          <p className="mt-4 max-w-xl text-lg text-primary-foreground/90">{hero.subline}</p>
          <div className="mt-8">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="/offert">{hero.ctaText}</Link>
            </Button>
          </div>
        </div>
        <div className="relative mt-10 aspect-[16/10] overflow-hidden rounded-lg lg:mt-0">
          <Image
            src={images.hero}
            alt={images.heroAlt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, min(560px, 50vw)"
            priority
          />
        </div>
      </div>
    </section>
  );
}
