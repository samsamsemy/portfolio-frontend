import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  href: string;
  variant?: "primary" | "secondary" | "ghost";
  external?: boolean;
  className?: string;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className">;

const variants = {
  primary:
    "border-gold bg-gold text-background hover:bg-gold-soft hover:border-gold-soft",
  secondary:
    "border-line bg-card text-foreground hover:border-gold hover:text-gold-soft",
  ghost:
    "border-transparent bg-transparent text-muted hover:border-line hover:text-foreground",
};

export function Button({
  children,
  href,
  variant = "primary",
  external = false,
  className = "",
  ...props
}: ButtonProps) {
  if (!href) {
    return null;
  }

  const classes = `technical-focus inline-flex min-h-11 items-center justify-center gap-2 border px-4 py-2 font-mono text-xs font-semibold uppercase tracking-normal transition-colors ${variants[variant]} ${className}`;

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...props}>
      {children}
    </Link>
  );
}
