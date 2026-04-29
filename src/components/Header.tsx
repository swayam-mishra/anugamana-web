import { Info, ArrowLeft } from 'lucide-react';

interface HeaderProps {
  showBackButton?: boolean;
  onBack?: () => void;
}

export function Header({ showBackButton = false, onBack }: HeaderProps) {
  return (
    <header className="border-b border-orange-200 bg-white/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {showBackButton && (
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-orange-700 hover:text-orange-900 transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Back</span>
            </button>
          )}
          <div>
            <h1 className="text-2xl font-semibold text-orange-900">
              anugamana
            </h1>
          </div>
        </div>
        
        <nav className="flex items-center gap-6">
          <a
            href="https://vedabase.io/en/library/bg/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-orange-700 hover:text-orange-900 transition-colors"
          >
            Vedabase Source
          </a>
          <button
            className="flex items-center gap-2 text-sm text-orange-700 hover:text-orange-900 transition-colors"
            aria-label="About Project"
          >
            <Info className="w-4 h-4" />
            <span className="hidden sm:inline">About</span>
          </button>
        </nav>
      </div>
    </header>
  );
}