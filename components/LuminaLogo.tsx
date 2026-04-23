/**
 * Lumina Wealth identity
 *
 * The mark is a rising half-sun above a horizon line —
 * "lumina" (light) over the long-term financial horizon.
 * The disc is brand-red; the horizon uses currentColor so the mark
 * adapts to ink/parchment/dark contexts.
 */

import type { SVGProps } from "react";

type MarkProps = SVGProps<SVGSVGElement> & { title?: string };

export function LuminaMark({ title, className, ...rest }: MarkProps) {
  return (
    <svg
      viewBox="0 0 64 48"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role={title ? "img" : "presentation"}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      {...rest}
    >
      {title ? <title>{title}</title> : null}
      <defs>
        <clipPath id="lumina-mark-clip">
          <rect x="0" y="0" width="64" height="40" />
        </clipPath>
      </defs>
      {/* Rising sun — top half of a brand-red disc */}
      <circle cx="32" cy="40" r="18" fill="#a8211a" clipPath="url(#lumina-mark-clip)" />
      {/* Horizon */}
      <rect x="2" y="39" width="60" height="2.2" fill="currentColor" />
      {/* Tiny baseline serifs — Swiss editorial tick at each end */}
      <rect x="2" y="39" width="2.2" height="6" fill="currentColor" />
      <rect x="59.8" y="39" width="2.2" height="6" fill="currentColor" />
    </svg>
  );
}

type LogoProps = {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  variant?: "stacked" | "inline";
  className?: string;
};

const MARK_SIZE: Record<NonNullable<LogoProps["size"]>, string> = {
  xs: "h-4",
  sm: "h-5",
  md: "h-7",
  lg: "h-10",
  xl: "h-14",
};

const TEXT_SIZE: Record<NonNullable<LogoProps["size"]>, string> = {
  xs: "text-sm",
  sm: "text-base",
  md: "text-xl",
  lg: "text-3xl",
  xl: "text-5xl",
};

const GAP: Record<NonNullable<LogoProps["size"]>, string> = {
  xs: "gap-2",
  sm: "gap-2.5",
  md: "gap-3",
  lg: "gap-4",
  xl: "gap-5",
};

/**
 * LuminaLogo — full brand lockup (mark + wordmark).
 * - `inline` (default): mark + wordmark side by side, mark rests on baseline
 * - `stacked`: mark centered above a smaller wordmark
 */
export function LuminaLogo({
  size = "md",
  variant = "inline",
  className = "",
}: LogoProps) {
  const markClass = `${MARK_SIZE[size]} w-auto text-ink`;
  const textClass = `font-display ${TEXT_SIZE[size]} tracking-tight text-ink leading-none`;

  if (variant === "stacked") {
    return (
      <div className={`inline-flex flex-col items-center ${GAP[size]} ${className}`}>
        <LuminaMark className={markClass} title="Lumina Wealth" />
        <span className={textClass}>
          Lumina<span className="italic text-brand"> Wealth</span>
        </span>
      </div>
    );
  }

  return (
    <div className={`inline-flex items-end ${GAP[size]} ${className}`}>
      <LuminaMark className={markClass} title="Lumina Wealth" />
      <span className={textClass}>
        Lumina<span className="italic text-brand"> Wealth</span>
      </span>
    </div>
  );
}
