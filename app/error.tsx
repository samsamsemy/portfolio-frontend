"use client";

import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <section className="technical-grid min-h-screen py-24">
      <Container>
        <div className="technical-card max-w-3xl p-6 sm:p-8">
          <p className="font-mono text-xs uppercase text-danger">Runtime error</p>
          <h1 className="mt-4 font-display text-4xl uppercase text-foreground">
            Portfolio display interrupted
          </h1>
          <p className="mt-4 text-sm leading-6 text-muted">
            The frontend caught an application error. Try again after checking the Strapi API or
            environment variables.
          </p>
          {error.message ? (
            <p className="mt-4 border border-line bg-card-raised p-3 font-mono text-xs text-subtle">
              {error.message}
            </p>
          ) : null}
          <button
            type="button"
            onClick={reset}
            className="technical-focus mt-6 inline-flex min-h-11 items-center justify-center gap-2 border border-gold px-4 py-2 font-mono text-xs font-semibold uppercase text-gold-soft transition-colors hover:bg-gold hover:text-background"
          >
            <RotateCcw size={15} aria-hidden="true" />
            Retry
          </button>
          <div className="mt-3">
            <Button href="/" variant="ghost">
              Back Home
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
