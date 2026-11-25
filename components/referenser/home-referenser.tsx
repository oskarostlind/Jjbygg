import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getReferens, type Referens } from "@/lib/referenser-content";
import { SectionHeading } from "@/components/section-heading";

/** Urval till startsidan – ett projekt per tjänst. */
const HOME_SLUGS = ["altan-sjonara-hus", "badrum-dusch-kommod", "bastu-panel-lavar", "betongplatta-husgrund"];

/**
 * "Utförda arbeten" på startsidan: fyra egna bilder i samma format (4:5) och
 * länk till /referenser. Bilderna visas små (högst ca 280 px breda på desktop),
 * så upplösningen på 1170 px räcker gott.
 */
export function HomeReferenser() {
  const items = HOME_SLUGS.map(getReferens).filter((r): r is Referens => Boolean(r));
  if (items.length === 0) return null;

  return (
    <section className="border-t border-line bg-sand pb-16 pt-16 md:pb-24 md:pt-20" aria-labelledby="referenser-heading">
      <div className="wrap">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="referenser-heading"
            title="Utförda arbeten"
            intro="Bilder från våra egna jobb – altaner, badrum, bastu och gjutna grunder."
          />
          <Link href="/referenser" className="link hidden shrink-0 lg:inline-flex lg:items-center lg:gap-1.5">
            Se alla utförda arbeten
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>

        <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4 lg:gap-x-6">
          {items.map((item) => (
            <li key={item.slug} className="group relative">
              <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-sand-deep">
                <Image
                  src={item.image.src}
                  alt={item.alt}
                  fill
                  loading="lazy"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width: 1024px) 50vw, 270px"
                />
              </div>
              <h3 className="mt-3 font-display text-base font-bold leading-snug text-graphite md:text-lg">
                <Link
                  href={`/referenser#${item.slug}`}
                  className="after:absolute after:inset-0 after:content-[''] group-hover:text-brand-strong focus-visible:outline-none focus-visible:underline"
                >
                  {item.title}
                </Link>
              </h3>
              <p className="mt-1 text-sm text-ink-muted">{item.category}</p>
            </li>
          ))}
        </ul>

        <p className="mt-8 lg:hidden">
          <Link href="/referenser" className="link inline-flex items-center gap-1.5">
            Se alla utförda arbeten
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </p>
      </div>
    </section>
  );
}
