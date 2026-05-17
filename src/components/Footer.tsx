import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="border-t border-orange-100 bg-white/50 backdrop-blur-sm mt-auto">
      <div className="container mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-sm text-gray-400">
          © {new Date().getFullYear()} Anugamana. All rights reserved.
        </p>
        <nav className="flex items-center gap-5 text-sm text-gray-400">
          <Link to="/about" className="hover:text-orange-700 transition-colors">
            About
          </Link>
          <Link to="/terms" className="hover:text-orange-700 transition-colors">
            Terms of Service
          </Link>
          <Link to="/privacy" className="hover:text-orange-700 transition-colors">
            Privacy Policy
          </Link>
        </nav>
      </div>
    </footer>
  );
}
