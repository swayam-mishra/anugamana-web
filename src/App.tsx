import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ResultCard } from './components/ResultCard';
const fetchVerses = async ({ query, chapter }: { query: string; chapter: number | null }) => {
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8000";
  const body: Record<string, unknown> = { query, limit: 1 };
  if (chapter) body.chapter = chapter;

  const response = await fetch(`${apiUrl}/search`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

function App() {
  const [query, setQuery] = useState('');
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);

  // React Query useMutation handles all the heavy lifting
  const searchMutation = useMutation({
    mutationFn: fetchVerses,
  });

  const handleSeekGuidance = () => {
    if (!query.trim()) return;
    searchMutation.mutate({ query, chapter: selectedChapter });
  };

  const handleSearchAgain = () => {
    setQuery('');
    searchMutation.reset();
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <HeroSection
          state={searchMutation.isPending ? 'loading' : 'idle'}
          userInput={query}
          onInputChange={setQuery}
          onSeekGuidance={handleSeekGuidance}
          selectedChapter={selectedChapter}
          onChapterChange={setSelectedChapter}
        />

        {/* Status Messages */}
        {searchMutation.isError && (
          <div className="text-red-500 text-center mb-8">
            An error occurred: {searchMutation.error.message}
          </div>
        )}

        {/* Results */}
        <div className="max-w-4xl mx-auto space-y-6">
          {searchMutation.data?.results?.map((result: any, index: number) => {
            const interpretation = result.metadata?.ai_advice
              ?? 'Reflect on this verse — its wisdom speaks directly to your situation.';

            return (
              <ResultCard
                key={index}
                verse={{
                  chapter: result.metadata?.chapter,
                  verse: result.metadata?.verse,
                  sanskrit: result.metadata?.text || '',
                  transliteration: '',
                  synonyms: '',
                  translation: result.metadata?.translation || '',
                  purport: result.metadata?.meaning || '',
                  interpretation,
                  keywords: [],
                }}
                onSearchAgain={handleSearchAgain}
                userInput={query}
              />
            );
          })}
        </div>
      </main>
    </div>
  );
}

export default App;