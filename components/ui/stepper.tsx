"use client";

import { cn } from "@/lib/utils";

export type StepId = 1 | 2 | 3;

const STEP_LABELS: Record<StepId, string> = {
  1: "Projektdetaljer",
  2: "Media & plats",
  3: "Kontaktuppgifter",
};

interface StepperProps {
  currentStep: StepId;
  className?: string;
}

export function Stepper({ currentStep, className }: StepperProps) {
  const steps: StepId[] = [1, 2, 3];

  return (
    <nav
      aria-label="Steg i formuläret"
      className={cn(
        "flex items-center justify-center gap-2 rounded-2xl border border-slate-200/90 bg-white px-4 py-5 shadow-lg",
        className
      )}
    >
      {steps.map((step, index) => {
        const isActive = step === currentStep;
        const isCompleted = step < currentStep;
        const isLast = index === steps.length - 1;

        return (
          <div key={step} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 text-sm font-semibold transition-colors",
                  isActive && "border-accent bg-accent text-accent-foreground shadow-sm",
                  isCompleted && "border-primary bg-primary text-primary-foreground",
                  !isActive &&
                    !isCompleted &&
                    "border-slate-200 bg-slate-50 text-slate-500"
                )}
                aria-current={isActive ? "step" : undefined}
              >
                {isCompleted ? "✓" : step}
              </div>
              <span
                className={cn(
                  "mt-1.5 hidden text-xs font-medium sm:block",
                  isActive ? "text-primary" : "text-slate-500"
                )}
              >
                {STEP_LABELS[step]}
              </span>
            </div>
            {!isLast && (
              <div
                className={cn(
                  "mx-2 h-0.5 w-6 min-[400px]:w-10",
                  isCompleted ? "bg-primary" : "bg-slate-200"
                )}
                aria-hidden
              />
            )}
          </div>
        );
      })}
    </nav>
  );
}
