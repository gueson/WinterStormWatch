'use client';

import React, { useEffect, useState, useMemo } from 'react';

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

interface FilterBarProps {
  states: string[];
  selectedState: string;
  selectedAlertType: string;
  onStateChange: (state: string) => void;
  onAlertTypeChange: (type: string) => void;
}

function FilterBar({ states, selectedState, selectedAlertType, onStateChange, onAlertTypeChange }: FilterBarProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
      <h3 className="text-sm font-semibold text-gray-900 mb-4">Filter Alerts</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="state-filter" className="block text-sm font-medium text-gray-700 mb-2">
            State
          </label>
          <select
            id="state-filter"
            value={selectedState}
            onChange={(e) => onStateChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            aria-label="Filter alerts by state"
          >
            <option value="">All States</option>
            {states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="alert-type-filter" className="block text-sm font-medium text-gray-700 mb-2">
            Alert Type
          </label>
          <select
            id="alert-type-filter"
            value={selectedAlertType}
            onChange={(e) => onAlertTypeChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            aria-label="Filter alerts by type"
          >
            <option value="">All Types</option>
            <option value="Watch">Watch</option>
            <option value="Warning">Warning</option>
            <option value="Advisory">Advisory</option>
          </select>
        </div>
      </div>
    </div>
  );
}

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <nav className="mt-8 flex justify-center" aria-label="Pagination">
      <ul className="flex items-center space-x-2">
        <li>
          <button
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Previous page"
          >
            Previous
          </button>
        </li>
        <li>
          <span className="px-4 py-2 text-sm font-medium text-gray-900">
            Page {currentPage} of {totalPages}
          </span>
        </li>
        <li>
          <button
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next page"
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
}

export function AlertList({ alerts, isLoading = false, dataSource = 'nws-api' }: AlertListProps) {
  // Log data source for debugging
  useEffect(() => {
    console.log('AlertList data source:', dataSource);
  }, [dataSource]);

  // Filter state
  const [selectedState, setSelectedState] = useState<string>('');
  const [selectedAlertType, setSelectedAlertType] = useState<string>('');

  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 12;

  // Get unique states from alerts
  const uniqueStates = useMemo(() => {
    // Map unknown states to "Other States" and get unique values
    const mappedStates = alerts.map((alert) => 
      alert.state === 'Unknown State' ? 'Other States' : alert.state
    );
    const uniqueSet = new Set(mappedStates);
    
    // Convert to array, sort, and move "Other States" to the end
    let sortedStates = Array.from(uniqueSet).sort();
    const otherStatesIndex = sortedStates.indexOf('Other States');
    if (otherStatesIndex !== -1) {
      sortedStates.splice(otherStatesIndex, 1);
      sortedStates.push('Other States');
    }
    
    return sortedStates;
  }, [alerts]);

  // Map state names for display, converting "Unknown State" to "Other States"
  const getDisplayState = (state: string) => {
    return state === 'Unknown State' ? 'Other States' : state;
  };

  // Filter alerts based on selected criteria
  const filteredAlerts = useMemo(() => {
    return alerts.filter((alert) => {
      // Handle special case for "Other States"
      const alertState = alert.state === 'Unknown State' ? 'Other States' : alert.state;
      const matchesState = !selectedState || alertState === selectedState;
      const alertType = getAlertType(alert.event);
      const matchesType = !selectedAlertType || alertType === selectedAlertType;
      return matchesState && matchesType;
    });
  }, [alerts, selectedState, selectedAlertType]);

  // Paginate filtered alerts
  const paginatedAlerts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredAlerts.slice(startIndex, endIndex);
  }, [filteredAlerts, currentPage, itemsPerPage]);

  // Calculate total pages
  const totalPages = Math.ceil(filteredAlerts.length / itemsPerPage);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedState, selectedAlertType]);

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

  if (filteredAlerts.length === 0) {
    return (
      <div className="space-y-6">
        <FilterBar
          states={uniqueStates}
          selectedState={selectedState}
          selectedAlertType={selectedAlertType}
          onStateChange={setSelectedState}
          onAlertTypeChange={setSelectedAlertType}
        />
        <div
          className="bg-yellow-50 border border-yellow-200 rounded-xl p-8 text-center"
          role="status"
          aria-label="No matching alerts"
        >
          <svg
            className="w-16 h-16 mx-auto text-yellow-500 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="text-xl font-semibold text-yellow-800 mb-2">
            No Matching Alerts
          </h3>
          <p className="text-yellow-700 mb-4">
            No alerts match your selected filters. Please try adjusting your criteria.
          </p>
        </div>
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

      {/* Filter Bar */}
      <FilterBar
        states={uniqueStates}
        selectedState={selectedState}
        selectedAlertType={selectedAlertType}
        onStateChange={setSelectedState}
        onAlertTypeChange={setSelectedAlertType}
      />

      {/* Alert cards grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" role="list" aria-label="Weather alerts list">
        {paginatedAlerts.map((alert) => (
          <AlertCard key={alert.id} {...alert} />
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

const AlertCard = React.memo(function AlertCard({
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
  // Map Unknown State to Other States for display
  const displayState = state === 'Unknown State' ? 'Other' : state;

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
          <span className="text-2xl font-bold text-gray-400">{displayState}</span>
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
});

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
