import { Info, ArrowLeft, Clock } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/react';

export function Header() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const showBack = pathname !== '/';

  return (
    <header className="border-b border-orange-200 bg-white/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {showBack && (
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-orange-700 hover:text-orange-900 transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Back</span>
            </button>
          )}
          <Link to="/" className="no-underline">
            <h1 className="text-2xl font-semibold text-orange-900">anugamana</h1>
          </Link>
        </div>

        <nav className="flex items-center gap-4">
          <a
            href="https://vedabase.io/en/library/bg/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:block text-sm text-orange-700 hover:text-orange-900 transition-colors"
          >
            Vedabase
          </a>
          <Link
            to="/about"
            className="flex items-center gap-1.5 text-sm text-orange-700 hover:text-orange-900 transition-colors"
          >
            <Info className="w-4 h-4" />
            <span className="hidden sm:inline">About</span>
          </Link>

          <Show when="signed-out">
            <SignInButton mode="modal">
              <button className="text-sm text-orange-700 hover:text-orange-900 transition-colors font-medium">
                Sign in
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="px-4 py-1.5 bg-orange-600 hover:bg-orange-700 text-white text-sm font-medium rounded-full transition-colors shadow-sm">
                Join waitlist
              </button>
            </SignUpButton>
          </Show>

          <Show when="signed-in">
            <Link
              to="/history"
              className="flex items-center gap-1.5 text-sm text-orange-700 hover:text-orange-900 transition-colors"
            >
              <Clock className="w-4 h-4" />
              <span className="hidden sm:inline">History</span>
            </Link>
            <UserButton afterSignOutUrl="/" />
          </Show>
        </nav>
      </div>
    </header>
  );
}
