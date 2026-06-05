import Link from "next/link";
import { siteContent } from "@/lib/site-content";
import { HERO_SLIDES } from "@/lib/hero-slides";
import { HeroSlideshow } from "@/components/hero-slideshow";
import { Button } from "@/components/ui/button";

export function Hero() {
  const { hero } = siteContent;

  return (
    <section
      className="relative min-h-[32rem] overflow-hidden md:min-h-[36rem]"
      aria-label="Hero med bildspel"
    >
      <HeroSlideshow slides={HERO_SLIDES} />
      <div className="absolute inset-0 bg-slate-900/40" aria-hidden />
      <div className="relative z-10 mx-auto flex min-h-[32rem] max-w-6xl flex-col items-center justify-center px-4 py-20 text-center md:min-h-[36rem] md:py-28 lg:items-start lg:text-left">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-white drop-shadow-sm md:text-5xl lg:text-6xl">
            {hero.headline}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-white/95 md:text-xl">
            {hero.subline}
          </p>
          <div className="mt-8 flex justify-center lg:justify-start">
            <Button
              asChild
              size="lg"
              className="bg-accent text-accent-foreground shadow-lg transition hover:bg-accent/90 hover:shadow-xl"
            >
              <Link href="/offert">{hero.ctaText}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
