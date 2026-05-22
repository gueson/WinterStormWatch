import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';
import { CookieConsent } from '@/components/CookieConsent';
import { SkipLink } from '@/components/SkipLink';

const inter = Inter({ 
  subsets: ['latin'], 
  display: 'swap',
  preload: true,
  weight: ['400', '500', '600'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.winterstormwatch.online'),
  title: {
    default: 'US Weather Alerts & Seasonal Hazard Updates | WeatherAlert',
    template: '%s | WeatherAlert',
  },
  description: 'Real-time US weather alerts including warnings, and advisories for all seasonal hazards. Monitor weather conditions across all 50 states with official NWS data.',
  keywords: [
    'weather alerts',
    'seasonal hazards',
    'NWS alerts',
    'storm warnings',
    'weather watch',
    'US weather',
    'weather advisory',
    'National Weather Service',
  ],
  authors: [{ name: 'WeatherAlert Team' }],
  creator: 'WeatherAlert',
  publisher: 'WeatherAlert',
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
    url: 'https://www.winterstormwatch.online',
    siteName: 'WeatherAlert',
    title: 'US Weather Alerts & Seasonal Hazard Updates',
    description: 'Real-time US weather alerts including watches, warnings, and advisories with official NWS data.',
    images: [
      {
        url: 'https://www.winterstormwatch.online/og-image.png',
        width: 1200,
        height: 630,
        alt: 'WeatherAlert - Real-time US Weather Alerts and Seasonal Hazard Updates',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@WeatherAlert',
    creator: '@WeatherAlert',
    title: 'US Weather Alerts & Seasonal Hazard Updates',
    description: 'Real-time US weather alerts from the National Weather Service.',
    images: ['https://www.winterstormwatch.online/og-image.png'],
  },
  alternates: {
    canonical: 'https://www.winterstormwatch.online',
    languages: {
      'en': 'https://www.winterstormwatch.online',
    },
  },
  category: 'Weather',
  icons: {
    icon: {
      url: '/icon.svg',
      type: 'image/svg+xml',
      sizes: 'any',
    },
    shortcut: '/icon.svg',
    apple: {
      url: '/icon.svg',
      sizes: '180x180',
    },
  },
  themeColor: '#3B82F6',
  applicationName: 'WeatherAlert',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-US" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://api.weather.gov" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://api.weather.gov" />
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        <meta name="theme-color" content="#3B82F6" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="mobile-web-app-capable" content="yes" />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-NZ4L07HBD1"
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
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