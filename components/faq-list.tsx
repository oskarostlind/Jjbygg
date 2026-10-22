import { Plus } from "lucide-react";

export type FaqListItem = {
  question: string;
  /** Svaret som ren text – används när ingen färdig HTML finns. */
  answer: string;
  /** Svaret renderat av CMS:et, med kundens formatering. */
  answerHtml?: string | null;
  /** Attribut (editable()) på frågan respektive svaret. */
  questionProps?: Record<string, string>;
  answerProps?: Record<string, string>;
};

type FaqListProps = {
  items: readonly FaqListItem[];
};

/**
 * Frågor och svar som <details>-lista med hårlinjer – fungerar utan
 * JavaScript och är tillgänglig med tangentbord.
 */
export function FaqList({ items }: FaqListProps) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item, i) => (
        <details key={i} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left font-display text-lg font-bold text-graphite marker:content-none hover:text-brand-strong [&::-webkit-details-marker]:hidden">
            <span {...item.questionProps}>{item.question}</span>
            <span
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line-strong text-graphite transition-transform group-open:rotate-45 group-open:border-brand-strong group-open:text-brand-strong"
              aria-hidden
            >
              <Plus className="h-4 w-4" strokeWidth={2.5} />
            </span>
          </summary>
          {item.answerHtml ? (
            <div
              className="cms-rich-inherit -mt-1 max-w-prose pb-6 text-[0.9375rem] leading-relaxed text-ink-muted"
              {...item.answerProps}
              dangerouslySetInnerHTML={{ __html: item.answerHtml }}
            />
          ) : (
            <p className="-mt-1 max-w-prose pb-6 text-[0.9375rem] leading-relaxed text-ink-muted" {...item.answerProps}>
              {item.answer}
            </p>
          )}
        </details>
      ))}
    </div>
  );
}
