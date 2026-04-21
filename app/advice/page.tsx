"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
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
    if (cached) {
      setPayload(JSON.parse(cached));
      return;
    }
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
      <main className="min-h-[70vh] flex items-center justify-center px-6">
        <div className="max-w-md text-center">
          <div className="text-rose-600 text-sm font-medium">{error}</div>
          <Button variant="outline" className="mt-4" onClick={handleBack}>← Try again</Button>
        </div>
      </main>
    );
  }

  if (!payload) return <LoadingFacts />;

  const alloc = toggles.opacity ? payload.allocations.biased : payload.allocations.mitigated;
  const minDeposit = toggles.exclusion ? "CHF 500+" : "CHF 50";

  return (
    <main className="max-w-6xl mx-auto px-6 py-8">
      <header className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={handleBack}>← Try another</Button>
          <div>
            <div className="text-xs tracking-[0.2em] text-slate-500 uppercase">Lumina Wealth</div>
            <h1 className="text-2xl font-semibold">Your plan</h1>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <span className="text-xs text-slate-500">Min. deposit {minDeposit}</span>
          <Button variant="outline" onClick={() => setEthicsOpen(true)}>🔬 Ethics Lab</Button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="md:col-span-3 space-y-4">
          <AdvisorCard payload={payload} />
          <WhyThisPlan payload={payload} />
        </div>
        <div className="md:col-span-2 space-y-4">
          <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200">
            <div className="text-sm font-medium text-slate-900 mb-3">Your allocation</div>
            <AllocationChart alloc={alloc} />
          </div>
          <FeePanel payload={payload} />
        </div>
      </div>

      <EthicsLabDrawer open={ethicsOpen} onOpenChange={setEthicsOpen} payload={payload} />
    </main>
  );
}
