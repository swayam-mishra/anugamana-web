import { Loader2 } from 'lucide-react';

interface SubmitButtonProps {
  loading: boolean;
  disabled: boolean;
  onClick: () => void;
}

export function SubmitButton({ loading, disabled, onClick }: SubmitButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className="w-full md:w-auto px-12 py-4 bg-linear-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white rounded-full text-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 mx-auto shadow-lg hover:shadow-xl font-sans"
    >
      {loading ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Seeking...</span>
        </>
      ) : (
        <span>Seek Guidance</span>
      )}
    </button>
  );
}
