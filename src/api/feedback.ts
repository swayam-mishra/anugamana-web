import { apiPost } from './client';
import type { FeedbackRequest } from './types';

export function submitFeedback(req: FeedbackRequest): Promise<void> {
  return apiPost('/feedback', req);
}
