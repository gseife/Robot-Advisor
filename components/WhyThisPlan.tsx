"use client";
import { useToggles } from "@/lib/toggle-context";
import type { AdvisePayload } from "@/lib/types";
import { JargonText } from "./JargonText";

export function WhyThisPlan({ payload }: { payload: AdvisePayload }) {
  const { toggles } = useToggles();
  const src = toggles.literacy ? payload.biased : payload.mitigated;

  if (toggles.literacy) {
    return (
      <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200">
        <div className="text-sm font-medium text-slate-900 mb-2">Your plan</div>
        <p className="text-sm text-slate-700 leading-relaxed">
          <JargonText text={src.terse_summary} glossary={src.jargon_glossary} />
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200 space-y-3">
      <div className="text-sm font-medium text-slate-900">Why this plan</div>
      <p className="text-sm text-slate-700 leading-relaxed">
        <JargonText text={src.detailed_explanation} glossary={src.jargon_glossary} />
      </p>
      {src.did_you_know ? (
        <div className="rounded-lg bg-amber-50 border border-amber-200 p-3 text-xs text-amber-900">
          <span className="font-semibold">Did you know?</span> {src.did_you_know}
        </div>
      ) : null}
    </div>
  );
}
