import Image from "next/image";
import { Breadcrumbs, type Crumb } from "@/components/breadcrumbs";
import { cn } from "@/lib/utils";

type PageHeaderProps = {
  title: string;
  lead?: string;
  crumbs?: Crumb[];
  /** Bakgrundsfoto – då blir sidhuvudet mörkt med vit text. */
  image?: { src: string; alt: string };
  children?: React.ReactNode;
  className?: string;
};

/**
 * Sidhuvud för undersidor. Med foto: mörk yta med bild bakom (tjänstesidor).
 * Utan foto: sanddjup yta (tjänsteöversikt, nyheter).
 */
export function PageHeader({ title, lead, crumbs, image, children, className }: PageHeaderProps) {
  const dark = Boolean(image);

  return (
    <header
      className={cn(
        "relative isolate overflow-hidden border-b border-line",
        dark ? "bg-graphite text-ink-onDark" : "bg-sand-deep",
        className
      )}
    >
      {image ? (
        <>
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-graphite/95 via-graphite/70 to-graphite/40" aria-hidden />
        </>
      ) : null}

      <div className={cn("wrap relative z-10", dark ? "pb-12 pt-28 md:pb-16 md:pt-40" : "py-12 md:py-16")}>
        {crumbs ? <Breadcrumbs items={crumbs} onDark={dark} className="mb-6" /> : null}
        <span className="mb-5 block h-1 w-12 rounded-sm bg-brand" aria-hidden />
        <h1 className={cn("display max-w-4xl text-display-lg", dark ? "text-paper" : "text-graphite")}>
          {title}
        </h1>
        {lead ? (
          <p className={cn("mt-5 max-w-prose text-lg leading-relaxed md:text-xl", dark ? "text-ink-onDark/85" : "text-ink-muted")}>
            {lead}
          </p>
        ) : null}
        {children ? <div className="mt-8">{children}</div> : null}
      </div>
    </header>
  );
}
