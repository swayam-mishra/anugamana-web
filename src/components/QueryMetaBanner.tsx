import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import type { QueryMeta } from '../api/types';
import { LanguageBadge } from './ui/LanguageBadge';

interface QueryMetaBannerProps {
  meta: QueryMeta;
}

export function QueryMetaBanner({ meta }: QueryMetaBannerProps) {
  const [showTiming, setShowTiming] = useState(false);

  const showBadge = meta.detected_language && meta.detected_language !== 'en';
  const showTranslation =
    meta.translated_query &&
    meta.original_query &&
    meta.translated_query !== meta.original_query;
  const hasTiming = meta.retrieval_ms > 0 || meta.rerank_ms > 0 || meta.generation_ms > 0;

  if (!showBadge && !showTranslation && !hasTiming) return null;

  return (
    <div className="max-w-4xl mx-auto mb-6 p-3 bg-white/60 border border-orange-200 rounded-xl backdrop-blur-sm text-sm text-orange-800">
      <div className="flex flex-wrap items-center gap-3">
        {showBadge && <LanguageBadge code={meta.detected_language} />}

        {showTranslation && (
          <span className="flex-1">
            <span className="text-orange-600 font-medium">Original:</span> {meta.original_query}
            <span className="mx-2 text-orange-400">→</span>
            <span className="text-orange-600 font-medium">Translated:</span>{' '}
            {meta.translated_query}
          </span>
        )}

        {hasTiming && (
          <button
            onClick={() => setShowTiming((v) => !v)}
            className="ml-auto flex items-center gap-1 text-xs text-orange-500 hover:text-orange-700 transition-colors"
            aria-label={showTiming ? 'Hide pipeline timing' : 'Show pipeline timing'}
          >
            {showTiming ? (
              <>
                Hide timing <ChevronUp className="w-3 h-3" />
              </>
            ) : (
              <>
                Show timing <ChevronDown className="w-3 h-3" />
              </>
            )}
          </button>
        )}
      </div>

      {showTiming && hasTiming && (
        <div className="mt-2 pt-2 border-t border-orange-100 flex flex-wrap gap-2">
          {meta.retrieval_ms > 0 && (
            <span className="px-2 py-0.5 bg-orange-100 rounded-full text-xs text-orange-700">
              retrieve {meta.retrieval_ms}ms
            </span>
          )}
          {meta.rerank_ms > 0 && (
            <span className="px-2 py-0.5 bg-orange-100 rounded-full text-xs text-orange-700">
              rerank {meta.rerank_ms}ms
            </span>
          )}
          {meta.generation_ms > 0 && (
            <span className="px-2 py-0.5 bg-orange-100 rounded-full text-xs text-orange-700">
              generate {meta.generation_ms}ms
            </span>
          )}
          {meta.translation_ms > 0 && (
            <span className="px-2 py-0.5 bg-orange-100 rounded-full text-xs text-orange-700">
              translate {meta.translation_ms}ms
            </span>
          )}
        </div>
      )}
    </div>
  );
}
