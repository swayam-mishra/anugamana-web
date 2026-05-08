import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Sparkles,
  BookOpen,
  Share2,
  Globe,
  Volume2,
  Mic,
  ArrowRight,
  Lock,
  MessageCircle,
  ShieldCheck,
  Heart,
} from 'lucide-react';
import { useAuth, useClerk } from '@clerk/react';
import { SearchPanel } from '../components/SearchPanel';
import { ResultCard } from '../components/ResultCard';
import { QueryMetaBanner } from '../components/QueryMetaBanner';
import { LoadingState } from '../components/LoadingState';
import { ErrorBanner } from '../components/ui/ErrorBanner';
import { useSearch } from '../hooks/useSearch';

// ─── Data ───────────────────────────────────────────────────────────────────

const EXAMPLE_SITUATIONS = [
  "I feel paralyzed by fear of making the wrong decision",
  "I'm struggling with grief and don't know how to move on",
  "I keep losing my temper and hurting people I love",
  "I need to act but I'm terrified of the consequences",
  "I feel like I have no purpose or direction",
  "I'm angry at someone who wronged me and can't let it go",
  "I'm doing everything right but nothing feels meaningful",
  "I feel guilty about something I can't undo",
];

const FEATURES = [
  {
    icon: MessageCircle,
    title: 'Say it in your own words',
    body: 'No need to know Sanskrit, chapter numbers, or theology. Just describe what you\'re going through — the way you\'d tell a friend.',
    soon: false,
    accent: 'orange',
  },
  {
    icon: Sparkles,
    title: 'Guidance, not just quotes',
    body: "You don't just get a verse — you get an explanation of why this particular teaching speaks to your specific situation, right now.",
    soon: false,
    accent: 'indigo',
  },
  {
    icon: BookOpen,
    title: "The full commentary",
    body: "Every result includes Srila Prabhupada's complete purport — the traditional understanding of the verse, not a modern paraphrase.",
    soon: false,
    accent: 'orange',
  },
  {
    icon: Share2,
    title: 'Share what resonates',
    body: 'Found a teaching that speaks to you? Send it to a friend who needs it. Every verse has its own link.',
    soon: false,
    accent: 'indigo',
  },
  {
    icon: Globe,
    title: 'In your language',
    body: 'Search and receive guidance in Hindi, Bengali, Tamil, Telugu, and more Indian languages.',
    soon: true,
    sarvam: true,
    accent: 'orange',
  },
  {
    icon: Volume2,
    title: 'Hear the verse',
    body: 'Listen to each verse recited aloud in Sanskrit, with correct pronunciation and rhythm.',
    soon: true,
    sarvam: true,
    accent: 'indigo',
  },
  {
    icon: Mic,
    title: 'Speak your question',
    body: 'Not in the mood to type? Speak what you\'re feeling. Especially useful on mobile.',
    soon: true,
    sarvam: true,
    accent: 'orange',
  },
  {
    icon: Heart,
    title: 'Grounded in the tradition',
    body: 'All guidance is strictly based on the verse and Prabhupada\'s commentary — nothing is invented or added.',
    soon: false,
    accent: 'indigo',
  },
];

const HOW_IT_WORKS = [
  {
    num: '01',
    title: 'Describe what you\'re going through',
    body: "Write it the way you\'d say it out loud. A hard decision. A feeling you can\'t shake. A question that won\'t leave you alone. Plain language — no Sanskrit, no theology.",
  },
  {
    num: '02',
    title: 'We find the verse that fits',
    body: 'Not the verse that mentions similar words — the verse that speaks to the meaning of your situation. All 700 verses are searched by what they teach, not just what they say.',
  },
  {
    num: '03',
    title: 'Receive guidance from the text',
    body: "You get the verse, the full traditional commentary, and a clear explanation of why this specific teaching is relevant to what you're facing right now.",
  },
];

const TRUST_POINTS = [
  {
    icon: ShieldCheck,
    title: 'Nothing is made up',
    body: "Every piece of guidance is grounded strictly in the retrieved verse and Srila Prabhupada's commentary. If the text doesn't address your question, we say so honestly.",
  },
  {
    icon: BookOpen,
    title: 'The right verse, not just any verse',
    body: "The search is built to match meaning, not keywords. A question about fear of failure finds teachings about non-attachment to outcomes — not just verses that mention the word 'fear'.",
  },
  {
    icon: Heart,
    title: 'Your feedback shapes the results',
    body: "If a result doesn't resonate, tell us. That signal helps the app find better matches for everyone — the guidance improves from real use.",
  },
];

const STATS = [
  { value: '700', label: 'verses' },
  { value: '18', label: 'chapters' },
  { value: '5,000+', label: 'years of wisdom' },
  { value: 'AI', label: 'guided' },
];

// ─── Component ───────────────────────────────────────────────────────────────

