import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Cookie, X, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const STORAGE_KEY = 'anugamana_cookie_consent';

interface ConsentState {
  necessary: true;
  functional: boolean;
  timestamp: string;
}

function getStoredConsent(): ConsentState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ConsentState) : null;
  } catch {
    return null;
  }
}

function saveConsent(functional: boolean) {
  const consent: ConsentState = {
    necessary: true,
    functional,
    timestamp: new Date().toISOString(),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
}

function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={onChange}
      className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus:outline-none ${
        checked ? 'bg-orange-500' : 'bg-gray-300'
      }`}
    >
      <span
        className={`pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow ring-0 transition-transform ${
          checked ? 'translate-x-4' : 'translate-x-0'
        }`}
      />
    </button>
  );
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [functional, setFunctional] = useState(true);

  useEffect(() => {
    if (!getStoredConsent()) setVisible(true);
  }, []);

  function accept() {
    saveConsent(true);
    setVisible(false);
  }

  function rejectNonEssential() {
    saveConsent(false);
    setVisible(false);
  }

  function savePreferences() {
    saveConsent(functional);
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: 'spring', damping: 26, stiffness: 220 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6"
        >
          <div className="max-w-4xl mx-auto bg-white border border-orange-100 rounded-2xl shadow-2xl shadow-orange-900/10 p-5">
            <div className="flex items-start gap-4">
              {/* Icon */}
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                <Cookie className="w-5 h-5 text-orange-600" />
              </div>

              {/* Body */}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 mb-1 text-sm">We use cookies</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  We use strictly necessary cookies to keep you signed in, and optional functional
                  cookies to remember your search history. We have no advertising or tracking
                  cookies. See our{' '}
                  <Link
                    to="/privacy"
                    onClick={rejectNonEssential}
                    className="text-orange-600 hover:text-orange-800 underline underline-offset-2"
                  >
                    Privacy Policy
                  </Link>{' '}
                  for full details.
                </p>

                {/* Manage toggle */}
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="flex items-center gap-1 mt-2.5 text-xs text-orange-600 hover:text-orange-800 transition-colors font-medium"
                >
                  Manage preferences
                  {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                </button>

                {/* Expanded preferences panel */}
                <AnimatePresence>
                  {expanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-3 space-y-3 bg-orange-50 rounded-xl border border-orange-100 p-4">
                        {/* Necessary — always on */}
                        <div className="flex items-center justify-between gap-4">
                          <div>
                            <p className="text-sm font-semibold text-gray-800">
                              Strictly Necessary
                            </p>
                            <p className="text-xs text-gray-500 mt-0.5">
                              Authentication sessions and security. Required for the Service to
                              function.
                            </p>
                          </div>
                          <span className="flex-shrink-0 px-2.5 py-0.5 bg-orange-100 text-orange-700 text-xs font-semibold rounded-full whitespace-nowrap">
                            Always on
                          </span>
                        </div>

                        <div className="h-px bg-orange-100" />

                        {/* Functional — toggleable */}
                        <div className="flex items-center justify-between gap-4">
                          <div>
                            <p className="text-sm font-semibold text-gray-800">Functional</p>
                            <p className="text-xs text-gray-500 mt-0.5">
                              Remembers your search history in this browser across sessions.
                            </p>
                          </div>
                          <Toggle
                            checked={functional}
                            onChange={() => setFunctional((f) => !f)}
                          />
                        </div>

                        <div className="h-px bg-orange-100" />

                        {/* Analytics — not used */}
                        <div className="flex items-center justify-between gap-4 opacity-50">
                          <div>
                            <p className="text-sm font-semibold text-gray-800">Analytics</p>
                            <p className="text-xs text-gray-500 mt-0.5">
                              Not currently used. We do not track usage behaviour.
                            </p>
                          </div>
                          <span className="flex-shrink-0 px-2.5 py-0.5 bg-gray-100 text-gray-500 text-xs font-semibold rounded-full whitespace-nowrap">
                            Disabled
                          </span>
                        </div>

                        <button
                          onClick={savePreferences}
                          className="w-full mt-1 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white text-sm font-medium rounded-xl transition-colors"
                        >
                          Save preferences
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Primary actions */}
                {!expanded && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    <button
                      onClick={accept}
                      className="px-5 py-2 bg-orange-600 hover:bg-orange-700 text-white text-sm font-medium rounded-full transition-colors shadow-sm"
                    >
                      Accept all
                    </button>
                    <button
                      onClick={rejectNonEssential}
                      className="px-5 py-2 border border-orange-200 text-orange-700 hover:bg-orange-50 text-sm font-medium rounded-full transition-colors"
                    >
                      Reject non-essential
                    </button>
                  </div>
                )}
              </div>

              {/* Dismiss (counts as reject non-essential) */}
              <button
                onClick={rejectNonEssential}
                aria-label="Dismiss — reject non-essential cookies"
                className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors mt-0.5"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
