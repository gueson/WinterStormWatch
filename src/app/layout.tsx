import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';
import { CookieConsent } from '@/components/CookieConsent';
import { SkipLink } from '@/components/SkipLink';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL('https://winterstormwatch.online'),
  title: {
    default: 'US Winter Storm Alerts | Winter Storm Watch & Warning Updates',
    template: '%s | WinterStormWatch',
  },
  description: 'Real-time winter storm watch and warning updates for the US. Get official NWS alerts, snow storm forecasts, and safety guidelines for major cities including Dallas, Chicago, and New York.',
  keywords: [
    'winter storm watch',
    'winter storm warning',
    'snow storm forecast',
    'weather alerts',
    'NWS alerts',
    'snow storm warnings',
    'winter weather alerts',
  ].join(', '),
  authors: [{ name: 'WinterStormWatch Team' }],
  creator: 'WinterStormWatch',
  publisher: 'WinterStormWatch',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://weather-alert.example.com',
    siteName: 'WinterStormWatch',
    title: 'US Winter Storm Alerts | Winter Storm Watch & Warning Updates',
    description: 'Real-time US winter storm alerts including watches, warnings, and advisories with official NWS details and safety guidelines.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'WinterStormWatch - US Winter Storm Warnings',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'US Winter Storm Alerts',
    description: 'Real-time US winter storm alerts including watches, warnings, and advisories from the National Weather Service.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://weather-alert.example.com',
  },
  category: 'Weather',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://api.weather.gov" />
        <link rel="dns-prefetch" href="https://api.weather.gov" />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-NZ4L07HBD1"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-NZ4L07HBD1');
          `}
        </Script>
      </head>
      <body className={`${inter.className} antialiased`}>
        <SkipLink />
        {children}
        <CookieConsent />
        <Analytics />
      </body>
    </html>
  );
}
