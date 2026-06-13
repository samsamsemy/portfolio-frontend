type EmptyStateProps = {
  title: string;
  description?: string;
  compact?: boolean;
};

export function EmptyState({ title, description, compact = false }: EmptyStateProps) {
  return (
    <div
      className={`technical-card technical-grid flex flex-col items-start justify-center border-dashed ${
        compact ? "min-h-32 p-5" : "min-h-48 p-6 sm:p-8"
      }`}
    >
      <p className="font-mono text-xs uppercase text-gold-soft">No published data</p>
      <h3 className="mt-3 font-display text-2xl uppercase text-foreground">{title}</h3>
      {description ? <p className="mt-2 max-w-xl text-sm leading-6 text-muted">{description}</p> : null}
    </div>
  );
}
