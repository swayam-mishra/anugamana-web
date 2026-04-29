import { Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
import { useState, useEffect } from 'react';

type AppState = 'idle' | 'loading' | 'result';

interface HeroSectionProps {
  state: AppState;
  userInput: string;
  onInputChange: (value: string) => void;
  onSeekGuidance: () => void;
  // New props for filtering
  selectedChapter: number | null;
  onChapterChange: (chapter: number | null) => void;
}

const EXAMPLE_PROMPTS = [
  "I'm seeking purpose and direction in my life...",
  "I feel overwhelmed by too many choices and decisions...",
  "I'm struggling to let go of past mistakes...",
  "I want to find inner peace and calm my anxious mind...",
  "I'm unsure which path to take in my career...",
];

export function HeroSection({
  state,
  userInput,
  onInputChange,
  onSeekGuidance,
  selectedChapter,
  onChapterChange,
}: HeroSectionProps) {
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % EXAMPLE_PROMPTS.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      onSeekGuidance();
    }
  };

  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl md:text-5xl font-light text-orange-950 mb-4">
          Find clarity through the Bhagavad Gita
        </h2>
        <p className="text-lg text-orange-800 mb-8">
          Describe your current state of mind, confusion, or dilemma
        </p>
      </motion.div>

      <div className="space-y-4">
        {/* Chapter Filter Dropdown */}
        <div className="flex justify-end">
          <select
            value={selectedChapter || ""}
            onChange={(e) => {
              const val = e.target.value;
              onChapterChange(val ? parseInt(val) : null);
            }}
            disabled={state === 'loading'}
            className="px-4 py-2 rounded-lg bg-white/50 border border-orange-200 text-orange-900 text-sm focus:outline-none focus:border-orange-400 cursor-pointer hover:bg-white/80 transition-colors"
          >
            <option value="">All Chapters (Entire Gita)</option>
            {Array.from({ length: 18 }, (_, i) => i + 1).map((num) => (
              <option key={num} value={num}>
                Chapter {num}
              </option>
            ))}
          </select>
        </div>

        {/* Input Area */}
        <div className="relative">
          <textarea
            value={userInput}
            onChange={(e) => onInputChange(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={state === 'loading'}
            placeholder={EXAMPLE_PROMPTS[placeholderIndex]}
            className="w-full h-40 px-6 py-4 rounded-2xl border-2 border-orange-200 focus:border-orange-400 focus:outline-none resize-none text-lg bg-white/80 backdrop-blur-sm disabled:bg-gray-100 disabled:text-gray-500 transition-all placeholder:transition-opacity placeholder:duration-500"
            aria-label="Describe your dilemma"
          />
        </div>

        <button
          onClick={onSeekGuidance}
          disabled={state === 'loading' || !userInput.trim()}
          className="w-full md:w-auto px-12 py-4 bg-linear-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white rounded-full text-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 mx-auto shadow-lg hover:shadow-xl"
        >
          {state === 'loading' ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Analyzing...</span>
            </>
          ) : (
            <span>Seek Guidance</span>
          )}
        </button>

        {state === 'loading' && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-orange-700 italic"
          >
            {selectedChapter 
              ? `Scanning Chapter ${selectedChapter}...` 
              : "Scanning the wisdom of 700 verses..."}
          </motion.p>
        )}
      </div>
    </motion.div>
  );
}