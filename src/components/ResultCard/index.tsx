import { memo } from 'react';
import { motion } from 'motion/react';
import type { SearchResult } from '../../api/types';
import { VerseHeader } from './VerseHeader';
import { DevanagariBlock } from './DevanagariBlock';
import { SanskritBlock } from './SanskritBlock';
import { SectionDivider } from '../ui/SectionDivider';
import { TranslationBlock } from './TranslationBlock';
import { GuidancePanel } from './GuidancePanel';
import { VerseActions } from './VerseActions';

interface ResultCardProps {
  result: SearchResult;
  onSearchAgain: () => void;
  userInput: string;
}

export const ResultCard = memo(function ResultCard({ result, onSearchAgain, userInput }: ResultCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-2xl overflow-hidden shadow-xl border border-orange-100"
    >
      <VerseHeader chapter={result.chapter} verse={result.verse} score={result.score} />

      <div className="bg-white p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <DevanagariBlock devanagari={result.devanagari} />
            <SanskritBlock sanskrit={result.sanskrit} />
            <SectionDivider />
            <div className="mt-6">
              <TranslationBlock translation={result.translation} userInput={userInput} />
            </div>
            <VerseActions
              verseId={result.verse_id}
              chapter={result.chapter}
              verse={result.verse}
              devanagari={result.devanagari}
              translation={result.translation}
              onSearchAgain={onSearchAgain}
            />
          </div>

          <div>
            <GuidancePanel
              aiGuidance={result.ai_guidance}
              aiGuidanceTranslated={result.ai_guidance_translated}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
});
