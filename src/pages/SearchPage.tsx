import { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchPanel } from '../components/SearchPanel';
import { ResultCard } from '../components/ResultCard';
import { QueryMetaBanner } from '../components/QueryMetaBanner';
import { LoadingState } from '../components/LoadingState';
import { ErrorBanner } from '../components/ui/ErrorBanner';
import { useSearch } from '../hooks/useSearch';
import { addToHistory } from '../lib/history';

const TOP_K_OPTIONS = [1, 3, 5] as const;

export function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(() => searchParams.get('q') ?? '');
  const [language, setLanguage] = useState('en');
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);
  const [topK, setTopK] = useState<1 | 3 | 5>(3);
  const searchMutation = useSearch();
  const resultsRef = useRef<HTMLDivElement>(null);
  const didInitialSearch = useRef(false);

  // Auto-search on mount if ?q= is present
  useEffect(() => {
    const q = searchParams.get('q');
    if (q && !didInitialSearch.current) {
      didInitialSearch.current = true;
      searchMutation.mutate({ query: q, chapter: null, limit: topK, language: 'en' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (searchMutation.data && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [searchMutation.data]);

  const handleSubmit = () => {
    if (!query.trim()) return;
    setSearchParams({ q: query });
    searchMutation.mutate({ query, chapter: selectedChapter, limit: topK, language });
    addToHistory(query);
  };

  // Save top verse to history once results arrive
  useEffect(() => {
    if (searchMutation.data?.results[0]) {
      const q = searchParams.get('q') ?? query;
      addToHistory(q, searchMutation.data.results[0].verse_id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchMutation.data]);

  const handleSearchAgain = () => {
    setQuery('');
    setSearchParams({});
    searchMutation.reset();
  };

  const isGuardrail =
    searchMutation.data?.query_meta.guardrail === 'irrelevant' ||
    searchMutation.data?.query_meta.guardrail === 'off_topic';

  const responseId = searchMutation.data?.query_meta.response_id ?? null;

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

      {/* top_k selector */}
      <div className="max-w-2xl mx-auto mt-3 flex justify-end items-center gap-2 text-xs text-orange-700">
        <span>Results:</span>
        {TOP_K_OPTIONS.map((k) => (
          <button
            key={k}
            onClick={() => setTopK(k)}
            className={`px-2.5 py-1 rounded-full border transition-colors ${
              topK === k
                ? 'bg-orange-600 text-white border-orange-600'
                : 'bg-white border-orange-300 hover:border-orange-500'
            }`}
          >
            {k}
          </button>
        ))}
      </div>

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

          {searchMutation.data.results.length === 0 && (
            <div className="max-w-4xl mx-auto">
              <ErrorBanner
                message="No matching verses found. Try rephrasing your question."
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
                responseId={responseId}
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
