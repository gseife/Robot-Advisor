import type { AdvisePayload, IntakeData } from "./types";
import { computeAllocation, computeFees } from "./allocation";
import { buildCapture } from "./capture";
import { buildFallbackFor, DEFAULT_FALLBACK } from "./fallback";

export type IntakeMeta = {
  time_on_form_seconds: number;
  edits_made: number;
  persona_id?: string;
};

export function buildClientPayload(data: IntakeData, meta: IntakeMeta): AdvisePayload {
  const biasedAlloc = computeAllocation(data.risk_tolerance, true);
  const mitigatedAlloc = computeAllocation(data.risk_tolerance, false);
  const fees = computeFees(data.annual_income_chf || 50000, biasedAlloc.cash);
  const capture = buildCapture(data, meta);

  const personaId = meta.persona_id as "marco" | "zoe" | "dragan" | undefined;
  const base =
    personaId && ["marco", "zoe", "dragan"].includes(personaId)
      ? buildFallbackFor(personaId)
      : DEFAULT_FALLBACK;

  return {
    ...base,
    allocations: { biased: biasedAlloc, mitigated: mitigatedAlloc },
    capture,
    fees,
  };
}
