import { useQuery } from '@tanstack/react-query';
import { getVerseById } from '../api/search';

export function useVerseQuery(verseId: string) {
  return useQuery({
    queryKey: ['verse', verseId],
    queryFn: () => getVerseById(verseId),
    enabled: !!verseId,
    staleTime: 1000 * 60 * 60,
  });
}
