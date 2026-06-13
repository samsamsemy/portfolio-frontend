import { Container } from "@/components/ui/Container";

export default function ProjectDetailLoading() {
  return (
    <section className="technical-grid min-h-screen py-20">
      <Container>
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="technical-card h-80 animate-pulse" />
          <div className="technical-card h-80 animate-pulse" />
        </div>
      </Container>
    </section>
  );
}
