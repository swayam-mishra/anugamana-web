interface ScorePillProps {
  score: number;
}

export function ScorePill({ score }: ScorePillProps) {
  const pct = Math.round(score * 100);
  return (
    <span className="px-2.5 py-1 bg-orange-100 border border-orange-300 rounded-full text-xs font-medium text-orange-800">
      {pct}% match
    </span>
  );
}
