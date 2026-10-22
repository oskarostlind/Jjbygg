import { cn } from "@/lib/utils";

type OffertPageLayoutProps = {
  children: React.ReactNode;
  /** Centrera vertikalt (t.ex. tack-sidan). Formulärvyn använder toppjustering. */
  centered?: boolean;
};

export function OffertPageLayout({ children, centered = false }: OffertPageLayoutProps) {
  return (
    <main
      className={cn(
        "flex w-full flex-col bg-sand py-10 md:py-16",
        "min-h-[calc(100svh-var(--header-h))]",
        centered ? "items-center justify-center" : "items-center justify-start"
      )}
    >
      {children}
    </main>
  );
}
