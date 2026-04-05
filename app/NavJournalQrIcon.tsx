/**
 * Small QR-style mark for the nav entry to /reflect (computer ↔ app pairing).
 */
export function NavJournalQrIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width={22}
      height={22}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        fill="currentColor"
        d="M3 3h7v7H3V3zm2 2v3h3V5H5zm8-2h7v7h-7V3zm2 2v3h3V5h-3zM3 14h7v7H3v-7zm2 2v3h3v-3H5zm11 1h3v3h-3v-3zm-2 4h3v2h-3v-2zm5 0h3v2h-3v-2zm-5-5h3v2h-3v-2zm5-6h3v3h-3V8zm-8 6h2v5h-2v-5z"
      />
    </svg>
  );
}
