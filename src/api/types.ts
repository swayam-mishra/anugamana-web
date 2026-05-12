export interface SearchResult {
  verse_id: string;
  chapter: number;
  verse: number;
  devanagari: string;
  sanskrit: string;
  translation: string;
  score: number;
  verse_audio_url: string;
  guidance_audio_url: string;
  ai_guidance: string;
  ai_guidance_translated: string;
}

export interface QueryMeta {
  guardrail: 'relevant' | 'off_topic' | 'irrelevant' | 'borderline';
  query_route?: 'semantic' | 'direct_lookup' | 'sanskrit';
  retrieval_ms: number;
  rerank_ms: number;
  generation_ms: number;
  total_ms?: number;
  response_id: number | null;
  degraded_stages?: string[];
  confidence_filtered?: number;
  low_confidence?: boolean;
  // Phase 8 fields (Sarvam)
  detected_language?: string;
  original_query?: string;
  translated_query?: string;
  translation_ms?: number;
  tts_ms?: number;
}

export interface SearchResponse {
  results: SearchResult[];
  query_meta: QueryMeta;
}

export interface SearchRequest {
  query: string;
  chapter: number | null;
  limit: number;
  language: string;
}

export interface FeedbackRequest {
  response_id: number;
  verse_id: string;
  rating: 1 | -1;
}

export type AudioState = 'idle' | 'loading' | 'playing' | 'paused' | 'error';

export const LANGUAGE_NAMES: Record<string, string> = {
  en: 'English',
  hi: 'Hindi',
  bn: 'Bengali',
  ta: 'Tamil',
  te: 'Telugu',
  kn: 'Kannada',
  ml: 'Malayalam',
  gu: 'Gujarati',
  mr: 'Marathi',
  pa: 'Punjabi',
  sa: 'Sanskrit',
};
