'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { useCity } from './CityContext';
import { STATE_ABBREVIATIONS } from '../lib/state-mapping';

// Custom debounce hook
function useDebounce<T extends (...args: any[]) => any>(func: T, delay: number): T {
  const timeoutRef = React.useRef<NodeJS.Timeout>();

  const debouncedFunc = useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        func(...args);
      }, delay);
    },
    [func, delay]
  ) as T;

  return debouncedFunc;
}

export const CitySelector: React.FC = () => {
  const { selectedCity, setSelectedCity, cities } = useCity();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>('');

  // Debounce search input with 300ms delay
  const debouncedSearch = useDebounce((term: string) => {
    setDebouncedSearchTerm(term);
  }, 300);

  // Filter cities based on debounced search term
  const filteredCities = useMemo(() => {
    if (!debouncedSearchTerm.trim()) {
      return cities;
    }

    const term = debouncedSearchTerm.toLowerCase();
    return cities.filter((city) => {
      const cityName = city.name.toLowerCase();
      const stateName = STATE_ABBREVIATIONS[city.state]?.toLowerCase() || city.state.toLowerCase();
      return cityName.includes(term) || stateName.includes(term);
    });
  }, [cities, debouncedSearchTerm]);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    debouncedSearch(e.target.value);
  };

  // Handle city selection
  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const cityId = e.target.value;
    const city = cities.find((c) => c.id === cityId);
    if (city) {
      setSelectedCity(city);
    }
  };

  // Clear search and reset filters
  const handleClearSearch = () => {
    setSearchTerm('');
    setDebouncedSearchTerm('');
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Select Your City</h2>
      
      <div className="space-y-4">
        {/* Search and Select Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search Input */}
          <div className="md:col-span-2">
            <label htmlFor="city-search" className="block text-sm font-medium text-gray-700 mb-2">
              Search Cities
            </label>
            <div className="relative">
              <input
                type="text"
                id="city-search"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search by city or state..."
                className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                aria-label="Search cities"
              />
              {searchTerm && (
                <button
                  onClick={handleClearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* City Select */}
          <div>
            <label htmlFor="city-select" className="block text-sm font-medium text-gray-700 mb-2">
              Select City ({filteredCities.length} matches)
            </label>
            <select
              id="city-select"
              value={selectedCity?.id || ''}
              onChange={handleCityChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              aria-label="Select a city"
            >
              <option value="">-- Select City --</option>
              {filteredCities.map((city) => {
                const fullStateName = STATE_ABBREVIATIONS[city.state] || city.state;
                return (
                  <option key={city.id} value={city.id}>
                    {city.name}, {fullStateName}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        {/* Selected City Display */}
        {selectedCity && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-medium text-blue-900 mb-1">Selected City</h3>
            <p className="text-lg font-semibold text-blue-700">
              {selectedCity.name}, {STATE_ABBREVIATIONS[selectedCity.state] || selectedCity.state}
            </p>
            <p className="text-sm text-blue-600 mt-1">
              Coordinates: {selectedCity.lat.toFixed(4)}, {selectedCity.lon.toFixed(4)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
