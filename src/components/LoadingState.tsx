import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { motion } from 'motion/react';

const STAGES = ['Retrieving verses...', 'Reranking results...', 'Generating guidance...'];

function ProgressiveMessage({ stages, intervalMs }: { stages: string[]; intervalMs: number }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => Math.min(i + 1, stages.length - 1));
    }, intervalMs);
    return () => clearInterval(id);
  }, [stages.length, intervalMs]);

  return (
    <motion.p
      key={index}
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-sm text-orange-700 italic"
    >
      {stages[index]}
    </motion.p>
  );
}

export function LoadingState() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto py-12 flex flex-col items-center gap-4"
    >
      <Loader2 className="w-8 h-8 text-orange-600 animate-spin" />
      <ProgressiveMessage stages={STAGES} intervalMs={1200} />
    </motion.div>
  );
}
