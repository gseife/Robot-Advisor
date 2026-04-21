"use client";
import { useEffect, useState } from "react";

const FACTS: string[] = [
  "The global robo-advisory market reached $1.97 trillion in assets under management in 2025.",
  "Deloitte projects GenAI-powered advice will expand from ~0% in 2023 to 78% of the advisory landscape by 2028.",
  "High-net-worth investors hold 55.3% of robo-advisor assets — the platform built for the many mostly serves the few.",
  "Pensioners appear in only 6.67% of the academic literature on robo-advisory — the most vulnerable are a blind spot.",
  "In 2022, the SEC fined Schwab $187M for undisclosed cash-allocation conflicts in its robo-advisor.",
  "Goldman Sachs, JPMorgan, UBS, and Ellevest have all exited the robo-advisory market since 2022.",
  "The EU AI Act classifies algorithmic financial advice as high-risk AI — requiring explainability and audits.",
  "Akhtar et al. (2025): 'algorithmic neutrality does not ensure equity.'",
  "Zuboff (2015): a robo-advisor is a behavioural data-extraction system that happens to manage portfolios.",
  "Vanguard Digital Advisor holds $311B and charges 0.20% — the largest robo-advisor by assets.",
  "Generation 1 (2008): rule-based MPT. Generation 3 (today): LLM-driven conversational advice.",
  "The more an advisor automates, the less pressure users feel to understand their own portfolio — 'informed passivity'.",
];

const STAGES: string[] = [
  "Analysing your profile…",
  "Matching allocation model…",
  "Consulting the LLM advisor…",
  "Formatting your plan…",
];

export function LoadingFacts() {
  const [factIdx, setFactIdx] = useState(() => Math.floor(Math.random() * FACTS.length));
  const [stageIdx, setStageIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const factTimer = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setFactIdx((i) => (i + 1) % FACTS.length);
        setVisible(true);
      }, 250);
    }, 3800);
    return () => clearInterval(factTimer);
  }, []);

  useEffect(() => {
    const stageTimer = setInterval(() => {
      setStageIdx((i) => Math.min(i + 1, STAGES.length - 1));
    }, 1400);
    return () => clearInterval(stageTimer);
  }, []);

  return (
    <main className="min-h-[70vh] flex items-center justify-center px-6">
      <div className="max-w-xl w-full text-center">
        <div className="mb-6 inline-flex flex-col items-center gap-3">
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 rounded-full border-2 border-slate-200" />
            <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-blue-600 animate-spin" />
          </div>
          <div className="text-xs uppercase tracking-[0.2em] text-slate-500">{STAGES[stageIdx]}</div>
        </div>

        <div className="mt-8 rounded-xl border border-slate-200 bg-white px-6 py-5 shadow-sm">
          <div className="text-[10px] uppercase tracking-wider text-slate-400 mb-2">Did you know?</div>
          <p
            className={`text-sm leading-relaxed text-slate-800 transition-opacity duration-200 ${visible ? "opacity-100" : "opacity-0"}`}
          >
            {FACTS[factIdx]}
          </p>
        </div>

        <div className="mt-6 flex items-center justify-center gap-1.5">
          {STAGES.map((_, i) => (
            <div
              key={i}
              className={`h-1 rounded-full transition-all duration-300 ${i <= stageIdx ? "bg-blue-600 w-8" : "bg-slate-200 w-4"}`}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
