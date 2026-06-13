import Image from "next/image";
import { Badge } from "@/components/ui/Badge";
import { BlueprintPlaceholder } from "@/components/ui/BlueprintPlaceholder";
import { MarkdownRenderer } from "@/components/ui/MarkdownRenderer";
import { compactText, formatPeriod } from "@/lib/format";
import { getMediaAlt, getMediaUrl } from "@/lib/strapi";
import type { Experience } from "@/lib/types";

type ExperienceCardProps = {
  experience: Experience;
};

export function ExperienceCard({ experience }: ExperienceCardProps) {
  const logoUrl = getMediaUrl(experience.logo);
  const title = compactText(experience.title, "Untitled Experience");
  const responsibilities = experience.responsibilities?.filter((item) => item.name) ?? [];
  const skills = experience.skills?.filter((item) => item.name).slice(0, 5) ?? [];

  return (
    <article className="technical-card grid gap-5 p-5 sm:grid-cols-[88px_1fr]">
      <div className="sm:pt-1">
        {logoUrl ? (
          <div className="relative h-20 w-20 overflow-hidden border border-line bg-card-raised">
            <Image
              src={logoUrl}
              alt={getMediaAlt(experience.logo, `${title} logo`)}
              fill
              sizes="80px"
              className="object-cover"
            />
          </div>
        ) : (
          <BlueprintPlaceholder label="LOGO" className="aspect-square min-h-20 w-20" />
        )}
      </div>

      <div>
        <div className="flex flex-wrap items-center gap-2">
          <Badge>{experience.type ?? "Experience"}</Badge>
          <span className="font-mono text-xs uppercase text-subtle">
            {formatPeriod(experience.startDate, experience.endDate, experience.isCurrent)}
          </span>
        </div>
        <h3 className="mt-3 font-display text-2xl uppercase text-foreground">{title}</h3>
        <p className="mt-1 font-mono text-xs uppercase text-gold-soft">
          {compactText(experience.organization, "Organization not specified")}
        </p>
        <MarkdownRenderer content={experience.description} className="mt-4" />

        {responsibilities.length ? (
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-muted">
            {responsibilities.map((item) => (
              <li key={`${experience.id}-${item.name}`}>{item.name}</li>
            ))}
          </ul>
        ) : null}

        {skills.length ? (
          <div className="mt-5 flex flex-wrap gap-2">
            {skills.map((skill) => (
              <Badge key={`${experience.id}-${skill.name}`}>{skill.name}</Badge>
            ))}
          </div>
        ) : null}
      </div>
    </article>
  );
}
