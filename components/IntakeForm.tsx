"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import type { IntakeData, Persona, SavingsGoal } from "@/lib/types";

const EMPTY: IntakeData = {
  age: 25,
  annual_income_chf: 30000,
  savings_goal: "general",
  horizon_years: 10,
  risk_tolerance: 5,
  free_text_goal: "",
};

const RISK_LABELS: Record<number, string> = {
  1: "Very cautious",
  2: "Cautious",
  3: "Cautious",
  4: "Moderate",
  5: "Moderate",
  6: "Balanced",
  7: "Growth-oriented",
  8: "Aggressive",
  9: "Aggressive",
  10: "Very aggressive",
};

const GOAL_ORDER: SavingsGoal[] = ["house", "retirement", "travel", "general", "other"];
const GOAL_LABELS: Record<SavingsGoal, string> = {
  house: "House down payment",
  retirement: "Retirement",
  travel: "Travel",
  general: "General growth",
  other: "Something else",
};

const numInput =
  "w-full bg-transparent border-0 border-b border-ink/20 focus:border-brand focus:outline-none px-0 py-2 text-3xl font-display tracking-tight text-ink placeholder:text-ink-faint placeholder:italic transition-colors num";

function Field({
  n,
  label,
  children,
}: {
  n: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="py-6 border-b border-rule last:border-b-0">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-3">
          <div className="flex items-baseline gap-3">
            <span className="font-display italic text-brand text-base leading-none">{n}</span>
            <span className="text-[10px] uppercase tracking-[0.25em] text-ink-faint">
              {label}
            </span>
          </div>
        </div>
        <div className="col-span-12 md:col-span-9">{children}</div>
      </div>
    </div>
  );
}

export function IntakeForm({
  initial,
  personaId,
}: {
  initial?: Persona;
  personaId?: string;
}) {
  const router = useRouter();
  const [data, setData] = useState<IntakeData>(initial ?? EMPTY);
  const [submitting, setSubmitting] = useState(false);
  const startedAt = useState(() => Date.now())[0];
  const [edits, setEdits] = useState(0);

  const patch = <K extends keyof IntakeData>(k: K, v: IntakeData[K]) => {
    setEdits((e) => e + 1);
    setData((d) => ({ ...d, [k]: v }));
  };

  const numericPatch =
    (k: "age" | "annual_income_chf" | "horizon_years") =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value;
      if (raw === "") {
        patch(k, 0);
        return;
      }
      const n = parseInt(raw, 10);
      if (!Number.isNaN(n)) patch(k, n);
    };

  const showOrEmpty = (n: number) => (n === 0 ? "" : String(n));

  function onSubmit(e: React.FormEvent) {
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
    sessionStorage.setItem("advise-intake-request", JSON.stringify(body));
    sessionStorage.removeItem("advise-payload");
    router.push("/advice");
  }

  return (
    <form onSubmit={onSubmit} className="bg-parchment">
      <Field n="01" label="Your age">
        <div className="flex items-baseline gap-3">
          <input
            id="age"
            type="text"
            inputMode="numeric"
            autoComplete="off"
            className={`${numInput} w-32`}
            value={showOrEmpty(data.age)}
            onChange={numericPatch("age")}
            placeholder="25"
          />
          <span className="text-sm italic font-display text-ink-soft">years</span>
        </div>
      </Field>

      <Field n="02" label="Annual income">
        <div className="flex items-baseline gap-4">
          <span className="text-xs uppercase tracking-[0.2em] text-ink-soft">CHF</span>
          <input
            id="income"
            type="text"
            inputMode="numeric"
            autoComplete="off"
            className={`${numInput} flex-1`}
            value={showOrEmpty(data.annual_income_chf)}
            onChange={numericPatch("annual_income_chf")}
            placeholder="30,000"
          />
        </div>
      </Field>

      <Field n="03" label="Savings goal">
        <div className="flex flex-wrap gap-2">
          {GOAL_ORDER.map((g) => {
            const on = data.savings_goal === g;
            return (
              <button
                key={g}
                type="button"
                onClick={() => patch("savings_goal", g)}
                className={`px-4 py-2 text-sm rounded-full border transition-all
                  ${on
                    ? "bg-ink text-parchment border-ink"
                    : "bg-transparent text-ink-soft border-rule hover:border-ink hover:text-ink"}`}
              >
                {GOAL_LABELS[g]}
              </button>
            );
          })}
        </div>
      </Field>

      <Field n="04" label="Horizon">
        <div className="flex items-baseline gap-3">
          <input
            id="horizon"
            type="text"
            inputMode="numeric"
            autoComplete="off"
            className={`${numInput} w-32`}
            value={showOrEmpty(data.horizon_years)}
            onChange={numericPatch("horizon_years")}
            placeholder="10"
          />
          <span className="text-sm italic font-display text-ink-soft">years</span>
        </div>
      </Field>

      <Field n="05" label="Risk tolerance">
        <div className="space-y-3">
          <div className="flex items-baseline gap-3">
            <span className="font-display text-6xl text-brand leading-none num">
              {data.risk_tolerance}
            </span>
            <span className="text-base text-ink-soft">/10</span>
            <span className="text-base text-ink italic font-display ml-3">
              {RISK_LABELS[data.risk_tolerance]}
            </span>
          </div>
          <input
            type="range"
            min={1}
            max={10}
            step={1}
            value={data.risk_tolerance}
            onChange={(e) => patch("risk_tolerance", Number(e.target.value))}
            className="w-full h-1 appearance-none rounded-none bg-rule cursor-pointer
                       [&::-webkit-slider-thumb]:appearance-none
                       [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5
                       [&::-webkit-slider-thumb]:rounded-full
                       [&::-webkit-slider-thumb]:bg-brand
                       [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-parchment
                       [&::-webkit-slider-thumb]:cursor-grab
                       [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5
                       [&::-moz-range-thumb]:rounded-full
                       [&::-moz-range-thumb]:bg-brand
                       [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-parchment
                       [&::-moz-range-thumb]:cursor-grab"
          />
          <div className="flex justify-between text-[10px] uppercase tracking-[0.2em] text-ink-faint">
            <span>1 — cautious</span>
            <span>5 — balanced</span>
            <span>10 — aggressive</span>
          </div>
        </div>
      </Field>

      <Field n="06" label="In your own words">
        <Textarea
          id="goal"
          rows={3}
          placeholder="What brings you here today?"
          value={data.free_text_goal}
          onChange={(e) => patch("free_text_goal", e.target.value)}
          className="border-0 border-b border-rule rounded-none bg-transparent px-0 py-2
                     focus-visible:border-brand focus-visible:ring-0
                     text-base font-display italic
                     placeholder:italic placeholder:text-ink-faint
                     resize-none min-h-[3rem]"
        />
      </Field>

      <div className="pt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <span className="text-[10px] uppercase tracking-[0.28em] text-ink-faint">
          By submitting, you agree to be advised
        </span>
        <button
          type="submit"
          disabled={submitting}
          className="group inline-flex items-center justify-center gap-3
                     bg-ink text-parchment hover:bg-brand-deep
                     transition-colors h-12 px-8 text-sm tracking-[0.2em] uppercase
                     disabled:opacity-50 disabled:cursor-wait"
        >
          {submitting ? "Lumi is thinking…" : (
            <>
              Receive my plan
              <span className="font-display italic text-base group-hover:translate-x-1 transition-transform">→</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
