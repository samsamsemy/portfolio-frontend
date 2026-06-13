"use client";

import { Download, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { NAV_ITEMS } from "@/lib/constants";
import { getMediaUrl } from "@/lib/strapi";
import type { PortfolioProfile } from "@/lib/types";

type NavbarProps = {
  profile: PortfolioProfile | null;
};

export function Navbar({ profile }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const cvUrl = getMediaUrl(profile?.cvFile);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-background/95 backdrop-blur">
      <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/#home"
          className="technical-focus flex min-w-0 items-center gap-3 font-mono text-xs uppercase text-foreground"
          onClick={() => setIsOpen(false)}
        >
          <span className="grid h-8 w-8 place-items-center border border-gold text-gold-soft">
            SP
          </span>
          <span className="hidden sm:inline">Samuel Portfolio</span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="technical-focus px-3 py-2 font-mono text-xs uppercase text-muted transition-colors hover:text-gold-soft"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          {cvUrl ? (
            <a
              href={cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="technical-focus inline-flex min-h-10 items-center gap-2 border border-gold px-3 py-2 font-mono text-xs uppercase text-gold-soft transition-colors hover:bg-gold hover:text-background"
            >
              <Download size={15} aria-hidden="true" />
              Download CV
            </a>
          ) : null}
        </div>

        <button
          type="button"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsOpen((value) => !value)}
          className="technical-focus inline-flex h-10 w-10 items-center justify-center border border-line text-gold-soft lg:hidden"
        >
          {isOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </button>
      </nav>

      <div
        id="mobile-navigation"
        className={`border-t border-line bg-background lg:hidden ${isOpen ? "block" : "hidden"}`}
      >
        <div className="mx-auto grid w-full max-w-7xl gap-1 px-4 py-4 sm:px-6">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="technical-focus border border-transparent px-3 py-3 font-mono text-sm uppercase text-muted transition-colors hover:border-line hover:text-gold-soft"
            >
              {item.label}
            </Link>
          ))}
          {cvUrl ? (
            <a
              href={cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="technical-focus mt-2 inline-flex min-h-11 items-center justify-center gap-2 border border-gold px-3 py-2 font-mono text-xs uppercase text-gold-soft transition-colors hover:bg-gold hover:text-background"
            >
              <Download size={15} aria-hidden="true" />
              Download CV
            </a>
          ) : null}
        </div>
      </div>
    </header>
  );
}
