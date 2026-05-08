import { Copy, RotateCcw, ThumbsUp, ThumbsDown, Send, Share2 } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'motion/react';
import { useFeedback } from '../../hooks/useFeedback';

interface VerseActionsProps {
  verseId: string;
  chapter: number;
  verse: number;
  devanagari: string;
  translation: string;
  onSearchAgain: () => void;
}

export function VerseActions({
  verseId,
  chapter,
  verse,
  devanagari,
  translation,
  onSearchAgain,
}: VerseActionsProps) {
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);
  const [feedbackExpanded, setFeedbackExpanded] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackSent, setFeedbackSent] = useState(false);
  const { submitRating, currentRating } = useFeedback(verseId);

  const handleCopy = () => {
    const text = `Bhagavad Gita ${chapter}.${verse}\n\n${devanagari}\n\n${translation}`;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleShare = () => {
    const url = `${window.location.origin}/verse/${verseId}`;
    navigator.clipboard.writeText(url).then(() => {
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    });
  };

  const handleLike = () => {
    submitRating(1);
    setFeedbackExpanded(false);
  };

  const handleDislike = () => {
    submitRating(-1);
    setFeedbackExpanded(true);
  };

  const handleSendFeedback = () => {
    if (!feedbackText.trim()) return;
    setFeedbackSent(true);
    setTimeout(() => {
      setFeedbackExpanded(false);
      setFeedbackText('');
      setFeedbackSent(false);
    }, 2000);
  };

  return (
    <div className="mt-6 pt-6 border-t border-orange-100">
      <div className="flex flex-wrap gap-3 items-center justify-between">
        <div className="flex gap-3">
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-5 py-2.5 bg-white border-2 border-orange-300 text-orange-700 rounded-full hover:bg-orange-50 transition-all font-medium text-sm"
          >
            <Copy className="w-4 h-4" />
            {copied ? 'Copied!' : 'Copy Verse'}
          </button>
          <button
            onClick={handleShare}
            aria-label="Share this verse"
            className="flex items-center gap-2 px-5 py-2.5 bg-white border-2 border-orange-300 text-orange-700 rounded-full hover:bg-orange-50 transition-all font-medium text-sm"
          >
            <Share2 className="w-4 h-4" />
            {shared ? 'Link copied!' : 'Share'}
          </button>
          <button
            onClick={onSearchAgain}
            className="flex items-center gap-2 px-5 py-2.5 bg-linear-to-r from-orange-600 to-orange-700 text-white rounded-full hover:from-orange-700 hover:to-orange-800 transition-all font-medium shadow-md text-sm"
          >
            <RotateCcw className="w-4 h-4" />
            Search Again
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleLike}
            aria-label="This verse was helpful"
            className={`p-2 rounded-full border transition-all ${
              currentRating === 1
                ? 'bg-orange-100 border-orange-400 text-orange-700'
                : 'bg-white border-gray-300 text-gray-500 hover:border-orange-300 hover:text-orange-600'
            }`}
          >
            <ThumbsUp className="w-4 h-4" />
          </button>
          <button
            onClick={handleDislike}
            aria-label="This verse was not helpful"
            className={`p-2 rounded-full border transition-all ${
              currentRating === -1
                ? 'bg-red-100 border-red-400 text-red-700'
                : 'bg-white border-gray-300 text-gray-500 hover:border-red-300 hover:text-red-600'
            }`}
          >
            <ThumbsDown className="w-4 h-4" />
          </button>
        </div>
      </div>

      {feedbackExpanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-4 pt-4 border-t border-orange-100"
        >
          <div className="flex gap-2">
            <input
              type="text"
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              placeholder="How can we improve this result?"
              className="flex-1 px-4 py-2 text-sm border border-orange-200 rounded-full focus:outline-none focus:border-orange-400 bg-orange-50/50"
              onKeyDown={(e) => e.key === 'Enter' && handleSendFeedback()}
            />
            <button
              onClick={handleSendFeedback}
              disabled={!feedbackText.trim() || feedbackSent}
              className="px-4 py-2 bg-orange-600 text-white rounded-full hover:bg-orange-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              {feedbackSent ? 'Sent!' : 'Send'}
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
