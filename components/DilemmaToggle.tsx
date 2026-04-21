"use client";
import { useToggles } from "@/lib/toggle-context";
import type { ToggleState } from "@/lib/types";
import { Switch } from "@/components/ui/switch";

export function DilemmaToggle({
  id, label, description, section,
}: {
  id: keyof ToggleState;
  label: string;
  description: string;
  section: string;
}) {
  const { toggles, setToggle } = useToggles();
  const on = toggles[id];
  return (
    <div className="flex items-start justify-between gap-3 py-3 border-b border-slate-700 last:border-b-0">
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <span className={`text-xs font-mono px-1.5 py-0.5 rounded ${on ? "bg-rose-900 text-rose-200" : "bg-emerald-900 text-emerald-200"}`}>
            {on ? "BIAS ON" : "MITIGATED"}
          </span>
          <span className="text-sm font-medium text-slate-100">{label}</span>
          <span className="text-[10px] text-slate-500 font-mono">{section}</span>
        </div>
        <div className="text-xs text-slate-400 mt-1">{description}</div>
      </div>
      <Switch checked={on} onCheckedChange={(v) => setToggle(id, v)} />
    </div>
  );
}
