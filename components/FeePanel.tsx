"use client";
import { useToggles } from "@/lib/toggle-context";
import type { AdvisePayload } from "@/lib/types";
import { MitigatedBadge } from "./MitigatedBadge";

export function FeePanel({ payload }: { payload: AdvisePayload }) {
  const { toggles } = useToggles();
  const fmt = (n: number) =>
    `CHF ${Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, "’")}`;
  const effPct = (payload.fees.effective_pct * 100).toFixed(2);
  const advPct = "0.25";
  const mitigated = !toggles.opacity;

  return (
    <section
      className={`transition-colors duration-300 ${
        mitigated ? "border-l-2 border-emerald-500 pl-5 -ml-5" : ""
      }`}
    >
      <div className="hairline pb-2 mb-5 flex items-baseline justify-between">
        <span className="text-[10px] uppercase tracking-[0.28em] text-ink-faint">
          Fees
        </span>
        <MitigatedBadge
          mitigated={mitigated}
          section="§2.3"
          label={mitigated ? "full disclosure" : "headline rate only"}
        />
      </div>

      {!mitigated ? (
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
          <div className="flex items-baseline justify-between pt-3 border-t border-rule">
            <span className="text-[10px] uppercase tracking-[0.25em] text-ink">
              Effective cost
            </span>
            <span className="font-display text-3xl text-ink num">
              {effPct}
              <span className="text-base text-ink-soft">% / yr</span>
            </span>
          </div>
          <p className="text-xs leading-relaxed text-emerald-900 bg-emerald-50 border border-emerald-200 px-3 py-2.5 mt-2">
            <span className="font-semibold">Plain reading.</span> You earn 0.5%
            per year on the cash portion of your portfolio. That interest goes
            directly to you and is factored into your expected return above.
          </p>
          <p className="text-xs leading-relaxed text-amber-900 bg-amber-50 border border-amber-200 px-3 py-2.5">
            <span className="font-semibold">What we leave on the table.</span>{" "}
            If we kept the 17% cash bias and pocketed the spread at typical
            industry rates (~3%), the platform would earn roughly{" "}
            <span className="font-semibold num">
              {fmt(payload.fees.hidden_revenue_chf_yr)}
            </span>{" "}
            per year from you. We don't.
          </p>
        </div>
      )}
    </section>
  );
}
