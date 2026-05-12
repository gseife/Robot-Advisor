"use client";
import { useEffect, useRef, useState } from "react";
import { useToggles } from "@/lib/toggle-context";
import type { AdvisePayload } from "@/lib/types";
import { JargonText } from "./JargonText";
import { MitigatedBadge } from "./MitigatedBadge";

export function AdvisorCard({ payload }: { payload: AdvisePayload }) {
  const { toggles } = useToggles();
  const src = toggles.literacy ? payload.biased : payload.mitigated;
  const literacyMitigated = !toggles.literacy;
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
    <article
      className={`relative transition-colors duration-300 ${
        literacyMitigated ? "border-l-2 border-emerald-500 pl-5 -ml-5" : ""
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="text-[10px] uppercase tracking-[0.28em] text-ink-faint">
          From your advisor
        </div>
        <MitigatedBadge
          mitigated={literacyMitigated}
          section="§2.2"
          label={literacyMitigated ? "plain language" : "industry tone"}
        />
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
        Lumi, your AI advisor ·{" "}
        {new Date().toLocaleDateString("de-CH", { dateStyle: "long" })}
      </div>
    </article>
  );
}
