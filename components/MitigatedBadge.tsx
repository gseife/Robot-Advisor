"use client";

export function MitigatedBadge({
  mitigated,
  section,
  label,
}: {
  mitigated: boolean;
  section: string;
  label?: string;
}) {
  const text = mitigated ? "Mitigated" : "Biased";
  const display = label ? `${text} · ${label}` : `${text} · ${section}`;
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-[9px] uppercase tracking-[0.2em] font-medium
        px-2 py-0.5 border transition-colors
        ${
          mitigated
            ? "bg-emerald-50 text-emerald-800 border-emerald-300"
            : "bg-amber-50 text-amber-800 border-amber-300"
        }`}
    >
      <span
        className={`inline-block w-1.5 h-1.5 rounded-full
          ${mitigated ? "bg-emerald-600" : "bg-amber-600"}`}
      />
      {display}
    </span>
  );
}
