'use client';

import { filterAllAlerts, groupAlertsByState } from '@/lib/nws-api';
import { mockAllAlerts } from '@/lib/mock-data';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AlertBanner } from '@/components/AlertBanner';
import { WeatherAlert } from '@/types/weather';
import dynamic from 'next/dynamic';
import Script from 'next/script';
import { useState, useEffect, useMemo } from 'react';

const Stats = dynamic(() => import('@/components/Stats').then((module) => ({ default: module.Stats })), { 
  ssr: false,
  loading: () => <div className="flex justify-center py-8"><div className="animate-pulse bg-gray-200 rounded-lg w-64 h-24"></div></div>
});
const AlertList = dynamic(() => import('@/components/AlertList').then((module) => ({ default: module.AlertList })), { 
  ssr: false,
  loading: () => <div className="flex justify-center py-8"><div className="animate-pulse bg-gray-200 rounded-lg w-full h-48"></div></div>
});

const STATE_ABBREVIATIONS: Record<string, string> = {
  'AL': 'Alabama', 'AK': 'Alaska', 'AZ': 'Arizona', 'AR': 'Arkansas', 'CA': 'California',
  'CO': 'Colorado', 'CT': 'Connecticut', 'DE': 'Delaware', 'FL': 'Florida', 'GA': 'Georgia',
  'HI': 'Hawaii', 'ID': 'Idaho', 'IL': 'Illinois', 'IN': 'Indiana', 'IA': 'Iowa',
  'KS': 'Kansas', 'KY': 'Kentucky', 'LA': 'Louisiana', 'ME': 'Maine', 'MD': 'Maryland',
  'MA': 'Massachusetts', 'MI': 'Michigan', 'MN': 'Minnesota', 'MS': 'Mississippi', 'MO': 'Missouri',
  'MT': 'Montana', 'NE': 'Nebraska', 'NV': 'Nevada', 'NH': 'New Hampshire', 'NJ': 'New Jersey',
  'NM': 'New Mexico', 'NY': 'New York', 'NC': 'North Carolina', 'ND': 'North Dakota', 'OH': 'Ohio',
  'OK': 'Oklahoma', 'OR': 'Oregon', 'PA': 'Pennsylvania', 'RI': 'Rhode Island', 'SC': 'South Carolina',
  'SD': 'South Dakota', 'TN': 'Tennessee', 'TX': 'Texas', 'UT': 'Utah', 'VT': 'Vermont',
  'VA': 'Virginia', 'WA': 'Washington', 'WV': 'West Virginia', 'WI': 'Wisconsin', 'WY': 'Wyoming',
};

