import { BriefcaseBusiness, Camera, CodeXml, Mail } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { compactText } from "@/lib/format";
import type { PortfolioProfile } from "@/lib/types";

type FooterProps = {
  profile: PortfolioProfile | null;
};

export function Footer({ profile }: FooterProps) {
  const links = [
    { href: profile?.githubUrl, label: "GitHub", icon: CodeXml },
    { href: profile?.linkedinUrl, label: "LinkedIn", icon: BriefcaseBusiness },
    { href: profile?.instagramUrl, label: "Instagram", icon: Camera },
  ].filter((item) => item.href);

  return (
    <footer className="border-t border-line bg-background py-8">
      <Container className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link
            href="/#home"
            className="technical-focus font-display text-2xl uppercase text-foreground"
          >
            {compactText(profile?.name, "Samuel Portfolio")}
          </Link>
          <p className="mt-1 font-mono text-xs uppercase text-subtle">
            CMS-driven technical portfolio
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {profile?.email ? (
            <a
              href={`mailto:${profile.email}`}
              className="technical-focus inline-flex h-10 w-10 items-center justify-center border border-line text-muted transition-colors hover:border-gold hover:text-gold-soft"
              aria-label="Email Samuel"
            >
              <Mail size={17} aria-hidden="true" />
            </a>
          ) : null}
          {links.map(({ href, label, icon: Icon }) => (
            <a
              key={label}
              href={href ?? ""}
              target="_blank"
              rel="noopener noreferrer"
              className="technical-focus inline-flex h-10 w-10 items-center justify-center border border-line text-muted transition-colors hover:border-gold hover:text-gold-soft"
              aria-label={label}
            >
              <Icon size={17} aria-hidden="true" />
            </a>
          ))}
        </div>
      </Container>
    </footer>
  );
}
