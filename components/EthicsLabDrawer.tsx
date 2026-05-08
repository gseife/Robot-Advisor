"use client";
import { useEffect } from "react";
import { XIcon } from "lucide-react";
import { DilemmaToggle } from "./DilemmaToggle";
import { CapturedDataPanel } from "./CapturedDataPanel";
import { SystemPromptViewer } from "./SystemPromptViewer";
import { useToggles } from "@/lib/toggle-context";
import type { AdvisePayload } from "@/lib/types";

export function EthicsLabDrawer({
  open,
  onOpenChange,
  payload,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  payload: AdvisePayload;
}) {
  const { reset } = useToggles();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);

  return (
    <aside
      aria-hidden={!open}
      className={`fixed top-0 right-0 z-50 h-full w-full sm:w-[20rem]
        bg-slate-800 text-slate-100 shadow-2xl overflow-y-auto p-4
        transition-transform duration-300 ease-out
        ${open ? "translate-x-0" : "translate-x-full pointer-events-none"}`}
    >
      <div className="flex items-center justify-between mb-4">
        <span className="font-mono text-sm">⚙ Ethics Lab — instructor reveal</span>
        <button
          onClick={() => onOpenChange(false)}
          className="text-slate-400 hover:text-slate-100 transition p-1 -m-1"
          aria-label="Close"
        >
          <XIcon className="w-5 h-5" />
        </button>
      </div>

      <section className="mb-4">
        <div className="text-xs uppercase tracking-wider text-amber-400 font-semibold mb-1">
          Dilemmas (toggle to mitigate)
        </div>
        <DilemmaToggle
          id="exclusion"
          label="Exclusion bias"
          section="§2.1"
          description="Jargon + tech-native assumption; excludes low-digital-literacy users."
        />
        <DilemmaToggle
          id="literacy"
          label="Literacy erosion"
          section="§2.2"
          description="Terse confident tone; no explanation of why or alternatives."
        />
        <DilemmaToggle
          id="opacity"
          label="Fiduciary opacity"
          section="§2.3"
          description="17% cash drag undisclosed; platform earns interest spread."
        />
        <DilemmaToggle
          id="surveillance"
          label="Surveillance"
          section="§2.4"
          description="Extended behavioural capture for model training & upsell."
        />
      </section>

      <section className="mb-4">
        <CapturedDataPanel payload={payload} />
      </section>

      <section className="mb-4">
        <SystemPromptViewer />
      </section>

      <button
        onClick={reset}
        className="w-full bg-slate-900 text-slate-100 border border-slate-700 hover:bg-slate-700 py-2 text-sm transition-colors"
      >
        Reset all biases to ON
      </button>
    </aside>
  );
}
