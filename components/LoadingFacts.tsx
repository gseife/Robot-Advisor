"use client";
import { useEffect, useState } from "react";
import { LuminaLogo } from "./LuminaLogo";

const FACTS: string[] = [
  "The global robo-advisory market reached $1.97 trillion in assets under management in 2025.",
  "Deloitte projects GenAI-powered advice will expand from ~0% in 2023 to 78% of the advisory landscape by 2028.",
  "High-net-worth investors hold 55.3% of robo-advisor assets, the platform built for the many mostly serves the few.",
  "Pensioners appear in only 6.67% of the academic literature on robo-advisory, the most vulnerable are a blind spot.",
  "In 2022, the SEC fined Schwab $187M for undisclosed cash-allocation conflicts in its robo-advisor.",
  "Goldman Sachs, JPMorgan, UBS, and Ellevest have all exited the robo-advisory market since 2022.",
  "The EU AI Act classifies algorithmic financial advice as high-risk AI, requiring explainability and audits.",
  "Akhtar et al. (2025): 'algorithmic neutrality does not ensure equity.'",
  "Zuboff (2015): a robo-advisor is a behavioural data-extraction system that happens to manage portfolios.",
  "Vanguard Digital Advisor holds $311B and charges 0.20%, the largest robo-advisor by assets.",
  "Generation 1 (2008): rule-based MPT. Generation 3 (today): LLM-driven conversational advice.",
  "The more an advisor automates, the less pressure users feel to understand their own portfolio, 'informed passivity'.",
];

const STAGES: string[] = [
  "Reading your profile",
  "Composing the allocation",
  "Consulting the advisor",
  "Engraving your plan",
];

export function LoadingFacts() {
  // Deterministic initial so server HTML matches client hydration.
  // Randomised on mount (client-only) before the first rotation.
  const [factIdx, setFactIdx] = useState(0);
  const [stageIdx, setStageIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setFactIdx(Math.floor(Math.random() * FACTS.length));
    const t = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setFactIdx((i) => (i + 1) % FACTS.length);
        setVisible(true);
      }, 320);
    }, 4500);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      setStageIdx((i) => Math.min(i + 1, STAGES.length - 1));
    }, 1500);
    return () => clearInterval(t);
  }, []);

  return (
    <main className="min-h-screen flex items-center px-6">
      <div className="max-w-4xl w-full mx-auto">
        <div className="hairline pb-3 mb-10 flex items-end justify-between rise rise-1">
          <LuminaLogo size="sm" />
          <span className="text-[10px] uppercase tracking-[0.28em] text-ink-faint num pb-1">
            {String(stageIdx + 1).padStart(2, "0")} / {String(STAGES.length).padStart(2, "0")}
          </span>
        </div>

        <div className="rise rise-2">
          <span className="text-[10px] uppercase tracking-[0.28em] text-ink-faint">
            Currently
          </span>
          <h2 className="font-display text-4xl md:text-6xl italic text-brand mt-2 leading-[1.05] tracking-tight">
            {STAGES[stageIdx]}…
          </h2>
        </div>

        {/* Hairline progress */}
        <div className="mt-10 grid grid-cols-4 gap-1 rise rise-3">
          {STAGES.map((_, i) => (
            <div
              key={i}
              className={`transition-all duration-500
                ${i <= stageIdx ? "h-[2px] bg-brand" : "h-px bg-rule"}`}
            />
          ))}
        </div>

        {/* Did you know */}
        <div className="mt-20 rise rise-4">
          <div className="hairline pb-3 mb-6 flex items-baseline justify-between">
            <span className="text-[10px] uppercase tracking-[0.28em] text-ink-faint">
              While you wait, from the case study
            </span>
            <span className="text-[10px] uppercase tracking-[0.28em] text-ink-faint italic font-display">
              No. {String(factIdx + 1).padStart(2, "0")}
            </span>
          </div>
          <p
            className={`font-display text-2xl md:text-3xl text-ink leading-snug text-balance
                        transition-opacity duration-300 min-h-[6rem]
                        ${visible ? "opacity-100" : "opacity-0"}`}
          >
            <span className="text-brand italic mr-1">"</span>
            {FACTS[factIdx]}
            <span className="text-brand italic ml-0.5">"</span>
          </p>
        </div>
      </div>
    </main>
  );
}
