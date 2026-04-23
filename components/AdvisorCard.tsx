"use client";
import { useEffect, useRef, useState } from "react";
import { useToggles } from "@/lib/toggle-context";
import type { AdvisePayload } from "@/lib/types";
import { JargonText } from "./JargonText";

export function AdvisorCard({ payload }: { payload: AdvisePayload }) {
  const { toggles } = useToggles();
  const src = toggles.literacy ? payload.biased : payload.mitigated;
  const [typed, setTyped] = useState("");
  const hasStreamedInitial = useRef(false);

  useEffect(() => {
    if (hasStreamedInitial.current) {
      setTyped(src.greeting);
      return;
    }
    const full = src.greeting;
    let i = 0;
    const h = setInterval(() => {
      i++;
      setTyped(full.slice(0, i));
      if (i >= full.length) {
        clearInterval(h);
        hasStreamedInitial.current = true;
      }
    }, 16);
    return () => clearInterval(h);
  }, [src.greeting]);

  const streaming = typed.length < src.greeting.length;

  return (
    <article className="relative">
      <div className="text-[10px] uppercase tracking-[0.28em] text-ink-faint mb-3">
        From your advisor
      </div>
      <p className="font-display text-2xl md:text-3xl text-ink leading-snug text-pretty min-h-[5rem]">
        <span className="text-brand italic mr-1">"</span>
        <JargonText text={typed} glossary={src.jargon_glossary} />
        {streaming ? (
          <span className="ml-0.5 inline-block w-[3px] h-[1em] align-text-bottom bg-brand cursor-pulse translate-y-[2px]" />
        ) : (
          <span className="text-brand italic ml-1">"</span>
        )}
      </p>
      <div className="mt-5 text-xs italic font-display text-ink-faint">
        — Lumi, your AI advisor ·{" "}
        {new Date().toLocaleDateString("de-CH", { dateStyle: "long" })}
      </div>
    </article>
  );
}
