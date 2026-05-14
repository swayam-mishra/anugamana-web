import { useEffect, useState } from 'react';

const EXAMPLE_PROMPTS = [
  "I'm seeking purpose and direction in my life...",
  'I feel overwhelmed by too many choices and decisions...',
  "I'm struggling to let go of past mistakes...",
  'I want to find inner peace and calm my anxious mind...',
  "I'm unsure which path to take in my career...",
];

interface QueryTextareaProps {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  disabled: boolean;
}

export function QueryTextarea({ value, onChange, onSubmit, disabled }: QueryTextareaProps) {
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setPlaceholderIndex((i) => (i + 1) % EXAMPLE_PROMPTS.length);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) onSubmit();
      }}
      disabled={disabled}
      placeholder={EXAMPLE_PROMPTS[placeholderIndex]}
      className="w-full h-40 px-6 py-4 rounded-2xl border-2 border-orange-200 focus:border-orange-400 focus:outline-none resize-none text-lg bg-white/80 backdrop-blur-sm disabled:bg-gray-100 disabled:text-gray-500 transition-all placeholder:transition-opacity placeholder:duration-500 font-sans"
      aria-label="Describe your dilemma"
    />
  );
}
