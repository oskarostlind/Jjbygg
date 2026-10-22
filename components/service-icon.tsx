import type { LucideIcon } from "lucide-react";
import { Building2, Paintbrush, Droplets, Fence, Home, ClipboardList } from "lucide-react";
import type { ServiceIconKey } from "@/lib/site-content";
import { cn } from "@/lib/utils";

const SERVICE_ICONS: Record<ServiceIconKey, LucideIcon> = {
  nybyggnation: Building2,
  renovering: Paintbrush,
  badrum: Droplets,
  altan: Fence,
  tak: Home,
  entreprenad: ClipboardList,
};

/**
 * Foto per tjänst (ur public/hero) – används som bakgrund i tjänstesidornas
 * sidhuvud. Samma bild får återkomma: en per sida.
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
};

type ServiceIconProps = {
  iconKey: ServiceIconKey;
  className?: string;
  size?: "sm" | "md";
};

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
