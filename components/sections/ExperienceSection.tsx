import { ExperienceCard } from "@/components/cards/ExperienceCard";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SECTION_LABELS } from "@/lib/constants";
import type { Experience } from "@/lib/types";

type ExperienceSectionProps = {
  experiences: Experience[];
};

export function ExperienceSection({ experiences }: ExperienceSectionProps) {
  return (
    <section id="experience" className="border-b border-line bg-section py-16 sm:py-20 lg:py-24">
      <Container>
        <SectionHeader
          eyebrow={SECTION_LABELS.experience}
          title="Experience timeline"
          description="A compact field log of academic, organization, volunteer, work, and project experience."
        />
        <div className="mt-10">
          {experiences.length ? (
            <div className="grid gap-5">
              {experiences.map((experience) => (
                <ExperienceCard key={experience.documentId ?? experience.id} experience={experience} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="Experiences are not published"
              description="Publish active Experiences in Strapi Admin to show this timeline."
            />
          )}
        </div>
      </Container>
    </section>
  );
}
