import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { submitFeedback } from '../api/feedback';
import type { FeedbackRequest } from '../api/types';

export function useFeedback(verseId: string) {
  const [rating, setRating] = useState<1 | -1 | null>(null);

  const mutation = useMutation({
    mutationFn: (req: FeedbackRequest) => submitFeedback(req),
  });

  const submitRating = (value: 1 | -1) => {
    setRating(value);
    mutation.mutate({
      response_id: `${verseId}_${Date.now()}`,
      verse_id: verseId,
      rating: value,
    });
  };

  return {
    submitRating,
    currentRating: rating,
    isPending: mutation.isPending,
  };
}
