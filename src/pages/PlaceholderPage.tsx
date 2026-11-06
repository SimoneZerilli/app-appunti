interface PlaceholderProps {
  title: string;
  description: string;
}

/** Segnaposto per le sezioni che arriveranno nelle milestone successive. */
export function PlaceholderPage({ title, description }: PlaceholderProps) {
  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="rounded-xl border border-dashed border-border-soft py-12 text-center">
        <p className="text-sm font-medium text-zinc-300">{description}</p>
        <p className="mt-1 text-xs text-zinc-500">Questa sezione arriverà in una prossima milestone.</p>
      </div>
    </div>
  );
}
