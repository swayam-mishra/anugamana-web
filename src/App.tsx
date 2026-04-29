import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ResultCard } from './components/ResultCard';
// Define the API call function outside the component
const fetchVerses = async (searchQuery: string) => {
  // Use your actual backend URL (from Vercel/Render/HF) or localhost for dev
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8000";
  
  const response = await fetch(`${apiUrl}/search`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: searchQuery, limit: 5 }),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
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
    searchMutation.mutate(query);
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
            const rawEmotions = result.metadata?.emotions || "";
            const emotionTags = rawEmotions.split(',').map((s: string) => s.trim()).filter(Boolean);
            const aiAdvice = result.metadata?.ai_advice;
            const interpretation = aiAdvice
              ? aiAdvice
              : (emotionTags.length > 0
                  ? `This verse specifically addresses feelings of ${emotionTags[0]} and offers spiritual guidance on how to navigate them.`
                  : 'This verse resonates with your current state of mind. Reflect on its meaning to find clarity.');

            return (
              <ResultCard
                key={index}
                verse={{
                  chapter: result.metadata?.chapter,
                  verse: result.metadata?.verse,
                  sanskrit: result.metadata?.sanskrit,
                  transliteration: result.metadata?.transliteration || '',
                  synonyms: result.metadata?.synonyms || '',
                  translation: result.metadata?.translation || result.text,
                  purport: result.metadata?.purport || '',
                  interpretation,
                  keywords: emotionTags,
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