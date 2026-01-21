'use client';

interface AlertBannerProps {
  alertCount: number;
  lastUpdated: string;
}

export function AlertBanner({ alertCount, lastUpdated }: AlertBannerProps) {
  if (alertCount === 0) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-6 mb-8">
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-green-800 mb-1">
              No Active Winter Storm Alerts
            </h2>
            <p className="text-green-700">
              Currently, there are no active winter storm watches, warnings, or advisories for the United States.
            </p>
          </div>
          <p className="text-sm text-green-600 whitespace-nowrap">
            Last updated: {lastUpdated}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-2xl p-6 mb-8">
      <div className="flex items-center gap-4">
        <div className="flex-shrink-0">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center animate-pulse-red">
            <svg
              className="w-8 h-8 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-bold text-red-800 mb-1">
            {alertCount} Active Winter Storm Alert{alertCount !== 1 ? 's' : ''}
          </h2>
          <p className="text-red-700">
            Winter storm watches, warnings, or advisories are currently in effect for parts of the United States.
            Take precautions and stay informed.
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-red-600 whitespace-nowrap">
            Last updated: {lastUpdated}
          </p>
        </div>
      </div>
    </div>
  );
}
