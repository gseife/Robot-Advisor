"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AdvisorCard } from "@/components/AdvisorCard";
import { AllocationChart } from "@/components/AllocationChart";
import { WhyThisPlan } from "@/components/WhyThisPlan";
import { FeePanel } from "@/components/FeePanel";
import { EthicsLabDrawer } from "@/components/EthicsLabDrawer";
import { LoadingFacts } from "@/components/LoadingFacts";
import { useToggles } from "@/lib/toggle-context";
import type { AdvisePayload } from "@/lib/types";

export default function AdvicePage() {
  const router = useRouter();
  const { toggles, reset } = useToggles();
  const [payload, setPayload] = useState<AdvisePayload | null>(null);
  const [ethicsOpen, setEthicsOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cached = sessionStorage.getItem("advise-payload");
    if (cached) { setPayload(JSON.parse(cached)); return; }
    const reqRaw = sessionStorage.getItem("advise-intake-request");
    if (!reqRaw) { router.replace("/"); return; }
    let cancelled = false;
    fetch("/api/advise", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: reqRaw,
    })
      .then((r) => r.json())
      .then((p) => {
        if (cancelled) return;
        sessionStorage.setItem("advise-payload", JSON.stringify(p));
        setPayload(p);
      })
      .catch((err) => {
        if (cancelled) return;
        console.error("advice fetch failed", err);
        setError("Could not reach the advisor.");
      });
    return () => { cancelled = true; };
  }, [router]);

  function handleBack() {
    reset();
    sessionStorage.removeItem("advise-payload");
    sessionStorage.removeItem("advise-intake-request");
    router.push("/");
  }

  if (error) {
    return (
      <main className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-md text-center">
          <div className="font-display italic text-3xl text-brand mb-4">{error}</div>
          <button
            onClick={handleBack}
            className="text-[10px] uppercase tracking-[0.28em] text-ink-soft hover:text-brand transition"
          >
            ← Try again
          </button>
        </div>
      </main>
    );
  }

  if (!payload) return <LoadingFacts />;

  const alloc = toggles.opacity ? payload.allocations.biased : payload.allocations.mitigated;
  const minDeposit = toggles.exclusion ? "CHF 500+" : "CHF 50";

  return (
    <main className="max-w-6xl mx-auto px-6 py-8">
      {/* Top utility band */}
      <div className="flex items-center justify-between mb-6 rise rise-1">
        <button
          onClick={handleBack}
          className="text-[10px] uppercase tracking-[0.28em] text-ink-faint hover:text-brand transition"
        >
          ← Try another profile
        </button>
        <div className="flex items-baseline gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-brand translate-y-[-2px]" />
          <span className="font-display text-base text-ink">
            Lumina<span className="italic text-brand"> Wealth</span>
          </span>
        </div>
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
          <div className="col-span-12 md:col-span-4 md:text-right">
            <div className="text-[10px] uppercase tracking-[0.28em] text-ink-faint mb-1">
              Minimum deposit
            </div>
            <div className="font-display text-3xl text-ink num">{minDeposit}</div>
          </div>
        </div>
      </header>

      {/* Main grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-x-10 gap-y-10">
        <div className="md:col-span-7 space-y-10 rise rise-3">
          <AdvisorCard payload={payload} />
          <WhyThisPlan payload={payload} />
        </div>
        <aside className="md:col-span-5 space-y-10 rise rise-4">
          <section>
            <div className="hairline pb-2 mb-5 flex items-baseline justify-between">
              <span className="text-[10px] uppercase tracking-[0.28em] text-ink-faint">
                Asset allocation
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] italic font-display text-ink-faint">
                Swiss-tailored
              </span>
            </div>
            <AllocationChart alloc={alloc} />
          </section>
          <FeePanel payload={payload} />
        </aside>
      </div>

      <EthicsLabDrawer open={ethicsOpen} onOpenChange={setEthicsOpen} payload={payload} />
    </main>
  );
}
