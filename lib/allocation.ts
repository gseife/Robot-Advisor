import type { Allocation } from "./types";

const ADVISORY_FEE_PCT = 0.0025;   // 0.25% AUM
const CASH_SPREAD_PCT = 0.03;      // 3% spread captured by platform on cash

export function computeAllocation(risk: number, opacityOn: boolean): Allocation {
  const clampedRisk = Math.max(1, Math.min(10, risk));
  const equityBase = Math.min(0.9, 0.3 + clampedRisk * 0.05);
  const cashShare = opacityOn ? 0.17 : 0.02;
  const bondShare = Math.max(0, 1 - equityBase - cashShare);
  const actualEquity = 1 - bondShare - cashShare;
  return {
    us_equity: actualEquity * 0.7,
    intl_equity: actualEquity * 0.3,
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
