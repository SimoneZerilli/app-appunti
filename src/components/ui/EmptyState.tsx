interface EmptyStateProps {
  title: string;
  description?: string;
}

/** Messaggio vuoto chiaro in italiano, usato in tutte le liste. */
export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-1 rounded-xl border border-dashed border-border-soft py-10 text-center">
      <p className="text-sm font-medium text-zinc-300">{title}</p>
      {description && <p className="text-xs text-zinc-500">{description}</p>}
    </div>
  );
}
