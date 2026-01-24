import { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Our privacy policy explains how we collect, use, and protect your personal information.',
  alternates: {
    canonical: 'https://www.winterstormwatch.online/privacy',
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main id="main-content" className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <article className="prose prose-lg max-w-none">
          <header className="mb-12 not-prose">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Privacy Policy
            </h1>
            <p className="text-xl text-gray-600">
              Last updated: January 2025
            </p>
          </header>

          <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
            <p className="text-gray-700 mb-4">
              At WinterStormWatch, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your information when you use our website. By using WinterStormWatch, you agree to the collection and use of information in accordance with this policy.
            </p>
          </section>

          <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Information We Collect</h2>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Information You Provide</h3>
            <p className="text-gray-700 mb-4">
              We do not require you to create an account or provide personal information to use our basic services. However, if you contact us or subscribe to notifications, we may collect:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
              <li>Email address (for notifications)</li>
              <li>Any other information you voluntarily provide</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 mb-2">Information Automatically Collected</h3>
            <p className="text-gray-700 mb-4">
              When you visit our website, we may automatically collect certain information about your device and usage patterns:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>IP address and browser type</li>
              <li>Operating system</li>
              <li>Referring website</li>
              <li>Pages viewed and time spent</li>
              <li>Date and time of visits</li>
            </ul>
          </section>

          <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Cookies and Tracking</h2>
            <p className="text-gray-700 mb-4">
              We use cookies and similar tracking technologies to improve your experience:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li><strong>Essential Cookies:</strong> Required for the website to function properly</li>
              <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website</li>
            </ul>
            <p className="text-gray-700 mt-4">
              You can control cookies through your browser settings. Note that disabling certain cookies may affect website functionality.
            </p>
          </section>

          <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">GDPR Compliance (EU Users)</h2>
            <p className="text-gray-700 mb-4">
              For users in the European Union, we comply with the General Data Protection Regulation (GDPR):
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li><strong>Lawful Basis:</strong> Processing is necessary for our legitimate interests in providing weather information</li>
              <li><strong>Your Rights:</strong> Access, rectification, erasure, restriction, and data portability</li>
              <li><strong>Withdraw Consent:</strong> You can withdraw consent at any time</li>
              <li><strong>Data Portability:</strong> You can request your data in a machine-readable format</li>
            </ul>
          </section>

          <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">CCPA Compliance (California Users)</h2>
            <p className="text-gray-700 mb-4">
              For California residents, we comply with the California Consumer Privacy Act (CCPA):
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li><strong>Right to Know:</strong> You can request information about the categories of personal information we collect</li>
              <li><strong>Right to Delete:</strong> You can request deletion of your personal information</li>
              <li><strong>Right to Opt-Out:</strong> You can opt-out of the sale of your personal information (we do not sell data)</li>
              <li><strong>Non-Discrimination:</strong> We will not discriminate against you for exercising your rights</li>
            </ul>
          </section>

          <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Security</h2>
            <p className="text-gray-700 mb-4">
              We implement appropriate security measures to protect your information:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>SSL encryption for data transmission</li>
              <li>Secure data storage practices</li>
              <li>Regular security assessments</li>
              <li>Limited access to personal information</li>
            </ul>
          </section>

          <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-gray-700 mb-4">
              If you have questions about this Privacy Policy or wish to exercise your privacy rights:
            </p>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-700">
                <strong>Email:</strong> support@winterstormwatch.online
              </p>
              <p className="text-gray-700 mt-2">
                We will respond to your request within 30 days.
              </p>
            </div>
          </section>
        </article>
      </main>

      <Footer />
    </div>
  );
}
