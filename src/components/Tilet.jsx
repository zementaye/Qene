// The "tilet" (ጥልፍ) is the geometric woven border found on habesha kemis
// and netela cloth. It's the one visual signature reused everywhere in this
// app: the path connecting lesson nodes, section dividers, progress-bar
// texture. Rendered as a repeating diamond-chain so it tiles cleanly at any
// length via CSS background-repeat / SVG patterns.

export function TiletDivider({ color = "var(--gold-500)", height = 14 }) {
  return (
    <svg
      viewBox="0 0 64 16"
      preserveAspectRatio="xMidYMid meet"
      style={{ width: "100%", height, display: "block" }}
      aria-hidden="true"
    >
      <pattern id="tiletRepeat" width="16" height="16" patternUnits="userSpaceOnUse">
        <path d="M0 8 L8 0 L16 8 L8 16 Z" fill="none" stroke={color} strokeWidth="1.4" />
        <circle cx="8" cy="8" r="1.3" fill={color} />
      </pattern>
      <rect width="64" height="16" fill="url(#tiletRepeat)" />
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
