import { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Accessibility Statement',
  description: 'Our commitment to making WinterStormWatch accessible to all users, including those with disabilities.',
  alternates: {
    canonical: 'https://www.winterstormwatch.online/accessibility',
  },
};

export default function AccessibilityPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main id="main-content" className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <article className="prose prose-lg max-w-none">
          <header className="mb-12 not-prose">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Accessibility Statement
            </h1>
            <p className="text-xl text-gray-600">
              Our commitment to inclusive design
            </p>
          </header>

          <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Commitment</h2>
            <p className="text-gray-700 mb-4">
              WinterStormWatch is committed to ensuring digital accessibility for people with disabilities. We continually improve the user experience for everyone and apply relevant accessibility standards.
            </p>
          </section>

          <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Conformance Status</h2>
            <p className="text-gray-700 mb-4">
              The Web Content Accessibility Guidelines (WCAG) defines requirements for designers and developers to improve accessibility for people with disabilities. It defines three levels of conformance: Level A, Level AA, and Level AAA.
            </p>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-green-800">
                <strong>Status:</strong> WinterStormWatch is designed to conform with WCAG 2.1 Level AA.
              </p>
            </div>
          </section>

          <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Accessibility Features</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Visual Accessibility</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span>High color contrast ratios (4.5:1 minimum)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Resize text up to 200% without loss of function</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Images have descriptive alt text</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span>No content depends solely on color</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Keyboard Navigation</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span>All functionality available via keyboard</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Visible focus indicators on all interactive elements</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Skip-to-content link for screen readers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Logical tab order</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Screen Reader Support</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Semantic HTML structure</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span>ARIA labels where needed</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Proper heading hierarchy</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Form inputs have associated labels</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Motion & Animation</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Reduced motion support via CSS media query</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Animations can be disabled if needed</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span>No flashing content (seizure-safe)</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Keyboard Shortcuts</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="py-3 px-4 text-gray-600 font-semibold">Action</th>
                    <th className="py-3 px-4 text-gray-600 font-semibold">Keyboard Shortcut</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4">Skip to main content</td>
                    <td className="py-3 px-4 font-mono text-sm">Tab (on load)</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4">Return to top of page</td>
                    <td className="py-3 px-4 font-mono text-sm">Home</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">Navigate between links</td>
                    <td className="py-3 px-4 font-mono text-sm">Tab / Shift+Tab</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Assistive Technologies</h2>
            <p className="text-gray-700 mb-4">
              WinterStormWatch is tested with various assistive technologies, including:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Screen readers (NVDA, JAWS, VoiceOver, TalkBack)</li>
              <li>Screen magnification software</li>
              <li>Voice recognition software</li>
              <li>Keyboard-only navigation</li>
            </ul>
          </section>

          <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Feedback</h2>
            <p className="text-gray-700 mb-4">
              We welcome your feedback on the accessibility of WinterStormWatch. Please let us know if you encounter accessibility barriers:
            </p>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-700">
                <strong>Email:</strong> support@winterstormwatch.online
              </p>
              <p className="text-gray-700 mt-2">
                We try to respond to accessibility feedback within 2 business days.
              </p>
            </div>
          </section>

          <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Limitations</h2>
            <p className="text-gray-700 mb-4">
              While we strive for complete accessibility, there may be limitations:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Third-party content may not meet our accessibility standards</li>
              <li>Older browser versions may not support all accessibility features</li>
              <li>Some content uploaded by users may not be fully accessible</li>
            </ul>
          </section>
        </article>
      </main>

      <Footer />
    </div>
  );
}
