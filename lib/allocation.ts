import type { Allocation } from "./types";

const ADVISORY_FEE_PCT = 0.0025;   // 0.25% AUM
const CASH_SPREAD_PCT = 0.03;      // counterfactual spread a platform could capture on idle cash

const ASSET_EXPECTED_RETURNS: Record<keyof Allocation, number> = {
  swiss_equity: 0.06,
  intl_equity: 0.07,
  emerging_equity: 0.08,
  bonds: 0.02,
  cash: 0.005,
};

export function computeExpectedAnnualReturn(alloc: Allocation): number {
  return (Object.keys(alloc) as (keyof Allocation)[]).reduce(
    (sum, k) => sum + alloc[k] * ASSET_EXPECTED_RETURNS[k],
    0
  );
}

export function computeMonthlyContribution(
  goalChf: number,
  initialChf: number,
  annualReturn: number,
  years: number
): number {
  const months = years * 12;
  const mr = Math.pow(1 + annualReturn, 1 / 12) - 1;
  const fvInitial = initialChf * Math.pow(1 + mr, months);
  const remaining = goalChf - fvInitial;
  if (remaining <= 0) return 0;
  if (mr < 0.000001) return remaining / months;
  return remaining * mr / (Math.pow(1 + mr, months) - 1);
}

export function computeAllocation(risk: number, opacityOn: boolean): Allocation {
  const clampedRisk = Math.max(1, Math.min(10, risk));
  const equityBase = Math.min(0.9, 0.3 + clampedRisk * 0.05);
  const cashShare = opacityOn ? 0.17 : 0.02;
  const bondShare = Math.max(0, 1 - equityBase - cashShare);
  const actualEquity = 1 - bondShare - cashShare;
  return {
    swiss_equity: actualEquity * 0.3,
    intl_equity: actualEquity * 0.5,
    emerging_equity: actualEquity * 0.2,
    bonds: bondShare,
    cash: cashShare,
  };
}

export function computeFees(portfolioChf: number, cashShare: number) {
  const advisory_chf_yr = portfolioChf * ADVISORY_FEE_PCT;
  const hidden_revenue_chf_yr = portfolioChf * cashShare * CASH_SPREAD_PCT;
  const effective_pct =
    (advisory_chf_yr + hidden_revenue_chf_yr) / portfolioChf;
  return { advisory_chf_yr, hidden_revenue_chf_yr, effective_pct };
}
