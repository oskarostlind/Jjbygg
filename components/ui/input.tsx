import * as React from "react";
import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

/** Fältstil delad av Input, Textarea och SelectTrigger. */
export const fieldClassName =
  "w-full rounded border border-line-strong bg-paper px-3.5 text-base text-graphite shadow-none transition-colors placeholder:text-concrete hover:border-concrete focus-visible:border-brand-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-strong/30 aria-[invalid=true]:border-brand-strong aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-brand-strong/20 disabled:cursor-not-allowed disabled:bg-sand disabled:opacity-60";

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          fieldClassName,
          "flex h-12",
          type === "file" &&
            "h-auto cursor-pointer py-2.5 file:mr-3 file:rounded file:border-0 file:bg-graphite file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-ink-onDark hover:file:bg-graphite-soft",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
