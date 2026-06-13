"use client";

import { RotateCcw } from "lucide-react";
import { Container } from "@/components/ui/Container";

type ProjectsErrorProps = {
  reset: () => void;
};

export default function ProjectsError({ reset }: ProjectsErrorProps) {
  return (
    <section className="min-h-screen bg-background py-20">
      <Container>
        <div className="technical-card max-w-3xl p-6">
          <p className="font-mono text-xs uppercase text-danger">Projects error</p>
          <h1 className="mt-4 font-display text-4xl uppercase text-foreground">
            Project data could not be rendered
          </h1>
          <p className="mt-4 text-sm leading-6 text-muted">
            Check the Strapi project endpoint, public permissions, and environment variable.
          </p>
          <button
            type="button"
            onClick={reset}
            className="technical-focus mt-6 inline-flex min-h-11 items-center gap-2 border border-gold px-4 py-2 font-mono text-xs uppercase text-gold-soft hover:bg-gold hover:text-background"
          >
            <RotateCcw size={15} aria-hidden="true" />
            Retry
          </button>
        </div>
      </Container>
    </section>
  );
}
