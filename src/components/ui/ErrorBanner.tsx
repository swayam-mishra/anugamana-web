import { AlertCircle } from 'lucide-react';

interface ErrorBannerProps {
  message: string;
  variant?: 'error' | 'guardrail';
}

export function ErrorBanner({ message, variant = 'error' }: ErrorBannerProps) {
  const isGuardrail = variant === 'guardrail';
  return (
    <div
      className={`flex items-start gap-3 p-4 rounded-xl border ${
        isGuardrail
          ? 'bg-indigo-50 border-indigo-200 text-indigo-800'
          : 'bg-red-50 border-red-200 text-red-800'
      }`}
    >
      <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
      <p className="text-sm">{message}</p>
    </div>
  );
}
