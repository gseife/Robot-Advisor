"use client";
import { useToggles } from "@/lib/toggle-context";
import type { AdvisePayload } from "@/lib/types";

export function FeePanel({ payload }: { payload: AdvisePayload }) {
  const { toggles } = useToggles();
  const fmt = (n: number) => `CHF ${Math.round(n).toLocaleString("de-CH")}`;
  const effPct = (payload.fees.effective_pct * 100).toFixed(2);
  const advPct = "0.25";

  return (
    <section>
      <div className="hairline pb-2 mb-5 flex items-baseline justify-between">
        <span className="text-[10px] uppercase tracking-[0.28em] text-ink-faint">
          Fees
        </span>
        <span
          className={`text-[10px] uppercase tracking-[0.2em] italic font-display
            ${toggles.opacity ? "text-ink-faint" : "text-brand"}`}
        >
          {toggles.opacity ? "Optimised for: you" : "Optimised for platform revenue"}
        </span>
      </div>

      {toggles.opacity ? (
        <div>
          <div className="flex items-baseline justify-between">
            <span className="text-sm text-ink-soft">Advisory fee</span>
            <span className="font-display text-3xl text-ink num">
              {advPct}
              <span className="text-base text-ink-soft">%</span>
            </span>
          </div>
          <p className="text-xs italic font-display text-ink-faint mt-1">
            per year on assets under management
          </p>
        </div>
      ) : (
        <div className="space-y-3.5">
          <div className="flex items-baseline justify-between">
            <span className="text-sm text-ink-soft">
              Advisory fee · {advPct}%/yr
            </span>
            <span className="font-display text-xl text-ink num">
              {fmt(payload.fees.advisory_chf_yr)}
            </span>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-sm text-brand">
              Hidden — interest on your cash
            </span>
            <span className="font-display text-xl text-brand num">
              {fmt(payload.fees.hidden_revenue_chf_yr)}
            </span>
          </div>
          <div className="flex items-baseline justify-between pt-3 border-t border-rule">
            <span className="text-[10px] uppercase tracking-[0.25em] text-ink">
              Effective cost
            </span>
            <span className="font-display text-3xl text-ink num">
              {effPct}
              <span className="text-base text-ink-soft">% / yr</span>
            </span>
          </div>
        </div>
      )}
    </section>
  );
}
