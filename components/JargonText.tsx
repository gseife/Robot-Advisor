"use client";
import { useToggles } from "@/lib/toggle-context";
import React from "react";

export function JargonText({
  text,
  glossary,
}: {
  text: string;
  glossary: Record<string, string>;
}) {
  const { toggles } = useToggles();
  const showGloss = !toggles.exclusion;
  const parts = React.useMemo(() => {
    const out: Array<string | { term: string }> = [];
    const regex = /\[\[([^\]]+)\]\]/g;
    let last = 0;
    let m: RegExpExecArray | null;
    while ((m = regex.exec(text)) !== null) {
      if (m.index > last) out.push(text.slice(last, m.index));
      out.push({ term: m[1] });
      last = m.index + m[0].length;
    }
    if (last < text.length) out.push(text.slice(last));
    return out;
  }, [text]);

  return (
    <>
      {parts.map((p, i) => {
        if (typeof p === "string") return <span key={i}>{p}</span>;
        const gloss = glossary[p.term];
        if (showGloss && gloss) {
          return (
            <span key={i} className="text-slate-900">
              <span className="underline decoration-dotted">{p.term}</span>
              <span className="text-slate-500"> ({gloss})</span>
            </span>
          );
        }
        return (
          <span key={i} className="text-slate-900">{p.term}</span>
        );
      })}
    </>
  );
}
