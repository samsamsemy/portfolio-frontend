import { SkillCard } from "@/components/cards/SkillCard";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SECTION_LABELS } from "@/lib/constants";
import type { SkillCategory } from "@/lib/types";

type SkillSectionProps = {
  skills: SkillCategory[];
};

export function SkillSection({ skills }: SkillSectionProps) {
  return (
    <section id="skills" className="border-b border-line bg-background py-16 sm:py-20 lg:py-24">
      <Container>
        <SectionHeader
          eyebrow={SECTION_LABELS.skills}
          title="Capabilities grouped for scanning"
          description="Each category is managed from Strapi, so the skill map can evolve without touching frontend code."
        />
        <div className="mt-10">
          {skills.length ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {skills.map((skillCategory) => (
                <SkillCard key={skillCategory.documentId ?? skillCategory.id} skillCategory={skillCategory} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="Skills are not published"
              description="Publish active Skill Categories in Strapi Admin to show this grid."
            />
          )}
        </div>
      </Container>
    </section>
  );
}
