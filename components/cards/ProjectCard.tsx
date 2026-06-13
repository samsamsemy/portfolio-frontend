import { CodeXml, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { BlueprintPlaceholder } from "@/components/ui/BlueprintPlaceholder";
import { Button } from "@/components/ui/Button";
import { compactText } from "@/lib/format";
import { getMediaAlt, getMediaUrl } from "@/lib/strapi";
import type { Project } from "@/lib/types";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  const href = project.slug ? `/projects/${project.slug}` : "/projects";
  const thumbnailUrl = getMediaUrl(project.thumbnail);
  const title = compactText(project.title, "Untitled Project");
  const techStacks = project.techStacks?.filter((item) => item.name).slice(0, 4) ?? [];

  return (
    <article className="technical-card flex h-full flex-col overflow-hidden">
      <Link href={href} className="technical-focus block">
        {thumbnailUrl ? (
          <div className="relative aspect-[16/10] overflow-hidden border-b border-line bg-card-raised">
            <Image
              src={thumbnailUrl}
              alt={getMediaAlt(project.thumbnail, `${title} project thumbnail`)}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-300 hover:scale-[1.03]"
            />
          </div>
        ) : (
          <BlueprintPlaceholder label={title} className="border-0 border-b border-line" />
        )}
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-4">
          <Badge>{compactText(project.category, "Project")}</Badge>
          <span className="font-mono text-[11px] uppercase text-subtle">ID {project.id ?? "--"}</span>
        </div>

        <h3 className="mt-4 font-display text-2xl uppercase leading-tight text-foreground">
          <Link href={href} className="technical-focus hover:text-gold-soft">
            {title}
          </Link>
        </h3>

        <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted">
          {compactText(project.shortDescription, "Project description has not been published yet.")}
        </p>

        {techStacks.length ? (
          <div className="mt-5 flex flex-wrap gap-2">
            {techStacks.map((stack) => (
              <Badge key={`${project.id}-${stack.name}`} className="text-[10px]">
                {stack.name}
              </Badge>
            ))}
          </div>
        ) : null}

        <div className="mt-auto flex flex-wrap gap-2 pt-6">
          <Button href={href} variant="secondary">
            View Detail
          </Button>
          <Button href={project.githubUrl ?? ""} variant="ghost" external aria-label={`${title} GitHub`}>
            <CodeXml size={15} aria-hidden="true" />
          </Button>
          <Button href={project.liveDemoUrl ?? ""} variant="ghost" external aria-label={`${title} live demo`}>
            <ExternalLink size={15} aria-hidden="true" />
          </Button>
        </div>
      </div>
    </article>
  );
}
