import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Scale } from 'lucide-react';

const EFFECTIVE_DATE = 'May 18, 2026';
const CONTACT_EMAIL = 'hello.almostperfect@gmail.com';

const SECTIONS = [
  {
    id: 'acceptance',
    title: '1. Acceptance of Terms',
    content: (
      <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
        <p>
          By accessing or using Anugamana (the "Service"), you agree to be bound by these Terms of
          Service ("Terms"). If you do not agree to all of these Terms, you must not access or use
          the Service.
        </p>
        <p>
          These Terms constitute a legally binding agreement between you and Anugamana ("we," "us,"
          or "our") regarding your use of the Service. We reserve the right to modify these Terms at
          any time; continued use of the Service after any such modification constitutes your
          acceptance of the revised Terms.
        </p>
      </div>
    ),
  },
  {
    id: 'description',
    title: '2. Description of Service',
    content: (
      <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
        <p>
          Anugamana is a semantic search engine and AI-assisted guidance platform built over the
          Bhagavad Gita As It Is by His Divine Grace A.C. Bhaktivedanta Swami Prabhupada. The
          Service enables users to:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Submit natural-language queries to retrieve relevant Bhagavad Gita verses;</li>
          <li>
            Receive AI-generated guidance grounded strictly in retrieved verse text and commentary;
          </li>
          <li>Browse and save a personal history of past searches (browser-local only); and</li>
          <li>Access direct verse references and purports sourced from Vedabase.io.</li>
        </ul>
        <p>
          The Service is currently provided in beta. Features, availability, and functionality may
          change without notice.
        </p>
      </div>
    ),
  },
  {
    id: 'eligibility',
    title: '3. Eligibility and User Accounts',
    content: (
      <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
        <p>
          You must be at least 13 years of age to use the Service. If you are under 18, you
          represent that your parent or legal guardian has reviewed and agreed to these Terms on your
          behalf.
        </p>
        <p>
          Account creation is managed by Clerk, a third-party authentication provider. Access is
          currently gated by a waitlist. You are responsible for maintaining the confidentiality of
          your account credentials and for all activity that occurs under your account. You agree to
          notify us immediately of any unauthorised use of your account.
        </p>
        <p>
          We reserve the right to refuse access or terminate accounts at our sole discretion,
          including for violation of these Terms.
        </p>
      </div>
    ),
  },
  {
    id: 'acceptable-use',
    title: '4. Acceptable Use Policy',
    content: (
      <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
        <p>You agree not to use the Service to:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            Submit queries that are abusive, harassing, defamatory, obscene, or otherwise unlawful;
          </li>
          <li>
            Attempt to reverse-engineer, scrape, crawl, or systematically extract data from the
            Service beyond normal use;
          </li>
          <li>Probe or test the vulnerability of the Service or any associated system;</li>
          <li>Introduce malware, viruses, or any malicious code;</li>
          <li>Circumvent any rate limiting, access control, or authentication mechanism;</li>
          <li>
            Impersonate any person or entity, or falsely claim an affiliation with any person or
            organisation; or
          </li>
          <li>
            Use the Service for any commercial purpose or for any public display without our express
            written consent.
          </li>
        </ul>
        <p>
          We reserve the right to suspend or terminate your access immediately if we determine, in
          our sole discretion, that you have violated this policy.
        </p>
      </div>
    ),
  },
  {
    id: 'ip',
    title: '5. Intellectual Property Rights',
    content: (
      <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
        <p>
          <strong>Gita content.</strong> All verse text, word-for-word synonyms, translations, and
          purports displayed by the Service are from{' '}
          <em>Bhagavad Gita As It Is</em> by His Divine Grace A.C. Bhaktivedanta Swami Prabhupada
          and are sourced from{' '}
          <a
            href="https://vedabase.io/en/library/bg/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-orange-700 hover:text-orange-900 underline underline-offset-2"
          >
            Vedabase.io
          </a>
          . These materials are the property of the Bhaktivedanta Book Trust International (BBT)
          and are used here for non-commercial, educational and spiritual purposes. We make no claim
          of ownership over such content.
        </p>
        <p>
          <strong>Platform.</strong> The Anugamana name, logo, search interface, retrieval pipeline,
          and all original code and design elements are our exclusive property. You may not copy,
          reproduce, distribute, or create derivative works from any part of the platform without
          our express written permission.
        </p>
        <p>
          <strong>User queries.</strong> You retain ownership of the queries you submit. By
          submitting a query, you grant us a limited, non-exclusive, royalty-free licence to process
          it solely for the purpose of providing the Service.
        </p>
      </div>
    ),
  },
  {
    id: 'ai-content',
    title: '6. AI-Generated Guidance Disclaimer',
    content: (
      <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
        <p>
          Guidance responses are generated by Claude (Anthropic) and are grounded strictly in the
          retrieved Bhagavad Gita verse and purport. They do not incorporate outside knowledge,
          personal advice, or the views of Anugamana.
        </p>
        <p>
          AI-generated content may be inaccurate, incomplete, or misleading. You should not rely on
          any guidance produced by the Service as a substitute for professional advice — whether
          legal, medical, psychological, financial, or otherwise. Always consult a qualified
          professional for decisions that affect your health, safety, or legal rights.
        </p>
        <p>
          Anugamana makes no warranty that AI-generated responses faithfully represent the
          theological or philosophical position of ISKCON, the BBT, or any other Vaishnava
          institution.
        </p>
      </div>
    ),
  },
  {
    id: 'religious-disclaimer',
    title: '7. Spiritual and Religious Content',
    content: (
      <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
        <p>
          The Service is provided for educational and personal contemplative purposes only. Anugamana
          is not affiliated with ISKCON, the Bhaktivedanta Book Trust, or any religious organisation.
          We do not provide religious counsel, act as a spiritual authority, or represent any
          particular theological tradition.
        </p>
        <p>
          The Bhagavad Gita is a sacred text respected by billions. We are committed to presenting
          its content with accuracy, reverence, and fidelity to the source.
        </p>
      </div>
    ),
  },
  {
    id: 'privacy',
    title: '8. Privacy',
    content: (
      <p className="text-sm text-gray-700 leading-relaxed">
        Your use of the Service is also governed by our{' '}
        <Link to="/privacy" className="text-orange-700 hover:text-orange-900 underline underline-offset-2">
          Privacy Policy
        </Link>
        , which is incorporated into these Terms by reference. Please review it carefully to
        understand how we collect, use, and protect your information.
      </p>
    ),
  },
  {
    id: 'third-party',
    title: '9. Third-Party Services',
    content: (
      <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
        <p>The Service relies on the following third-party providers:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <strong>Clerk</strong> — identity and authentication management. Their{' '}
            <a
              href="https://clerk.com/legal/terms"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-700 hover:text-orange-900 underline underline-offset-2"
            >
              Terms of Service
            </a>{' '}
            and{' '}
            <a
              href="https://clerk.com/legal/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-700 hover:text-orange-900 underline underline-offset-2"
            >
              Privacy Policy
            </a>{' '}
            apply to account data.
          </li>
          <li>
            <strong>Anthropic / Claude API</strong> — AI guidance generation. Your search queries
            are transmitted to Anthropic in order to generate responses.
          </li>
          <li>
            <strong>Vedabase.io</strong> — the canonical source of all Bhagavad Gita content
            displayed in the Service.
          </li>
        </ul>
        <p>
          We are not responsible for the practices, availability, or content of any third-party
          service. Links to third-party sites are provided for convenience only.
        </p>
      </div>
    ),
  },
  {
    id: 'disclaimers',
    title: '10. Disclaimers of Warranties',
    content: (
      <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
        <p>
          THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE," WITHOUT WARRANTY OF ANY KIND, EXPRESS
          OR IMPLIED. TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, WE DISCLAIM ALL WARRANTIES,
          INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
          PURPOSE, NON-INFRINGEMENT, AND ACCURACY OF INFORMATION.
        </p>
        <p>
          We do not warrant that the Service will be uninterrupted, error-free, or free of viruses
          or other harmful components.
        </p>
      </div>
    ),
  },
  {
    id: 'liability',
    title: '11. Limitation of Liability',
    content: (
      <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
        <p>
          TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, ANUGAMANA AND ITS OPERATORS SHALL NOT
          BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES,
          INCLUDING WITHOUT LIMITATION LOSS OF DATA, GOODWILL, OR PROFITS, ARISING OUT OF OR IN
          CONNECTION WITH YOUR USE OF OR INABILITY TO USE THE SERVICE.
        </p>
        <p>
          IN NO EVENT SHALL OUR AGGREGATE LIABILITY TO YOU EXCEED THE GREATER OF ONE HUNDRED INDIAN
          RUPEES (INR 100) OR THE AMOUNTS YOU HAVE PAID TO US IN THE TWELVE MONTHS PRECEDING THE
          CLAIM.
        </p>
        <p>
          SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OF CERTAIN WARRANTIES OR THE LIMITATION OF
          LIABILITY FOR CONSEQUENTIAL DAMAGES, SO THE ABOVE LIMITATIONS MAY NOT APPLY TO YOU.
        </p>
      </div>
    ),
  },
  {
    id: 'indemnification',
    title: '12. Indemnification',
    content: (
      <p className="text-sm text-gray-700 leading-relaxed">
        You agree to indemnify, defend, and hold harmless Anugamana and its operators, contributors,
        and service providers from and against any claims, liabilities, damages, losses, and expenses
        (including reasonable legal fees) arising out of or in connection with your violation of
        these Terms or your use of the Service.
      </p>
    ),
  },
  {
    id: 'governing-law',
    title: '13. Governing Law and Disputes',
    content: (
      <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
        <p>
          These Terms are governed by and construed in accordance with the laws of India, without
          regard to conflict-of-law principles. Any dispute arising out of or relating to these Terms
          or the Service shall be subject to the exclusive jurisdiction of the courts located in
          India.
        </p>
        <p>
          If you are a consumer resident in the European Union, you may also have rights under
          applicable EU consumer protection legislation in addition to those set out here.
        </p>
      </div>
    ),
  },
  {
    id: 'changes',
    title: '14. Changes to These Terms',
    content: (
      <p className="text-sm text-gray-700 leading-relaxed">
        We may update these Terms from time to time. When we do, we will revise the "Last updated"
        date at the top of this page. For material changes, we will make reasonable efforts to notify
        you — for example, by email or by a prominent notice within the Service. Your continued use
        of the Service after any change constitutes your acceptance of the new Terms.
      </p>
    ),
  },
  {
    id: 'contact',
    title: '15. Contact',
    content: (
      <div className="space-y-2 text-sm text-gray-700 leading-relaxed">
        <p>For questions or concerns about these Terms, please contact us at:</p>
        <p>
          <strong>Email:</strong>{' '}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-orange-700 hover:text-orange-900 underline underline-offset-2"
          >
            {CONTACT_EMAIL}
          </a>
        </p>
        <p>We will endeavour to respond within 30 days.</p>
      </div>
    ),
  },
];

