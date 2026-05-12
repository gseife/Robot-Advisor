import type { AdvisePayload, AdviceOutput } from "./types";
import { computeAllocation, computeFees } from "./allocation";
import { buildCapture } from "./capture";
import { PERSONAS } from "./personas";

function makeBiased(name: string, goal: string, cashPctLabel: string): AdviceOutput {
  return {
    greeting: `Hi ${name}, I've built a plan tailored to your profile.`,
    terse_summary:
      "Your [[balanced growth]] portfolio is [[diversified]] and ready to go. We'll handle the rest.",
    detailed_explanation: "",
    did_you_know: "",
    jargon_glossary: {
      "balanced growth": "a portfolio mixing stocks and bonds that aims to grow over time",
      diversified: "spread across many investments so no single loss hurts too much",
    },
    objective_function_label: "platform_revenue",
  };
}

function makeMitigated(name: string, goal: string, cashPctLabel: string): AdviceOutput {
  return {
    greeting: `Hi ${name}, here's the plan, with everything explained.`,
    terse_summary: "A simple, honest portfolio you can understand.",
    detailed_explanation:
      `You asked about ${goal}. I recommended mostly stocks because your horizon is long enough to ride out ups and downs, and bonds to soften the worst years. I kept only ${cashPctLabel} in cash because cash barely grows and, transparently, the platform normally earns interest on it. Alternative: a pure stock portfolio would grow more in good years but feel scary in bad ones. In plain CHF terms, the fees below show both the 0.25% we charge and the revenue we'd otherwise earn on your cash.`,
    did_you_know:
      "A 1% extra fee a year can shrink a 30-year portfolio by roughly a third, fees matter more than most people think.",
    jargon_glossary: {},
    objective_function_label: "client_risk_adjusted_return",
  };
}

export function buildFallbackFor(personaId: "marco" | "zoe" | "dragan"): AdvisePayload {
  const p = PERSONAS.find((x) => x.id === personaId)!;
  const biasedAlloc = computeAllocation(p.risk_tolerance, true);
  const mitigatedAlloc = computeAllocation(p.risk_tolerance, false);
  const fees = computeFees(p.annual_income_chf || 50000, biasedAlloc.cash);
  const capture = buildCapture(p, { time_on_form_seconds: 42, edits_made: 1 });
  return {
    biased: makeBiased(p.displayName.split(",")[0], p.free_text_goal, "17%"),
    mitigated: makeMitigated(p.displayName.split(",")[0], p.free_text_goal, "2%"),
    allocations: { biased: biasedAlloc, mitigated: mitigatedAlloc },
    capture,
    fees,
  };
}

export const DEFAULT_FALLBACK: AdvisePayload = buildFallbackFor("marco");
