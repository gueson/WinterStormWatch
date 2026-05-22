import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { CityProvider } from '../../components/CityContext';
import { City, CITIES, DEFAULT_CITY } from '../../lib/city-data';

const CitySelector = dynamic(() => import('../../components/CitySelector').then((module) => ({ default: module.CitySelector })), { ssr: true });
const WeatherForecast = dynamic(() => import('../../components/WeatherForecast').then((module) => ({ default: module.WeatherForecast })), { ssr: true });
const RoadConditions = dynamic(() => import('../../components/RoadConditions').then((module) => ({ default: module.RoadConditions })), { ssr: true });
const EmergencyContacts = dynamic(() => import('../../components/EmergencyContacts').then((module) => ({ default: module.EmergencyContacts })), { ssr: true });
const LocalTips = dynamic(() => import('../../components/LocalTips').then((module) => ({ default: module.LocalTips })), { ssr: true });

export const metadata: Metadata = {
  title: 'City Weather Tools | Local Weather Resources & Forecasts',
  description: 'Comprehensive weather tools for US cities including 10-day forecasts, road conditions, emergency contacts, and local weather safety tips for Dallas, San Antonio, Chicago, and more.',
  keywords: [
    'city weather tools',
    'local weather forecast',
    '10-day forecast',
    'road conditions',
    'emergency contacts',
    'weather safety tips',
    'local weather advice',
  ],
  alternates: {
    canonical: 'https://www.winterstormwatch.online/city-tools',
  },
  openGraph: {
    type: 'website',
    title: 'City Weather Tools - Local Weather Resources',
    description: 'Comprehensive weather tools for US cities including 10-day forecasts, road conditions, and local weather safety tips.',
    url: 'https://www.winterstormwatch.online/city-tools',
    images: [
      {
        url: 'https://www.winterstormwatch.online/og-image.png',
        width: 1200,
        height: 630,
        alt: 'WeatherAlert - City Weather Tools',
      },
    ],
  },
};

export default function CityToolsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <CityProvider>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">City Weather Tools</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get comprehensive weather information and safety tips for your city
            </p>
          </div>

          <section className="mb-12">
            <CitySelector />
          </section>

          <section className="mb-12">
            <WeatherForecast />
          </section>

          <section className="mb-12">
            <RoadConditions />
          </section>

          <section className="mb-12">
            <EmergencyContacts />
          </section>

          <section className="mb-8">
            <LocalTips />
          </section>
        </main>
      </CityProvider>
    </div>
  );
}