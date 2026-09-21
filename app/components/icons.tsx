import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export type IconType = (props: IconProps) => React.ReactElement;

function Base({ children, ...props }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export function IconTruck(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M14 18V6a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h1" />
      <path d="M14 9h4l4 4v4a1 1 0 0 1-1 1h-1" />
      <circle cx="7.5" cy="18.5" r="2" />
      <circle cx="17.5" cy="18.5" r="2" />
      <path d="M9.5 18.5h6" />
    </Base>
  );
}

export function IconCalendar(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="3" y="4.5" width="18" height="16" rx="2.5" />
      <path d="M3 9.5h18M8 3v3M16 3v3" />
      <path d="m9 15 2 2 4-4" />
    </Base>
  );
}

export function IconQr(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <path d="M14 14h3v3M21 14v.01M14 21h3M21 18v3" />
    </Base>
  );
}

export function IconCrown(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M3 7.5 6.5 15h11L21 7.5l-4.5 3L12 4.5 7.5 10.5 3 7.5Z" />
      <path d="M6.5 18.5h11" />
    </Base>
  );
}

export function IconMapPin(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M20 10c0 5-8 12-8 12s-8-7-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </Base>
  );
}

export function IconClock(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </Base>
  );
}

export function IconPhone(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M6.5 3.5h3l1.5 4-2 1.5a12 12 0 0 0 6 6l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.5 5.7 2 2 0 0 1 6.5 3.5Z" />
    </Base>
  );
}

export function IconStar(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.3-4.1 5.9-.9L12 3.5Z" />
    </Base>
  );
}

export function IconUtensils(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M4 3v7a2.5 2.5 0 0 0 5 0V3M6.5 11v10" />
      <path d="M17.5 3c-1.7 0-3 2.2-3 5s1.3 4 3 4 0 0 0 0v9" />
    </Base>
  );
}

export function IconChefHat(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M6 14.5a4 4 0 0 1-1-7.9A4.5 4.5 0 0 1 12 4a4.5 4.5 0 0 1 7 2.6 4 4 0 0 1-1 7.9" />
      <path d="M6 14.5V20a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-5.5" />
      <path d="M9 21v-4M15 21v-4" />
    </Base>
  );
}

export function IconSmartphone(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="6" y="2.5" width="12" height="19" rx="3" />
      <path d="M11 18.5h2" />
    </Base>
  );
}

export function IconArrowRight(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </Base>
  );
}

export function IconMenu(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M4 6h16M4 12h16M4 18h16" />
    </Base>
  );
}

export function IconClose(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M6 6l12 12M18 6 6 18" />
    </Base>
  );
}

export function IconLeaf(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M4 20c0-9 7-15 16-15 0 9-6 15-15 15" />
      <path d="M5 19c4-6 8-8 12-9" />
    </Base>
  );
}

export function IconFlame(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M12 3c1 3-2 4-2 7a2 2 0 0 0 4 0c0-.5-.1-1-.3-1.4C16 11 18 13 18 15.5A6 6 0 0 1 6 15.5C6 10.5 11 9 12 3Z" />
    </Base>
  );
}

export function IconShield(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M12 3l7 3v5c0 5-3.5 8-7 10-3.5-2-7-5-7-10V6l7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </Base>
  );
}

export function IconSparkles(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6L12 3Z" />
      <path d="M18 14l.8 2.2L21 17l-2.2.8L18 20l-.8-2.2L15 17l2.2-.8L18 14Z" />
    </Base>
  );
}

export function IconBag(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M6 8h12l-1 12.5a1.5 1.5 0 0 1-1.5 1.4H8.5A1.5 1.5 0 0 1 7 20.5L6 8Z" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
    </Base>
  );
}

export function IconStore(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M4 9.5 5.2 4.8A1.5 1.5 0 0 1 6.6 3.7h10.8a1.5 1.5 0 0 1 1.4 1.1L20 9.5" />
      <path d="M4 9.5a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 4 0" />
      <path d="M5 12v7.5A1.5 1.5 0 0 0 6.5 21h11a1.5 1.5 0 0 0 1.5-1.5V12" />
      <path d="M9.5 21v-4.5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1V21" />
    </Base>
  );
}

export function IconBell(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M18 8a6 6 0 0 0-12 0c0 6-2.5 7-2.5 7h17S18 14 18 8Z" />
      <path d="M10.5 20a2 2 0 0 0 3 0" />
    </Base>
  );
}

export function IconChart(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M4 4v16h16" />
      <path d="M8 15l3-4 3 2 4-6" />
    </Base>
  );
}

export function IconGift(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="4" y="9" width="16" height="12" rx="1.5" />
      <path d="M4 13h16M12 9v12" />
      <path d="M12 9S10.5 4.5 8 5.5 9.5 9 12 9Zm0 0s1.5-4.5 4-3.5S14.5 9 12 9Z" />
    </Base>
  );
}

export function IconSend(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M21 4 3 11l6 2.5L12 20l3-6 6-10Z" />
      <path d="M9 13.5 21 4" />
    </Base>
  );
}

export function IconGlobe(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18" />
    </Base>
  );
}

export function IconWallet(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M4 7.5A2.5 2.5 0 0 1 6.5 5H17a1 1 0 0 1 1 1v1" />
      <rect x="3" y="7" width="18" height="12" rx="2.5" />
      <path d="M16 12.5h2.5" />
    </Base>
  );
}

export function IconUsers(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3.5 20a5.5 5.5 0 0 1 11 0" />
      <path d="M16 5.2a3.2 3.2 0 0 1 0 6M17.5 14.2A5.5 5.5 0 0 1 20.5 20" />
    </Base>
  );
}

export function IconCheck(props: IconProps) {
  return (
    <Base {...props}>
      <path d="m5 12 4.5 4.5L19 7" />
    </Base>
  );
}

export function IconUser(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="12" cy="8.5" r="3.7" />
      <path d="M4.5 20.5a7.5 7.5 0 0 1 15 0" />
    </Base>
  );
}

/**
 * Официальный знак Google — единственная цветная иконка в наборе, поэтому
 * не использует Base (там stroke="currentColor", который затёр бы фирменные
 * цвета). Пропорции и палитра менять нельзя: это требование Google к бренду.
 */
export function IconGoogle(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 48 48"
      aria-hidden="true"
      {...props}
    >
      <path
        fill="#4285F4"
        d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17Z"
      />
      <path
        fill="#34A853"
        d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46Z"
      />
      <path
        fill="#FBBC05"
        d="M11.69 28.18A13.9 13.9 0 0 1 11 24c0-1.45.25-2.86.69-4.18v-5.7H4.34A21.9 21.9 0 0 0 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7Z"
      />
      <path
        fill="#EA4335"
        d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07Z"
      />
    </svg>
  );
}
