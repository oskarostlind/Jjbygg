import { cn } from "@/lib/utils";

type OffertPremiumCardProps = {
  children: React.ReactNode;
  className?: string;
  /** Röd accentlinje i panelens överkant. */
  showAccentTop?: boolean;
};

/** Lyft panel på papper – formuläret och tack-sidan. */
export function OffertPremiumCard({
  children,
  className,
  showAccentTop = true,
}: OffertPremiumCardProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-lg border border-line bg-paper shadow-panel",
        showAccentTop && "border-t-4 border-t-brand",
        className
      )}
    >
      {children}
    </div>
  );
}
