import Image from "next/image";
import { Check } from "lucide-react";
import { editable } from "sitecms-next";
import { siteContent } from "@/lib/site-content";
import { SectionHeading } from "@/components/section-heading";

type WhyUsProps = {
  /** Punkterna (CMS-nycklar why.item1–3, med fallback). */
  items: readonly string[];
};

const IMAGE = {
  src: "/hero/callum-hill-NGGkGzslIaM-unsplash.jpg",
  alt: "Snickare mäter upp trävirke på en byggarbetsplats",
};

/**
 * "Varför välja oss" – stort foto och tre tydliga löften, följt av
 * ROT-informationen som tidigare bara fanns på offertsidan.
 */
export function WhyUs({ items }: WhyUsProps) {
  const { trustTitle } = siteContent.homePage;
  const { rotTitle, rotBody } = siteContent.contactSection;

  return (
    <section className="bg-sand py-16 md:py-24" aria-labelledby="why-heading">
      <div className="wrap grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-sand-deep sm:aspect-[4/3] lg:col-span-6 lg:aspect-[4/5]">
          <Image
            src={IMAGE.src}
            alt={IMAGE.alt}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 560px"
          />
          <span className="absolute bottom-0 left-0 h-2 w-24 bg-brand" aria-hidden />
        </div>

        <div className="lg:col-span-6">
          <SectionHeading id="why-heading" title={trustTitle} />
          <ul className="mt-8 divide-y divide-line border-y border-line">
            {items.map((item, i) => (
              <li key={i} className="flex items-center gap-4 py-4">
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-tint text-brand-strong"
                  aria-hidden
                >
                  <Check className="h-4 w-4" strokeWidth={3} />
                </span>
                <span className="font-display text-lg font-bold text-graphite" {...editable("home", `why.item${i + 1}`)}>
                  {item}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-8 rounded-lg bg-sand-deep p-6">
            <h3 className="font-display text-lg font-bold text-graphite">{rotTitle}</h3>
            <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-muted">{rotBody}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
