import { ServiceCard } from "@/components/cards/ServiceCard";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SECTION_LABELS } from "@/lib/constants";
import type { Service } from "@/lib/types";

type ServiceSectionProps = {
  services: Service[];
};

export function ServiceSection({ services }: ServiceSectionProps) {
  return (
    <section id="services" className="border-b border-line bg-section py-16 sm:py-20 lg:py-24">
      <Container>
        <SectionHeader
          eyebrow={SECTION_LABELS.services}
          title="What I can build and support"
          description="A focused service list for web, dashboard, testing, and UI implementation work."
        />
        <div className="mt-10">
          {services.length ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {services.map((service) => (
                <ServiceCard key={service.documentId ?? service.id} service={service} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="Services are not published"
              description="Publish active Services in Strapi Admin to show this section."
            />
          )}
        </div>
      </Container>
    </section>
  );
}
