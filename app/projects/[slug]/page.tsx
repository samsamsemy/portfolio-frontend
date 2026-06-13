import { CodeXml, ExternalLink } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/Badge";
import { BlueprintPlaceholder } from "@/components/ui/BlueprintPlaceholder";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { MarkdownRenderer } from "@/components/ui/MarkdownRenderer";
import { compactText } from "@/lib/format";
import { getMediaAlt, getMediaUrl, getProjectBySlug } from "@/lib/strapi";

type ProjectDetailProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: ProjectDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found",
      description: "The requested project is not published in Strapi.",
    };
  }

  const title = compactText(project.title, "Project Detail");
  const description = compactText(project.shortDescription, "Portfolio project detail.");
  const imageUrl = getMediaUrl(project.thumbnail);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: imageUrl ? [{ url: imageUrl, alt: getMediaAlt(project.thumbnail, title) }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: imageUrl ? [imageUrl] : [],
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectDetailProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const title = compactText(project.title, "Untitled Project");
  const thumbnailUrl = getMediaUrl(project.thumbnail);
  const gallery = project.images?.filter((image) => getMediaUrl(image)) ?? [];
  const features = project.features?.filter((feature) => feature.name) ?? [];
  const techStacks = project.techStacks?.filter((stack) => stack.name) ?? [];

  return (
    <article>
      <section className="technical-grid border-b border-line py-16 sm:py-20 lg:py-24">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div>
              <Badge>{compactText(project.category, "Project")}</Badge>
              <h1 className="mt-5 font-display text-5xl uppercase leading-none text-foreground sm:text-7xl">
                {title}
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-7 text-muted sm:text-lg">
                {compactText(project.shortDescription, "Project overview has not been published yet.")}
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button href={project.githubUrl ?? ""} variant="secondary" external>
                  <CodeXml size={16} aria-hidden="true" />
                  GitHub
                </Button>
                <Button href={project.liveDemoUrl ?? ""} external>
                  <ExternalLink size={16} aria-hidden="true" />
                  Live Demo
                </Button>
              </div>
            </div>
            {thumbnailUrl ? (
              <div className="relative aspect-[16/10] overflow-hidden border border-line bg-card-raised">
                <Image
                  src={thumbnailUrl}
                  alt={getMediaAlt(project.thumbnail, `${title} project thumbnail`)}
                  fill
                  priority
                  sizes="(min-width: 1024px) 42vw, 100vw"
                  className="object-cover"
                />
              </div>
            ) : (
              <BlueprintPlaceholder label={title} />
            )}
          </div>
        </Container>
      </section>

      <section className="border-b border-line bg-section py-16 sm:py-20">
        <Container>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="technical-card p-6">
              <p className="font-mono text-xs uppercase text-gold-soft">Problem</p>
              <MarkdownRenderer content={project.problem} className="mt-4" />
              {!project.problem ? (
                <p className="mt-4 text-sm leading-6 text-muted">Problem statement has not been published.</p>
              ) : null}
            </div>
            <div className="technical-card p-6">
              <p className="font-mono text-xs uppercase text-gold-soft">Solution</p>
              <MarkdownRenderer content={project.solution} className="mt-4" />
              {!project.solution ? (
                <p className="mt-4 text-sm leading-6 text-muted">Solution notes have not been published.</p>
              ) : null}
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-line bg-background py-16 sm:py-20">
        <Container>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="technical-card p-6">
              <p className="font-mono text-xs uppercase text-gold-soft">Features</p>
              {features.length ? (
                <ul className="mt-5 grid gap-3">
                  {features.map((feature) => (
                    <li key={`${project.id}-${feature.name}`} className="border border-line p-3 text-sm text-muted">
                      {feature.name}
                    </li>
                  ))}
                </ul>
              ) : (
                <EmptyState title="Features are not published" compact />
              )}
            </div>
            <div className="technical-card p-6">
              <p className="font-mono text-xs uppercase text-gold-soft">Tech Stack</p>
              {techStacks.length ? (
                <div className="mt-5 flex flex-wrap gap-2">
                  {techStacks.map((stack) => (
                    <Badge key={`${project.id}-${stack.name}`}>{stack.name}</Badge>
                  ))}
                </div>
              ) : (
                <EmptyState title="Tech stacks are not published" compact />
              )}
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-section py-16 sm:py-20">
        <Container>
          <div className="mb-8">
            <p className="font-mono text-xs uppercase text-gold-soft">Gallery</p>
            <h2 className="mt-3 font-display text-4xl uppercase text-foreground">Screenshots</h2>
          </div>
          {gallery.length ? (
            <div className="grid gap-5 sm:grid-cols-2">
              {gallery.map((image) => {
                const imageUrl = getMediaUrl(image);

                return (
                  <div key={image.documentId ?? image.id ?? image.url} className="relative aspect-[16/10] overflow-hidden border border-line bg-card-raised">
                    <Image
                      src={imageUrl}
                      alt={getMediaAlt(image, `${title} screenshot`)}
                      fill
                      sizes="(min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                );
              })}
            </div>
          ) : (
            <BlueprintPlaceholder label="Project Gallery" />
          )}
        </Container>
      </section>
    </article>
  );
}
