import { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for WinterStormWatch website.',
  alternates: {
    canonical: '/terms',
  },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main id="main-content" className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <article className="prose prose-lg max-w-none">
          <header className="mb-12 not-prose">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Terms of Service
            </h1>
            <p className="text-xl text-gray-600">
              Last updated: January 2025
            </p>
          </header>

          <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Acceptance of Terms</h2>
            <p className="text-gray-700 mb-4">
              By accessing and using WinterStormWatch, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website.
            </p>
          </section>

          <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Use of Services</h2>
            <p className="text-gray-700 mb-4">
              WinterStormWatch provides real-time weather alert information for educational and informational purposes. You agree to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Use the website only for lawful purposes</li>
              <li>Do not attempt to interfere with the website&apos;s operation</li>
              <li>Not copy, reproduce, or redistribute content without permission</li>
              <li>Not use the website for any commercial purposes without authorization</li>
            </ul>
          </section>

          <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Disclaimer of Warranties</h2>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
              <p className="text-yellow-800 font-medium">
                Important: Weather data is provided for informational purposes only.
              </p>
            </div>
            <p className="text-gray-700 mb-4">
              WinterStormWatch provides weather information &quot;as is&quot; without any warranty of any kind. We do not warrant that:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>The information will be accurate, complete, or current</li>
              <li>The website will be available at all times</li>
              <li>The website will meet your specific requirements</li>
              <li>Any errors or defects will be corrected</li>
            </ul>
          </section>

          <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Limitation of Liability</h2>
            <p className="text-gray-700 mb-4">
              To the maximum extent permitted by law, WinterStormWatch shall not be liable for any:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Direct, indirect, incidental, or consequential damages</li>
              <li>Loss of data, income, or profits arising from use of the website</li>
              <li>Actions taken or not taken based on the information provided</li>
              <li>Any damages resulting from reliance on weather information</li>
            </ul>
          </section>

          <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Weather Data Disclaimer</h2>
            <p className="text-gray-700 mb-4">
              All weather data is sourced from the National Weather Service (NWS). While we strive to provide accurate information:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Always refer to official NWS sources for authoritative weather information</li>
              <li>Follow instructions from local authorities during weather emergencies</li>
              <li>Weather conditions can change rapidly; stay alert to updated warnings</li>
              <li>We are not responsible for decisions made based on information from this website</li>
            </ul>
          </section>

          <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Intellectual Property</h2>
            <p className="text-gray-700 mb-4">
              All content on this website, including text, graphics, logos, and images, is the property of WinterStormWatch or its content providers and is protected by copyright laws.
            </p>
            <p className="text-gray-700">
              Weather data from the NWS is in the public domain and may be used in accordance with NWS guidelines.
            </p>
          </section>

          <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to Terms</h2>
            <p className="text-gray-700">
              We reserve the right to modify these Terms of Service at any time. Continued use of the website after any changes constitutes acceptance of the new terms.
            </p>
          </section>

          <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
            <p className="text-gray-700 mb-4">
              For questions about these Terms of Service:
            </p>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-700">
                <strong>Email:</strong> support@winterstormwatch.online
              </p>
            </div>
          </section>
        </article>
      </main>

      <Footer />
    </div>
  );
}
