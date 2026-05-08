import { ExternalLink } from 'lucide-react';
import { ScorePill } from '../ui/ScorePill';

interface VerseHeaderProps {
  chapter: number;
  verse: number;
  score: number;
}

export function VerseHeader({ chapter, verse, score }: VerseHeaderProps) {
  return (
    <div className="bg-linear-to-r from-orange-100 to-amber-100 px-6 py-4 border-b border-orange-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div>
            <p className="text-xs font-medium text-orange-700 mb-0.5">Recommended Verse</p>
            <h3 className="text-xl font-semibold text-orange-950">
              Chapter {chapter}, Verse {verse}
            </h3>
          </div>
          <ScorePill score={score} />
        </div>
        <a
          href={`https://vedabase.io/en/library/bg/${chapter}/${verse}/`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-orange-700 hover:text-orange-900 transition-colors"
          aria-label="View on Vedabase"
        >
          <ExternalLink className="w-5 h-5" />
        </a>
      </div>
    </div>
  );
}
