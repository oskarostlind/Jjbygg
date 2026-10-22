import { siteContent } from "@/lib/site-content";
import { SectionHeading } from "@/components/section-heading";

/**
 * "Så går det till" – fyra steg i ordning. Numreringen är här på riktigt en
 * sekvens (kontakt → hembesök → offert → bygge). Statiskt innehåll från
 * lib/site-content.ts.
 */
export function Process() {
  const { processTitle, processIntro, process } = siteContent.homePage;

  return (
    <section className="surface-dark py-16 md:py-24" aria-labelledby="process-heading">
      <div className="wrap">
        <SectionHeading id="process-heading" title={processTitle} intro={processIntro} onDark />

        <ol className="mt-12 grid gap-px overflow-hidden rounded-lg bg-ink-onDark/15 sm:grid-cols-2 lg:grid-cols-4">
          {process.map((step, i) => (
            <li key={step.title} className="flex flex-col bg-graphite p-6 md:p-7">
              <span className="display text-5xl leading-none text-brand" aria-hidden>
                {i + 1}
              </span>
              <h3 className="mt-6 font-display text-xl font-bold leading-tight text-ink-onDark">
                <span className="sr-only">Steg {i + 1}: </span>
                {step.title}
              </h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-onDark/75">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
