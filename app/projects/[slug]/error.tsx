"use client";

import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

type ProjectDetailErrorProps = {
  reset: () => void;
};

export default function ProjectDetailError({ reset }: ProjectDetailErrorProps) {
  return (
    <section className="technical-grid min-h-screen py-20">
      <Container>
        <div className="technical-card max-w-3xl p-6">
          <p className="font-mono text-xs uppercase text-danger">Project detail error</p>
          <h1 className="mt-4 font-display text-4xl uppercase text-foreground">
            Project detail could not be rendered
          </h1>
          <p className="mt-4 text-sm leading-6 text-muted">
            Check the project slug, Strapi permissions, and published project data.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={reset}
              className="technical-focus inline-flex min-h-11 items-center gap-2 border border-gold px-4 py-2 font-mono text-xs uppercase text-gold-soft hover:bg-gold hover:text-background"
            >
              <RotateCcw size={15} aria-hidden="true" />
              Retry
            </button>
            <Button href="/projects" variant="secondary">
              Back to Projects
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
