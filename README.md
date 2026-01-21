# WinterStormWatch - Real-time US Winter Storm Alerts

[![Next.js](https://img.shields.io/badge/Next.js-14.2.3-blue.svg)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0.0-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.1-blue.svg)](https://tailwindcss.com/)
[![NWS API](https://img.shields.io/badge/NWS%20API-Official-brightgreen.svg)](https://www.weather.gov/)

WinterStormWatch is a real-time web application that provides up-to-date winter storm alerts, watches, and warnings for the United States, powered by official data from the National Weather Service (NWS).

## 📋 Table of Contents

- [Features](#-features)
- [Getting Started](#-getting-started)
- [Installation](#-installation)
- [Usage](#-usage)
- [Project Structure](#-project-structure)
- [Technical Stack](#-technical-stack)
- [API Integration](#-api-integration)
- [SEO Features](#-seo-features)
- [Analytics](#-analytics)
- [Accessibility](#-accessibility)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

## ✨ Features

- **Real-time Winter Storm Alerts**: Fetches live data from the National Weather Service API
- **Fallback to Mock Data**: Ensures the application remains functional even if the API is unavailable
- **Alert Grouping**: Alerts are organized by state and severity for easy navigation
- **Detailed Alert Information**: Includes severity, urgency, certainty, effective dates, and safety instructions
- **Safety Guidelines**: Comprehensive winter storm safety tips for home preparation, travel, and during storms
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Accessibility Focused**: WCAG 2.1 Level AA compliant design
- **SEO Optimized**: Custom metadata, sitemap, and robots.txt for better search engine visibility
- **Performance Optimized**: Fast load times with static generation and API caching

## 🚀 Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js 18.17.0 or later
- npm 9.6.7 or later

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/winterstormwatch.git
cd winterstormwatch
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
│   │   └── weather-alerts/ # Weather alerts API endpoint
│   ├── guide/              # Safety guide
│   ├── privacy/            # Privacy policy
│   ├── terms/              # Terms of service
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   ├── robots.ts           # Robots.txt generation
│   └── sitemap.ts          # Sitemap generation
├── components/             # Reusable components
│   ├── AlertBanner.tsx     # Alert count banner
│   ├── AlertList.tsx       # Alert list display
│   ├── CookieConsent.tsx   # Cookie consent banner
│   ├── Footer.tsx          # Footer component
│   ├── Header.tsx          # Header component
│   ├── SkipLink.tsx        # Skip to content link
│   └── Stats.tsx           # Alert statistics
├── lib/                    # Utility functions
│   ├── mock-data.ts        # Mock weather alert data
│   └── nws-api.ts          # NWS API integration
├── types/                  # TypeScript type definitions
│   └── weather.ts          # Weather alert types
└── ...
```

## 🛠️ Technical Stack

| Technology | Version | Description |
|------------|---------|-------------|
| Next.js | 14.2.3 | React framework for production |
| React | 18.2.0 | JavaScript library for building user interfaces |
| TypeScript | 5.0.0 | Type-safe JavaScript |
| Tailwind CSS | 3.4.1 | Utility-first CSS framework |
| date-fns | 3.6.0 | Modern JavaScript date utility library |
| @vercel/analytics | 1.6.1 | Vercel Web Analytics |

## 🌐 API Integration

The application integrates with the [National Weather Service (NWS) API](https://www.weather.gov/documentation/services-web-api) to fetch real-time weather alerts. Key features of the API integration:

- **User-Agent Header**: Complies with NWS API requirements by sending a valid User-Agent with contact information
- **Automatic Caching**: Alerts are cached for 5 minutes (300 seconds) to reduce API requests
- **Error Handling**: Falls back to mock data if the API is unavailable
- **Winter Alert Filtering**: Only displays winter-related alerts (snow, ice, freezing rain, etc.)
- **Alert Grouping**: Organizes alerts by state for better usability

## 📊 SEO Features

- **Custom Metadata**: Each page has unique title, description, and keywords
- **Sitemap Generation**: Automatically generates a sitemap.xml file
- **Robots.txt**: Configures search engine crawler behavior
- **Canonical URLs**: Ensures proper URL canonicalization
- **Structured Data**: Semantic HTML markup for better search engine understanding
- **Mobile Optimization**: Responsive design for better mobile search rankings

## 📈 Analytics

The application includes multiple analytics solutions for comprehensive tracking:

- **Google Analytics**: Tracks page views, user sessions, and behavior
- **Vercel Web Analytics**: Provides detailed insights into traffic sources, user locations, and more

## ♿ Accessibility

The application is designed with accessibility in mind:

- **WCAG 2.1 Level AA Compliant**: Follows accessibility guidelines for color contrast, keyboard navigation, and screen reader compatibility
- **Skip Navigation Link**: Allows keyboard users to skip directly to main content
- **ARIA Attributes**: Properly implemented ARIA roles and attributes
- **Semantic HTML**: Uses appropriate HTML elements for better screen reader support
- **Keyboard Navigation**: Fully navigable using only the keyboard
- **Reduced Motion Support**: Respects user preferences for reduced motion

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

---

**WinterStormWatch** - Keeping you informed and safe during winter storms. 🌨️❄️
