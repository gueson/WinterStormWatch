import { getActiveAlerts, filterWinterAlerts, groupAlertsByState } from '@/lib/nws-api';
import { mockWinterAlerts } from '@/lib/mock-data';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AlertBanner } from '@/components/AlertBanner';
import dynamic from 'next/dynamic';
import { Metadata } from 'next';
import Script from 'next/script';

// Lazy load heavy components
const Stats = dynamic(() => import('@/components/Stats').then((module) => ({ default: module.Stats })), { ssr: true });
const AlertList = dynamic(() => import('@/components/AlertList').then((module) => ({ default: module.AlertList })), { ssr: true });

export const metadata: Metadata = {
  title: 'US Winter Storm Alerts | Real-time Winter Storm Watch & Warning Updates',
  description: 'Real-time US winter storm alerts including watches, warnings, and advisories. Covers all states with official NWS details, winter storm safety guidelines, and emergency preparedness tips for winter weather.',
  keywords: [
    'winter storm alerts',
    'winter weather warnings',
    'winter storm watch',
    'US winter weather alerts',
    'NWS winter alerts',
    'winter storm safety guidelines',
    'winter weather advisories',
    'winter storm preparation',
    'winter emergency supplies'
  ],
  alternates: {
    canonical: 'https://www.winterstormwatch.online',
  },
};

export const revalidate = 300;

export default async function Home() {
  let winterAlerts = [];
  let dataSource: 'nws-api' | 'mock-data' = 'nws-api';
  
  try {
    // Try to fetch real data from NWS API
    const allAlerts = await getActiveAlerts();
    winterAlerts = filterWinterAlerts(allAlerts);
    
    // If no real alerts, use mock data for better user experience
    if (winterAlerts.length === 0) {
      winterAlerts = mockWinterAlerts;
      dataSource = 'mock-data';
    }
  } catch (error) {
    console.error('Failed to fetch real NWS data, falling back to mock data:', error);
    // Fallback to mock data if API fails
    winterAlerts = mockWinterAlerts;
    dataSource = 'mock-data';
  }
  
  const groupedAlerts = groupAlertsByState(winterAlerts);
  const statesAffected = Object.keys(groupedAlerts).length;

  const warnings = winterAlerts.filter((a) => a.properties.event.includes('Warning')).length;
  const watches = winterAlerts.filter((a) => a.properties.event.includes('Watch')).length;

  const lastUpdated = new Date().toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short',
  });

  // Schema.org structured data
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WeatherForecast',
    name: 'US Winter Storm Alerts',
    description: 'Real-time US winter storm alerts including watches, warnings, and advisories issued by the National Weather Service (NWS).',
    url: 'https://www.winterstormwatch.online',
    provider: {
      '@type': 'Organization',
      name: 'WinterStormWatch',
      url: 'https://www.winterstormwatch.online'
    },
    dateModified: new Date().toISOString(),
    numberOfAlerts: winterAlerts.length,
    statesAffected: statesAffected,
    alertTypes: {
      warnings: warnings,
      watches: watches,
      advisories: winterAlerts.length - warnings - watches
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Header />

      <main id="main-content" className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Data Source Indicator - Accessible for screen readers */}
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
        
        <section aria-labelledby="alerts-heading">
          <div className="mb-8">
            <h1 id="alerts-heading" className="text-3xl font-bold text-gray-900 mb-2">
              US Winter Storm Alerts & Weather Warnings
            </h1>
            <p className="text-gray-600 mb-4">
              Real-time monitoring of winter storm alerts, watches, and advisories issued by the National Weather Service (NWS) for all 50 states and U.S. territories.
            </p>
            <p className="text-gray-600">
              Stay informed about winter weather conditions with our comprehensive winter storm tracking system. Get up-to-date information on snow storms, ice storms, freezing rain, and other winter weather hazards. Our platform provides official NWS alerts with details on severity, urgency, and safety instructions.
            </p>
          </div>

          <AlertBanner alertCount={winterAlerts.length} lastUpdated={lastUpdated} />

          {winterAlerts.length > 0 && (
            <Stats
              totalAlerts={winterAlerts.length}
              statesAffected={statesAffected}
              warnings={warnings}
              watches={watches}
            />
          )}

          <AlertList
            alerts={winterAlerts.map((alert) => ({
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
            }))}
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

// State abbreviation to full name mapping
const STATE_ABBREVIATIONS: Record<string, string> = {
  'AL': 'Alabama',
  'AK': 'Alaska',
  'AZ': 'Arizona',
  'AR': 'Arkansas',
  'CA': 'California',
  'CO': 'Colorado',
  'CT': 'Connecticut',
  'DE': 'Delaware',
  'FL': 'Florida',
  'GA': 'Georgia',
  'HI': 'Hawaii',
  'ID': 'Idaho',
  'IL': 'Illinois',
  'IN': 'Indiana',
  'IA': 'Iowa',
  'KS': 'Kansas',
  'KY': 'Kentucky',
  'LA': 'Louisiana',
  'ME': 'Maine',
  'MD': 'Maryland',
  'MA': 'Massachusetts',
  'MI': 'Michigan',
  'MN': 'Minnesota',
  'MS': 'Mississippi',
  'MO': 'Missouri',
  'MT': 'Montana',
  'NE': 'Nebraska',
  'NV': 'Nevada',
  'NH': 'New Hampshire',
  'NJ': 'New Jersey',
  'NM': 'New Mexico',
  'NY': 'New York',
  'NC': 'North Carolina',
  'ND': 'North Dakota',
  'OH': 'Ohio',
  'OK': 'Oklahoma',
  'OR': 'Oregon',
  'PA': 'Pennsylvania',
  'RI': 'Rhode Island',
  'SC': 'South Carolina',
  'SD': 'South Dakota',
  'TN': 'Tennessee',
  'TX': 'Texas',
  'UT': 'Utah',
  'VT': 'Vermont',
  'VA': 'Virginia',
  'WA': 'Washington',
  'WV': 'West Virginia',
  'WI': 'Wisconsin',
  'WY': 'Wyoming',
  'DC': 'District of Columbia',
  'PR': 'Puerto Rico',
  'VI': 'Virgin Islands',
  'GU': 'Guam',
  'MP': 'Northern Mariana Islands',
  'AS': 'American Samoa'
};

function extractState(areaDesc: string): string {
  const stateMatch = areaDesc.match(/([A-Z]{2})\s*$/);
  if (stateMatch) {
    const abbreviation = stateMatch[1];
    return STATE_ABBREVIATIONS[abbreviation] || abbreviation;
  }
  return 'Unknown State';
}
