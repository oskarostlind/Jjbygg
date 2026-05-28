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
        "offert-page-bg flex w-full flex-col px-4 py-10 md:py-14",
        "min-h-[calc(100vh-5rem)] md:min-h-[calc(100vh-6rem)]",
        centered ? "items-center justify-center" : "items-center justify-start"
      )}
    >
      {children}
    </main>
  );
}
