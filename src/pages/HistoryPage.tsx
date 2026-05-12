import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@clerk/react';
import { RedirectToSignIn } from '@clerk/react';
import { motion } from 'motion/react';
import { Clock, Search, Trash2, RotateCcw } from 'lucide-react';
import { getHistory, clearHistory, type HistoryItem } from '../lib/history';

function formatRelativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60_000);
  const hours = Math.floor(diff / 3_600_000);
  const days = Math.floor(diff / 86_400_000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
}

export function HistoryPage() {
  const { isSignedIn, isLoaded } = useAuth();
  const navigate = useNavigate();
  const [items, setItems] = useState<HistoryItem[]>(() => getHistory());

  if (!isLoaded) return null;
  if (!isSignedIn) return <RedirectToSignIn />;

  const handleSearchAgain = (query: string) => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  const handleClear = () => {
    clearHistory();
    setItems([]);
  };

  return (
    <main className="container mx-auto px-4 py-10 max-w-2xl">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-orange-700" />
          <h1 className="text-2xl font-semibold text-orange-950">Search History</h1>
        </div>
        {items.length > 0 && (
          <button
            onClick={handleClear}
            className="flex items-center gap-1.5 text-sm text-red-500 hover:text-red-700 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Clear all
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-20 text-orange-700/60"
        >
          <Search className="w-10 h-10 mx-auto mb-3 opacity-40" />
          <p className="text-sm">Your search history will appear here.</p>
        </motion.div>
      ) : (
        <ul className="space-y-3">
          {items.map((item, i) => (
            <motion.li
              key={`${item.query}-${item.timestamp}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className="flex items-center justify-between gap-4 p-4 bg-white border border-orange-100 rounded-xl hover:border-orange-300 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-800 truncate">{item.query}</p>
                <p className="text-xs text-orange-500 mt-0.5">{formatRelativeTime(item.timestamp)}</p>
              </div>
              <button
                onClick={() => handleSearchAgain(item.query)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-orange-700 border border-orange-300 rounded-full hover:bg-orange-50 transition-colors shrink-0"
              >
                <RotateCcw className="w-3 h-3" />
                Search again
              </button>
            </motion.li>
          ))}
        </ul>
      )}
    </main>
  );
}
