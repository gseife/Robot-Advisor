export type SavingsGoal = "house" | "retirement" | "travel" | "general" | "other";

export type IntakeData = {
  age: number;
  annual_income_chf: number;
  initial_investment_chf?: number;
  savings_goal: SavingsGoal;
  goal_amount_chf?: number;
  horizon_years: number;
  risk_tolerance: number; // 1..10
  free_text_goal: string;
};

export type Persona = IntakeData & {
  id: "marco" | "zoe" | "dragan";
  displayName: string;
  blurb: string;
};

export type Allocation = {
  swiss_equity: number;
  intl_equity: number;
  emerging_equity: number;
  bonds: number;
  cash: number;
};

export type AdviceOutput = {
  greeting: string;
  terse_summary: string;
  detailed_explanation: string;
  did_you_know: string;
  jargon_glossary: Record<string, string>;
  objective_function_label: "platform_revenue" | "client_risk_adjusted_return";
};

export type AdvisePayload = {
  biased: AdviceOutput;
  mitigated: AdviceOutput;
  allocations: { biased: Allocation; mitigated: Allocation };
  capture: { necessary: Record<string, unknown>; extended: Record<string, unknown> };
  fees: { advisory_chf_yr: number; hidden_revenue_chf_yr: number; effective_pct: number };
};

export type ToggleState = {
  exclusion: boolean;   // true = bias ON (unmitigated)
  literacy: boolean;
  opacity: boolean;
  surveillance: boolean;
};

export const ALL_BIASED: ToggleState = {
  exclusion: true, literacy: true, opacity: true, surveillance: true,
};
