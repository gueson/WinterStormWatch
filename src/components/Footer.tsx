import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link
              href="/"
              className="flex items-center gap-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded p-2"
              aria-label="Winter Storm Watch - Home"
            >
              <div className="w-12 h-10 bg-blue-600 text-white font-bold text-center flex items-center justify-center rounded">
                WSW
              </div>
              <span className="text-xl font-bold text-white">winterstormwatch</span>
            </Link>
            <p className="text-sm text-gray-400 mb-4 max-w-md">
              Real-time winter storm alerts and safety information for the United States.
              Data sourced from the National Weather Service (NWS).
            </p>
            <p className="text-xs text-gray-500">
              © {currentYear} WinterStormWatch. All rights reserved.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-sm hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
                >
                  Active Alerts
                </Link>
              </li>
              <li>
                <Link
                  href="/guide"
                  className="text-sm hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
                >
                  Safety Guide
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
                >
                  About
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Legal & Data
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/privacy"
                  className="text-sm hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/accessibility"
                  className="text-sm hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
                >
                  Accessibility
                </Link>
              </li>
              <li>
                <a
                  href="https://www.weather.gov"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
                >
                  NWS Official Site ↗
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <p className="text-xs text-gray-500 text-center">
            Weather data provided by the National Weather Service (NWS). This site is not affiliated with NWS or NOAA.
            Always refer to official sources for the most accurate and up-to-date weather information.
          </p>
        </div>
      </div>
    </footer>
  );
}
