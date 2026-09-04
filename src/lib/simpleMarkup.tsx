/**
 * Lightweight markup for news bodies (no raw HTML).
 * Supports: **bold**, *italic*, [text](url), - lists, blank-line paragraphs.
 */

import { createElement, type ReactNode } from "react";

function inlineToNodes(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const re = /(\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\))/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) nodes.push(text.slice(last, m.index));
    const raw = m[0];
    if (raw.startsWith("**")) {
      nodes.push(createElement("strong", { key: `${keyPrefix}-b${i++}` }, raw.slice(2, -2)));
    } else if (raw.startsWith("*")) {
      nodes.push(createElement("em", { key: `${keyPrefix}-i${i++}` }, raw.slice(1, -1)));
    } else {
      const linkMatch = raw.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (linkMatch) {
        const href = linkMatch[2];
        const safe =
          href.startsWith("http://") ||
          href.startsWith("https://") ||
          href.startsWith("mailto:") ||
          href.startsWith("/");
        if (safe) {
          nodes.push(
            createElement(
              "a",
              {
                key: `${keyPrefix}-a${i++}`,
                href,
                target: href.startsWith("http") ? "_blank" : undefined,
                rel: href.startsWith("http") ? "noopener noreferrer" : undefined,
              },
              linkMatch[1],
            ),
          );
        } else {
          nodes.push(linkMatch[1]);
        }
      }
    }
    last = m.index + raw.length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

export function renderSimpleMarkup(source: string): ReactNode {
  const blocks = source.replace(/\r\n/g, "\n").trim().split(/\n{2,}/);
  if (!source.trim()) return null;
  return blocks.map((block, bi) => {
    const lines = block.split("\n");
    const listLines = lines.filter((l) => /^\s*[-*]\s+/.test(l));
    if (listLines.length > 0 && listLines.length === lines.filter((l) => l.trim()).length) {
      return createElement(
        "ul",
        { key: `blk-${bi}`, className: "markup-list" },
        listLines.map((l, li) =>
          createElement(
            "li",
            { key: `li-${bi}-${li}` },
            ...inlineToNodes(l.replace(/^\s*[-*]\s+/, ""), `li-${bi}-${li}`),
          ),
        ),
      );
    }
    return createElement(
      "p",
      { key: `blk-${bi}` },
      ...lines.flatMap((line, li) => {
        const nodes = inlineToNodes(line, `p-${bi}-${li}`);
        return li === 0 ? nodes : [createElement("br", { key: `br-${bi}-${li}` }), ...nodes];
      }),
    );
  });
}

export const MARKUP_HINT =
  "Formatting: **bold**, *italic*, [link text](https://…), and - bullet lists. Blank line = new paragraph.";
