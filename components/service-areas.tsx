import Link from "next/link";
import { MapPin } from "lucide-react";
import { LOCATION_PAGES } from "@/lib/locations-content";

/**
 * Liten länkrad "Vi finns i …" till ortsidorna under /byggfirma/[ort].
 * Ligger på startsidan efter tjänsterna; ger ortsidorna interna länkar från
 * sajtens starkaste sida.
 */
export function ServiceAreas() {
  return (
    <section className="border-y border-line bg-sand-deep py-6 md:py-7" aria-labelledby="service-areas-heading">
      <div className="wrap flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-center sm:gap-6">
        <h2
          id="service-areas-heading"
          className="inline-flex items-center gap-2 font-display text-sm font-bold uppercase tracking-[0.08em] text-ink-muted"
        >
          <MapPin className="h-4 w-4 text-brand-strong" aria-hidden />
          Vi finns i
        </h2>
        <ul className="flex flex-wrap items-center justify-center gap-2">
          {LOCATION_PAGES.map((location) => (
            <li key={location.slug}>
              <Link
                href={`/byggfirma/${location.slug}`}
                className="inline-flex h-10 items-center rounded-full border border-line-strong bg-paper px-4 text-sm font-semibold text-graphite transition-colors hover:border-brand-strong hover:text-brand-strong"
              >
                Byggfirma {location.inPhrase}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
