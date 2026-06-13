import type { Metadata } from "next";
import { ProjectSection } from "@/components/sections/ProjectSection";
import { getProjects } from "@/lib/strapi";

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected and active portfolio projects loaded from Strapi CMS.",
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <ProjectSection
      projects={projects}
      title="All active projects"
      description="A CMS-driven index of published work, sorted by the order field in Strapi."
      showAllLink={false}
    />
  );
}
