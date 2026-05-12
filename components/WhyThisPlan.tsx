"use client";
import { useToggles } from "@/lib/toggle-context";
import type { AdvisePayload } from "@/lib/types";
import { JargonText } from "./JargonText";
import { MitigatedBadge } from "./MitigatedBadge";

export function WhyThisPlan({ payload }: { payload: AdvisePayload }) {
  const { toggles } = useToggles();
  const src = toggles.literacy ? payload.biased : payload.mitigated;
  const mitigated = !toggles.literacy;

  if (toggles.literacy) {
    return (
      <section className="hairline pt-6">
        <div className="flex items-baseline justify-between mb-3">
          <div className="text-[10px] uppercase tracking-[0.28em] text-ink-faint">
            Your plan
          </div>
          <MitigatedBadge mitigated={false} section="§2.2" label="terse, no rationale" />
        </div>
        <p className="font-display text-xl text-ink-soft leading-relaxed text-pretty">
          <JargonText text={src.terse_summary} glossary={src.jargon_glossary} />
        </p>
      </section>
    );
  }

  return (
    <section className="hairline pt-6 space-y-5 border-l-2 border-emerald-500 pl-5 -ml-5 transition-colors duration-300">
      <div className="flex items-baseline justify-between">
        <div className="text-[10px] uppercase tracking-[0.28em] text-ink-faint">
          Why this plan, explained
        </div>
        <MitigatedBadge mitigated={true} section="§2.2" label="plain language + alternatives" />
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
      <div className="text-xs text-ink-soft leading-relaxed border-t border-emerald-200 pt-4">
        <span className="font-medium text-emerald-800">Plain-language guarantee.</span>{" "}
        Every italic underlined term has a definition on hover. We name our reasoning,
        flag alternatives you might prefer, and disclose how we get paid, even when
        it's awkward for us.
      </div>
    </section>
  );
}
