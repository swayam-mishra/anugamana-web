import { apiPost, apiPostForm } from './client';
import type { SearchRequest, SearchResponse } from './types';

export function searchVerses(req: SearchRequest): Promise<SearchResponse> {
  const body: Record<string, unknown> = {
    query: req.query,
    limit: req.limit,
    language: req.language,
  };
  if (req.chapter !== null) body.chapter = req.chapter;
  return apiPost<SearchResponse>('/search', body);
}

export function searchVoice(audio: Blob, language: string): Promise<SearchResponse> {
  const form = new FormData();
  form.append('audio', audio, 'recording.webm');
  form.append('language', language);
  return apiPostForm<SearchResponse>('/search/voice', form);
}

export function getVerseById(verseId: string): Promise<SearchResponse> {
  return apiPost<SearchResponse>('/search', { query: verseId, limit: 1, language: 'en' });
}
