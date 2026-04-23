"use client";
import { PERSONAS } from "@/lib/personas";
import type { Persona } from "@/lib/types";

const NUMERAL = ["I", "II", "III"];

export function PersonaCards({
  onPick,
  active,
}: {
  onPick: (p: Persona) => void;
  active?: string;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-rule">
      {PERSONAS.map((p, i) => {
        const isActive = active === p.id;
        return (
          <button
            key={p.id}
            type="button"
            onClick={() => onPick(p)}
            className={`group text-left p-6 transition-colors duration-200 cursor-pointer
              focus:outline-none focus-visible:ring-2 focus-visible:ring-brand
              focus-visible:ring-offset-2 focus-visible:ring-offset-parchment
              ${isActive
                ? "bg-brand-soft"
                : "bg-parchment hover:bg-parchment-deep"}`}
          >
            <div className="flex items-baseline justify-between mb-3">
              <span className="font-display italic text-3xl text-brand leading-none">
                {NUMERAL[i]}
              </span>
              <span className="text-[10px] uppercase tracking-[0.28em] text-ink-faint">
                {isActive ? "Selected" : "Persona"}
              </span>
            </div>
            <div className="font-display text-xl text-ink mb-1.5 leading-tight">
              {p.displayName}
            </div>
            <p className="text-sm text-ink-soft leading-relaxed mb-5 text-pretty min-h-[2.5rem]">
              {p.blurb}
            </p>
            <div className="hairline pt-3 text-[10px] uppercase tracking-[0.2em] text-ink-faint flex items-center gap-2 num">
              <span>CHF {p.annual_income_chf.toLocaleString("de-CH")}</span>
              <span className="text-rule">·</span>
              <span>{p.horizon_years}-yr</span>
              <span className="text-rule">·</span>
              <span>risk {p.risk_tolerance}/10</span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
