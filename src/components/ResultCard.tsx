import { Copy, RotateCcw, ExternalLink, Sparkles, Heart, RefreshCw, Send } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

interface Verse {
  chapter: number;
  verse: number;
  sanskrit: string;
  transliteration: string;
  synonyms: string;
  translation: string;
  purport: string;
  interpretation: string;
  keywords: string[];
}

interface ResultCardProps {
  verse: Verse;
  onSearchAgain: () => void;
  userInput: string;
}

export function ResultCard({ verse, onSearchAgain, userInput }: ResultCardProps) {
  const [copied, setCopied] = useState(false);
  const [feedbackExpanded, setFeedbackExpanded] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  const [liked, setLiked] = useState(false);
  const [feedbackSent, setFeedbackSent] = useState(false);

  // Helper to safely check if string has content
  const hasContent = (str: string | undefined) => str && str.trim().length > 0;

  const handleCopy = () => {
    const textToCopy = `Bhagavad Gita ${verse.chapter}.${verse.verse}\n\n${verse.sanskrit}\n\n${verse.translation}`;
    
    const textArea = document.createElement('textarea');
    textArea.value = textToCopy;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      document.execCommand('copy');
      textArea.remove();
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
      textArea.remove();
    }
  };

  const handleLike = () => {
    setLiked(true);
    setFeedbackExpanded(false);
    console.log('User liked the verse');
  };

  const handleDislike = () => {
    setLiked(false);
    setFeedbackExpanded(true);
  };

  const handleSendFeedback = () => {
    if (!feedbackText.trim()) return;
    console.log('Feedback:', feedbackText);
    setFeedbackSent(true);
    setTimeout(() => {
      setFeedbackExpanded(false);
      setFeedbackText('');
      setFeedbackSent(false);
    }, 2000);
  };

  const highlightKeywords = (text: string) => {
    const inputLower = userInput.toLowerCase();
    const words = text.split(' ');
    
    return words.map((word, index) => {
      const cleanWord = word.toLowerCase().replace(/[.,!?;:]/g, '');
      const isMatch = verse.keywords.some(keyword => 
        cleanWord.includes(keyword.toLowerCase()) || 
        inputLower.includes(cleanWord)
      );
      
      if (isMatch) {
        return (
          <span key={index} className="bg-orange-200 px-1 rounded">
            {word}{' '}
          </span>
        );
      }
      return word + ' ';
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-[calc(100vh-80px)] flex flex-col"
    >
      {/* Header Section */}
      <div className="bg-linear-to-r from-orange-100 to-amber-100 px-6 py-4 border-b border-orange-200">
        <div className="container mx-auto max-w-7xl flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-orange-700 mb-0.5">
              Recommended Verse
            </p>
            <h3 className="text-xl font-semibold text-orange-950">
              Chapter {verse.chapter}, Verse {verse.verse}
            </h3>
          </div>
          <a
            href={`https://vedabase.io/en/library/bg/${verse.chapter}/${verse.verse}/`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-orange-700 hover:text-orange-900 transition-colors"
            aria-label="View on Vedabase"
          >
            <ExternalLink className="w-5 h-5" />
          </a>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="flex-1 container mx-auto px-6 py-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
          {/* Left Column - Verse & Translation */}
          <div className="bg-white rounded-2xl shadow-xl border border-orange-100 p-6 flex flex-col">
            {/* Sanskrit Text */}
            <div className="text-center mb-6">
              <p className="text-xl md:text-2xl leading-relaxed text-orange-950 font-serif whitespace-pre-line">
                {verse.sanskrit}
              </p>
            </div>

            {/* Transliteration */}
            <div className="text-center mb-6">
              <p className="text-base md:text-lg leading-relaxed text-orange-800 italic whitespace-pre-line">
                {verse.transliteration}
              </p>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 h-px bg-linear-to-r from-transparent via-orange-300 to-transparent" />
              <div className="w-2 h-2 rounded-full bg-orange-400" />
              <div className="flex-1 h-px bg-linear-to-r from-transparent via-orange-300 to-transparent" />
            </div>

            {/* Translation */}
            <div className="flex-1">
              <p className="text-sm font-medium text-orange-700 mb-2">
                Translation
              </p>
              <p className="text-lg leading-relaxed text-gray-800">
                {highlightKeywords(verse.translation)}
              </p>
            </div>

            {/* Action Buttons */}
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
                    className={`p-2 rounded-full border transition-all ${
                      liked
                        ? 'bg-orange-100 border-orange-400 text-orange-700'
                        : 'bg-white border-gray-300 text-gray-500 hover:border-orange-300 hover:text-orange-600'
                    }`}
                  >
                    <Heart className="w-4 h-4" fill={liked ? 'currentColor' : 'none'} />
                  </button>
                  <button
                    onClick={handleDislike}
                    className="p-2 rounded-full border bg-white border-gray-300 text-gray-500 hover:border-orange-300 hover:text-orange-600 transition-all"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Feedback Input */}
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
          </div>

          {/* Right Column - Synonyms & Purport */}
          <div className="space-y-6">
            
            {/* Why This Verse? - Always show */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-2xl shadow-xl border-2 border-indigo-200 p-6 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-indigo-200/30 to-purple-200/30 rounded-full blur-2xl -mr-16 -mt-16" />
              
              <div className="relative">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-5 h-5 text-indigo-600" />
                  <p className="text-sm font-semibold text-indigo-900">
                    Why This Verse?
                  </p>
                </div>
                <p className="text-sm leading-relaxed text-indigo-950">
                  {verse.interpretation}
                </p>
                
                <div className="mt-4 pt-4 border-t border-indigo-200">
                  <p className="text-xs font-medium text-indigo-700 mb-2">Matched themes:</p>
                  <div className="flex flex-wrap gap-2">
                    {verse.keywords.slice(0, 4).map((keyword, index) => (
                      <span 
                        key={index}
                        className="px-2.5 py-1 bg-white/70 backdrop-blur-sm border border-indigo-300 rounded-full text-xs text-indigo-800 font-medium"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Synonyms - Hide if empty */}
            {hasContent(verse.synonyms) && (
              <div className="bg-white rounded-2xl shadow-xl border border-orange-100 p-6">
                <p className="text-sm font-medium text-orange-700 mb-3">
                  Synonyms
                </p>
                <p className="text-sm leading-relaxed text-gray-700">
                  {verse.synonyms}
                </p>
              </div>
            )}

            {/* Purport - Hide if empty */}
            {hasContent(verse.purport) && (
              <div className="bg-white rounded-2xl shadow-xl border border-orange-100 p-6 flex-1">
                <p className="text-sm font-medium text-orange-700 mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-600" />
                  Purport
                </p>
                <div className="prose prose-sm max-w-none">
                  <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                    {verse.purport}
                  </p>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </motion.div>
  );
}