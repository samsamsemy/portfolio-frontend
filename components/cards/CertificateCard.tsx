import { ExternalLink } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/Badge";
import { BlueprintPlaceholder } from "@/components/ui/BlueprintPlaceholder";
import { Button } from "@/components/ui/Button";
import { compactText } from "@/lib/format";
import { getMediaAlt, getMediaUrl } from "@/lib/strapi";
import type { Certificate } from "@/lib/types";

type CertificateCardProps = {
  certificate: Certificate;
};

export function CertificateCard({ certificate }: CertificateCardProps) {
  const imageUrl = getMediaUrl(certificate.certificateImage);
  const title = compactText(certificate.title, "Untitled Certificate");
  const skills = certificate.skills?.filter((skill) => skill.name).slice(0, 4) ?? [];

  return (
    <article className="technical-card flex h-full flex-col overflow-hidden">
      {imageUrl ? (
        <div className="relative aspect-[16/10] border-b border-line bg-card-raised">
          <Image
            src={imageUrl}
            alt={getMediaAlt(certificate.certificateImage, `${title} certificate image`)}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      ) : (
        <BlueprintPlaceholder label="Certificate" className="border-0 border-b border-line" />
      )}

      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center gap-2">
          <Badge>{compactText(certificate.issuer, "Issuer")}</Badge>
          {certificate.year ? (
            <span className="font-mono text-xs uppercase text-subtle">{certificate.year}</span>
          ) : null}
        </div>
        <h3 className="mt-4 font-display text-2xl uppercase text-foreground">{title}</h3>
        {certificate.description ? (
          <p className="mt-3 text-sm leading-6 text-muted">{certificate.description}</p>
        ) : null}
        {skills.length ? (
          <div className="mt-5 flex flex-wrap gap-2">
            {skills.map((skill) => (
              <Badge key={`${certificate.id}-${skill.name}`}>{skill.name}</Badge>
            ))}
          </div>
        ) : null}
        <div className="mt-auto pt-6">
          <Button href={certificate.certificateUrl ?? ""} variant="secondary" external>
            <ExternalLink size={15} aria-hidden="true" />
            View Credential
          </Button>
        </div>
      </div>
    </article>
  );
}
