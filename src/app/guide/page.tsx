import { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Winter Storm Safety Guide',
  description: 'Comprehensive winter storm safety guide including emergency preparation, travel safety tips, and essential supplies checklist.',
  alternates: {
    canonical: '/guide',
  },
};

export default function GuidePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main id="main-content" className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <article className="prose prose-lg max-w-none">
          <header className="mb-12 not-prose">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Winter Storm Safety Guide
            </h1>
            <p className="text-xl text-gray-600">
              Essential information to help you prepare for and respond to winter storms.
            </p>
          </header>

          <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <span className="bg-blue-100 text-blue-600 rounded-lg p-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </span>
              Before the Storm
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Emergency Supplies</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>3-day supply of water (1 gallon per person per day)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Non-perishable food items</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Battery-powered radio or hand-crank radio</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Flashlights with extra batteries</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>First aid kit with essential medications</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Home Preparation</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Insulate walls, attics, and pipes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Weatherstrip doors and windows</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Install smoke and carbon monoxide detectors</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Keep heating system maintained</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Have emergency heating equipment available</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <span className="bg-yellow-100 text-yellow-600 rounded-lg p-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
              During the Storm
            </h2>

            <div className="space-y-6">
              <div className="bg-red-50 border-l-4 border-red-500 p-4">
                <h3 className="font-semibold text-red-900 mb-2">Stay Indoors</h3>
                <p className="text-red-800">
                  The safest place during a winter storm is indoors. Minimize travel and avoid going outside unless absolutely necessary.
                </p>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
                <h3 className="font-semibold text-yellow-900 mb-2">Stay Warm</h3>
                <p className="text-yellow-800">
                  Layer clothing and use blankets. If your heating system fails, move to a smaller room and conserve body heat. Never use a generator indoors.
                </p>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                <h3 className="font-semibold text-blue-900 mb-2">Stay Informed</h3>
                <p className="text-blue-800">
                  Monitor weather updates through your battery-powered radio. Keep your phone charged and have backup power sources available.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <span className="bg-green-100 text-green-600 rounded-lg p-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
              After the Storm
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Safety Checks</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Check for downed power lines</li>
                  <li>• Inspect your home for damage</li>
                  <li>• Use caution when clearing snow</li>
                  <li>• Check on neighbors, especially elderly</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Recovery Steps</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Gradually heat your home</li>
                  <li>• Check pipes for freezing damage</li>
                  <li>• Dispose of spoiled food</li>
                  <li>• Document damage for insurance</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <span className="bg-purple-100 text-purple-600 rounded-lg p-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
              </span>
              Emergency Contacts
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="py-3 px-4 text-gray-600 font-semibold">Resource</th>
                    <th className="py-3 px-4 text-gray-600 font-semibold">Contact</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4">Emergency (Police, Fire, Medical)</td>
                    <td className="py-3 px-4 font-medium">911</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4">National Weather Service</td>
                    <td className="py-3 px-4 font-medium">weather.gov</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4">FEMA</td>
                    <td className="py-3 px-4 font-medium">1-800-621-3362</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">American Red Cross</td>
                    <td className="py-3 px-4 font-medium">1-800-733-2767</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </article>
      </main>

      <Footer />
    </div>
  );
}
