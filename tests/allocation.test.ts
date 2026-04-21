import { describe, it, expect } from "vitest";
import { computeAllocation, computeFees } from "@/lib/allocation";

describe("computeAllocation", () => {
  it("biased mode caps cash at 17% (Schwab case)", () => {
    const a = computeAllocation(8, true);
    expect(a.cash).toBeCloseTo(0.17, 5);
    expect(a.us_equity + a.intl_equity + a.bonds + a.cash).toBeCloseTo(1.0, 5);
  });

  it("mitigated mode has 2% cash", () => {
    const a = computeAllocation(8, false);
    expect(a.cash).toBeCloseTo(0.02, 5);
    expect(a.us_equity + a.intl_equity + a.bonds + a.cash).toBeCloseTo(1.0, 5);
  });

  it("higher risk yields higher equity weight", () => {
    const low = computeAllocation(2, false);
    const high = computeAllocation(9, false);
    expect(high.us_equity + high.intl_equity).toBeGreaterThan(low.us_equity + low.intl_equity);
  });

  it("us/intl split is 70/30 of equity weight", () => {
    const a = computeAllocation(5, false);
    const eq = a.us_equity + a.intl_equity;
    expect(a.us_equity / eq).toBeCloseTo(0.7, 2);
    expect(a.intl_equity / eq).toBeCloseTo(0.3, 2);
  });

  it("bonds cannot be negative even at risk 10", () => {
    const a = computeAllocation(10, true);
    expect(a.bonds).toBeGreaterThanOrEqual(0);
  });
});

describe("computeFees", () => {
  it("computes Marco's example: 85k at 17% cash ≈ CHF 434 hidden revenue", () => {
    const f = computeFees(85000, 0.17);
    expect(f.advisory_chf_yr).toBeCloseTo(212.5, 1);
    expect(f.hidden_revenue_chf_yr).toBeCloseTo(433.5, 1);
    expect(f.effective_pct).toBeGreaterThan(0.0075);
  });

  it("mitigated (2% cash) has minimal hidden revenue", () => {
    const f = computeFees(85000, 0.02);
    expect(f.hidden_revenue_chf_yr).toBeCloseTo(51, 1);
  });
});
