# WeatherAlert - Real-time US Weather Alerts & Seasonal Hazard Updates

[![Next.js](https://img.shields.io/badge/Next.js-14.2.3-blue.svg)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0.0-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.1-blue.svg)](https://tailwindcss.com/)
[![NWS API](https://img.shields.io/badge/NWS%20API-Official-brightgreen.svg)](https://www.weather.gov/)
[![Lighthouse SEO](https://img.shields.io/badge/Lighthouse%20SEO-100-brightgreen.svg)](https://developer.chrome.com/docs/lighthouse/)
[![Accessibility](https://img.shields.io/badge/Accessibility-WCAG%202.1%20AA-blue.svg)](https://www.w3.org/WAI/WCAG21/quickref/)

WeatherAlert is a real-time web application that provides up-to-date weather alerts, watches, and warnings for all seasonal hazards across the United States, powered by official data from the National Weather Service (NWS).

## 📋 Table of Contents

- [Features](#-features)
- [Getting Started](#-getting-started)
- [Installation](#-installation)
- [Usage](#-usage)
- [Project Structure](#-project-structure)
- [Technical Stack](#-technical-stack)
- [API Integration](#-api-integration)
- [SEO Optimization](#-seo-optimization)
- [Performance Optimization](#-performance-optimization)
- [Analytics](#-analytics)
- [Accessibility](#-accessibility)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

## ✨ Features

### Core Features
- **Real-time Weather Alerts**: Fetches live data from the National Weather Service API
- **All Seasonal Hazards**: Monitors all types of weather alerts including winter storms, severe thunderstorms, floods, hurricanes, and more
- **Fallback to Mock Data**: Ensures the application remains functional even if the API is unavailable
- **Alert Grouping**: Alerts are organized by state and severity for easy navigation
- **Detailed Alert Information**: Includes severity, urgency, certainty, effective dates, and safety instructions
- **Safety Guidelines**: Comprehensive weather safety tips for home preparation, travel, and during emergencies
- **City Weather Tools**: Local weather forecasts, road conditions, and emergency contacts for major US cities

### Technical Features
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Accessibility Focused**: WCAG 2.1 Level AA compliant design
- **SEO Optimized**: 100 Lighthouse SEO score with comprehensive metadata, structured data, and sitemap
- **Performance Optimized**: Fast load times with static generation, API caching, and code splitting
- **Client-side Rendering**: Dynamic content loading with localStorage caching for better user experience
- **Schema.org Structured Data**: Rich snippets for search engines (Organization, WeatherService, BreadcrumbList)

## 🚀 Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js 18.17.0 or later
- npm 9.6.7 or later

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/weather-alert.git
cd weather-alert
```

2. Install dependencies

```bash
npm install
```

3. Run the development server

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🎯 Usage

### Development

```bash
npm run dev
```

Runs the app in the development mode. The page will reload if you make edits.

### Production Build

```bash
npm run build
npm start
```

Builds the app for production to the `.next` folder and starts the production server.

### Linting

```bash
npm run lint
```

Runs ESLint to check for code quality issues.

## 📁 Project Structure

```
src/
├── app/                    # App Router pages and layouts
│   ├── about/              # About page
│   ├── accessibility/      # Accessibility statement
│   ├── api/                # API routes
│   │   ├── test-nws/      # NWS API test endpoint
│   │   └── weather-alerts/ # Weather alerts API endpoint
│   ├── city-tools/         # City weather tools
│   ├── guide/              # Safety guide
│   ├── privacy/            # Privacy policy
│   ├── terms/              # Terms of service
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Home page
│   ├── robots.ts           # Robots.txt generation
│   └── sitemap.ts          # Sitemap generation
├── components/             # Reusable components
│   ├── AlertBanner.tsx     # Alert count banner
│   ├── AlertCard.tsx       # Individual alert card
│   ├── AlertList.tsx       # Alert list with filtering
│   ├── CookieConsent.tsx   # Cookie consent banner
│   ├── Footer.tsx          # Footer component
│   ├── Header.tsx          # Header component
│   ├── SkipLink.tsx        # Skip to content link
│   ├── Stats.tsx           # Alert statistics
│   ├── CityContext.tsx     # City selection context
│   ├── CitySelector.tsx    # City selection component
│   ├── WeatherForecast.tsx  # Weather forecast display
│   ├── RoadConditions.tsx   # Road conditions display
│   ├── EmergencyContacts.tsx # Emergency contacts
│   └── LocalTips.tsx        # Local weather tips
├── lib/                    # Utility functions
│   ├── mock-data.ts        # Mock weather alert data
│   ├── nws-api.ts         # NWS API integration
│   └── city-data.ts        # City data and information
├── types/                  # TypeScript type definitions
│   └── weather.ts          # Weather alert types
└── ...
```

## 🛠️ Technical Stack

| Technology | Version | Description |
|------------|---------|-------------|
| Next.js | 14.2.3 | React framework for production with App Router |
| React | 18.2.0 | JavaScript library for building user interfaces |
| TypeScript | 5.0.0 | Type-safe JavaScript |
| Tailwind CSS | 3.4.1 | Utility-first CSS framework |
| date-fns | 3.6.0 | Modern JavaScript date utility library |
| @vercel/analytics | 1.6.1 | Vercel Web Analytics |

## 🌐 API Integration

The application integrates with the [National Weather Service (NWS) API](https://www.weather.gov/documentation/services-web-api) to fetch real-time weather alerts. Key features of the API integration:

- **User-Agent Header**: Complies with NWS API requirements by sending a valid User-Agent with contact information
- **Automatic Caching**: Alerts are cached for 5 minutes (300 seconds) in localStorage to reduce API requests
- **Error Handling**: Falls back to mock data if the API is unavailable
- **All Alert Types**: Displays all weather alerts including winter storms, severe weather, floods, and more
- **Alert Grouping**: Organizes alerts by state for better usability
- **Abort Controller**: Implements request timeout (10 seconds) for better performance
- **Client-side Rendering**: Fetches data on the client for better caching and user experience

## 📊 SEO Optimization

The application achieves a **100 Lighthouse SEO score** with comprehensive search engine optimization:

### Metadata Optimization
- **Custom Metadata**: Each page has unique title, description, and keywords
- **Open Graph**: Complete Open Graph tags for social media sharing
- **Twitter Cards**: Full Twitter Card metadata
- **Canonical URLs**: Proper URL canonicalization for all pages
- **Keywords**: Strategic keywords including weather alerts, seasonal hazards, NWS alerts, and more

### Technical SEO
- **Sitemap Generation**: Automatically generates sitemap.xml with proper priorities and change frequencies
- **Robots.txt**: Configures search engine crawler behavior
- **Structured Data**: Schema.org markup for Organization, WeatherService, WeatherForecast, and BreadcrumbList
- **Semantic HTML**: Proper HTML5 elements and ARIA attributes
- **Mobile Optimization**: Responsive design and mobile-first approach
- **Performance**: Fast load times with static generation and compression

### Page-Specific SEO
- **Home Page**: Primary landing page with maximum priority
- **Guide Page**: Safety guide with comprehensive weather safety information
- **City Tools**: Local weather resources with city-specific data
- **Legal Pages**: Privacy policy, terms of service, and accessibility statement

## ⚡ Performance Optimization

The application is optimized for maximum performance:

### Code Optimization
- **Code Splitting**: Dynamic imports with loading states for heavy components
- **React.memo**: Memoized components to prevent unnecessary re-renders
- **useMemo**: Memoized computations to optimize expensive calculations
- **No Console Logs**: Production code is clean without debug statements

### Loading Strategies
- **Client-side Rendering**: Dynamic content loading with localStorage caching
- **Lazy Loading**: Components are loaded on-demand with skeleton screens
- **Font Optimization**: Google Fonts with display=swap and preload
- **Script Strategy**: Third-party scripts use lazyOnload strategy

### Caching & Compression
- **Browser Caching**: Optimized cache-control headers for static and dynamic content
- **Gzip Compression**: Enabled in Next.js configuration
- **localStorage Cache**: 5-minute TTL cache for API responses
- **Immutable Assets**: Static assets with 1-year cache duration

### Security Headers
- **HSTS**: Strict-Transport-Security for HTTPS enforcement
- **X-Frame-Options**: Clickjacking protection
- **X-Content-Type-Options**: MIME type sniffing protection
- **Referrer-Policy**: Proper referrer information control

## 📈 Analytics

The application includes multiple analytics solutions for comprehensive tracking:

- **Google Analytics**: Tracks page views, user sessions, and behavior with G-NZ4L07HBD1
- **Vercel Web Analytics**: Provides detailed insights into traffic sources, user locations, and more

## ♿ Accessibility

The application is designed with accessibility in mind and achieves high accessibility standards:

- **WCAG 2.1 Level AA Compliant**: Follows accessibility guidelines for color contrast, keyboard navigation, and screen reader compatibility
- **Skip Navigation Link**: Allows keyboard users to skip directly to main content
- **ARIA Attributes**: Properly implemented ARIA roles, labels, and live regions
- **Semantic HTML**: Uses appropriate HTML elements for better screen reader support
- **Keyboard Navigation**: Fully navigable using only the keyboard
- **Reduced Motion Support**: Respects user preferences for reduced motion
- **Color Contrast**: High contrast ratios (4.5:1 minimum) for all text
- **Focus Indicators**: Visible focus indicators on all interactive elements

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Guidelines for Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📧 Contact

For questions, feedback, or support, please contact:

- **Email**: [support@winterstormwatch.online](mailto:support@winterstormwatch.online)

## 🔗 Related Links

- [National Weather Service](https://www.weather.gov/)
- [NWS API Documentation](https://www.weather.gov/documentation/services-web-api)
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Schema.org Documentation](https://schema.org/)
- [Web Content Accessibility Guidelines (WCAG)](https://www.w3.org/WAI/WCAG21/quickref/)

---

**WeatherAlert** - Keeping you informed and safe during all seasonal hazards. 🌨️⛈️🌊🔥

*Built with ❤️ using Next.js, React, and the National Weather Service API*
