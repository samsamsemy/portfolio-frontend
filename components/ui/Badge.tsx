import type { ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
  className?: string;
};

export function Badge({ children, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center border border-line bg-card-raised px-2.5 py-1 font-mono text-[11px] uppercase tracking-normal text-gold-soft ${className}`}
    >
      {children}
    </span>
  );
}
