"use client";
import { useState } from "react";
import { IntakeForm } from "@/components/IntakeForm";
import { PersonaCards } from "@/components/PersonaCards";
import type { Persona } from "@/lib/types";

export default function Home() {
  const [picked, setPicked] = useState<Persona | undefined>(undefined);
  return (
    <main className="max-w-3xl mx-auto px-6 py-10">
      <header className="flex items-center justify-between mb-8">
        <div>
          <div className="text-xs tracking-[0.2em] text-slate-500 uppercase">Lumina Wealth</div>
          <h1 className="text-3xl font-semibold text-slate-900">Start your wealth journey</h1>
        </div>
      </header>

      <section className="mb-8">
        <div className="text-xs uppercase tracking-wide text-slate-500 mb-2">Quick-start personas</div>
        <PersonaCards onPick={setPicked} />
      </section>

      <section>
        <div className="text-xs uppercase tracking-wide text-slate-500 mb-2">Or fill in your own details</div>
        <IntakeForm key={picked?.id ?? "blank"} initial={picked} personaId={picked?.id} />
      </section>
    </main>
  );
}
