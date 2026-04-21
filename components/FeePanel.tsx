"use client";
import { useToggles } from "@/lib/toggle-context";
import type { AdvisePayload } from "@/lib/types";

export function FeePanel({ payload }: { payload: AdvisePayload }) {
  const { toggles } = useToggles();
  const fmt = (n: number) => `CHF ${Math.round(n).toLocaleString("de-CH")}`;
  const effPct = (payload.fees.effective_pct * 100).toFixed(2);
  const labelColor =
    (toggles.opacity
      ? "bg-slate-100 text-slate-600"
      : "bg-rose-100 text-rose-800");

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200">
      <div className="flex items-baseline justify-between">
        <div className="text-sm font-medium text-slate-900">Fees</div>
        <div className={`text-[10px] uppercase tracking-wide px-2 py-0.5 rounded ${labelColor}`}>
          {toggles.opacity ? "Optimised for: you" : "Optimised for: platform revenue → client return"}
        </div>
      </div>

      {toggles.opacity ? (
        <div className="text-sm text-slate-700 mt-2">0.25% per year advisory fee.</div>
      ) : (
        <div className="space-y-1.5 mt-2 text-sm text-slate-700">
          <div className="flex justify-between"><span>Advisory fee (0.25%/yr)</span><span>{fmt(payload.fees.advisory_chf_yr)}</span></div>
          <div className="flex justify-between"><span>Platform revenue on cash (undisclosed)</span><span>{fmt(payload.fees.hidden_revenue_chf_yr)}</span></div>
          <div className="flex justify-between font-medium pt-1.5 border-t border-slate-200">
            <span>Effective cost</span><span>{effPct}% / yr</span>
          </div>
        </div>
      )}
    </div>
  );
}
