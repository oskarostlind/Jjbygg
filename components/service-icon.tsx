import type { LucideIcon } from "lucide-react";
import {
  Building2,
  Paintbrush,
  Droplets,
  Fence,
  Home,
  ClipboardList,
  CookingPot,
  Hammer,
  Layers,
  Flame,
  Warehouse,
  Shovel,
  DoorOpen,
  BrickWall,
  HousePlus,
  Ruler,
} from "lucide-react";
import type { ServiceIconKey } from "@/lib/site-content";
import { cn } from "@/lib/utils";

const SERVICE_ICONS: Record<ServiceIconKey, LucideIcon> = {
  nybyggnation: Building2,
  renovering: Paintbrush,
  badrum: Droplets,
  altan: Fence,
  tak: Home,
  entreprenad: ClipboardList,
  kok: CookingPot,
  totalrenovering: Hammer,
  golv: Layers,
  bastu: Flame,
  garage: Warehouse,
  grund: Shovel,
  fonster: DoorOpen,
  fasad: BrickWall,
  attefall: HousePlus,
  snickare: Ruler,
};

const STOCK = {
  stomme: { src: "/hero/quilia-j86QX1TMNaw-unsplash.jpg", alt: "Bjälklag och stomme under uppförande" },
  verktyg: { src: "/hero/benjamin-lehman-EJU7A__krX0-unsplash.jpg", alt: "Verktyg på en arbetsbänk" },
  matning: { src: "/hero/callum-hill-NGGkGzslIaM-unsplash.jpg", alt: "Snickare mäter upp trävirke" },
  takstolar: { src: "/hero/yves-cedric-schulze-o-ANXY28n_w-unsplash.jpg", alt: "Takstolar mot blå himmel" },
} as const;

/**
 * Foto per tjänst (ur public/hero) – används som bakgrund i tjänstesidornas
 * sidhuvud. Samma bild får återkomma: en per sida. Bildbanken har bara fem
 * foton, så de nyare tjänsterna delar på dem tills egna bilder i full
 * upplösning finns (se docs/SEO.md). Bilderna i public/tjanster är stockfoton
 * (Unsplash) tills egna bilder finns. Varje kort på /tjanster har en bild.
 */
export const SERVICE_IMAGES: Record<ServiceIconKey, { src: string; alt: string }> = {
  nybyggnation: {
    src: "/hero/quilia-j86QX1TMNaw-unsplash.jpg",
    alt: "Bjälklag och stomme under uppförande",
  },
  renovering: {
    src: "/hero/benjamin-lehman-EJU7A__krX0-unsplash.jpg",
    alt: "Verktyg på en arbetsbänk inför renovering",
  },
  badrum: {
    src: "/hero/scandinavian home renovation.jpg",
    alt: "Kakelsättning i badrum",
  },
  altan: {
    src: "/hero/callum-hill-NGGkGzslIaM-unsplash.jpg",
    alt: "Snickare mäter trävirke till altan",
  },
  tak: {
    src: "/hero/yves-cedric-schulze-o-ANXY28n_w-unsplash.jpg",
    alt: "Takstolar mot blå himmel",
  },
  entreprenad: {
    src: "/hero/callum-hill-NGGkGzslIaM-unsplash.jpg",
    alt: "Hantverkare mäter och planerar",
  },
  kok: { src: "/tjanster/koksrenovering.jpg", alt: "Nytt kök med vita luckor och köksö" },
  totalrenovering: { src: "/tjanster/totalrenovering.jpg", alt: "Rum under totalrenovering med stämp och rivet golv" },
  golv: STOCK.matning,
  bastu: STOCK.matning,
  garage: { src: "/tjanster/garage-carport.jpg", alt: "Carport i trä med plats för bil" },
  grund: STOCK.stomme,
  fonster: { src: "/tjanster/fonster-dorrar.jpg", alt: "Nya fönster under montering" },
  fasad: { src: "/tjanster/fasad.jpg", alt: "Rött trähus med vita knutar och ny panel" },
  attefall: { src: "/tjanster/attefallshus.jpg", alt: "Liten stuga i trä med veranda" },
  snickare: { src: "/tjanster/snickare.jpg", alt: "Snickare märker upp en bräda" },
};

/**
 * Stockfoto till tjänstekorten på /tjanster när tjänsten saknar egen bild.
 * Golv, bastu och grund har egna bilder (lib/referenser-content.ts) och behöver
 * inget stockfoto här.
 */
export const SERVICE_CARD_PHOTOS: Partial<Record<ServiceIconKey, { src: string; alt: string }>> = {
  nybyggnation: SERVICE_IMAGES.nybyggnation,
  renovering: SERVICE_IMAGES.renovering,
  badrum: SERVICE_IMAGES.badrum,
  altan: SERVICE_IMAGES.altan,
  tak: SERVICE_IMAGES.tak,
  entreprenad: SERVICE_IMAGES.entreprenad,
  kok: SERVICE_IMAGES.kok,
  totalrenovering: SERVICE_IMAGES.totalrenovering,
  garage: SERVICE_IMAGES.garage,
  fonster: SERVICE_IMAGES.fonster,
  fasad: SERVICE_IMAGES.fasad,
  attefall: SERVICE_IMAGES.attefall,
  snickare: SERVICE_IMAGES.snickare,
};

type ServiceIconProps = {
  iconKey: ServiceIconKey;
  className?: string;
  size?: "sm" | "md";
};

/** Bara ikonen, utan platta – för större ikonrutor (korten på /tjanster). */
export function ServiceGlyph({ iconKey, className }: { iconKey: ServiceIconKey; className?: string }) {
  const Icon = SERVICE_ICONS[iconKey];
  return <Icon className={className} strokeWidth={1.5} aria-hidden />;
}

/** Ikon på en sandfärgad platta – känns igen från startsidan till tjänstesidorna. */
export function ServiceIcon({ iconKey, className, size = "md" }: ServiceIconProps) {
  const Icon = SERVICE_ICONS[iconKey];
  return (
    <span
      className={cn(
        "flex shrink-0 items-center justify-center rounded bg-sand-deep text-brand-strong",
        size === "md" ? "h-14 w-14" : "h-11 w-11",
        className
      )}
      aria-hidden
    >
      <Icon className={size === "md" ? "h-7 w-7" : "h-5 w-5"} strokeWidth={1.75} />
    </span>
  );
}
