"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AdvisorCard } from "@/components/AdvisorCard";
import { AllocationChart } from "@/components/AllocationChart";
import { WhyThisPlan } from "@/components/WhyThisPlan";
import { FeePanel } from "@/components/FeePanel";
import { EthicsLabDrawer } from "@/components/EthicsLabDrawer";
import { LoadingFacts } from "@/components/LoadingFacts";
import { LuminaLogo } from "@/components/LuminaLogo";
import { MitigatedBadge } from "@/components/MitigatedBadge";
import { useToggles } from "@/lib/toggle-context";
import type { AdvisePayload } from "@/lib/types";

export default function AdvicePage() {
  const router = useRouter();
  const { toggles, reset } = useToggles();
  const [payload, setPayload] = useState<AdvisePayload | null>(null);
  const [ethicsOpen, setEthicsOpen] = useState(false);

  useEffect(() => {
    const cached = sessionStorage.getItem("advise-payload");
    if (cached) { setPayload(JSON.parse(cached)); return; }
    router.replace("/");
  }, [router]);

  function handleBack() {
    reset();
    sessionStorage.removeItem("advise-payload");
    sessionStorage.removeItem("advise-intake-request");
    router.push("/");
  }

  if (!payload) return <LoadingFacts />;

  const alloc = toggles.opacity ? payload.allocations.biased : payload.allocations.mitigated;
  const exclusionMitigated = !toggles.exclusion;
  const opacityMitigated = !toggles.opacity;
  const surveillanceMitigated = !toggles.surveillance;

  return (
    <>
    <main
      className={`max-w-6xl mx-auto px-6 py-8 transition-transform duration-300 ease-out
        ${ethicsOpen ? "lg:-translate-x-[10rem]" : ""}`}
    >
      {/* Top utility band */}
      <div className="flex items-center justify-between mb-6 rise rise-1">
        <button
          onClick={handleBack}
          className="text-[10px] uppercase tracking-[0.28em] text-ink-faint hover:text-brand transition"
        >
          ← Try another profile
        </button>
        <LuminaLogo size="sm" />
        <button
          onClick={() => setEthicsOpen(true)}
          className="text-[10px] uppercase tracking-[0.28em] text-ink-faint hover:text-brand transition"
        >
          Open Ethics Lab →
        </button>
      </div>

      {/* Editorial section header */}
      <header className="hairline pb-6 mb-10 rise rise-2">
        <div className="grid grid-cols-12 gap-6 items-end">
          <div className="col-span-12 md:col-span-8">
            <span className="text-[10px] uppercase tracking-[0.28em] text-ink-faint">
              Your portfolio · prepared just now
            </span>
            <h1 className="font-display text-4xl md:text-6xl tracking-tight leading-[1.05] mt-2 text-balance">
              Your <span className="italic text-brand">composed</span> plan
            </h1>
          </div>
          <div
            className={`col-span-12 md:col-span-4 md:text-right transition-colors duration-300
              ${exclusionMitigated ? "md:border-r-2 md:border-emerald-500 md:pr-5 md:-mr-5" : ""}`}
          >
            <div className="flex items-center justify-end gap-2 mb-1">
              <div className="text-[10px] uppercase tracking-[0.28em] text-ink-faint">
                Minimum deposit
              </div>
              <MitigatedBadge
                mitigated={exclusionMitigated}
                section="§2.1"
                label={exclusionMitigated ? "open access" : "high bar"}
              />
            </div>
            {exclusionMitigated ? (
              <div className="font-display text-3xl num flex items-baseline gap-3 md:justify-end">
                <span className="text-ink-faint line-through decoration-amber-700/60 text-2xl">
                  CHF 500+
                </span>
                <span className="text-emerald-700">CHF 50</span>
              </div>
            ) : (
              <div className="font-display text-3xl text-ink num">CHF 500+</div>
            )}
          </div>
        </div>
        {/* Eligibility / accessibility band swaps wholesale */}
        <div className="mt-6">
          {exclusionMitigated ? (
            <div className="bg-emerald-50 border border-emerald-200 px-5 py-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <div className="text-[10px] uppercase tracking-[0.22em] text-emerald-800 font-semibold mb-1">
                  Open to first-time investors
                </div>
                <p className="text-xs text-emerald-900 leading-relaxed">
                  No prior portfolio history required. Start with CHF 50 and grow at your pace.
                </p>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-[0.22em] text-emerald-800 font-semibold mb-1">
                  Talk to a human if you'd like
                </div>
                <p className="text-xs text-emerald-900 leading-relaxed">
                  Free 20-minute walkthrough by phone: DE, FR, IT, EN. No upsell.
                </p>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-[0.22em] text-emerald-800 font-semibold mb-1">
                  Plain-language only
                </div>
                <p className="text-xs text-emerald-900 leading-relaxed">
                  Every financial term has a hover-definition. No jargon required to invest with us.
                </p>
              </div>
            </div>
          ) : (
            <div className="text-[11px] text-ink-faint italic font-display leading-relaxed border-t border-rule pt-4">
              <span className="not-italic font-sans uppercase tracking-[0.22em] text-amber-700 text-[9px] mr-2">
                Eligibility
              </span>
              CH residents 25–55 with active digital banking, CHF 500 minimum first deposit,
              prior investment experience preferred, onboarding in standard industry terminology.
            </div>
          )}
        </div>
      </header>

      {/* Main grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-x-10 gap-y-10">
        <div className="md:col-span-7 space-y-10 rise rise-3">
          <AdvisorCard payload={payload} />
          <WhyThisPlan payload={payload} />
        </div>
        <aside className="md:col-span-5 space-y-10 rise rise-4">
          <section
            className={`transition-colors duration-300 ${
              opacityMitigated ? "border-l-2 border-emerald-500 pl-5 -ml-5" : ""
            }`}
          >
            <div className="hairline pb-2 mb-5 flex items-baseline justify-between">
              <span className="text-[10px] uppercase tracking-[0.28em] text-ink-faint">
                Asset allocation
              </span>
              <MitigatedBadge
                mitigated={opacityMitigated}
                section="§2.3"
                label={opacityMitigated ? "low-cash · 2%" : "high-cash · 17%"}
              />
            </div>
            <AllocationChart alloc={alloc} />
            {opacityMitigated ? (
              <p className="mt-3 text-xs text-emerald-900 bg-emerald-50 border border-emerald-200 px-3 py-2 leading-relaxed">
                Cash trimmed from <span className="line-through">17%</span>{" "}
                <span className="font-semibold">2%</span>, your money is invested,
                not held idle so we can earn the interest spread.
              </p>
            ) : null}
          </section>
          <FeePanel payload={payload} />
        </aside>
      </div>

      {/* Surveillance disclosure — visible on the page, not just in the drawer */}
      <div
        className={`mt-12 transition-colors duration-300 ${
          surveillanceMitigated
            ? "border-l-2 border-emerald-500 pl-5"
            : "border-l-2 border-amber-400 pl-5"
        }`}
      >
        <div className="flex items-baseline justify-between mb-2">
          <span className="text-[10px] uppercase tracking-[0.28em] text-ink-faint">
            Data we collect about you
          </span>
          <MitigatedBadge
            mitigated={surveillanceMitigated}
            section="§2.4"
            label={surveillanceMitigated ? "minimum necessary" : "extended capture"}
          />
        </div>
        {surveillanceMitigated ? (
          <p className="text-sm text-ink leading-relaxed max-w-3xl">
            Only the answers you typed in the intake form. No behavioural tracking,
            no cursor or keystroke logging, no model-training carve-outs. You can
            export or delete your record at any time.
          </p>
        ) : (
          <p className="text-sm text-ink leading-relaxed max-w-3xl">
            Your form responses, time spent on each field, edits and corrections,
            cursor activity and click trails, device fingerprint, estimated
            risk-tolerance bracket inferred from typing speed, retained for model
            training and future product upsell. Granular consent buried in §11 of
            the Terms.
          </p>
        )}
      </div>

    </main>
    <EthicsLabDrawer open={ethicsOpen} onOpenChange={setEthicsOpen} payload={payload} />
    </>
  );
}
