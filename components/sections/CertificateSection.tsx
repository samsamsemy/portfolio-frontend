import { CertificateCard } from "@/components/cards/CertificateCard";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SECTION_LABELS } from "@/lib/constants";
import type { Certificate } from "@/lib/types";

type CertificateSectionProps = {
  certificates: Certificate[];
};

export function CertificateSection({ certificates }: CertificateSectionProps) {
  return (
    <section id="certificates" className="border-b border-line bg-background py-16 sm:py-20 lg:py-24">
      <Container>
        <SectionHeader
          eyebrow={SECTION_LABELS.certificates}
          title="Certificates and learning proof"
          description="Certificates are loaded from Strapi and kept lightweight for fast reading."
        />
        <div className="mt-10">
          {certificates.length ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {certificates.map((certificate) => (
                <CertificateCard key={certificate.documentId ?? certificate.id} certificate={certificate} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="Certificates are not published"
              description="Publish active Certificates in Strapi Admin to show this grid."
            />
          )}
        </div>
      </Container>
    </section>
  );
}
