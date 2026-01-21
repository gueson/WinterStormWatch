'use client';

import { useEffect, useState } from 'react';

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasConsented, setHasConsented] = useState(true);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setIsVisible(true);
      setHasConsented(false);
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem('cookie-consent', 'all');
    localStorage.setItem('analytics-consent', 'true');
    setIsVisible(false);
    setHasConsented(true);
  };

  const acceptEssential = () => {
    localStorage.setItem('cookie-consent', 'essential');
    localStorage.setItem('analytics-consent', 'false');
    setIsVisible(false);
    setHasConsented(true);
  };

  if (!isVisible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie Consent"
      aria-describedby="cookie-description"
      className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 p-4 animate-slide-up"
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 mb-1">🍪 Cookie Settings</h3>
          <p id="cookie-description" className="text-sm text-gray-600">
            We use cookies to improve your experience. Essential cookies are
            required for the website to function properly.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={acceptEssential}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors"
            aria-label="Accept essential cookies only"
          >
            Essential Only
          </button>
          <button
            onClick={acceptAll}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors"
            aria-label="Accept all cookies"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}
