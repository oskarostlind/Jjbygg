"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { HERO_SLIDE_INTERVAL_MS, type HeroSlide } from "@/lib/hero-slides";

/** Visningsstorlek för hero – styr Next.js srcset (undvik onödigt stora nedladdningar). */
const HERO_IMAGE_SIZES =
  "(max-width: 640px) 100vw, (max-width: 1024px) 100vw, (max-width: 1920px) 100vw, 1920px";

type HeroSlideshowProps = {
  slides: readonly HeroSlide[];
};

export function HeroSlideshow({ slides }: HeroSlideshowProps) {
  const [activeIndex, setActiveIndex] = useState(0);
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
      setActiveIndex((current) => (current + 1) % slides.length);
    }, HERO_SLIDE_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [motionEnabled, slides.length]);

  const previousIndex = (activeIndex - 1 + slides.length) % slides.length;
  const indicesToRender =
    slides.length <= 1
      ? [0]
      : [activeIndex, previousIndex].filter(
          (value, index, array) => array.indexOf(value) === index
        );

  return (
    <div className="absolute inset-0" aria-hidden>
      {indicesToRender.map((index) => {
        const slide = slides[index];
        const isActive = index === activeIndex;
        return (
          <Image
            key={slide.src}
            src={slide.src}
            alt={isActive ? slide.alt : ""}
            fill
            priority={index === 0}
            loading={index === 0 ? undefined : "lazy"}
            className={cn(
              "object-cover object-center transition-opacity duration-1000 ease-in-out",
              isActive ? "opacity-100" : "opacity-0"
            )}
            sizes={HERO_IMAGE_SIZES}
          />
        );
      })}
    </div>
  );
}
