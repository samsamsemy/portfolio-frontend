import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <section className="technical-grid min-h-screen py-24">
      <Container>
        <div className="technical-card max-w-3xl p-6 sm:p-8">
          <p className="font-mono text-xs uppercase text-gold-soft">404 / Route not found</p>
          <h1 className="mt-4 font-display text-5xl uppercase text-foreground">
            The requested panel is missing
          </h1>
          <p className="mt-4 text-base leading-7 text-muted">
            This page is not available or the project slug has not been published in Strapi.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button href="/">Back Home</Button>
            <Button href="/projects" variant="secondary">
              View Projects
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
