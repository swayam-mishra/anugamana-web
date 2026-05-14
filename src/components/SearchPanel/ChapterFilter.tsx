interface ChapterFilterProps {
  value: number | null;
  onChange: (v: number | null) => void;
  disabled: boolean;
}

export function ChapterFilter({ value, onChange, disabled }: ChapterFilterProps) {
  return (
    <select
      value={value ?? ''}
      onChange={(e) => {
        const v = e.target.value;
        onChange(v ? parseInt(v) : null);
      }}
      disabled={disabled}
      className="px-4 py-2 rounded-lg bg-white/50 border border-orange-200 text-orange-900 text-sm focus:outline-none focus:border-orange-400 cursor-pointer hover:bg-white/80 transition-colors font-sans"
    >
      <option value="">All Chapters</option>
      {Array.from({ length: 18 }, (_, i) => i + 1).map((n) => (
        <option key={n} value={n}>
          Chapter {n}
        </option>
      ))}
    </select>
  );
}
