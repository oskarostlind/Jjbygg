import type { ReactNode } from "react";

/**
 * Minimal, säker markdown-lite-rendering av CMS-brödtext.
 *
 * Rendrerar ALDRIG med dangerouslySetInnerHTML – all text går genom Reacts
 * vanliga textnoder, så inbäddad HTML/skript i innehållet blir aldrig
 * exekverbar. Stödjer det vanligaste för blogginlägg: rubriker (#, ##, ###),
 * stycken, radbrytningar, punkt-/nummerlistor samt enkel fetstil/kursiv text (markerat med asterisker).
 */

function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const tokens = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).filter((t) => t.length > 0);

  return tokens.map((token, i) => {
    const key = `${keyPrefix}-${i}`;
    if (token.startsWith("**") && token.endsWith("**") && token.length >= 4) {
      return <strong key={key}>{token.slice(2, -2)}</strong>;
    }
    if (token.startsWith("*") && token.endsWith("*") && token.length >= 2) {
      return <em key={key}>{token.slice(1, -1)}</em>;
    }

    // Bevara enkla radbrytningar inom ett stycke/listobjekt.
    const lines = token.split(/\n/);
    return lines.map((line, j) => (
      <span key={`${key}-${j}`}>
        {line}
        {j < lines.length - 1 ? <br /> : null}
      </span>
    ));
  });
}

function isListLine(line: string, marker: RegExp): boolean {
  return marker.test(line.trim());
}

export function renderMarkdownLite(markdown: string): ReactNode {
  const source = markdown.replace(/\r\n/g, "\n").trim();
  if (!source) {
    return null;
  }

  const blocks = source.split(/\n{2,}/);
  const unorderedMarker = /^[-*]\s+/;
  const orderedMarker = /^\d+\.\s+/;

  return (
    <>
      {blocks.map((block, blockIndex) => {
        const trimmed = block.trim();
        if (!trimmed) return null;
        const key = `block-${blockIndex}`;

        const headingMatch = trimmed.match(/^(#{1,3})\s+(.*)$/);
        if (headingMatch) {
          const level = headingMatch[1].length;
          const text = headingMatch[2].trim();
          if (level === 1) {
            return (
              <h2 key={key} className="mt-8 text-2xl font-semibold text-primary first:mt-0">
                {renderInline(text, key)}
              </h2>
            );
          }
          if (level === 2) {
            return (
              <h3 key={key} className="mt-6 text-xl font-semibold text-primary first:mt-0">
                {renderInline(text, key)}
              </h3>
            );
          }
          return (
            <h4 key={key} className="mt-4 text-lg font-semibold text-primary first:mt-0">
              {renderInline(text, key)}
            </h4>
          );
        }

        const lines = trimmed.split("\n").map((l) => l.trim());

        if (lines.every((l) => isListLine(l, unorderedMarker))) {
          return (
            <ul key={key} className="mt-4 list-disc space-y-1 pl-6 text-foreground first:mt-0">
              {lines.map((l, i) => (
                <li key={`${key}-li-${i}`}>{renderInline(l.replace(unorderedMarker, ""), `${key}-li-${i}`)}</li>
              ))}
            </ul>
          );
        }

        if (lines.every((l) => isListLine(l, orderedMarker))) {
          return (
            <ol key={key} className="mt-4 list-decimal space-y-1 pl-6 text-foreground first:mt-0">
              {lines.map((l, i) => (
                <li key={`${key}-li-${i}`}>{renderInline(l.replace(orderedMarker, ""), `${key}-li-${i}`)}</li>
              ))}
            </ol>
          );
        }

        return (
          <p key={key} className="mt-4 leading-relaxed text-foreground first:mt-0">
            {renderInline(trimmed, key)}
          </p>
        );
      })}
    </>
  );
}
