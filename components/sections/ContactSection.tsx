import { BriefcaseBusiness, Camera, CodeXml, Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SECTION_LABELS } from "@/lib/constants";
import { compactText } from "@/lib/format";
import type { ContactInfo, PortfolioProfile } from "@/lib/types";

type ContactSectionProps = {
  contact: ContactInfo | null;
  profile: PortfolioProfile | null;
};

export function ContactSection({ contact, profile }: ContactSectionProps) {
  const email = contact?.email ?? profile?.email;
  const githubUrl = contact?.githubUrl ?? profile?.githubUrl;
  const linkedinUrl = contact?.linkedinUrl ?? profile?.linkedinUrl;
  const instagramUrl = contact?.instagramUrl ?? profile?.instagramUrl;
  const whatsappUrl = contact?.whatsappUrl ?? profile?.whatsappUrl;

  const hasContact = email || githubUrl || linkedinUrl || instagramUrl || whatsappUrl;

  return (
    <section id="contact" className="technical-grid bg-section py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <SectionHeader
            eyebrow={SECTION_LABELS.contact}
            title={compactText(contact?.title, "Send the next signal")}
            description={compactText(
              contact?.description,
              "Use the available links to discuss collaboration, recruitment, academic review, or freelance work.",
            )}
          />
          {hasContact ? (
            <div className="technical-card grid gap-3 p-5 sm:grid-cols-2">
              {email ? (
                <Button href={`mailto:${email}`} variant="secondary" className="justify-start">
                  <Mail size={16} aria-hidden="true" />
                  Email
                </Button>
              ) : null}
              <Button href={githubUrl ?? ""} variant="secondary" external className="justify-start">
                <CodeXml size={16} aria-hidden="true" />
                GitHub
              </Button>
              <Button href={linkedinUrl ?? ""} variant="secondary" external className="justify-start">
                <BriefcaseBusiness size={16} aria-hidden="true" />
                LinkedIn
              </Button>
              <Button href={instagramUrl ?? ""} variant="secondary" external className="justify-start">
                <Camera size={16} aria-hidden="true" />
                Instagram
              </Button>
              <Button href={whatsappUrl ?? ""} variant="secondary" external className="justify-start">
                <MessageCircle size={16} aria-hidden="true" />
                WhatsApp
              </Button>
            </div>
          ) : (
            <EmptyState
              title="Contact links are not published"
              description="Publish Contact Info or Portfolio Profile links in Strapi Admin."
              compact
            />
          )}
        </div>
      </Container>
    </section>
  );
}
