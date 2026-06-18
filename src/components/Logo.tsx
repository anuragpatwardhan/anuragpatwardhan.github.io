export default function Logo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <path
        d="M32 6 L58 56 L46 56 L32 26 L18 56 L6 56 Z M24 42 L40 42 L36 50 L28 50 Z"
        fill="currentColor"
      />
    </svg>
  );
}
