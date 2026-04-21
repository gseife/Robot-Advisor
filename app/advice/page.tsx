"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { AdvisorCard } from "@/components/AdvisorCard";
import { AllocationChart } from "@/components/AllocationChart";
import { WhyThisPlan } from "@/components/WhyThisPlan";
import { FeePanel } from "@/components/FeePanel";
import { EthicsLabDrawer } from "@/components/EthicsLabDrawer";
import { useToggles } from "@/lib/toggle-context";
import type { AdvisePayload } from "@/lib/types";

export default function AdvicePage() {
  const router = useRouter();
  const { toggles } = useToggles();
  const [payload, setPayload] = useState<AdvisePayload | null>(null);
  const [ethicsOpen, setEthicsOpen] = useState(false);

  useEffect(() => {
    const raw = sessionStorage.getItem("advise-payload");
    if (!raw) { router.replace("/"); return; }
    setPayload(JSON.parse(raw));
  }, [router]);

  if (!payload) return <main className="p-10 text-center text-slate-500">Loading…</main>;

  const alloc = toggles.opacity ? payload.allocations.biased : payload.allocations.mitigated;
  const minDeposit = toggles.exclusion ? "CHF 500+" : "CHF 50";

  return (
    <main className="max-w-6xl mx-auto px-6 py-8">
      <header className="flex items-center justify-between mb-6">
        <div>
          <div className="text-xs tracking-[0.2em] text-slate-500 uppercase">Lumina Wealth</div>
          <h1 className="text-2xl font-semibold">Your plan</h1>
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
