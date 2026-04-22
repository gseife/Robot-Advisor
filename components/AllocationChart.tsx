"use client";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import type { Allocation } from "@/lib/types";

const COLORS = ["#dc2626", "#2a63d6", "#0d9488", "#64748b", "#c9d4e5"];

export function AllocationChart({ alloc }: { alloc: Allocation }) {
  const data = [
    { name: "Swiss equity", value: alloc.swiss_equity },
    { name: "Intl developed", value: alloc.intl_equity },
    { name: "Emerging markets", value: alloc.emerging_equity },
    { name: "Bonds (CHF)", value: alloc.bonds },
    { name: "Cash (CHF)", value: alloc.cash },
  ];
  const pct = (v: number) => `${Math.round(v * 1000) / 10}%`;
  return (
    <div className="w-full">
      <div className="h-48">
        <ResponsiveContainer>
          <PieChart>
            <Pie data={data} dataKey="value" innerRadius={48} outerRadius={78} paddingAngle={2}>
              {data.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
            </Pie>
            <Tooltip formatter={(v) => pct(v as number)} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="flex flex-wrap gap-3 text-xs text-slate-600 justify-center mt-2">
        {data.map((d, i) => (
          <span key={d.name} className="inline-flex items-center gap-1.5">
            <span className="inline-block w-2.5 h-2.5 rounded-sm" style={{ background: COLORS[i] }} />
            {d.name} {pct(d.value)}
          </span>
        ))}
      </div>
    </div>
  );
}
