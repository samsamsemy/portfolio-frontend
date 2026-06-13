import { Badge } from "@/components/ui/Badge";
import { compactText } from "@/lib/format";
import type { Service } from "@/lib/types";

type ServiceCardProps = {
  service: Service;
};

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <article className="technical-card h-full p-5">
      <Badge>{compactText(service.icon, "Service")}</Badge>
      <h3 className="mt-4 font-display text-2xl uppercase text-foreground">
        {compactText(service.title, "Untitled Service")}
      </h3>
      <p className="mt-3 text-sm leading-6 text-muted">
        {compactText(service.description, "Service description has not been published yet.")}
      </p>
    </article>
  );
}
