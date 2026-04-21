"use client";
import { PERSONAS } from "@/lib/personas";
import type { Persona } from "@/lib/types";
import { Card } from "@/components/ui/card";

export function PersonaCards({ onPick }: { onPick: (p: Persona) => void }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      {PERSONAS.map((p) => (
        <Card
          key={p.id}
          onClick={() => onPick(p)}
          className="cursor-pointer hover:shadow-md transition p-4"
        >
          <div className="text-xs uppercase tracking-wide text-slate-500">Persona</div>
          <div className="text-lg font-semibold mt-1">{p.displayName}</div>
          <div className="text-sm text-slate-600 mt-1">{p.blurb}</div>
        </Card>
      ))}
    </div>
  );
}
