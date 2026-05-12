const HISTORY_KEY = 'anugamana_history';
const MAX_ITEMS = 50;

export interface HistoryItem {
  query: string;
  timestamp: string;
  verse_id?: string;
}

export function addToHistory(query: string, topVerseId?: string) {
  const history = getHistory();
  const item: HistoryItem = {
    query,
    timestamp: new Date().toISOString(),
    verse_id: topVerseId,
  };
  const updated = [item, ...history.filter((h) => h.query !== query)].slice(0, MAX_ITEMS);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
}

export function getHistory(): HistoryItem[] {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]') as HistoryItem[];
  } catch {
    return [];
  }
}

export function clearHistory() {
  localStorage.removeItem(HISTORY_KEY);
}
