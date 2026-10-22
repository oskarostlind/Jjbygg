import Link from "next/link";
import { LOCATION_PAGES } from "@/lib/locations-content";

/**
 * Liten länkrad "Vi finns i …" till ortsidorna under /byggfirma/[ort].
 * Läggs in på startsidan; ger ortsidorna interna länkar från sajtens starkaste sida.
 */
export function ServiceAreas() {
  return (
    <section className="border-t border-primary/10 bg-background py-8" aria-labelledby="service-areas-heading">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 text-center sm:flex-row sm:justify-center sm:gap-6">
        <h2 id="service-areas-heading" className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Vi finns i
        </h2>
        <ul className="flex flex-wrap items-center justify-center gap-2">
          {LOCATION_PAGES.map((location) => (
            <li key={location.slug}>
              <Link
                href={`/byggfirma/${location.slug}`}
                className="inline-block rounded-full border border-primary/20 bg-card px-4 py-1.5 text-sm font-medium text-foreground transition hover:border-accent hover:text-primary"
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
