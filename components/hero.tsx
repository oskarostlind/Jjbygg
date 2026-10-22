import Link from "next/link";
import { Phone } from "lucide-react";
import { editable } from "sitecms-next";
import { siteContent } from "@/lib/site-content";
import { HERO_SLIDES, type HeroSlide } from "@/lib/hero-slides";
import { HeroSlideshow } from "@/components/hero-slideshow";
import { Button } from "@/components/ui/button";
import { resolveContactPhoneFromEnv } from "@/lib/contact";
import { getCmsContent, blockValue, blockHtml, blockAlt } from "@/lib/cms";

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
  const sublineHtml = blockHtml(content, "hero.subtitle");
  const cmsImage = blockValue(content, "hero.image", "");
  // Kundens egen bildbeskrivning när bilden kommer från CMS:et; annars den
  // beskrivning som hör till den lokala bilden.
  const cmsImageAlt = blockAlt(content, "hero.image", HERO_SLIDES[0].alt);
  const slides = resolveHeroSlides(cmsImage, cmsImageAlt);

  const phoneFromEnv = resolveContactPhoneFromEnv();
  const phoneDisplay = phoneFromEnv?.display ?? siteContent.contact.phoneDisplay;
  const phoneTel = phoneFromEnv?.telDigits ?? siteContent.contact.phoneTelDigits;

  return (
    <section className="relative isolate overflow-hidden bg-graphite" aria-label="Introduktion">
      <HeroSlideshow slides={slides} field={editable("home", "hero.image")} />
      {/* Scrim: mörkare nedtill och till vänster där texten ligger. */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-graphite/90 via-graphite/45 to-graphite/15"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-graphite/70 via-graphite/20 to-transparent lg:block"
        aria-hidden
      />

      <div className="wrap pointer-events-none relative z-10 flex min-h-[34rem] flex-col justify-end pb-10 pt-24 sm:min-h-[38rem] md:min-h-[min(44rem,82svh)] md:pb-14 md:pt-32">
        <div className="pointer-events-auto max-w-[50rem]">
          <h1
            className="display text-display-xl text-paper [text-shadow:0_1px_2px_rgba(0,0,0,0.25)]"
            {...editable("home", "hero.title")}
          >
            {headline}
          </h1>
          {sublineHtml ? (
            <div
              className="cms-rich-inherit mt-5 max-w-[36rem] text-lg leading-relaxed text-ink-onDark/90 md:text-xl"
              {...editable("home", "hero.subtitle")}
              dangerouslySetInnerHTML={{ __html: sublineHtml }}
            />
          ) : (
            <p
              className="mt-5 max-w-[36rem] text-lg leading-relaxed text-ink-onDark/90 md:text-xl"
              {...editable("home", "hero.subtitle")}
            >
              {subline}
            </p>
          )}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button asChild size="lg">
              <Link href="/offert">{hero.ctaText}</Link>
            </Button>
            <Button asChild size="lg" variant="outlineOnDark">
              <a href={`tel:${phoneTel}`} aria-label={`Ring ${phoneDisplay}`}>
                <Phone className="h-4 w-4" aria-hidden />
                Ring {phoneDisplay}
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Förtroendesignaler: sandfärgad list som binder ihop hero med sidan under. */}
      <div className="wrap relative z-10 pointer-events-none">
        <ul className="pointer-events-auto -mb-px grid grid-cols-1 divide-y divide-line border-x border-t border-line bg-sand sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {hero.badges.map((badge) => (
            <li
              key={badge}
              className="flex items-center gap-3 px-4 py-3.5 font-display text-[0.9375rem] font-bold text-graphite sm:justify-center sm:px-3 md:py-4"
            >
              <span className="h-2.5 w-2.5 shrink-0 rounded-sm bg-brand" aria-hidden />
              {badge}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