function extractState(areaDesc: string): string {
  const stateMatch = areaDesc.match(/\b([A-Z]{2})\b(?!.*[A-Z]{2})/);
  if (stateMatch) {
    const stateAbbr = stateMatch[1];
    return STATE_ABBREVIATIONS[stateAbbr] || stateAbbr;
  }
  return 'Unknown';
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

export default function Home() {
  const [allAlertsData, setAllAlertsData] = useState<WeatherAlert[]>([]);
  const [dataSource, setDataSource] = useState<'nws-api' | 'mock-data'>('nws-api');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const CACHE_KEY = 'weather_alerts_cache';
    const CACHE_TTL = 5 * 60 * 1000;
    
    const fetchAlerts = async () => {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const cacheData = JSON.parse(cached);
        if (Date.now() - cacheData.timestamp < CACHE_TTL) {
          setAllAlertsData(cacheData.data);
          setDataSource('nws-api');
          setIsLoading(false);
          return;
        }
      }
      
      const NWS_API_BASE = 'https://api.weather.gov';
      const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 WeatherAlert/1.0';
      
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);
        
        const response = await fetch(`${NWS_API_BASE}/alerts/active`, {
          headers: {
            'User-Agent': USER_AGENT,
            'Accept': 'application/geo+json',
          },
          signal: controller.signal,
        });
        
        clearTimeout(timeoutId);
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.features && data.features.length > 0) {
          const alerts = filterAllAlerts(data.features);
          setAllAlertsData(alerts);
          setDataSource('nws-api');
          localStorage.setItem(CACHE_KEY, JSON.stringify({
            data: alerts,
            timestamp: Date.now()
          }));
        } else {
          setAllAlertsData(mockAllAlerts);
          setDataSource('mock-data');
        }
      } catch {
        setError('Failed to fetch real-time data');
        setAllAlertsData(mockAllAlerts);
        setDataSource('mock-data');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchAlerts();
  }, []);
  
  const computedData = useMemo(() => {
    const groupedAlerts = groupAlertsByState(allAlertsData);
    const statesAffected = Object.keys(groupedAlerts).length;
    const warnings = allAlertsData.filter((a) => a.properties.event.includes('Warning')).length;
    const watches = allAlertsData.filter((a) => a.properties.event.includes('Watch')).length;
    
    return {
      groupedAlerts,
      statesAffected,
      warnings,
      watches,
      lastUpdated: formatDate(new Date().toISOString()),
      processedAlerts: allAlertsData.map((alert) => ({
        id: alert.id,
        event: alert.properties.event,
        areaDesc: alert.properties.areaDesc,
        severity: alert.properties.severity,
        urgency: alert.properties.urgency,
        certainty: alert.properties.certainty,
        effective: alert.properties.effective,
        expires: alert.properties.expires,
        description: alert.properties.description,
        instruction: alert.properties.instruction,
        url: alert.properties.url,
        headline: alert.properties.headline,
        senderName: alert.properties.senderName,
        state: extractState(alert.properties.areaDesc),
      }))
    };
  }, [allAlertsData]);

  const structuredData = useMemo(() => ({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'WeatherAlert',
    description: 'Real-time US weather alerts including watches, warnings, and advisories for all seasonal hazards.',
    url: 'https://www.winterstormwatch.online',
    logo: 'https://www.winterstormwatch.online/icon.svg',
    sameAs: [],
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'support@winterstormwatch.online',
      contactType: 'customer support',
    },
    mainEntity: {
      '@type': 'WeatherService',
      name: 'US Weather Alerts',
      description: 'Real-time monitoring of weather alerts from the National Weather Service',
      provider: {
        '@type': 'Organization',
        name: 'WeatherAlert',
      },
      hasWeatherForecast: {
        '@type': 'WeatherForecast',
        numberOfAlerts: allAlertsData.length,
        statesAffected: computedData.statesAffected,
        dateModified: new Date().toISOString(),
      },
    },
  }), [allAlertsData, computedData.statesAffected]);

  const breadcrumbData = useMemo(() => ({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.winterstormwatch.online',
      },
    ],
  }), []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
          <div className="flex flex-col items-center justify-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-600">Loading weather alerts...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        strategy="afterInteractive"
      />
      <Script
        id="breadcrumb-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
        strategy="afterInteractive"
      />
      <Header />

      <main id="main-content" className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="mb-4 text-right">
          <span 
            className="inline-flex items-center text-xs font-medium px-3 py-1 rounded-full bg-blue-100 text-blue-800"
            aria-live="polite"
          >
            <span className="sr-only">Data source:</span>
            {dataSource === 'nws-api' ? (
              <>
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" aria-hidden="true"></span>
                Live NWS Data
              </>
            ) : (
              <>
                <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2" aria-hidden="true"></span>
                Mock Data
              </>
            )}
          </span>
        </div>
        
        {error && (
          <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-yellow-800 text-sm">⚠️ {error}</p>
          </div>
        )}

        <section aria-labelledby="alerts-heading">
          <div className="mb-8">
            <h1 id="alerts-heading" className="text-3xl font-bold text-gray-900 mb-2">
              US Weather Alerts & Seasonal Hazard Updates
            </h1>
            <p className="text-gray-600 mb-4">
              Real-time monitoring of all weather alerts, watches, and advisories issued by the National Weather Service (NWS) for all 50 states and U.S. territories.
            </p>
            <p className="text-gray-600">
              Stay informed about seasonal weather conditions throughout the year with our comprehensive weather alert tracking system.
            </p>
          </div>

          <AlertBanner alertCount={allAlertsData.length} lastUpdated={computedData.lastUpdated} />

          {allAlertsData.length > 0 && (
            <Stats
              totalAlerts={allAlertsData.length}
              statesAffected={computedData.statesAffected}
              warnings={computedData.warnings}
              watches={computedData.watches}
            />
          )}

          <AlertList
            alerts={computedData.processedAlerts}
            dataSource={dataSource}
          />
        </section>

        <section className="mt-12 bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Safety Guidelines</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <article className="bg-blue-50 rounded-xl p-6">
              <h3 className="font-semibold text-blue-900 mb-2">🏠 Home Preparation</h3>
              <ul className="text-sm text-blue-800 space-y-2">
                <li>• Stock up on at least 3 days of food and water</li>
                <li>• Prepare flashlights, batteries, and first aid kit</li>
                <li>• Keep phone power banks fully charged</li>
                <li>• Have warm clothing and blankets ready</li>
              </ul>
            </article>
            <article className="bg-yellow-50 rounded-xl p-6">
              <h3 className="font-semibold text-yellow-900 mb-2">🚗 Travel Safety</h3>
              <ul className="text-sm text-yellow-800 space-y-2">
                <li>• Avoid non-essential travel if possible</li>
                <li>• Always check the latest road conditions</li>
                <li>• Keep emergency supplies in your vehicle</li>
                <li>• Inform others of your travel plans</li>
              </ul>
            </article>
            <article className="bg-green-50 rounded-xl p-6">
              <h3 className="font-semibold text-green-900 mb-2">❄️ During the Storm</h3>
              <ul className="text-sm text-green-800 space-y-2">
                <li>• Monitor official alert updates</li>
                <li>• Stay indoors and stay safe</li>
                <li>• Take care of elderly and children</li>
                <li>• Prevent carbon monoxide poisoning</li>
              </ul>
            </article>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}