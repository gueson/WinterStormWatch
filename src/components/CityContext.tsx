'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { City, CITIES, DEFAULT_CITY } from '../lib/city-data';

interface CityContextType {
  selectedCity: City;
  setSelectedCity: (city: City) => void;
  cities: City[];
}

const CityContext = createContext<CityContextType | undefined>(undefined);

export const CityProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedCity, setSelectedCity] = useState<City>(DEFAULT_CITY);

  return (
    <CityContext.Provider value={{ selectedCity, setSelectedCity, cities: CITIES }}>
      {children}
    </CityContext.Provider>
  );
};

export const useCity = (): CityContextType => {
  const context = useContext(CityContext);
  if (context === undefined) {
    throw new Error('useCity must be used within a CityProvider');
  }
  return context;
};
