import { Mic } from 'lucide-react';

interface VoiceInputButtonProps {
  disabled: boolean;
}

export function VoiceInputButton({ disabled }: VoiceInputButtonProps) {
  return (
    <button
      disabled={disabled}
      aria-label="Voice search (coming soon)"
      title="Voice search — coming soon"
      className="p-2.5 rounded-full border-2 border-orange-200 bg-white/80 text-orange-300 opacity-60 cursor-not-allowed"
    >
      <Mic className="w-4 h-4" />
    </button>
  );
}
