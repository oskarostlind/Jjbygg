import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { OffertPageLayout } from "@/components/offert/offert-page-layout";
import { OffertPremiumCard } from "@/components/offert/offert-premium-card";
import { Button } from "@/components/ui/button";

export function OffertSuccessView() {
  return (
    <OffertPageLayout centered>
      <div className="wrap">
        <div className="mx-auto w-full max-w-lg">
          <OffertPremiumCard>
            <div className="px-6 py-10 text-center sm:px-10 sm:py-12">
              <div
                className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-brand-tint text-brand-strong"
                aria-hidden
              >
                <CheckCircle2 className="h-9 w-9" strokeWidth={1.75} />
              </div>
              <h1 className="display text-display-md text-graphite">Tack för din förfrågan</h1>
              <p className="mx-auto mt-4 max-w-md text-[1.0625rem] leading-relaxed text-ink-muted">
                Vi har tagit emot din offertförfrågan och återkommer till dig så snart vi kan.
                Du har fått en bekräftelse till din e-post.
              </p>
              <Button asChild size="lg" variant="dark" className="mt-8">
                <Link href="/">
                  <ArrowLeft className="h-4 w-4" aria-hidden />
                  Tillbaka till startsidan
                </Link>
              </Button>
            </div>
          </OffertPremiumCard>
        </div>
      </div>
    </OffertPageLayout>
  );
}