export function TermsPage() {
  return (
    <motion.main
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-12 max-w-3xl"
    >
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-orange-100 border border-orange-200 flex items-center justify-center flex-shrink-0">
            <Scale className="w-5 h-5 text-orange-700" />
          </div>
          <h1 className="text-3xl font-semibold text-orange-950">Terms of Service</h1>
        </div>
        <p className="text-sm text-gray-500">
          Last updated: <span className="font-medium text-gray-700">{EFFECTIVE_DATE}</span>
        </p>
        <p className="mt-3 text-sm text-gray-600 leading-relaxed">
          Please read these Terms of Service carefully before using Anugamana. By accessing or using
          the Service, you agree to be bound by these Terms.
        </p>
      </div>

      {/* Table of contents */}
      <div className="mb-10 bg-orange-50 rounded-2xl border border-orange-100 p-5">
        <p className="text-xs font-semibold text-orange-700 uppercase tracking-wider mb-3">
          Contents
        </p>
        <ol className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1">
          {SECTIONS.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className="text-sm text-orange-800 hover:text-orange-600 transition-colors"
              >
                {s.title}
              </a>
            </li>
          ))}
        </ol>
      </div>

      {/* Sections */}
      <div className="space-y-8">
        {SECTIONS.map((s) => (
          <section
            key={s.id}
            id={s.id}
            className="bg-white rounded-2xl border border-orange-100 shadow-sm p-6 scroll-mt-24"
          >
            <h2 className="text-base font-semibold text-orange-900 mb-4">{s.title}</h2>
            {s.content}
          </section>
        ))}
      </div>

      {/* Footer note */}
      <div className="mt-10 text-center text-xs text-gray-400">
        <p>
          These Terms of Service were last updated on {EFFECTIVE_DATE} and are effective immediately.
        </p>
        <p className="mt-1">
          Also see our{' '}
          <Link to="/privacy" className="text-orange-600 hover:text-orange-800 underline underline-offset-2">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </motion.main>
  );
}
