import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import type { ServiceIconKey } from "@/lib/site-content";
import { ServiceIcon } from "@/components/service-icon";

export type SidebarLink = {
  href: string;
  label: string;
  /** Tjänstikon på sandplatta – för länkar till tjänster. */
  iconKey?: ServiceIconKey;
  /** Kartnål – för länkar till orter. */
  place?: boolean;
};

type SidebarLinksProps = {
  id: string;
  heading: string;
  links: SidebarLink[];
};

/**
 * Länklista i sidopanelen ("Andra tjänster", "… där du bor", "Andra orter").
 * Vit panel med hårlinjer – samma block på tjänstesidor, ortsidor och tjänst×ort.
 */
export function SidebarLinks({ id, heading, links }: SidebarLinksProps) {
  if (links.length === 0) return null;
  return (
    <nav aria-labelledby={id} className="rounded-lg border border-line bg-paper p-6">
      <h2 id={id} className="font-display text-base font-bold text-graphite">
        {heading}
      </h2>
      <ul className="mt-3 divide-y divide-line">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="group flex items-center gap-3 py-3 font-medium text-graphite transition-colors hover:text-brand-strong"
            >
              {link.iconKey ? (
                <ServiceIcon iconKey={link.iconKey} size="sm" className="h-9 w-9 [&>svg]:h-4 [&>svg]:w-4" />
              ) : link.place ? (
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded bg-sand-deep text-brand-strong"
                  aria-hidden
                >
                  <MapPin className="h-4 w-4" strokeWidth={1.75} />
                </span>
              ) : null}
              <span className="flex-1">{link.label}</span>
              <ArrowRight
                className="h-4 w-4 shrink-0 text-concrete transition-transform group-hover:translate-x-0.5 group-hover:text-brand-strong"
                aria-hidden
              />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