export function LandingPage() {
  const [query, setQuery] = useState('');
  const [language, setLanguage] = useState('en');
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);
  const searchMutation = useSearch();
  const resultsRef = useRef<HTMLDivElement>(null);
  const { isSignedIn } = useAuth();
  const { openSignUp } = useClerk();

  useEffect(() => {
    if (searchMutation.data && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [searchMutation.data]);

  const handleSubmit = () => {
    if (!isSignedIn) {
      openSignUp();
      return;
    }
    if (!query.trim()) return;
    searchMutation.mutate({ query, chapter: selectedChapter, limit: 5, language });
  };

  const handleSearchAgain = () => {
    setQuery('');
    searchMutation.reset();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const hasResults = !!searchMutation.data && !searchMutation.isPending;
  const isGuardrail = searchMutation.data?.query_meta.guardrail === 'irrelevant';

  return (
    <div className="overflow-x-hidden">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-linear-to-br from-orange-50 via-amber-50 to-orange-100 border-b border-orange-200">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-200/25 rounded-full blur-3xl -mr-48 -mt-48 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-300/20 rounded-full blur-3xl -ml-24 -mb-24 pointer-events-none" />

        <div className="relative container mx-auto px-4 py-16 md:py-28 max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-5xl md:text-7xl font-light text-orange-950 mb-5 leading-[1.1] tracking-tight">
              Find clarity through<br />
              <span className="font-semibold italic text-orange-800">ancient wisdom</span>
            </h1>

            <p className="text-lg md:text-xl text-orange-800/80 mb-10 max-w-xl mx-auto leading-relaxed">
              Describe what you're going through. Anugamana finds the Bhagavad Gita verse that speaks directly to your situation — then explains why.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18 }}
          >
            <SearchPanel
              query={query}
              language={language}
              selectedChapter={selectedChapter}
              loading={searchMutation.isPending}
              onQueryChange={setQuery}
              onLanguageChange={setLanguage}
              onChapterChange={setSelectedChapter}
              onSubmit={handleSubmit}
              showHeading={false}
            />
          </motion.div>

          {!isSignedIn && !hasResults && !searchMutation.isPending && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="mt-3 flex items-center justify-center gap-1.5 text-xs text-orange-600/70"
            >
              <Lock className="w-3 h-3" />
              Join the waitlist to search — free during beta
            </motion.p>
          )}

          {!hasResults && !searchMutation.isPending && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-12 flex justify-center gap-10 flex-wrap"
            >
              {STATS.map(({ value, label }) => (
                <div key={label} className="text-center">
                  <div className="text-2xl font-semibold text-orange-900">{value}</div>
                  <div className="text-xs text-orange-600 mt-0.5 uppercase tracking-wide">{label}</div>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* ── Loading ──────────────────────────────────────────────────────── */}
      {searchMutation.isPending && (
        <div className="container mx-auto px-4 py-4">
          <LoadingState />
        </div>
      )}

      {/* ── Error ────────────────────────────────────────────────────────── */}
      {searchMutation.isError && (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <ErrorBanner
            message={
              searchMutation.error instanceof Error
                ? searchMutation.error.message
                : 'Something went wrong. Please try again.'
            }
            variant="error"
          />
        </div>
      )}

      {/* ── Results ──────────────────────────────────────────────────────── */}
      {hasResults && (
        <div className="container mx-auto px-4 py-10" ref={resultsRef}>
          <QueryMetaBanner meta={searchMutation.data.query_meta} />
          {isGuardrail && (
            <div className="max-w-4xl mx-auto mb-6">
              <ErrorBanner
                message="This question may be outside the Gita's scope — here are the closest verses anyway."
                variant="guardrail"
              />
            </div>
          )}
          <div
            className="max-w-4xl mx-auto space-y-6"
            aria-live="polite"
            aria-label="Search results"
          >
            {searchMutation.data.results.map((result) => (
              <ResultCard
                key={result.verse_id}
                result={result}
                onSearchAgain={handleSearchAgain}
                userInput={query}
              />
            ))}
          </div>
        </div>
      )}

      {/* ── Below-the-fold (hidden when results are visible) ─────────── */}
      {!hasResults && !searchMutation.isPending && (
        <>

          {/* ── Example situations ───────────────────────────────────────── */}
          <section className="container mx-auto px-4 py-20 max-w-3xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-light text-orange-950 mb-3">
                What are you carrying right now?
              </h2>
              <p className="text-orange-700 text-sm mb-10">
                These are the kinds of situations people bring to the Gita. Click one to try it.
              </p>
            </motion.div>

            <div className="flex flex-wrap justify-center gap-3">
              {EXAMPLE_SITUATIONS.map((situation, i) => (
                <motion.button
                  key={situation}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  onClick={() => {
                    setQuery(situation);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-4 py-2.5 bg-white border border-orange-200 rounded-full text-sm text-orange-800 hover:bg-orange-50 hover:border-orange-400 hover:shadow-sm transition-all text-left"
                >
                  {situation}
                </motion.button>
              ))}
            </div>
          </section>

          {/* ── How it works ─────────────────────────────────────────────── */}
          <section className="bg-white border-y border-orange-100 py-20">
            <div className="container mx-auto px-4 max-w-4xl">
              <div className="text-center mb-14">
                <h2 className="text-3xl font-light text-orange-950 mb-3">How it works</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {HOW_IT_WORKS.map(({ num, title, body }) => (
                  <motion.div
                    key={num}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="text-5xl font-light text-orange-200 mb-4 leading-none">{num}</div>
                    <h3 className="font-semibold text-orange-950 mb-2">{title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{body}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* ── Features ─────────────────────────────────────────────────── */}
          <section className="container mx-auto px-4 py-20 max-w-5xl">
            <div className="text-center mb-14">
              <h2 className="text-3xl font-light text-orange-950 mb-3">Everything you need</h2>
              <p className="text-orange-700 text-sm">Built for anyone seeking guidance — wherever they are, whatever language they think in.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {FEATURES.map(({ icon: Icon, title, body, soon, accent, ...rest }) => {
                const sarvam = (rest as { sarvam?: boolean }).sarvam;
                return (
                  <motion.div
                    key={title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.4 }}
                    className={`relative p-5 rounded-2xl border transition-shadow hover:shadow-md ${
                      soon
                        ? 'bg-gray-50/80 border-gray-200'
                        : accent === 'orange'
                          ? 'bg-orange-50 border-orange-200'
                          : 'bg-indigo-50 border-indigo-200'
                    }`}
                  >
                    {soon && (
                      <div className="absolute top-3 right-3 flex items-center gap-1.5">
                        {sarvam && (
                          <span className="px-2 py-1 bg-white rounded-full border border-gray-200 flex items-center">
                            <img src="/sarvam-wordmark.png" alt="Sarvam AI" className="h-2.5 w-auto" />
                          </span>
                        )}
                        <span className="px-2 py-0.5 bg-gray-200 text-gray-500 rounded-full text-[9px] font-bold uppercase tracking-widest">
                          Soon
                        </span>
                      </div>
                    )}
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${
                      soon
                        ? 'bg-gray-200 text-gray-400'
                        : accent === 'orange'
                          ? 'bg-orange-200 text-orange-700'
                          : 'bg-indigo-200 text-indigo-700'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className={`font-semibold text-sm mb-1.5 ${soon ? 'text-gray-400' : 'text-gray-900'}`}>
                      {title}
                    </h3>
                    <p className={`text-xs leading-relaxed ${soon ? 'text-gray-400' : 'text-gray-500'}`}>
                      {body}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </section>

          {/* ── Gita quote ───────────────────────────────────────────────── */}
          <section className="relative overflow-hidden bg-linear-to-br from-indigo-950 via-purple-950 to-indigo-900 py-24">
            <div className="relative container mx-auto px-4 max-w-2xl text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <p className="text-3xl md:text-4xl font-serif text-white/90 leading-relaxed mb-5">
                  "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन"
                </p>
                <p className="text-lg italic text-indigo-200 mb-5 leading-relaxed">
                  "You have a right to perform your prescribed duties,<br className="hidden md:block" /> but you are not entitled to the fruits of your actions."
                </p>
                <p className="text-sm text-indigo-400">— Bhagavad Gita 2.47</p>
              </motion.div>
            </div>
          </section>

          {/* ── Trust ────────────────────────────────────────────────────── */}
          <section className="bg-white border-y border-orange-100 py-20">
            <div className="container mx-auto px-4 max-w-4xl">
              <div className="text-center mb-14">
                <h2 className="text-3xl font-light text-orange-950 mb-3">Guidance you can trust</h2>
                <p className="text-orange-700 text-sm">Not a chatbot that invents spiritual-sounding answers.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {TRUST_POINTS.map(({ icon: Icon, title, body }) => (
                  <motion.div
                    key={title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45 }}
                    className="p-6 bg-orange-50 border border-orange-200 rounded-2xl"
                  >
                    <div className="w-9 h-9 rounded-xl bg-orange-200 flex items-center justify-center mb-4">
                      <Icon className="w-4 h-4 text-orange-700" />
                    </div>
                    <h3 className="font-semibold text-orange-950 mb-2">{title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{body}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* ── Final CTA ────────────────────────────────────────────────── */}
          <section className="container mx-auto px-4 py-24 text-center max-w-lg">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-light text-orange-950 mb-4">What's weighing on you?</h2>
              <p className="text-orange-700 text-sm leading-relaxed mb-8">
                The Bhagavad Gita has been answering the deepest human questions for over 5,000 years.
                Whatever you're carrying right now, there's a teaching that was written for exactly this moment.
              </p>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-linear-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all"
              >
                Find your verse
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          </section>

          {/* ── Footer ───────────────────────────────────────────────────── */}
          <footer className="border-t border-orange-200 bg-orange-50/50">
            <div className="container mx-auto px-4 py-8 max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-orange-600">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-orange-900">anugamana</span>
                <span className="text-orange-300">·</span>
                <span>अनुगमन — following the path</span>
              </div>
              <div className="flex items-center gap-5">
                <a
                  href="https://vedabase.io/en/library/bg/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-orange-900 transition-colors"
                >
                  Vedabase Source
                </a>
              </div>
            </div>
          </footer>
        </>
      )}
    </div>
  );
}
