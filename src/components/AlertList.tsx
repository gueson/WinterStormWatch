'use client';

import { useState, useMemo, memo, useEffect } from 'react';
import { AlertCard } from './AlertCard';

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

const FilterBar = memo(function FilterBar({ states, selectedState, selectedAlertType, onStateChange, onAlertTypeChange }: FilterBarProps) {
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
});

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = memo(function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
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
});

function getAlertType(event: string): 'Watch' | 'Warning' | 'Advisory' {
  const eventLower = event.toLowerCase();
  if (eventLower.includes('warning')) return 'Warning';
  if (eventLower.includes('watch')) return 'Watch';
  return 'Advisory';
}

export const AlertList = memo(function AlertList({ alerts, isLoading = false, dataSource = 'nws-api' }: AlertListProps) {
  const [selectedState, setSelectedState] = useState<string>('');
  const [selectedAlertType, setSelectedAlertType] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 12;

  const uniqueStates = useMemo(() => {
    const mappedStates = alerts.map((alert) => 
      alert.state === 'Unknown State' ? 'Other States' : alert.state
    );
    const uniqueSet = new Set(mappedStates);
    let sortedStates = Array.from(uniqueSet).sort();
    const otherStatesIndex = sortedStates.indexOf('Other States');
    if (otherStatesIndex !== -1) {
      sortedStates.splice(otherStatesIndex, 1);
      sortedStates.push('Other States');
    }
    return sortedStates;
  }, [alerts]);

  const filteredAlerts = useMemo(() => {
    return alerts.filter((alert) => {
      const alertState = alert.state === 'Unknown State' ? 'Other States' : alert.state;
      const matchesState = !selectedState || alertState === selectedState;
      const alertType = getAlertType(alert.event);
      const matchesType = !selectedAlertType || alertType === selectedAlertType;
      return matchesState && matchesType;
    });
  }, [alerts, selectedState, selectedAlertType]);

  const paginatedAlerts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredAlerts.slice(startIndex, endIndex);
  }, [filteredAlerts, currentPage]);

  const totalPages = Math.ceil(filteredAlerts.length / itemsPerPage);

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
          No Active Weather Alerts
        </h3>
        <p className="text-green-700 mb-4">
          Currently, there are no active weather alerts for the United States.
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

      <FilterBar
        states={uniqueStates}
        selectedState={selectedState}
        selectedAlertType={selectedAlertType}
        onStateChange={setSelectedState}
        onAlertTypeChange={setSelectedAlertType}
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" role="list" aria-label="Weather alerts list">
        {paginatedAlerts.map((alert) => (
          <AlertCard key={alert.id} {...alert} />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
});