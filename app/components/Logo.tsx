type LogoProps = {
  className?: string;
  variant?: "light" | "dark";
};

export function Logo({ className, variant = "dark" }: LogoProps) {
  const wordColor = variant === "light" ? "text-cream" : "text-espresso";
  const subColor = variant === "light" ? "text-cream/60" : "text-espresso/50";

  return (
    <span className={`inline-flex items-center gap-2.5 ${className ?? ""}`}>
      <LogoMark className="h-9 w-9 shrink-0" />
      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-xl font-bold tracking-tight ${wordColor}`}
        >
          Mubarak
        </span>
        <span
          className={`text-[0.6rem] font-medium uppercase tracking-[0.28em] ${subColor}`}
        >
          Chaikhana
        </span>
      </span>
    </span>
  );
}

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      role="img"
      aria-label="Mubarak"
    >
      <rect width="40" height="40" rx="11" fill="#123227" />
      <path
        d="M11 25.5h18"
        stroke="#e0922f"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      {/* teapot body */}
      <path
        d="M13.5 16.5h11a1 1 0 0 1 1 1.1l-.6 4.4a3 3 0 0 1-3 2.5h-5.8a3 3 0 0 1-3-2.5l-.6-4.4a1 1 0 0 1 1-1.1Z"
        fill="none"
        stroke="#f4ecdf"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      {/* spout */}
      <path
        d="M25.5 18.5c2 .2 3.3 1.3 3.8 3.2"
        fill="none"
        stroke="#f4ecdf"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      {/* lid knob */}
      <path
        d="M19 16.5V15"
        stroke="#f4ecdf"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="19" cy="14" r="1.1" fill="#e0922f" />
      {/* steam */}
      <path
        d="M16.5 12.5c1-1 1-2 0-3M21.5 12.5c1-1 1-2 0-3"
        stroke="#c8992f"
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity="0.9"
      />
    </svg>
  );
}
