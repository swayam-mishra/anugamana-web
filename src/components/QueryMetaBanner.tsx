import { useState } from 'react';
import { ChevronDown, ChevronUp, AlertTriangle, Info } from 'lucide-react';
import type { QueryMeta } from '../api/types';
import { LanguageBadge } from './ui/LanguageBadge';

interface QueryMetaBannerProps {
  meta: QueryMeta;
}

const ROUTE_BADGE: Record<string, { label: string; className: string }> = {
  direct_lookup: { label: 'Direct lookup', className: 'bg-blue-100 text-blue-700 border-blue-200' },
  sanskrit: { label: 'Sanskrit', className: 'bg-orange-100 text-orange-700 border-orange-200' },
  semantic: { label: 'Semantic', className: 'bg-gray-100 text-gray-600 border-gray-200' },
};

export function QueryMetaBanner({ meta }: QueryMetaBannerProps) {
  const [showTiming, setShowTiming] = useState(false);

  const showLangBadge = meta.detected_language && meta.detected_language !== 'en';
  const showTranslation =
    meta.translated_query &&
    meta.original_query &&
    meta.translated_query !== meta.original_query;
  const hasTiming = meta.retrieval_ms > 0 || meta.rerank_ms > 0 || meta.generation_ms > 0;
  const routeBadge = meta.query_route ? ROUTE_BADGE[meta.query_route] : null;
  const isDegraded = (meta.degraded_stages?.length ?? 0) > 0;
  const isLowConfidence = meta.low_confidence;
  const totalMs = meta.total_ms ?? (meta.retrieval_ms + meta.rerank_ms + meta.generation_ms + (meta.translation_ms ?? 0));

  const hasAnything = showLangBadge || showTranslation || hasTiming || routeBadge || isDegraded || isLowConfidence;
  if (!hasAnything) return null;

  return (
    <div className="max-w-4xl mx-auto mb-6 space-y-2">
      <div className="p-3 bg-white/60 border border-orange-200 rounded-xl backdrop-blur-sm text-sm text-orange-800">
        <div className="flex flex-wrap items-center gap-2.5">
          {routeBadge && (
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${routeBadge.className}`}>
              {routeBadge.label}
            </span>
          )}

          {showLangBadge && <LanguageBadge code={meta.detected_language!} />}

          {showTranslation && (
            <span className="flex-1 text-xs">
              <span className="text-orange-600 font-medium">Original:</span> {meta.original_query}
              <span className="mx-2 text-orange-400">→</span>
              <span className="text-orange-600 font-medium">Translated:</span> {meta.translated_query}
            </span>
          )}

          {totalMs > 0 && (
            <span className="text-xs text-orange-500 ml-auto">
              {(totalMs / 1000).toFixed(1)}s
            </span>
          )}

          {hasTiming && (
            <button
              onClick={() => setShowTiming((v) => !v)}
              className="flex items-center gap-1 text-xs text-orange-400 hover:text-orange-600 transition-colors"
              aria-label={showTiming ? 'Hide pipeline timing' : 'Show pipeline timing'}
            >
              {showTiming ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
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
            {(meta.translation_ms ?? 0) > 0 && (
              <span className="px-2 py-0.5 bg-orange-100 rounded-full text-xs text-orange-700">
                translate {meta.translation_ms}ms
              </span>
            )}
          </div>
        )}
      </div>

      {isDegraded && (
        <div className="flex items-center gap-2 px-3 py-2 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-700">
          <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
          Some features unavailable (pipeline degraded: {meta.degraded_stages!.join(', ')})
        </div>
      )}

      {isLowConfidence && (
        <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-700">
          <Info className="w-3.5 h-3.5 shrink-0" />
          Results may not be strongly relevant to your question
        </div>
      )}
    </div>
  );
}
