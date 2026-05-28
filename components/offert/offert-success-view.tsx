import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { OffertPageLayout } from "@/components/offert/offert-page-layout";
import { OffertPremiumCard } from "@/components/offert/offert-premium-card";
import { Button } from "@/components/ui/button";

export function OffertSuccessView() {
  return (
    <OffertPageLayout centered>
      <div className="mx-auto w-full max-w-lg">
        <OffertPremiumCard>
          <div className="px-6 py-10 text-center sm:px-10 sm:py-12">
            <div
              className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50"
              aria-hidden
            >
              <CheckCircle2 className="h-11 w-11 text-emerald-500" strokeWidth={1.75} />
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Tack för din förfrågan
            </h1>
            <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-slate-600">
              Vi har tagit emot din offertförfrågan och återkommer till dig så snart vi kan.
              Du har fått en bekräftelse till din e-post.
            </p>
            <Button
              asChild
              size="lg"
              className="mt-8 gap-2 bg-accent px-8 text-accent-foreground shadow-md transition hover:bg-accent/90 hover:shadow-lg"
            >
              <Link href="/">
                <ArrowLeft className="h-4 w-4" aria-hidden />
                Tillbaka till startsidan
              </Link>
            </Button>
          </div>
        </OffertPremiumCard>
      </div>
    </OffertPageLayout>
  );
}
