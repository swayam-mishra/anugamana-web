interface SanskritBlockProps {
  sanskrit: string;
}

export function SanskritBlock({ sanskrit }: SanskritBlockProps) {
  if (!sanskrit?.trim()) return null;
  return (
    <div className="text-center mb-6">
      <p className="text-base md:text-lg leading-relaxed text-orange-800 italic whitespace-pre-line">
        {sanskrit}
      </p>
    </div>
  );
}
