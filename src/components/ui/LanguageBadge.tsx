import { LANGUAGE_NAMES } from '../../api/types';

interface LanguageBadgeProps {
  code: string;
}

export function LanguageBadge({ code }: LanguageBadgeProps) {
  const name = LANGUAGE_NAMES[code] ?? code.toUpperCase();
  return (
    <span className="px-2.5 py-1 bg-indigo-100 border border-indigo-300 rounded-full text-xs font-medium text-indigo-800">
      {name} detected
    </span>
  );
}
