type BlueprintPlaceholderProps = {
  label: string;
  className?: string;
};

export function BlueprintPlaceholder({ label, className = "" }: BlueprintPlaceholderProps) {
  return (
    <div
      role="img"
      aria-label={label}
      className={`technical-grid relative flex aspect-[16/10] min-h-48 items-center justify-center overflow-hidden border border-line bg-card ${className}`}
    >
      <div className="absolute inset-4 border border-line" />
      <div className="absolute left-4 top-4 h-6 w-6 border-l border-t border-gold" />
      <div className="absolute bottom-4 right-4 h-6 w-6 border-b border-r border-gold" />
      <div className="px-6 text-center">
        <p className="font-mono text-xs uppercase text-gold-soft">Image pending</p>
        <p className="mt-2 font-display text-2xl uppercase text-foreground">{label}</p>
      </div>
    </div>
  );
}
