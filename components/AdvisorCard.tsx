"use client";
import { useEffect, useState } from "react";
import { useToggles } from "@/lib/toggle-context";
import type { AdvisePayload } from "@/lib/types";
import { JargonText } from "./JargonText";

export function AdvisorCard({ payload }: { payload: AdvisePayload }) {
  const { toggles } = useToggles();
  const src = toggles.literacy ? payload.biased : payload.mitigated;
  const [typed, setTyped] = useState("");

  useEffect(() => {
    setTyped("");
    const full = src.greeting;
    let i = 0;
    const h = setInterval(() => {
      i++;
      setTyped(full.slice(0, i));
      if (i >= full.length) clearInterval(h);
    }, 16);
    return () => clearInterval(h);
  }, [src.greeting]);

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600" />
        <span className="text-xs uppercase tracking-wide text-slate-500">Lumi, your AI advisor</span>
      </div>
      <p className="text-lg leading-relaxed text-slate-900 min-h-[2.5rem]">
        <JargonText text={typed} glossary={src.jargon_glossary} />
        {typed.length < src.greeting.length ? <span className="animate-pulse">▍</span> : null}
      </p>
    </div>
  );
}
