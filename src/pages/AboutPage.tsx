import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { MessageCircle, Cpu, Sparkles, BookOpen, ArrowRight } from 'lucide-react';

const STEPS = [
  {
    icon: MessageCircle,
    title: 'Describe your situation',
    body: "Write it the way you'd say it out loud — a hard decision, a feeling you can't shake, a question that won't leave you alone. Plain language, no Sanskrit required.",
  },
  {
    icon: Cpu,
    title: 'We find the verse that fits',
    body: 'Your query is routed intelligently: verse references go straight to direct lookup, Sanskrit text skips expansion, and everything else goes through the full pipeline — HyDE generates a hypothetical Prabhupada-style commentary to bridge the vocabulary gap, then hybrid dense and sparse retrieval searches all 700 verses by meaning. A cross-encoder reranker picks the best match.',
  },
  {
    icon: Sparkles,
    title: 'Guidance grounded in the text',
    body: 'The top verse — with its full commentary by Srila Prabhupada — is sent to Claude Haiku 4.5, which explains why this specific teaching speaks to your situation. Nothing is invented or added: the guidance comes strictly from the retrieved verse and purport.',
  },
];

const TECH = [
  { label: 'Embeddings', value: 'BAAI/bge-m3 — multilingual, dense + sparse, 1024 dimensions' },
  { label: 'Vector store', value: 'ChromaDB — 2,603 vectors across meaning, translation, and purport collections' },
  { label: 'Sparse index', value: 'BGE-M3 lexical weights — 8,952 unique tokens, no separate BM25 needed' },
  { label: 'Reranking', value: 'ms-marco-MiniLM-L-6-v2 cross-encoder + MMR diversity pass' },
  { label: 'Query routing', value: 'Direct lookup · Sanskrit fast-path · Full semantic (HyDE + expansion)' },
  { label: 'LLM', value: 'Claude Haiku 4.5 — guardrails, HyDE expansion, and guidance generation' },
  { label: 'Source', value: 'Vedabase.io — Bhagavad Gita As It Is by Srila Prabhupada' },
];

export function AboutPage() {
  return (
    <motion.main
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-12 max-w-3xl"
    >
      {/* Hero */}
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-light text-orange-950 mb-4">
          अनुगमन — <span className="italic">anugamana</span>
        </h2>
        <p className="text-lg text-orange-800 leading-relaxed max-w-xl mx-auto">
          Sanskrit for <em>following the path</em>. A semantic search engine over the Bhagavad Gita
          As It Is — find the verse that speaks to where you are right now.
        </p>
      </div>

      {/* How it works */}
      <section className="mb-12">
        <h3 className="text-xl font-semibold text-orange-900 mb-6">How it works</h3>
        <div className="space-y-6">
          {STEPS.map(({ icon: Icon, title, body }, i) => (
            <div key={i} className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-100 border border-orange-200 flex items-center justify-center">
                <Icon className="w-5 h-5 text-orange-700" />
              </div>
              <div>
                <p className="font-medium text-orange-950 mb-1">{title}</p>
                <p className="text-sm text-gray-600 leading-relaxed">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="flex items-center gap-3 mb-12">
        <div className="flex-1 h-px bg-linear-to-r from-transparent via-orange-300 to-transparent" />
        <div className="w-2 h-2 rounded-full bg-orange-400" />
        <div className="flex-1 h-px bg-linear-to-r from-transparent via-orange-300 to-transparent" />
      </div>

      {/* Technical foundation */}
      <section className="mb-12">
        <h3 className="text-xl font-semibold text-orange-900 mb-4">Technical foundation</h3>
        <div className="bg-white rounded-2xl border border-orange-100 shadow-sm divide-y divide-orange-50">
          {TECH.map(({ label, value }) => (
            <div key={label} className="flex gap-4 px-5 py-3">
              <span className="text-sm font-medium text-orange-700 w-28 flex-shrink-0">{label}</span>
              <span className="text-sm text-gray-600">{value}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Credits */}
      <section className="mb-12 bg-linear-to-br from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100 p-6">
        <div className="flex items-center gap-2 mb-3">
          <BookOpen className="w-5 h-5 text-indigo-600" />
          <h3 className="text-lg font-semibold text-indigo-900">Credits</h3>
        </div>
        <div className="space-y-3 text-sm text-indigo-900 leading-relaxed">
          <p>
            All verse text, translations, synonyms, and purports are from{' '}
            <strong>Bhagavad Gita As It Is</strong> by His Divine Grace A.C. Bhaktivedanta Swami
            Prabhupada, sourced from{' '}
            <a
              href="https://vedabase.io/en/library/bg/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-indigo-700"
            >
              vedabase.io
            </a>
            .
          </p>
          <p>
            AI guidance is generated by{' '}
            <a
              href="https://anthropic.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-indigo-700"
            >
              Claude
            </a>{' '}
            (Anthropic) and is grounded strictly in the retrieved verse and commentary — not outside
            knowledge.
          </p>
        </div>
      </section>

      {/* CTA */}
      <div className="text-center">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-8 py-3 bg-linear-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white rounded-full font-medium shadow-md transition-all"
        >
          Seek guidance
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </motion.main>
  );
}
