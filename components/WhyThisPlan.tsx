"use client";
import { useToggles } from "@/lib/toggle-context";
import type { AdvisePayload } from "@/lib/types";
import { JargonText } from "./JargonText";

export function WhyThisPlan({ payload }: { payload: AdvisePayload }) {
  const { toggles } = useToggles();
  const src = toggles.literacy ? payload.biased : payload.mitigated;

  if (toggles.literacy) {
    return (
      <section className="hairline pt-6">
        <div className="text-[10px] uppercase tracking-[0.28em] text-ink-faint mb-3">
          Your plan
        </div>
        <p className="font-display text-xl text-ink-soft leading-relaxed text-pretty">
          <JargonText text={src.terse_summary} glossary={src.jargon_glossary} />
        </p>
      </section>
    );
  }

  return (
    <section className="hairline pt-6 space-y-5">
      <div className="text-[10px] uppercase tracking-[0.28em] text-ink-faint">
        Why this plan
      </div>
      <p className="font-display text-lg text-ink leading-relaxed text-pretty">
        <JargonText text={src.detailed_explanation} glossary={src.jargon_glossary} />
      </p>
      {src.did_you_know ? (
        <aside className="border-l-2 border-brand bg-brand-soft/40 pl-5 py-4">
          <span className="text-[10px] uppercase tracking-[0.28em] text-brand-deep font-medium">
            Did you know
          </span>
          <p className="text-base text-ink mt-1.5 italic font-display leading-snug text-pretty">
            {src.did_you_know}
          </p>
        </aside>
      ) : null}
    </section>
  );
}
