"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { HERO_SLIDE_INTERVAL_MS, type HeroSlide } from "@/lib/hero-slides";
import { cn } from "@/lib/utils";

/** Visningsstorlek för hero – styr Next.js srcset (undvik onödigt stora nedladdningar). */
const HERO_IMAGE_SIZES = "100vw";

type HeroSlideshowProps = {
  slides: readonly HeroSlide[];
  /** data-sitecms för bilden (live-förhandsgranskning i sitecms). */
  field?: { "data-sitecms": string };
};

/**
 * Bildspel med mjuk övertoning. Bilder laddas först när de visas första
 * gången och ligger sedan kvar i stacken, så att övergången tillbaka är
 * omedelbar. Vid prefers-reduced-motion står bildspelet stilla.
 */
export function HeroSlideshow({ slides, field }: HeroSlideshowProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [loaded, setLoaded] = useState<number[]>([0]);
  const [motionEnabled, setMotionEnabled] = useState(true);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setMotionEnabled(!media.matches);
    updateMotion();
    media.addEventListener("change", updateMotion);
    return () => media.removeEventListener("change", updateMotion);
  }, []);

  useEffect(() => {
    if (!motionEnabled || slides.length <= 1) {
      return;
    }
    const timer = window.setInterval(() => {
      setActiveIndex((current) => {
        const next = (current + 1) % slides.length;
        setLoaded((l) => (l.includes(next) ? l : [...l, next]));
        return next;
      });
    }, HERO_SLIDE_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [motionEnabled, slides.length]);

  return (
    <div className="absolute inset-0" {...field}>
      {slides.map((slide, index) =>
        loaded.includes(index) ? (
          <Image
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            fill
            priority={index === 0}
            className={cn(
              "motion-safe-fade object-cover object-center transition-opacity duration-[1200ms] ease-in-out",
              index === activeIndex ? "opacity-100" : "opacity-0"
            )}
            sizes={HERO_IMAGE_SIZES}
            aria-hidden={index !== activeIndex}
          />
        ) : null
      )}
    </div>
  );
}
