import { Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface GuidancePanelProps {
  aiGuidance: string;
  aiGuidanceTranslated?: string;
}

export function GuidancePanel({ aiGuidance, aiGuidanceTranslated }: GuidancePanelProps) {
  if (!aiGuidance?.trim()) return null;
  return (
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
          <p className="text-sm font-semibold text-indigo-900">Why This Verse?</p>
        </div>
        <p className="text-sm leading-relaxed text-indigo-950">{aiGuidance}</p>
        {aiGuidanceTranslated?.trim() && aiGuidanceTranslated !== aiGuidance && (
          <p className="text-sm leading-relaxed text-indigo-800 mt-3 pt-3 border-t border-indigo-200">
            {aiGuidanceTranslated}
          </p>
        )}
      </div>
    </motion.div>
  );
}
