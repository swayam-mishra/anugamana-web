import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';
import { useVerseQuery } from '../hooks/useVerseQuery';
import { ResultCard } from '../components/ResultCard';
import { LoadingState } from '../components/LoadingState';
import { ErrorBanner } from '../components/ui/ErrorBanner';

export function VersePage() {
  const { id = '' } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useVerseQuery(id);
  const verse = data?.results[0];

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="max-w-4xl mx-auto mb-6">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm text-orange-700 hover:text-orange-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to search
        </Link>
      </div>

      {isLoading && <LoadingState />}

      {isError && (
        <div className="max-w-4xl mx-auto">
          <ErrorBanner message="Could not load this verse. Please try again." variant="error" />
        </div>
      )}

      {!isLoading && !isError && !verse && (
        <div className="max-w-4xl mx-auto">
          <ErrorBanner
            message={`Verse "${id}" not found. Try searching for it instead.`}
            variant="guardrail"
          />
        </div>
      )}

      {verse && (
        <div className="max-w-4xl mx-auto">
          <ResultCard
            result={verse}
            onSearchAgain={() => {}}
            userInput=""
          />
        </div>
      )}
    </motion.main>
  );
}
