import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { guideForService } from "@/lib/guider-content";

/**
 * Länk från en tjänstesida till prisguiden för samma tjänst (/guider/[slug]).
 * Renderar ingenting om tjänsten saknar guide. Ligger i brödtextspalten.
 */
export function GuideLink({ serviceSlug }: { serviceSlug: string }) {
  const guide = guideForService(serviceSlug);
  if (!guide) return null;

  return (
    <aside aria-label="Guide om priset" className="rounded-lg border border-line border-l-4 border-l-brand bg-paper p-6">
      <p className="text-sm font-semibold text-ink-muted">Guide</p>
      <p className="mt-1.5 font-display text-lg font-bold leading-snug text-graphite">{guide.h1}</p>
      <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-muted">{guide.cardText}</p>
      <Link href={`/guider/${guide.slug}`} className="link mt-4 inline-flex items-center gap-1.5">
        Läs guiden
        <ArrowRight className="h-4 w-4" aria-hidden />
      </Link>
    </aside>
  );
}
