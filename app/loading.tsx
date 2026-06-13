import { Container } from "@/components/ui/Container";

export default function Loading() {
  return (
    <section className="technical-grid min-h-screen py-24">
      <Container>
        <div className="technical-card h-96 animate-pulse p-6">
          <div className="h-3 w-44 bg-line" />
          <div className="mt-8 h-16 max-w-3xl bg-line" />
          <div className="mt-6 h-4 max-w-2xl bg-line" />
          <div className="mt-3 h-4 max-w-xl bg-line" />
        </div>
      </Container>
    </section>
  );
}
