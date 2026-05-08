import { useState, useRef, useEffect } from 'react';
import { SearchPanel } from '../components/SearchPanel';
import { ResultCard } from '../components/ResultCard';
import { QueryMetaBanner } from '../components/QueryMetaBanner';
import { LoadingState } from '../components/LoadingState';
import { ErrorBanner } from '../components/ui/ErrorBanner';
import { useSearch } from '../hooks/useSearch';

export function SearchPage() {
  const [query, setQuery] = useState('');
  const [language, setLanguage] = useState('en');
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);
  const searchMutation = useSearch();
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (searchMutation.data && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [searchMutation.data]);

  const handleSubmit = () => {
    if (!query.trim()) return;
    searchMutation.mutate({ query, chapter: selectedChapter, limit: 5, language });
  };

  const handleSearchAgain = () => {
    setQuery('');
    searchMutation.reset();
  };

  const isGuardrail = searchMutation.data?.query_meta.guardrail === 'irrelevant';

  return (
    <main className="container mx-auto px-4 py-8">
      <SearchPanel
        query={query}
        language={language}
        selectedChapter={selectedChapter}
        loading={searchMutation.isPending}
        onQueryChange={setQuery}
        onLanguageChange={setLanguage}
        onChapterChange={setSelectedChapter}
        onSubmit={handleSubmit}
      />

      {searchMutation.isPending && (
        <div className="mt-8">
          <LoadingState />
        </div>
      )}

      {searchMutation.isError && (
        <div className="max-w-4xl mx-auto mt-8">
          <ErrorBanner
            message={
              searchMutation.error instanceof Error
                ? searchMutation.error.message
                : 'Something went wrong. Please try again.'
            }
            variant="error"
          />
        </div>
      )}

      {searchMutation.data && !searchMutation.isPending && (
        <div className="mt-8" ref={resultsRef}>
          <QueryMetaBanner meta={searchMutation.data.query_meta} />

          {isGuardrail && (
            <div className="max-w-4xl mx-auto mb-6">
              <ErrorBanner
                message="This question may be outside the Gita's scope — here are the closest verses anyway."
                variant="guardrail"
              />
            </div>
          )}

          <div
            className="max-w-4xl mx-auto space-y-6"
            aria-live="polite"
            aria-label="Search results"
          >
            {searchMutation.data.results.map((result) => (
              <ResultCard
                key={result.verse_id}
                result={result}
                onSearchAgain={handleSearchAgain}
                userInput={query}
              />
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
