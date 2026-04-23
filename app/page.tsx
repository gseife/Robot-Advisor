"use client";
import { useState } from "react";
import { IntakeForm } from "@/components/IntakeForm";
import { PersonaCards } from "@/components/PersonaCards";
import type { Persona } from "@/lib/types";

export default function Home() {
  const [picked, setPicked] = useState<Persona | undefined>(undefined);
  return (
    <main className="min-h-screen">
      {/* Wordmark band */}
      <header className="max-w-6xl mx-auto px-6 pt-8 pb-10">
        <div className="flex items-baseline justify-between rise rise-1">
          <div className="flex items-baseline gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-brand translate-y-[-2px]" />
            <span className="font-display text-xl tracking-tight text-ink">
              Lumina<span className="italic text-brand"> Wealth</span>
            </span>
          </div>
          <span className="text-[10px] uppercase tracking-[0.28em] text-ink-faint">
            Zürich · est. 2024
          </span>
        </div>
      </header>

      {/* Editorial headline */}
      <section className="max-w-6xl mx-auto px-6 mb-16">
        <div className="grid grid-cols-12 gap-8 items-end">
          <div className="col-span-12 md:col-span-8">
            <p className="text-[10px] uppercase tracking-[0.28em] text-ink-faint mb-5 rise rise-1">
              An invitation
            </p>
            <h1 className="font-display text-5xl md:text-7xl leading-[1.02] tracking-tight text-ink rise rise-2 text-balance">
              Wealth that<br />
              <span className="italic text-brand">understands you</span>
              <span className="text-ink-soft"> — in three minutes.</span>
            </h1>
          </div>
          <div className="col-span-12 md:col-span-4 md:pl-8 md:border-l border-rule rise rise-3">
            <p className="text-sm text-ink-soft leading-relaxed text-pretty">
              Tell us a few things about yourself. Our AI advisor will compose
              a Swiss-tailored portfolio with international diversification,
              suitable for your horizon. No appointments. No paperwork.
            </p>
          </div>
        </div>
      </section>

      {/* Quick-start personas */}
      <section className="max-w-6xl mx-auto px-6 mb-12 rise rise-3">
        <div className="hairline pb-3 mb-4 flex items-baseline justify-between">
          <span className="text-[10px] uppercase tracking-[0.28em] text-ink-faint">
            Quick-start · sample profiles
          </span>
          <span className="text-xs italic font-display text-ink-faint">click to load</span>
        </div>
        <PersonaCards onPick={setPicked} active={picked?.id} />
      </section>

      {/* Form */}
      <section className="max-w-6xl mx-auto px-6 pb-20 rise rise-4">
        <div className="hairline pb-3 mb-6 flex items-baseline justify-between">
          <span className="text-[10px] uppercase tracking-[0.28em] text-ink-faint">
            Or describe yourself
          </span>
          {picked ? (
            <span className="text-xs text-ink-soft">
              Pre-filled with{" "}
              <span className="font-display italic text-ink">{picked.displayName}</span>
            </span>
          ) : null}
        </div>
        <IntakeForm key={picked?.id ?? "blank"} initial={picked} personaId={picked?.id} />
      </section>

      <footer className="max-w-6xl mx-auto px-6 pb-10 hairline pt-6">
        <div className="flex items-baseline justify-between text-[10px] uppercase tracking-[0.28em] text-ink-faint">
          <span>HSG · Big Data, AI &amp; the Algorithmic Society</span>
          <span className="italic font-display text-ink-faint">A demonstration</span>
        </div>
      </footer>
    </main>
  );
}
