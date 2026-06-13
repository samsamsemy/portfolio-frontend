import { AboutSection } from "@/components/sections/AboutSection";
import { CertificateSection } from "@/components/sections/CertificateSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProjectSection } from "@/components/sections/ProjectSection";
import { ServiceSection } from "@/components/sections/ServiceSection";
import { SkillSection } from "@/components/sections/SkillSection";
import { getHomeData } from "@/lib/strapi";

export const dynamic = "force-dynamic";

export default async function Home() {
  const { profile, contact, featuredProjects, skills, services, experiences, certificates } =
    await getHomeData();

  return (
    <>
      <HeroSection profile={profile} />
      <AboutSection profile={profile} />
      <SkillSection skills={skills} />
      <ServiceSection services={services} />
      <ProjectSection projects={featuredProjects} />
      <ExperienceSection experiences={experiences} />
      <CertificateSection certificates={certificates} />
      <ContactSection contact={contact} profile={profile} />
    </>
  );
}
