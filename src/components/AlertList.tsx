'use client';

import { useEffect } from 'react';

interface AlertCardProps {
  id: string;
  event: string;
  areaDesc: string;
  severity: string;
  urgency: string;
  certainty: string;
  effective: string;
  expires: string;
  description: string;
  instruction?: string;
  url: string;
  headline?: string;
  senderName: string;
  state: string;
}

interface AlertListProps {
  alerts: Array<AlertCardProps>;
  isLoading?: boolean;
  dataSource?: 'nws-api' | 'mock-data';
}

export function AlertList({ alerts, isLoading = false, dataSource = 'nws-api' }: AlertListProps) {
  // Log data source for debugging
  useEffect(() => {
    console.log('AlertList data source:', dataSource);
  }, [dataSource]);

  if (isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" role="status" aria-label="Loading weather alerts">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow-md overflow-hidden border-l-4 border-gray-300 animate-pulse"
          >
            <div className="p-6">
              <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="h-20 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (alerts.length === 0) {
    return (
      <div
        className="bg-green-50 border border-green-200 rounded-xl p-8 text-center"
        role="status"
        aria-label="No active alerts"
      >
        <svg
          className="w-16 h-16 mx-auto text-green-500 mb-4"
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
        <h3 className="text-xl font-semibold text-green-800 mb-2">
          No Active Winter Storm Alerts
        </h3>
        <p className="text-green-700 mb-4">
          Currently, there are no active winter storm watches, warnings, or
          advisories for the United States.
        </p>
        {dataSource === 'nws-api' && (
          <p className="text-sm text-green-600">
            This information is based on real-time data from the National Weather Service.
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Data source information for mock data */}
      {dataSource === 'mock-data' && (
        <div 
          className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center"
          role="note"
          aria-label="Mock data information"
        >
          <p className="text-yellow-800 flex items-center justify-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            This is demonstration data for testing purposes. In a production environment, real NWS data would be displayed.
          </p>
        </div>
      )}
      
      {/* Alert cards grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" role="list" aria-label="Weather alerts list">
        {alerts.map((alert) => (
          <AlertCard key={alert.id} {...alert} />
        ))}
      </div>
    </div>
  );
}

function AlertCard({
  id,
  event,
  areaDesc,
  severity,
  urgency,
  effective,
  expires,
  description,
  instruction,
  url,
  headline,
  state,
}: AlertCardProps) {
  const alertType = getAlertType(event);
  const severityColor = getSeverityColor(severity);

  return (
    <article
      className={`bg-white rounded-xl shadow-md overflow-hidden border-l-4 ${severityColor} hover:shadow-lg transition-shadow duration-300`}
      aria-labelledby={`alert-${id}-title`}
      key={id}
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span
                className={`px-3 py-1 text-xs font-semibold rounded-full ${getAlertTypeBadgeColor(alertType)}`}
                aria-label={`Alert type: ${alertType}`}
              >
                {alertType}
              </span>
              <span
                className={`px-3 py-1 text-xs font-semibold rounded-full ${getUrgencyBadgeColor(urgency)}`}
                aria-label={`Urgency: ${urgency}`}
              >
                {urgency}
              </span>
            </div>
            <h2
              id={`alert-${id}-title`}
              className="text-xl font-bold text-gray-900 mb-1"
            >
              {headline || event}
            </h2>
            <p className="text-sm text-gray-600 flex items-center gap-1">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              {areaDesc}
            </p>
          </div>
          <span className="text-2xl font-bold text-gray-400">{state}</span>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-gray-500 mb-1">Effective</p>
            <p className="font-medium text-gray-900">{formatDate(effective)}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-gray-500 mb-1">Expires</p>
            <p className="font-medium text-gray-900">{formatDate(expires)}</p>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-sm text-gray-700 line-clamp-3">{description}</p>
        </div>

        {instruction && (
          <div className="mb-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-yellow-800 mb-2 flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Safety Instructions
            </h3>
            <p className="text-sm text-yellow-700">{instruction}</p>
          </div>
        )}

        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
          aria-label={`View official NWS details for ${event}`}
        >
          View Official NWS Details
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </article>
  );
}

function getAlertType(event: string): 'Watch' | 'Warning' | 'Advisory' {
  const eventLower = event.toLowerCase();
  if (eventLower.includes('warning')) return 'Warning';
  if (eventLower.includes('watch')) return 'Watch';
  return 'Advisory';
}

function getSeverityColor(severity: string): string {
  switch (severity) {
    case 'Extreme':
    case 'Severe':
      return 'border-red-500';
    case 'Moderate':
      return 'border-orange-500';
    case 'Minor':
      return 'border-yellow-500';
    default:
      return 'border-gray-300';
  }
}

function getAlertTypeBadgeColor(type: string): string {
  switch (type) {
    case 'Warning':
      return 'bg-red-100 text-red-800';
    case 'Watch':
      return 'bg-yellow-100 text-yellow-800';
    default:
      return 'bg-blue-100 text-blue-800';
  }
}

function getUrgencyBadgeColor(urgency: string): string {
  switch (urgency) {
    case 'Immediate':
      return 'bg-red-100 text-red-800';
    case 'Expected':
      return 'bg-orange-100 text-orange-800';
    case 'Future':
      return 'bg-blue-100 text-blue-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short',
  });
}
