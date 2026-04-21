"use client";
import { useToggles } from "@/lib/toggle-context";
import type { AdvisePayload } from "@/lib/types";

function Row({ k, v, muted }: { k: string; v: unknown; muted?: boolean }) {
  return (
    <div className={`flex justify-between gap-3 font-mono text-[11px] py-0.5 ${muted ? "line-through text-slate-600" : "text-slate-200"}`}>
      <span className="text-slate-400">{k}</span>
      <span className="truncate">{JSON.stringify(v)}</span>
    </div>
  );
}

export function CapturedDataPanel({ payload }: { payload: AdvisePayload }) {
  const { toggles } = useToggles();
  const showFull = toggles.surveillance;
  const ext = payload.capture.extended as Record<string, unknown>;
  const nec = payload.capture.necessary as Record<string, unknown>;

  return (
    <div className="rounded-md bg-slate-900 border border-slate-700 p-3">
      <div className="text-xs uppercase tracking-wider text-amber-400 font-semibold mb-2">
        Data captured this session
      </div>
      {showFull ? (
        <>
          {Object.entries(ext).map(([k, v]) => <Row key={k} k={k} v={v} />)}
          <div className="text-[10px] text-slate-500 mt-2">
            Uses: model training · cross-sell targeting · third-party partner sharing
          </div>
        </>
      ) : (
        <>
          <div className="text-[10px] uppercase text-emerald-400 font-semibold">Used for recommendation</div>
          {Object.entries(nec).map(([k, v]) => <Row key={k} k={k} v={v} />)}
          <div className="text-[10px] uppercase text-rose-400 font-semibold mt-2">Previously captured — not stored</div>
          {Object.entries(ext).filter(([k]) => !(k in nec)).map(([k, v]) => <Row key={k} k={k} v={v} muted />)}
          <div className="text-[10px] text-slate-500 mt-2">
            Consent: we only keep what we need.
          </div>
        </>
      )}
    </div>
  );
}
