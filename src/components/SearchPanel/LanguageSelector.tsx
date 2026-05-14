import { LANGUAGE_NAMES } from '../../api/types';

const SUPPORTED_LANGUAGES = ['en', 'hi', 'bn', 'ta', 'te', 'kn', 'ml', 'gu', 'mr', 'pa', 'sa'];

interface LanguageSelectorProps {
  value: string;
  onChange: (v: string) => void;
  disabled: boolean;
}

export function LanguageSelector({ value, onChange, disabled }: LanguageSelectorProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className="px-4 py-2 rounded-lg bg-white/50 border border-orange-200 text-orange-900 text-sm focus:outline-none focus:border-orange-400 cursor-pointer hover:bg-white/80 transition-colors font-sans"
      aria-label="Response language"
    >
      {SUPPORTED_LANGUAGES.map((code) => (
        <option key={code} value={code}>
          {LANGUAGE_NAMES[code]}
        </option>
      ))}
    </select>
  );
}
