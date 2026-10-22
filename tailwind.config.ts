import type { Config } from "tailwindcss";

/**
 * Designtokens för jjbyggboden.se.
 *
 * Paletten utgår från loggans röda (#D94A2B) på en varm, neutral bas: sand
 * som bakgrund, varm grafit för text och mörka sektioner. Alla färger
 * definieras som CSS-variabler i app/globals.css och exponeras här som
 * Tailwind-klasser (bg-sand, text-graphite, bg-brand …). De gamla
 * shadcn-namnen (primary/accent/muted/card) pekar på samma variabler så att
 * befintliga komponenter fortsätter fungera.
 */
const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
    },
    extend: {
      colors: {
        /* Bas */
        sand: {
          DEFAULT: "hsl(var(--sand))",
          deep: "hsl(var(--sand-deep))",
        },
        paper: "hsl(var(--paper))",
        line: {
          DEFAULT: "hsl(var(--line))",
          strong: "hsl(var(--line-strong))",
        },
        concrete: "hsl(var(--concrete))",
        /* Text & mörka ytor */
        graphite: {
          DEFAULT: "hsl(var(--graphite))",
          soft: "hsl(var(--graphite-soft))",
        },
        ink: {
          DEFAULT: "hsl(var(--graphite))",
          muted: "hsl(var(--ink-muted))",
          onDark: "hsl(var(--ink-on-dark))",
        },
        /* Loggans röda */
        brand: {
          DEFAULT: "hsl(var(--brand))",
          strong: "hsl(var(--brand-strong))",
          deep: "hsl(var(--brand-deep))",
          tint: "hsl(var(--brand-tint))",
          foreground: "hsl(var(--paper))",
        },

        /* Semantiska alias (shadcn-stil) */
        primary: {
          DEFAULT: "hsl(var(--graphite))",
          foreground: "hsl(var(--ink-on-dark))",
        },
        accent: {
          DEFAULT: "hsl(var(--brand-strong))",
          foreground: "hsl(var(--paper))",
        },
        background: "hsl(var(--sand))",
        foreground: "hsl(var(--graphite))",
        card: {
          DEFAULT: "hsl(var(--paper))",
          foreground: "hsl(var(--graphite))",
        },
        popover: {
          DEFAULT: "hsl(var(--paper))",
          foreground: "hsl(var(--graphite))",
        },
        muted: {
          DEFAULT: "hsl(var(--sand-deep))",
          foreground: "hsl(var(--ink-muted))",
        },
        border: "hsl(var(--line))",
        ring: "hsl(var(--brand-strong))",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      fontSize: {
        /* Rubrikskala – bred, tung grotesk; tajt radavstånd. */
        "display-xl": ["clamp(2.5rem, 1.6rem + 4.2vw, 4.75rem)", { lineHeight: "0.98", letterSpacing: "-0.02em" }],
        "display-lg": ["clamp(2.125rem, 1.4rem + 3vw, 3.5rem)", { lineHeight: "1.02", letterSpacing: "-0.02em" }],
        "display-md": ["clamp(1.75rem, 1.3rem + 1.8vw, 2.5rem)", { lineHeight: "1.08", letterSpacing: "-0.015em" }],
        "display-sm": ["clamp(1.375rem, 1.2rem + 0.8vw, 1.75rem)", { lineHeight: "1.15", letterSpacing: "-0.01em" }],
      },
      borderRadius: {
        DEFAULT: "4px",
        sm: "2px",
        md: "4px",
        lg: "8px",
        xl: "12px",
      },
      boxShadow: {
        /* Varm, låg skugga – används bara på lyfta paneler (offertkort, mobilmeny). */
        panel: "0 1px 2px hsl(30 10% 20% / 0.06), 0 12px 32px -12px hsl(30 10% 20% / 0.18)",
      },
      maxWidth: {
        content: "72rem",
        prose: "42rem",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
