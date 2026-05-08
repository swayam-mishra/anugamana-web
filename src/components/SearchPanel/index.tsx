import { motion } from 'motion/react';
import { QueryTextarea } from './QueryTextarea';
import { ChapterFilter } from './ChapterFilter';
import { LanguageSelector } from './LanguageSelector';
import { VoiceInputButton } from './VoiceInputButton';
import { SubmitButton } from './SubmitButton';

interface SearchPanelProps {
  query: string;
  language: string;
  selectedChapter: number | null;
  loading: boolean;
  onQueryChange: (v: string) => void;
  onLanguageChange: (v: string) => void;
  onChapterChange: (v: number | null) => void;
  onSubmit: () => void;
  showHeading?: boolean;
}

export function SearchPanel({
  query,
  language,
  selectedChapter,
  loading,
  onQueryChange,
  onLanguageChange,
  onChapterChange,
  onSubmit,
  showHeading = true,
}: SearchPanelProps) {
  return (
    <motion.div
      className="text-center max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {showHeading && (
        <>
          <h2 className="text-4xl md:text-5xl font-light text-orange-950 mb-4">
            Find clarity through the Bhagavad Gita
          </h2>
          <p className="text-lg text-orange-800 mb-8">
            Describe your current state of mind, confusion, or dilemma
          </p>
        </>
      )}

      <div className="space-y-4">
        <div className="flex justify-end gap-2 flex-wrap">
          <LanguageSelector value={language} onChange={onLanguageChange} disabled={loading} />
          <ChapterFilter value={selectedChapter} onChange={onChapterChange} disabled={loading} />
        </div>

        <div className="relative">
          <QueryTextarea
            value={query}
            onChange={onQueryChange}
            onSubmit={onSubmit}
            disabled={loading}
          />
          <div className="absolute bottom-3 right-3">
            <VoiceInputButton disabled={loading} />
          </div>
        </div>

        <SubmitButton loading={loading} disabled={!query.trim()} onClick={onSubmit} />

        {loading && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-orange-700 italic"
          >
            {selectedChapter
              ? `Scanning Chapter ${selectedChapter}...`
              : 'Scanning the wisdom of 700 verses...'}
          </motion.p>
        )}
      </div>
    </motion.div>
  );
}
