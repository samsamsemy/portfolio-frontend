import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { MarkdownRenderer } from "@/components/ui/MarkdownRenderer";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SECTION_LABELS } from "@/lib/constants";
import { compactText } from "@/lib/format";
import type { PortfolioProfile } from "@/lib/types";

type AboutSectionProps = {
  profile: PortfolioProfile | null;
};

export function AboutSection({ profile }: AboutSectionProps) {
  const infoCards = [
    { label: "Education", value: "Informatics Student" },
    { label: "Focus", value: compactText(profile?.headline, "Web Development & QA") },
    { label: "Location", value: compactText(profile?.location, "Indonesia") },
    { label: "Availability", value: profile?.isOpenToWork ? "Open to Work" : "Open to Collaboration" },
  ];

  return (
    <section id="about" className="border-b border-line bg-section py-16 sm:py-20 lg:py-24">
      <Container>
        <SectionHeader
          eyebrow={SECTION_LABELS.about}
          title="Structured profile, built for quick reading"
          description="A short operating summary for recruiters, collaborators, academic reviewers, and potential clients."
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          {profile ? (
            <div className="technical-card p-6">
              <MarkdownRenderer content={profile.shortDescription} />
            </div>
          ) : (
            <EmptyState
              title="About content is not published"
              description="Publish Portfolio Profile in Strapi Admin to fill this section."
              compact
            />
          )}
          <div className="grid gap-4 sm:grid-cols-2">
            {infoCards.map((item) => (
              <div key={item.label} className="technical-card p-5">
                <p className="font-mono text-xs uppercase text-subtle">{item.label}</p>
                <p className="mt-3 font-display text-2xl uppercase text-foreground">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
