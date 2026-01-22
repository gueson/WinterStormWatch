import Link from 'next/link';

export function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="flex items-center gap-3 text-gray-900 hover:text-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 rounded p-2"
              aria-label="Winter Storm Watch - Home"
            >
              <div className="w-12 h-10 bg-blue-600 text-white font-bold text-center flex items-center justify-center rounded">
                WSW
              </div>
              <span className="text-xl font-bold">winterstormwatch</span>
            </Link>

            <nav aria-label="Main navigation">
              <ul className="hidden md:flex items-center gap-6">
                <li>
                  <Link
                    href="/"
                    className="text-gray-600 hover:text-gray-900 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 rounded px-2 py-1"
                  >
                    Active Alerts
                  </Link>
                </li>
                <li>
                  <Link
                    href="/city-tools"
                    className="text-gray-600 hover:text-gray-900 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 rounded px-2 py-1"
                  >
                    City Winter Tools
                  </Link>
                </li>
                <li>
                  <Link
                    href="/guide"
                    className="text-gray-600 hover:text-gray-900 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 rounded px-2 py-1"
                  >
                    Safety Guide
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-gray-600 hover:text-gray-900 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 rounded px-2 py-1"
                  >
                    About
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-sm text-gray-500">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" aria-hidden="true"></span>
              <span>Live Data</span>
            </div>
            <a
              href="https://www.weather.gov"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
            >
              NWS Source
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
