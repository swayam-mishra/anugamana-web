interface DevanagariBlockProps {
  devanagari: string;
}

export function DevanagariBlock({ devanagari }: DevanagariBlockProps) {
  if (!devanagari?.trim()) return null;
  return (
    <div className="text-center mb-6">
      <p className="text-xl md:text-2xl leading-relaxed text-orange-950 font-serif whitespace-pre-line">
        {devanagari}
      </p>
    </div>
  );
}
