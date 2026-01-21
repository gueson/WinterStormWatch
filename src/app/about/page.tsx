import { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about WinterStormWatch - your source for real-time US winter storm alerts and safety information.',
  alternates: {
    canonical: '/about',
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main id="main-content" className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <article className="prose prose-lg max-w-none">
          <header className="mb-12 not-prose">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              About WinterStormWatch
            </h1>
            <p className="text-xl text-gray-600">
              Your trusted source for real-time winter storm alerts and safety information.
            </p>
          </header>

          <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-700 mb-4">
              WinterStormWatch was created to provide timely, accurate, and accessible information about winter storm conditions across the United States. We believe that everyone deserves access to critical weather information that can help protect lives and property.
            </p>
            <p className="text-gray-700">
              By aggregating data from the National Weather Service (NWS) and presenting it in a clear, user-friendly format, we aim to help communities stay safe during severe winter weather events.
            </p>
          </section>

          <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Source</h2>
            <p className="text-gray-700 mb-4">
              All weather alert data displayed on this website is sourced directly from the National Weather Service (NWS), which is part of the National Oceanic and Atmospheric Administration (NOAA). The NWS provides official weather forecasts, watches, warnings, and advisories for the United States.
            </p>
          </section>

          <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Technology</h2>
            <p className="text-gray-700 mb-4">
              WinterStormWatch is built with modern web technologies to ensure fast, reliable, and accessible access to weather information:
            </p>
            <ul className="space-y-2 text-gray-700">
              <li>• <strong>Next.js</strong> - Server-side rendering for optimal performance and SEO</li>
              <li>• <strong>React</strong> - Interactive user interface components</li>
              <li>• <strong>Tailwind CSS</strong> - Responsive and accessible styling</li>
              <li>• <strong>TypeScript</strong> - Type-safe code for reliability</li>
            </ul>
          </section>

          <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-gray-700 mb-4">
              Have questions, suggestions, or feedback? We would love to hear from you.
            </p>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-700">
                <strong>Email:</strong> support@winterstormwatch.online
              </p>
              <p className="text-gray-700 mt-2">
                <strong>Response Time:</strong> We typically respond within 24-48 hours.
              </p>
            </div>
          </section>
        </article>
      </main>

      <Footer />
    </div>
  );
}
