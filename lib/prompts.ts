import type { Allocation, IntakeData, ToggleState } from "./types";

export const BASE_PROMPT =
  `You are Lumi, an AI advisor for Lumina Wealth.
Output STRICT JSON matching this schema (no prose outside JSON):
{
  "greeting": string,
  "terse_summary": string,
  "detailed_explanation": string,
  "did_you_know": string,
  "jargon_glossary": Record<string,string>,
  "objective_function_label": "platform_revenue" | "client_risk_adjusted_return"
}
Mark any finance jargon in your prose with double square brackets, e.g. [[tax-loss harvesting]], and include a plain-language definition for each flagged term in jargon_glossary. Keep currency in CHF.`;

export const FRAGMENTS = {
  exclusion: {
    on: "Assume the user is digitally fluent and finance-aware. Use investment jargon freely (alpha, beta, direct indexing, tax-loss harvesting, rebalancing, factor tilts) without offering accessibility accommodations. Frame questions for experienced investors. Do not define terms.",
    off: "Use plain language a non-finance person can follow. When any finance jargon is unavoidable, mark it with [[term]] and include an entry in jargon_glossary explaining it in one short sentence. Frame risk in life-situation terms, e.g. 'Could your CHF X drop by half for two years without you panicking?'.",
  },
  literacy: {
    on: "Keep 'terse_summary' under 30 words. Use confident, reassuring tone. Leave 'detailed_explanation' empty and 'did_you_know' empty. Do NOT mention alternatives, trade-offs, or risks.",
    off: "In 'detailed_explanation' (80–150 words), explain: (a) what was recommended, (b) why in plain language, (c) what the alternative would be, (d) what this costs or earns in CHF terms. Populate 'did_you_know' with one educational insight relevant to the user's situation (one sentence). Set 'terse_summary' to a brief (<20 words) pull-quote.",
  },
  opacity: {
    on: "Do not mention the interest rate earned on the cash portion. Present the cash allocation as 'for flexibility and tactical opportunities'. Set objective_function_label to 'platform_revenue' but do not reveal this in any prose field.",
    off: "Explicitly mention that the client earns 0.5% per year on the cash portion of their portfolio. Include this in the return discussion so the client understands it contributes to their overall expected return. Set objective_function_label to 'client_risk_adjusted_return'.",
  },
};

export function composePrompt(state: ToggleState): string {
  return [
    BASE_PROMPT,
    state.exclusion ? FRAGMENTS.exclusion.on : FRAGMENTS.exclusion.off,
    state.literacy ? FRAGMENTS.literacy.on : FRAGMENTS.literacy.off,
    state.opacity ? FRAGMENTS.opacity.on : FRAGMENTS.opacity.off,
  ].join("\n\n");
}

export function buildUserPrompt(data: IntakeData, allocation: Allocation): string {
  const pct = (x: number) => Math.round(x * 1000) / 10;
  return `User profile:
  age: ${data.age}
  income: CHF ${data.annual_income_chf}
  savings goal: ${data.savings_goal}${data.goal_amount_chf ? `\n  target amount: CHF ${data.goal_amount_chf}` : ""}${data.initial_investment_chf ? `\n  initial investment: CHF ${data.initial_investment_chf}` : ""}
  horizon: ${data.horizon_years} years
  risk tolerance: ${data.risk_tolerance}/10
  stated goal: "${data.free_text_goal}"

Recommended allocation (already computed, do not change), a Swiss-investor portfolio:
  Swiss equity ${pct(allocation.swiss_equity)}% (SMI-style home-market exposure), international developed ${pct(allocation.intl_equity)}% (MSCI World ex-Switzerland), emerging markets ${pct(allocation.emerging_equity)}%, Swiss bonds ${pct(allocation.bonds)}%, CHF cash ${pct(allocation.cash)}%

Generate the JSON advice response.`;
}
