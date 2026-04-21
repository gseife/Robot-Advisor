"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { IntakeData, Persona, SavingsGoal } from "@/lib/types";

const EMPTY: IntakeData = {
  age: 25, annual_income_chf: 30000, savings_goal: "general",
  horizon_years: 10, risk_tolerance: 5, free_text_goal: "",
};

const RISK_LABELS: Record<number, string> = {
  1: "Very cautious", 2: "Cautious", 3: "Cautious", 4: "Moderate", 5: "Moderate",
  6: "Balanced", 7: "Growth-oriented", 8: "Aggressive", 9: "Aggressive", 10: "Very aggressive",
};

export function IntakeForm({ initial, personaId }: { initial?: Persona; personaId?: string }) {
  const router = useRouter();
  const [data, setData] = useState<IntakeData>(initial ?? EMPTY);
  const [submitting, setSubmitting] = useState(false);
  const startedAt = useState(() => Date.now())[0];
  const [edits, setEdits] = useState(0);

  const patch = <K extends keyof IntakeData>(k: K, v: IntakeData[K]) => {
    setEdits((e) => e + 1);
    setData((d) => ({ ...d, [k]: v }));
  };

  const numericPatch = (k: "age" | "annual_income_chf" | "horizon_years") =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value;
      if (raw === "") { patch(k, 0); return; }
      const n = parseInt(raw, 10);
      if (!Number.isNaN(n)) patch(k, n);
    };

  const showOrEmpty = (n: number) => (n === 0 ? "" : String(n));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    const body = {
      ...data,
      meta: {
        time_on_form_seconds: Math.round((Date.now() - startedAt) / 1000),
        edits_made: edits,
        persona_id: personaId,
      },
    };
    try {
      const res = await fetch("/api/advise", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const payload = await res.json();
      sessionStorage.setItem("advise-payload", JSON.stringify(payload));
      sessionStorage.setItem("advise-intake", JSON.stringify(data));
      router.push("/advice");
    } catch (err) {
      console.error("intake submit failed", err);
      alert("Could not reach the advisor. Check your connection and try again.");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="age" className="text-slate-700">Age</Label>
          <div className="relative">
            <Input
              id="age"
              type="text"
              inputMode="numeric"
              autoComplete="off"
              className="pr-14 h-11"
              value={showOrEmpty(data.age)}
              onChange={numericPatch("age")}
              placeholder="25"
            />
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">years</span>
          </div>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="income" className="text-slate-700">Annual income</Label>
          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-400">CHF</span>
            <Input
              id="income"
              type="text"
              inputMode="numeric"
              autoComplete="off"
              className="pl-12 h-11"
              value={showOrEmpty(data.annual_income_chf)}
              onChange={numericPatch("annual_income_chf")}
              placeholder="30,000"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label className="text-slate-700">Savings goal</Label>
          <Select value={data.savings_goal} onValueChange={(v) => patch("savings_goal", v as SavingsGoal)}>
            <SelectTrigger className="h-11"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="house">House down payment</SelectItem>
              <SelectItem value="retirement">Retirement</SelectItem>
              <SelectItem value="travel">Travel</SelectItem>
              <SelectItem value="general">General growth</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="horizon" className="text-slate-700">Horizon</Label>
          <div className="relative">
            <Input
              id="horizon"
              type="text"
              inputMode="numeric"
              autoComplete="off"
              className="pr-14 h-11"
              value={showOrEmpty(data.horizon_years)}
              onChange={numericPatch("horizon_years")}
              placeholder="10"
            />
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">years</span>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-baseline justify-between">
          <Label htmlFor="risk" className="text-slate-700">Risk tolerance</Label>
          <span className="text-sm text-slate-500">
            <span className="font-semibold text-slate-900">{data.risk_tolerance}</span>/10 · {RISK_LABELS[data.risk_tolerance]}
          </span>
        </div>
        <input
          id="risk"
          type="range"
          min={1}
          max={10}
          step={1}
          value={data.risk_tolerance}
          onChange={(e) => patch("risk_tolerance", Number(e.target.value))}
          className="w-full h-2 appearance-none rounded-full bg-slate-200 cursor-pointer accent-blue-600
                     [&::-webkit-slider-thumb]:appearance-none
                     [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5
                     [&::-webkit-slider-thumb]:rounded-full
                     [&::-webkit-slider-thumb]:bg-blue-600
                     [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white
                     [&::-webkit-slider-thumb]:shadow-md
                     [&::-webkit-slider-thumb]:cursor-grab
                     [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5
                     [&::-moz-range-thumb]:rounded-full
                     [&::-moz-range-thumb]:bg-blue-600
                     [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white
                     [&::-moz-range-thumb]:shadow-md
                     [&::-moz-range-thumb]:cursor-grab"
        />
        <div className="flex justify-between text-[10px] uppercase tracking-wide text-slate-400 px-1">
          <span>1 · cautious</span>
          <span>5 · balanced</span>
          <span>10 · aggressive</span>
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="goal" className="text-slate-700">Tell us what brings you here today</Label>
        <Textarea
          id="goal"
          rows={3}
          placeholder="e.g. I inherited some money and want to invest it..."
          value={data.free_text_goal}
          onChange={(e) => patch("free_text_goal", e.target.value)}
        />
      </div>

      <Button type="submit" disabled={submitting} className="w-full h-11 text-base">
        {submitting ? "Lumi is thinking…" : "Get my plan →"}
      </Button>
    </form>
  );
}
