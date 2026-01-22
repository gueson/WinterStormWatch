import { Metadata } from 'next';
import { CitySelector } from '../../components/CitySelector';
import { WeatherForecast } from '../../components/WeatherForecast';
import { RoadConditions } from '../../components/RoadConditions';
import { EmergencyContacts } from '../../components/EmergencyContacts';
import { LocalTips } from '../../components/LocalTips';
import { CityProvider } from '../../components/CityContext';
import { City, CITIES, DEFAULT_CITY } from '../../lib/city-data';

export const metadata: Metadata = {
  title: {
    absolute: 'City Winter Tools - Local Winter Weather Resources | WinterStormWatch',
  },
  description: 'Comprehensive winter weather tools for US cities including 10-day snow forecasts, road conditions, emergency contacts, and local winter safety tips for Dallas, San Antonio, Chicago, and more.',
  keywords: [
    'winter storm tools',
    'city weather forecast',
    '10-day snow forecast',
    'road conditions',
    'emergency contacts',
    'winter safety tips',
    'local winter advice',
    'Dallas winter weather',
    'San Antonio snow forecast',
    'Chicago winter tips',
    'US city winter tools',
    'extreme cold resources',
  ].join(', '),
  openGraph: {
    type: 'website',
    title: 'City Winter Tools - Local Winter Weather Resources',
    description: 'Comprehensive winter weather tools for US cities including 10-day snow forecasts, road conditions, emergency contacts, and local winter safety tips.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Winter Storm Watch - City Winter Tools',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'City Winter Tools - Local Winter Weather Resources',
    description: 'Comprehensive winter weather tools for US cities including 10-day snow forecasts, road conditions, and local winter safety tips.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: '/city-tools',
  },
};

export default function CityToolsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <CityProvider>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">City Winter Tools</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get comprehensive winter weather information and safety tips for your city
            </p>
          </div>

          {/* 城市选择器 */}
          <section className="mb-12">
            <CitySelector />
          </section>

          {/* 天气预报 */}
          <section className="mb-12">
            <WeatherForecast />
          </section>

          {/* 道路状况 */}
          <section className="mb-12">
            <RoadConditions />
          </section>

          {/* 应急联系方式 */}
          <section className="mb-12">
            <EmergencyContacts />
          </section>

          {/* 本地经验和提示 */}
          <section className="mb-8">
            <LocalTips />
          </section>
        </main>
      </CityProvider>
    </div>
  );
}
