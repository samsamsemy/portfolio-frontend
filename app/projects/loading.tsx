import { Container } from "@/components/ui/Container";

export default function ProjectsLoading() {
  return (
    <section className="min-h-screen border-b border-line bg-background py-20">
      <Container>
        <div className="h-3 w-48 animate-pulse bg-line" />
        <div className="mt-6 h-12 max-w-xl animate-pulse bg-line" />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="technical-card h-96 animate-pulse" />
          ))}
        </div>
      </Container>
    </section>
  );
}
