"use client";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import type { Allocation } from "@/lib/types";

const COLORS = ["#a8211a", "#1f3a52", "#1f4e2c", "#857d70", "#d8d0bf"];

export function AllocationChart({ alloc }: { alloc: Allocation }) {
  const data = [
    { name: "Swiss equity", value: alloc.swiss_equity },
    { name: "International developed", value: alloc.intl_equity },
    { name: "Emerging markets", value: alloc.emerging_equity },
    { name: "Bonds (CHF)", value: alloc.bonds },
    { name: "Cash (CHF)", value: alloc.cash },
  ];
  const pct = (v: number) => `${(Math.round(v * 1000) / 10).toFixed(1)}%`;

  return (
    <div className="w-full">
      <div className="h-56">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              innerRadius={60}
              outerRadius={92}
              paddingAngle={1.5}
              stroke="none"
            >
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(v) => pct(v as number)}
              contentStyle={{
                background: "#fbf8f1",
                border: "1px solid #d8d0bf",
                borderRadius: 0,
                fontSize: 12,
                fontFamily: "var(--font-sans)",
                color: "#1a1814",
              }}
              labelStyle={{ color: "#5a564f" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <ul className="mt-5 grid grid-cols-1 gap-2">
        {data.map((d, i) => (
          <li
            key={d.name}
            className="flex items-baseline justify-between text-sm gap-3"
          >
            <span className="flex items-center gap-2.5 text-ink min-w-0">
              <span
                className="inline-block w-2.5 h-2.5 shrink-0"
                style={{ background: COLORS[i] }}
              />
              <span className="truncate">{d.name}</span>
            </span>
            <span className="font-display num text-ink shrink-0">
              {pct(d.value)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
