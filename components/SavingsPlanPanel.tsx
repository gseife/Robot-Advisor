"use client";
import type { Allocation, IntakeData } from "@/lib/types";
import { computeExpectedAnnualReturn, computeMonthlyContribution } from "@/lib/allocation";

function fmt(n: number) {
  return Math.round(n).toLocaleString("de-CH");
}

export function SavingsPlanPanel({
  intake,
  alloc,
}: {
  intake: IntakeData;
  alloc: Allocation;
}) {
  const goal = intake.goal_amount_chf ?? 0;
  const initial = intake.initial_investment_chf ?? 0;
  const years = intake.horizon_years;

  if (!goal || !years) return null;

  const annualReturn = computeExpectedAnnualReturn(alloc);
  const monthly = computeMonthlyContribution(goal, initial, annualReturn, years);
  const returnPct = Math.round(annualReturn * 1000) / 10;

  return (
    <section>
      <div className="hairline pb-2 mb-5">
        <span className="text-[10px] uppercase tracking-[0.28em] text-ink-faint">
          Savings plan
        </span>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-baseline">
          <span className="text-xs uppercase tracking-[0.2em] text-ink-faint">Goal</span>
          <span className="font-display text-xl num text-ink">CHF {fmt(goal)}</span>
        </div>

        {initial > 0 && (
          <div className="flex justify-between items-baseline">
            <span className="text-xs uppercase tracking-[0.2em] text-ink-faint">Initial investment</span>
            <span className="font-display text-xl num text-ink">CHF {fmt(initial)}</span>
          </div>
        )}

        <div className="flex justify-between items-baseline">
          <span className="text-xs uppercase tracking-[0.2em] text-ink-faint">Horizon</span>
          <span className="font-display text-xl num text-ink">{years} years</span>
        </div>

        <div className="flex justify-between items-baseline">
          <span className="text-xs uppercase tracking-[0.2em] text-ink-faint">Expected return</span>
          <span className="font-display text-xl num text-ink">{returnPct}% p.a.</span>
        </div>

        <div className="border-t border-rule pt-4 flex justify-between items-baseline">
          <span className="text-xs uppercase tracking-[0.2em] text-ink-faint">Monthly savings needed</span>
          {monthly === 0 ? (
            <span className="font-display text-2xl text-emerald-700 num">Covered ✓</span>
          ) : (
            <span className="font-display text-2xl text-brand num">CHF {fmt(monthly)}</span>
          )}
        </div>
      </div>

      <p className="mt-4 text-[10px] text-ink-faint leading-relaxed">
        Assumes a constant {returnPct}% annual return based on your allocation, compounded monthly.
        Actual returns vary and are not guaranteed.
      </p>
    </section>
  );
}
