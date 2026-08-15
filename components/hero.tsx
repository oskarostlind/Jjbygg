import Link from "next/link";
import { siteContent } from "@/lib/site-content";
import { HERO_SLIDES, type HeroSlide } from "@/lib/hero-slides";
import { HeroSlideshow } from "@/components/hero-slideshow";
import { Button } from "@/components/ui/button";
import { getCmsContent, blockValue } from "@/lib/cms";

/**
 * Väljer vilka bilder som ska visas i hero-bildspelet.
 * Om CMS:et levererar hero.image och det INTE är en lokal /hero/-path
 * (dvs. en riktig CMS-uppladdad bild) används den som enda slide.
 * I alla andra fall behålls den befintliga lokala bildkarusellen oförändrad.
 */
function resolveHeroSlides(cmsImage: string, fallbackAlt: string): readonly HeroSlide[] {
  const value = cmsImage.trim();
  if (!value || value.startsWith("/hero/")) {
    return HERO_SLIDES;
  }
  return [{ src: value, alt: fallbackAlt }] as const;
}

export async function Hero() {
  const { hero } = siteContent;
  const content = await getCmsContent();

  const headline = blockValue(content, "hero.title", hero.headline);
  const subline = blockValue(content, "hero.subtitle", hero.subline);
  const cmsImage = blockValue(content, "hero.image", "");
  const slides = resolveHeroSlides(cmsImage, HERO_SLIDES[0].alt);

  return (
    <section
      className="relative min-h-[32rem] overflow-hidden md:min-h-[36rem]"
      aria-label="Hero med bildspel"
    >
      <HeroSlideshow slides={slides} />
      <div className="absolute inset-0 bg-slate-900/40" aria-hidden />
      <div className="relative z-10 mx-auto flex min-h-[32rem] max-w-6xl flex-col items-center justify-center px-4 py-20 text-center md:min-h-[36rem] md:py-28 lg:items-start lg:text-left">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-white drop-shadow-sm md:text-5xl lg:text-6xl">
            {headline}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-white/95 md:text-xl">
            {subline}
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
