"use client";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { DilemmaToggle } from "./DilemmaToggle";
import { CapturedDataPanel } from "./CapturedDataPanel";
import { SystemPromptViewer } from "./SystemPromptViewer";
import { Button } from "@/components/ui/button";
import { useToggles } from "@/lib/toggle-context";
import type { AdvisePayload } from "@/lib/types";

export function EthicsLabDrawer({
  open, onOpenChange, payload,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  payload: AdvisePayload;
}) {
  const { reset } = useToggles();
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="bg-slate-800 text-slate-100 border-slate-700 p-5 overflow-y-auto sm:max-w-md w-full">
        <SheetHeader className="mb-4">
          <SheetTitle className="text-slate-100 font-mono text-sm">⚙ Ethics Lab — instructor reveal</SheetTitle>
        </SheetHeader>

        <section className="mb-4">
          <div className="text-xs uppercase tracking-wider text-amber-400 font-semibold mb-1">Dilemmas (toggle to mitigate)</div>
          <DilemmaToggle id="exclusion"    label="Exclusion bias"    section="§2.1" description="Jargon + tech-native assumption; excludes low-digital-literacy users." />
          <DilemmaToggle id="literacy"     label="Literacy erosion"  section="§2.2" description="Terse confident tone; no explanation of why or alternatives." />
          <DilemmaToggle id="opacity"      label="Fiduciary opacity" section="§2.3" description="17% cash drag undisclosed; platform earns interest spread." />
          <DilemmaToggle id="surveillance" label="Surveillance"      section="§2.4" description="Extended behavioural capture for model training & upsell." />
        </section>

        <section className="mb-4">
          <CapturedDataPanel payload={payload} />
        </section>

        <section className="mb-4">
          <SystemPromptViewer />
        </section>

        <Button variant="outline" className="w-full bg-slate-900 text-slate-100 border-slate-700 hover:bg-slate-700" onClick={reset}>
          Reset all biases to ON
        </Button>
      </SheetContent>
    </Sheet>
  );
}
