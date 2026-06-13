import { Badge } from "@/components/ui/Badge";
import { compactText } from "@/lib/format";
import type { SkillCategory } from "@/lib/types";

type SkillCardProps = {
  skillCategory: SkillCategory;
};

export function SkillCard({ skillCategory }: SkillCardProps) {
  const skills = skillCategory.skills?.filter((skill) => skill.name) ?? [];

  return (
    <article className="technical-card h-full p-5">
      <p className="font-mono text-xs uppercase text-gold-soft">
        {compactText(skillCategory.icon, "Capability")}
      </p>
      <h3 className="mt-3 font-display text-2xl uppercase text-foreground">
        {compactText(skillCategory.title, "Untitled Skill")}
      </h3>
      <p className="mt-3 text-sm leading-6 text-muted">
        {compactText(skillCategory.description, "Skill description has not been published yet.")}
      </p>
      {skills.length ? (
        <div className="mt-5 flex flex-wrap gap-2">
          {skills.map((skill) => (
            <Badge key={`${skillCategory.id}-${skill.name}`}>{skill.name}</Badge>
          ))}
        </div>
      ) : null}
    </article>
  );
}
