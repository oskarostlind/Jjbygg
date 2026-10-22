"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export type StepId = 1 | 2 | 3;

const STEP_LABELS: Record<StepId, string> = {
  1: "Projektet",
  2: "Bilder",
  3: "Kontakt",
};

interface StepperProps {
  currentStep: StepId;
  className?: string;
}

/**
 * Stegindikator för offertformuläret: tre segment som fylls i rött allt
 * eftersom. Etiketterna syns på alla bredder; på mobil radbryts de inte.
 */
export function Stepper({ currentStep, className }: StepperProps) {
  const steps: StepId[] = [1, 2, 3];

  return (
    <nav aria-label="Steg i formuläret" className={cn("w-full", className)}>
      <ol className="grid grid-cols-3 gap-2 sm:gap-3">
        {steps.map((step) => {
          const isActive = step === currentStep;
          const isCompleted = step < currentStep;

          return (
            <li key={step} className="min-w-0">
              <div
                className={cn(
                  "h-1.5 rounded-sm transition-colors",
                  isActive || isCompleted ? "bg-brand-strong" : "bg-line"
                )}
                aria-hidden
              />
              <div
                className="mt-2.5 flex items-center gap-2"
                aria-current={isActive ? "step" : undefined}
              >
                <span
                  className={cn(
                    "flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-display text-xs font-bold",
                    isActive && "bg-brand-strong text-paper",
                    isCompleted && "bg-graphite text-ink-onDark",
                    !isActive && !isCompleted && "bg-sand-deep text-ink-muted"
                  )}
                >
                  {isCompleted ? <Check className="h-3.5 w-3.5" strokeWidth={3} aria-label="Klart" /> : step}
                </span>
                <span
                  className={cn(
                    "truncate text-sm font-semibold",
                    isActive ? "text-graphite" : "text-ink-muted"
                  )}
                >
                  {STEP_LABELS[step]}
                </span>
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
