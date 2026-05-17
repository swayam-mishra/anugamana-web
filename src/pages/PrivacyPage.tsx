import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';

const EFFECTIVE_DATE = 'May 18, 2026';
const CONTACT_EMAIL = 'swayammishra1504@gmail.com';

const SECTIONS = [
  {
    id: 'introduction',
    title: '1. Introduction',
    content: (
      <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
        <p>
          Anugamana ("we," "us," or "our") is committed to protecting your privacy. This Privacy
          Policy explains what personal data we collect when you use{' '}
          <strong>anugamana.app</strong> (the "Service"), how we use it, who we share it with, and
          what rights you have in relation to it.
        </p>
        <p>
          This Policy applies to all users of the Service globally and is intended to comply with
          applicable privacy laws, including the Indian Digital Personal Data Protection Act, 2023
          ("DPDP Act"), the European Union General Data Protection Regulation ("GDPR"), and the
          California Consumer Privacy Act ("CCPA").
        </p>
        <p>
          If you have questions, please contact us at{' '}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-orange-700 hover:text-orange-900 underline underline-offset-2"
          >
            {CONTACT_EMAIL}
          </a>
          .
        </p>
      </div>
    ),
  },
  {
    id: 'data-collected',
    title: '2. Information We Collect',
    content: (
      <div className="space-y-5 text-sm text-gray-700 leading-relaxed">
        <div>
          <p className="font-semibold text-gray-800 mb-1">a. Account Information</p>
          <p>
            Account creation and management is handled by Clerk, our authentication provider. When
            you register, Clerk collects your name, email address, and, optionally, a profile
            photo. We receive a user identifier and basic profile data from Clerk to associate your
            session with the Service.
          </p>
        </div>
        <div>
          <p className="font-semibold text-gray-800 mb-1">b. Search Queries</p>
          <p>
            When you submit a query, your text is transmitted to our backend server for processing
            and then forwarded to the Anthropic Claude API for AI-assisted guidance generation. We
            do not store queries on our servers beyond what is necessary to fulfil the request in
            real time.
          </p>
        </div>
        <div>
          <p className="font-semibold text-gray-800 mb-1">c. Search History (Browser-Local)</p>
          <p>
            Your search history is stored exclusively in your browser's <code>localStorage</code>.
            This data never leaves your device and is not accessible to us. You can clear it at any
            time by clearing your browser data or using the History page within the Service.
          </p>
        </div>
        <div>
          <p className="font-semibold text-gray-800 mb-1">d. Technical and Usage Data</p>
          <p>
            We may collect standard server logs including your IP address, browser type, operating
            system, referring URL, and timestamps. This data is used solely for security monitoring,
            error diagnosis, and ensuring the integrity of the Service.
          </p>
        </div>
        <div>
          <p className="font-semibold text-gray-800 mb-1">e. Cookie and Consent Data</p>
          <p>
            We record your cookie consent preference in your browser's <code>localStorage</code>{' '}
            under the key <code>anugamana_cookie_consent</code>. This is used solely to avoid
            re-prompting you on each visit. See Section 8 for a full description of cookies we use.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 'how-we-use',
    title: '3. How We Use Your Information',
    content: (
      <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
        <p>We use the information we collect to:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Authenticate you and maintain your session;</li>
          <li>Process your search queries and generate AI-grounded guidance;</li>
          <li>Monitor and improve the performance, security, and reliability of the Service;</li>
          <li>
            Respond to your support requests, feedback, or legal enquiries; and
          </li>
          <li>Comply with applicable legal obligations.</li>
        </ul>
        <p>
          We do not use your data for targeted advertising, sale to third parties, or any purpose
          not described in this Policy.
        </p>
      </div>
    ),
  },
  {
    id: 'legal-basis',
    title: '4. Legal Basis for Processing (GDPR)',
    content: (
      <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
        <p>
          If you are located in the European Economic Area, our legal bases for processing your
          personal data are:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>Contract</strong> — processing your account data and search queries is necessary
            to provide the Service you have requested.
          </li>
          <li>
            <strong>Legitimate interests</strong> — processing server logs for security and
            reliability purposes, where our interests are not overridden by your fundamental rights.
          </li>
          <li>
            <strong>Consent</strong> — setting functional cookies (where applicable). You may
            withdraw consent at any time through our cookie preference centre.
          </li>
          <li>
            <strong>Legal obligation</strong> — retaining certain data to comply with applicable
            law.
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: 'sharing',
    title: '5. How We Share Your Information',
    content: (
      <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
        <p>
          We do not sell, rent, or trade your personal data. We share data only with the following
          categories of recipients, and only to the extent necessary:
        </p>
        <div className="space-y-3">
          <div className="bg-orange-50 rounded-xl border border-orange-100 p-4">
            <p className="font-semibold text-gray-800 mb-1">Clerk (Authentication)</p>
            <p>
              Clerk processes your account credentials and identity data on our behalf. They act as
              a data processor and are contractually bound to handle your data in accordance with
              their{' '}
              <a
                href="https://clerk.com/legal/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-700 hover:text-orange-900 underline underline-offset-2"
              >
                Privacy Policy
              </a>
              .
            </p>
          </div>
          <div className="bg-orange-50 rounded-xl border border-orange-100 p-4">
            <p className="font-semibold text-gray-800 mb-1">Anthropic (AI Guidance)</p>
            <p>
              Your search queries are transmitted to Anthropic's Claude API to generate guidance
              responses. Anthropic processes this data subject to their{' '}
              <a
                href="https://www.anthropic.com/legal/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-700 hover:text-orange-900 underline underline-offset-2"
              >
                Privacy Policy
              </a>
              . We do not send any account-identifying information alongside your queries.
            </p>
          </div>
          <div className="bg-orange-50 rounded-xl border border-orange-100 p-4">
            <p className="font-semibold text-gray-800 mb-1">Legal Requirements</p>
            <p>
              We may disclose your information if required to do so by law, court order, or
              governmental authority, or if we believe in good faith that such disclosure is
              necessary to protect our rights, your safety, or the safety of others.
            </p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'retention',
    title: '6. Data Retention',
    content: (
      <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
        <p>
          We retain personal data only for as long as necessary to fulfil the purposes described in
          this Policy, or as required by applicable law:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <strong>Account data</strong> — retained for the duration of your account and for up to
            90 days following account deletion, to enable recovery and comply with legal obligations.
          </li>
          <li>
            <strong>Search queries</strong> — not retained on our servers beyond real-time
            processing. Your browser-local history is retained until you clear it.
          </li>
          <li>
            <strong>Server logs</strong> — retained for up to 90 days for security and diagnostic
            purposes, then automatically deleted.
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: 'rights',
    title: '7. Your Privacy Rights',
    content: (
      <div className="space-y-5 text-sm text-gray-700 leading-relaxed">
        <div>
          <p className="font-semibold text-gray-800 mb-2">
            EEA / UK Users — Rights Under GDPR / UK GDPR
          </p>
          <p>You have the right to:</p>
          <ul className="list-disc pl-5 mt-1 space-y-1">
            <li>
              <strong>Access</strong> — request a copy of the personal data we hold about you;
            </li>
            <li>
              <strong>Rectification</strong> — request correction of inaccurate or incomplete data;
            </li>
            <li>
              <strong>Erasure</strong> — request deletion of your personal data ("right to be
              forgotten");
            </li>
            <li>
              <strong>Restriction</strong> — request that we limit how we process your data;
            </li>
            <li>
              <strong>Portability</strong> — receive your data in a structured, machine-readable
              format;
            </li>
            <li>
              <strong>Objection</strong> — object to processing based on legitimate interests; and
            </li>
            <li>
              <strong>Withdraw consent</strong> — where processing is based on consent, withdraw it
              at any time.
            </li>
          </ul>
          <p className="mt-2">
            To exercise any of these rights, email us at{' '}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-orange-700 hover:text-orange-900 underline underline-offset-2"
            >
              {CONTACT_EMAIL}
            </a>
            . We will respond within 30 days. You also have the right to lodge a complaint with your
            national data protection authority.
          </p>
        </div>
        <div>
          <p className="font-semibold text-gray-800 mb-2">India — Rights Under the DPDP Act 2023</p>
          <p>
            As a data principal, you have the right to access information about your personal data
            being processed, request correction or erasure of inaccurate data, and nominate another
            individual to exercise these rights on your behalf in the event of your death or
            incapacity. To exercise these rights, please contact us at the email above.
          </p>
        </div>
        <div>
          <p className="font-semibold text-gray-800 mb-2">California — CCPA Rights</p>
          <p>
            California residents have the right to know what personal information we collect, request
            deletion of personal information, and opt out of the sale of personal information. We do
            not sell personal information. To submit a request, email us at the address above.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 'cookies',
    title: '8. Cookies and Tracking Technologies',
    content: (
      <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
        <p>We use the following types of cookies and browser storage:</p>
        <div className="overflow-hidden rounded-xl border border-orange-100">
          <table className="w-full text-xs">
            <thead className="bg-orange-50">
              <tr>
                <th className="text-left px-4 py-2.5 font-semibold text-orange-800">Category</th>
                <th className="text-left px-4 py-2.5 font-semibold text-orange-800">Purpose</th>
                <th className="text-left px-4 py-2.5 font-semibold text-orange-800">Required</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-orange-50">
              <tr>
                <td className="px-4 py-3 font-medium text-gray-700">Strictly Necessary</td>
                <td className="px-4 py-3 text-gray-600">
                  Clerk authentication session tokens; user identity management.
                </td>
                <td className="px-4 py-3">
                  <span className="px-2 py-0.5 bg-orange-100 text-orange-700 rounded-full font-medium">
                    Always on
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium text-gray-700">Functional</td>
                <td className="px-4 py-3 text-gray-600">
                  Browser-local search history (localStorage); cookie consent preference
                  (localStorage).
                </td>
                <td className="px-4 py-3">
                  <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full font-medium">
                    Optional
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium text-gray-700">Analytics</td>
                <td className="px-4 py-3 text-gray-600">Not currently used.</td>
                <td className="px-4 py-3">
                  <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full font-medium">
                    Not used
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium text-gray-700">Advertising</td>
                <td className="px-4 py-3 text-gray-600">Not used. We do not serve advertisements.</td>
                <td className="px-4 py-3">
                  <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full font-medium">
                    Not used
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          You can manage your cookie preferences at any time using the cookie preference centre
          (accessible from the banner shown on your first visit). Disabling functional cookies will
          mean your search history is not persisted between sessions.
        </p>
        <p>
          Most browsers also allow you to block or delete cookies through their settings. Blocking
          strictly necessary cookies will prevent you from signing in to the Service.
        </p>
      </div>
    ),
  },
  {
    id: 'children',
    title: "9. Children's Privacy",
    content: (
      <p className="text-sm text-gray-700 leading-relaxed">
        The Service is not directed to children under 13 years of age, and we do not knowingly
        collect personal data from children under 13. If we learn that we have inadvertently
        collected data from a child under 13, we will delete it promptly. If you believe we have
        collected such data, please contact us at{' '}
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="text-orange-700 hover:text-orange-900 underline underline-offset-2"
        >
          {CONTACT_EMAIL}
        </a>
        .
      </p>
    ),
  },
  {
    id: 'transfers',
    title: '10. International Data Transfers',
    content: (
      <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
        <p>
          Anugamana is operated from India. Your personal data may be transferred to, and processed
          in, countries other than your country of residence, including the United States, where our
          service providers (Clerk and Anthropic) are based. These countries may not have data
          protection laws equivalent to those in your home country.
        </p>
        <p>
          Where required by applicable law (e.g., GDPR), we take appropriate safeguards to ensure
          that such transfers are subject to standard contractual clauses or equivalent mechanisms
          approved by the relevant supervisory authority.
        </p>
      </div>
    ),
  },
  {
    id: 'security',
    title: '11. Security',
    content: (
      <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
        <p>
          We implement industry-standard technical and organisational measures to protect your
          personal data against unauthorised access, alteration, disclosure, or destruction. These
          include HTTPS encryption for all data in transit and access controls limiting who can view
          your data within our systems.
        </p>
        <p>
          No method of transmission over the internet or electronic storage is completely secure.
          While we strive to protect your data, we cannot guarantee absolute security. If you
          discover a security vulnerability, please report it responsibly to{' '}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-orange-700 hover:text-orange-900 underline underline-offset-2"
          >
            {CONTACT_EMAIL}
          </a>
          .
        </p>
      </div>
    ),
  },
  {
    id: 'changes',
    title: '12. Changes to This Policy',
    content: (
      <p className="text-sm text-gray-700 leading-relaxed">
        We may update this Privacy Policy from time to time. When we do, we will revise the "Last
        updated" date at the top of this page. For material changes, we will make reasonable efforts
        to notify you — for example, by email or by a prominent in-Service notice — at least 30 days
        before the changes take effect. Your continued use of the Service after the effective date of
        a revised Policy constitutes your acceptance of the changes.
      </p>
    ),
  },
  {
    id: 'contact',
    title: '13. Contact Us',
    content: (
      <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
        <p>
          For any privacy-related questions, requests to exercise your rights, or complaints, please
          contact us at:
        </p>
        <div className="bg-orange-50 rounded-xl border border-orange-100 p-4 space-y-1">
          <p>
            <strong>Anugamana</strong>
          </p>
          <p>
            Email:{' '}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-orange-700 hover:text-orange-900 underline underline-offset-2"
            >
              {CONTACT_EMAIL}
            </a>
          </p>
        </div>
        <p>
          We will acknowledge your request within 72 hours and aim to fully respond within 30 days.
          If you are not satisfied with our response, you have the right to lodge a complaint with
          the relevant data protection authority in your jurisdiction.
        </p>
      </div>
    ),
  },
];

export function PrivacyPage() {
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
            <Shield className="w-5 h-5 text-orange-700" />
          </div>
          <h1 className="text-3xl font-semibold text-orange-950">Privacy Policy</h1>
        </div>
        <p className="text-sm text-gray-500">
          Last updated: <span className="font-medium text-gray-700">{EFFECTIVE_DATE}</span>
        </p>
        <p className="mt-3 text-sm text-gray-600 leading-relaxed">
          This Privacy Policy describes how Anugamana collects, uses, and protects your personal
          data, and explains your rights under applicable privacy laws including the DPDP Act
          (India), GDPR (EU/UK), and CCPA (California).
        </p>
      </div>

      {/* Summary callout */}
      <div className="mb-10 bg-indigo-50 border border-indigo-100 rounded-2xl p-5">
        <p className="text-xs font-semibold text-indigo-700 uppercase tracking-wider mb-3">
          At a glance
        </p>
        <ul className="space-y-2 text-sm text-indigo-900">
          <li className="flex items-start gap-2">
            <span className="text-indigo-400 mt-0.5">✦</span>
            <span>We do not sell, rent, or trade your personal data.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-indigo-400 mt-0.5">✦</span>
            <span>Your search history is stored only in your browser — never on our servers.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-indigo-400 mt-0.5">✦</span>
            <span>We use no advertising or tracking cookies.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-indigo-400 mt-0.5">✦</span>
            <span>
              Search queries are sent to Anthropic's Claude API to generate guidance, but are not
              linked to your identity.
            </span>
          </li>
        </ul>
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
          This Privacy Policy was last updated on {EFFECTIVE_DATE} and is effective immediately.
        </p>
        <p className="mt-1">
          Also see our{' '}
          <Link to="/terms" className="text-orange-600 hover:text-orange-800 underline underline-offset-2">
            Terms of Service
          </Link>
          .
        </p>
      </div>
    </motion.main>
  );
}
