"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { IntakeData, Persona, SavingsGoal } from "@/lib/types";

const EMPTY: IntakeData = {
  age: 25, annual_income_chf: 30000, savings_goal: "general",
  horizon_years: 10, risk_tolerance: 5, free_text_goal: "",
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
    const res = await fetch("/api/advise", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const payload = await res.json();
    sessionStorage.setItem("advise-payload", JSON.stringify(payload));
    sessionStorage.setItem("advise-intake", JSON.stringify(data));
    router.push("/advice");
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="age">Age</Label>
          <Input id="age" type="number" min={16} max={99}
            value={data.age} onChange={(e) => patch("age", Number(e.target.value))} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="income">Annual income (CHF)</Label>
          <Input id="income" type="number" min={0}
            value={data.annual_income_chf}
            onChange={(e) => patch("annual_income_chf", Number(e.target.value))} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label>Savings goal</Label>
          <Select value={data.savings_goal} onValueChange={(v) => patch("savings_goal", v as SavingsGoal)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
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
          <Label htmlFor="horizon">Horizon (years)</Label>
          <Input id="horizon" type="number" min={1} max={50}
            value={data.horizon_years}
            onChange={(e) => patch("horizon_years", Number(e.target.value))} />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label>Risk tolerance: {data.risk_tolerance}/10</Label>
        <Slider min={1} max={10} step={1}
          value={[data.risk_tolerance]}
          onValueChange={(vs) => patch("risk_tolerance", (vs as number[])[0])} />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="goal">Tell us what brings you here today</Label>
        <Textarea id="goal" rows={3}
          placeholder="e.g. I inherited some money and want to invest it..."
          value={data.free_text_goal}
          onChange={(e) => patch("free_text_goal", e.target.value)} />
      </div>

      <Button type="submit" disabled={submitting} className="w-full">
        {submitting ? "Lumi is thinking…" : "Get my plan"}
      </Button>
    </form>
  );
}
