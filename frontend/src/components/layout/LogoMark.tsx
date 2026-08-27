/**
 * Compact monogram recreating the MAE brand badge (green circle, terracotta
 * accent dot) as scalable inline SVG. Swap for the real exported logo file
 * (e.g. `public/images/logo/mae.svg`) once the Client provides one.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" role="img" aria-label="MAE logo" className={className}>
      <circle cx="20" cy="20" r="20" fill="var(--brand-green)" />
      <text
        x="20"
        y="25"
        textAnchor="middle"
        fontFamily="var(--font-geist-sans), system-ui, sans-serif"
        fontWeight="800"
        fontSize="16"
        fill="#ffffff"
      >
        M
      </text>
      <circle cx="29" cy="29" r="4.5" fill="var(--brand-orange)" />
    </svg>
  );
}
