import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { referenserFor } from "@/lib/referenser-content";
import { cn } from "@/lib/utils";

/**
 * "Från våra jobb" – egna bilder som hör till en tjänst (max två), med länk till
 * /referenser. Ligger i brödtextspalten (max-w-prose) på tjänstesidan och på
 * tjänst×ort-sidorna. Renderar ingenting om tjänsten saknar bilder.
 */
export function ServiceReferenser({ slug }: { slug: string }) {
  const items = referenserFor(slug).slice(0, 2);
  if (items.length === 0) return null;

  const single = items.length === 1;

  return (
    <section aria-labelledby="referenser-heading">
      <h2 id="referenser-heading" className="display text-display-sm text-graphite">
        Från våra jobb
      </h2>

      <div className={cn("mt-6 grid gap-5", single ? "grid-cols-1" : "sm:grid-cols-2")}>
        {items.map((item) => {
          const portrait = item.image.height > item.image.width;
          return (
            <figure key={item.slug} className={cn(single && portrait && "max-w-sm")}>
              <div className="overflow-hidden rounded-lg bg-sand-deep">
                <Image
                  src={item.image.src}
                  alt={item.alt}
                  width={item.image.width}
                  height={item.image.height}
                  loading="lazy"
                  className="h-auto w-full"
                  sizes={
                    single
                      ? portrait
                        ? "(max-width: 640px) 100vw, 384px"
                        : "(max-width: 768px) 100vw, 672px"
                      : "(max-width: 640px) 100vw, 326px"
                  }
                />
              </div>
              <figcaption className="mt-3">
                <span className="block font-display text-base font-bold leading-snug text-graphite">{item.title}</span>
                <span className="mt-1 block text-[0.9375rem] leading-relaxed text-ink-muted">{item.description}</span>
              </figcaption>
            </figure>
          );
        })}
      </div>

      <p className="mt-6">
        <Link href="/referenser" className="link inline-flex items-center gap-1.5">
          Se fler utförda arbeten
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </p>
    </section>
  );
}
