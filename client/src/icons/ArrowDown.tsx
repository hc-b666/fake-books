export function ArrowDown({
  w = 24,
  h = 24,
  className,
}: {
  w?: number;
  h?: number;
  className?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={w}
      height={h}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`lucide lucide-chevron-down ${className}`}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
