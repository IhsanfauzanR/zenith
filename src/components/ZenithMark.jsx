// Logo mark Zenith — lingkaran + simbol puncak/compass.
// Pakai currentColor agar bisa diwarnai via CSS `color` (mendukung dark mode).
export default function ZenithMark({ size = 120, strokeWidth = 4, className, style }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      role="img"
      aria-label="Zenith"
    >
      {/* Lingkaran luar */}
      <circle
        cx="60"
        cy="60"
        r="48"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        fill="none"
      />
      {/* Titik di atas (kepala / matahari kecil) */}
      <circle cx="60" cy="42" r="6.5" fill="currentColor" />
      {/* Garis V/puncak dari bawah titik ke bawah lingkaran */}
      <path
        d="M60 51 L36 89 M60 51 L84 89"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
