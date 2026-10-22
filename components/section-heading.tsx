import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  id?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  /** Extra attribut på rubriken (t.ex. editable() från sitecms). */
  titleProps?: React.HTMLAttributes<HTMLHeadingElement>;
  as?: "h1" | "h2";
  onDark?: boolean;
  className?: string;
};

/**
 * Sektionsrubrik med kort röd linje ovanför – samma mönster på hela sajten
 * så att besökaren känner igen var en ny del börjar.
 */
export function SectionHeading({
  id,
  title,
  intro,
  titleProps,
  as: Tag = "h2",
  onDark = false,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-prose", className)}>
      <span className="mb-5 block h-1 w-12 rounded-sm bg-brand" aria-hidden />
      <Tag
        id={id}
        className={cn("display text-display-lg", onDark ? "text-ink-onDark" : "text-graphite")}
        {...titleProps}
      >
        {title}
      </Tag>
      {intro ? (
        <p className={cn("mt-4 text-lg leading-relaxed", onDark ? "text-ink-onDark/80" : "text-ink-muted")}>
          {intro}
        </p>
      ) : null}
    </div>
  );
}
