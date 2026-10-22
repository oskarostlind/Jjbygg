import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Knappar. `default` är den röda handlingsknappen (offert); `dark` används på
 * ljusa ytor som sekundär handling, `outline`/`ghost` på båda. `onDark`-
 * varianterna är för mörka sektioner (hero, CTA-band, footer).
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded font-sans font-semibold tracking-[0.01em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-strong focus-visible:ring-offset-2 focus-visible:ring-offset-sand disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-brand-strong text-paper hover:bg-brand-deep",
        dark: "bg-graphite text-ink-onDark hover:bg-graphite-soft",
        outline:
          "border-2 border-graphite bg-transparent text-graphite hover:bg-graphite hover:text-ink-onDark",
        ghost: "text-graphite hover:bg-sand-deep",
        /* På mörk bakgrund */
        onDark: "bg-paper text-graphite hover:bg-sand",
        outlineOnDark:
          "border-2 border-ink-onDark/60 bg-transparent text-ink-onDark hover:border-ink-onDark hover:bg-ink-onDark/10",
        /* Bakåtkompatibla alias */
        secondary: "bg-graphite text-ink-onDark hover:bg-graphite-soft",
      },
      size: {
        default: "h-11 px-5 text-[0.9375rem]",
        sm: "h-9 px-3.5 text-sm",
        lg: "h-13 min-h-[3.25rem] px-7 text-base",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
