import { ProjectCard } from "@/components/cards/ProjectCard";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SECTION_LABELS } from "@/lib/constants";
import type { Project } from "@/lib/types";

type ProjectSectionProps = {
  projects: Project[];
  title?: string;
  description?: string;
  showAllLink?: boolean;
};

export function ProjectSection({
  projects,
  title = "Featured work with traceable details",
  description = "Homepage only shows selected projects. The full project index is available on a dedicated page.",
  showAllLink = true,
}: ProjectSectionProps) {
  return (
    <section id="projects" className="border-b border-line bg-background py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader eyebrow={SECTION_LABELS.projects} title={title} description={description} />
          {showAllLink ? (
            <div className="lg:pb-1">
              <Button href="/projects" variant="secondary">
                All Projects
              </Button>
            </div>
          ) : null}
        </div>
        <div className="mt-10">
          {projects.length ? (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {projects.map((project) => (
                <ProjectCard key={project.documentId ?? project.id} project={project} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="Projects are not published"
              description="Publish active Projects in Strapi Admin to show this grid."
            />
          )}
        </div>
      </Container>
    </section>
  );
}
