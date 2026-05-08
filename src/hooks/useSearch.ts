import { useMutation } from '@tanstack/react-query';
import { searchVerses } from '../api/search';
import type { SearchRequest } from '../api/types';

export function useSearch() {
  return useMutation({
    mutationFn: (req: SearchRequest) => searchVerses(req),
  });
}
