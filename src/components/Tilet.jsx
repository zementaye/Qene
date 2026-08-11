// The "tilet" (ጥልፍ) is the geometric woven border found on habesha kemis
// and netela cloth. It's the one visual signature reused everywhere in this
// app: the path connecting lesson nodes (see .unit-lessons::before in
// app.css — a CSS background tile, not an SVG component, so it isn't
// pinned to a JS-measured height), section dividers below, and the
// progress-bar texture.
//
// Each instance gets its own <pattern> id via useId(). SVG <pattern> ids
// are looked up document-wide (not scoped to their own <svg>), so with a
// page full of these — one per unit label, more in lesson session, result
// screen — a shared hardcoded id meant every TiletDivider silently used
// whichever instance's pattern happened to be first in the DOM, ignoring
// its own color/accent props whenever they differed from that first one.

import { useId } from "react";

export function TiletDivider({ color = "var(--gold-500)", accent = "var(--clay-500)", height = 14 }) {
  const patternId = `tilet-${useId()}`;
  return (
    <svg
      viewBox="0 0 64 16"
      preserveAspectRatio="xMidYMid meet"
      style={{ width: "100%", height, display: "block" }}
      aria-hidden="true"
    >
      <pattern id={patternId} width="16" height="16" patternUnits="userSpaceOnUse">
        {/* outer diamond outline + a smaller filled diamond nested inside it,
            in a contrasting thread color — the two-tone interlock is what
            reads as "woven" instead of just a dotted line */}
        <path d="M0 8 L8 1 L15 8 L8 15 Z" fill="none" stroke={color} strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M4 8 L8 4.5 L12 8 L8 11.5 Z" fill={accent} opacity="0.85" />
      </pattern>
      <rect width="64" height="16" fill={`url(#${patternId})`} />
    </svg>
  );
}

export function TiletRing({ size = 84, color = "var(--gold-500)", strokeWidth = 3 }) {
  const r = size / 2 - strokeWidth;
  const cx = size / 2;
  const cy = size / 2;
  const dots = 10;
  const points = Array.from({ length: dots }, (_, i) => {
    const angle = (i / dots) * Math.PI * 2 - Math.PI / 2;
    return [cx + r * Math.cos(angle), cy + r * Math.sin(angle)];
  });
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true" style={{ display: "block" }}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth={strokeWidth} strokeDasharray="2 7" strokeLinecap="round" />
      {points.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={1.6} fill={color} />
      ))}
    </svg>
  );
}
