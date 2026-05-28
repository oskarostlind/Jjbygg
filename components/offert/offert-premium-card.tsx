import { cn } from "@/lib/utils";

type OffertPremiumCardProps = {
  children: React.ReactNode;
  className?: string;
  /** Orange accent-linje i kortets överkant (varumärke). */
  showAccentTop?: boolean;
};

export function OffertPremiumCard({
  children,
  className,
  showAccentTop = true,
}: OffertPremiumCardProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-xl",
        showAccentTop && "border-t-4 border-t-accent",
        className
      )}
    >
      {children}
    </div>
  );
}
