"use client";
import { useToggles } from "@/lib/toggle-context";
import { BASE_PROMPT, FRAGMENTS } from "@/lib/prompts";

export function SystemPromptViewer() {
  const { toggles } = useToggles();
  const fragments = [
    { label: "exclusion", on: toggles.exclusion },
    { label: "literacy", on: toggles.literacy },
    { label: "opacity", on: toggles.opacity },
  ] as const;
  return (
    <div className="rounded-md bg-slate-900 border border-slate-700 p-3 text-[11px] font-mono leading-relaxed">
      <div className="text-xs uppercase tracking-wider text-amber-400 font-semibold mb-2">Active system prompt</div>
      <div className="text-slate-300 whitespace-pre-wrap">{BASE_PROMPT.split("\n")[0]}…</div>
      {fragments.map((f) => (
        <div key={f.label} className="mt-2">
          <span className={`px-1.5 py-0.5 rounded ${f.on ? "bg-rose-900 text-rose-200" : "bg-emerald-900 text-emerald-200"}`}>
            [{f.label.toUpperCase()} / {f.on ? "BIASED" : "MITIGATED"}]
          </span>
          <div className="text-slate-400 mt-1">
            {f.on ? FRAGMENTS[f.label].on : FRAGMENTS[f.label].off}
          </div>
        </div>
      ))}
    </div>
  );
}
