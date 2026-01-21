import { WeatherAlert, AlertsResponse } from '@/types/weather';

const NWS_API_BASE = 'https://api.weather.gov';
// NWS API requires a valid User-Agent with contact information
const USER_AGENT = 'WeatherAlert/1.0 support@winterstormwatch.online';

interface FetchOptions {
  method?: string;
  headers?: Record<string, string>;
  next?: { revalidate: number };
  cache?: RequestCache;
}

async function fetchFromNWS<T>(endpoint: string): Promise<T> {
  try {
    const options: FetchOptions = {
      headers: {
        'User-Agent': USER_AGENT,
        'Accept': 'application/geo+json',
        'Accept-Charset': 'utf-8',
        // NWS API requires proper Accept-Encoding
        'Accept-Encoding': 'gzip, deflate, br',
      },
      // Only use revalidate for SSG, not cache: no-store for RSC
      next: { revalidate: 300 },
    };

    console.log(`Fetching NWS API: ${NWS_API_BASE}${endpoint}`);
    
    const response = await fetch(`${NWS_API_BASE}${endpoint}`, options);
    
    // Log response status for debugging
    console.log(`NWS API Response: ${response.status} ${response.statusText}`);
    
    // Log response headers for debugging
    console.log('Response Headers:', Object.fromEntries(response.headers.entries()));
    
    if (!response.ok) {
      // Detailed error message based on status code
      let errorMsg = `NWS API error: ${response.status} ${response.statusText}`;
      
      if (response.status === 400) {
        errorMsg += ' - Invalid request parameters or endpoint';
        // Try to get more details from response
        try {
          const errorData = await response.json();
          console.error('NWS API Error Details:', errorData);
          errorMsg += ` - ${JSON.stringify(errorData)}`;
        } catch (e) {
          // Ignore if we can't parse error response
        }
      } else if (response.status === 403) {
        errorMsg += ' - Forbidden (check User-Agent configuration)';
      } else if (response.status === 404) {
        errorMsg += ' - Endpoint not found';
      } else if (response.status >= 500) {
        errorMsg += ' - Server error (try again later)';
      }
      
      throw new Error(errorMsg);
    }
    
    // Parse response
    const data = await response.json();
    console.log('NWS API Data Received:', {
      featuresCount: data.features?.length || 0,
      updated: data.updated,
    });
    
    return data;
  } catch (error) {
    console.error('Detailed NWS API Error:', error);
    throw error;
  }
}

export async function getActiveAlerts(): Promise<WeatherAlert[]> {
  try {
    // Try the correct NWS API endpoint format based on research
    // Using v2 alerts endpoint which is more reliable
    const data = await fetchFromNWS<AlertsResponse>('/alerts/active');
    return data.features;
  } catch (error) {
    console.error('Error fetching active alerts:', error);
    // Try alternative endpoint if first one fails
    try {
      console.log('Trying alternative NWS API endpoint...');
      const data = await fetchFromNWS<AlertsResponse>('/alerts/active/area/US');
      return data.features;
    } catch (alternativeError) {
      console.error('Alternative endpoint also failed:', alternativeError);
      // Return empty array on error to maintain app functionality
      return [];
    }
  }
}

export async function getAlertsByState(state: string): Promise<WeatherAlert[]> {
  try {
    // Correct endpoint format for state-specific alerts
    const data = await fetchFromNWS<AlertsResponse>(`/alerts/active/area/${state}`);
    return data.features;
  } catch (error) {
    console.error(`Error fetching alerts for ${state}:`, error);
    return [];
  }
}

export function filterWinterAlerts(alerts: WeatherAlert[]): WeatherAlert[] {
  const winterKeywords = [
    'Winter Storm',
    'Winter Weather',
    'Blizzard',
    'Winter Mix',
    'Snow',
    'Ice',
    'Freezing',
    'Sleet',
    'Frost',
  ];

  return alerts.filter((alert) =>
    winterKeywords.some((keyword) => 
      alert.properties.event.toLowerCase().includes(keyword.toLowerCase())
    )
  );
}

export function groupAlertsByState(alerts: WeatherAlert[]): Record<string, WeatherAlert[]> {
  return alerts.reduce((acc, alert) => {
    const state = extractStateFromArea(alert.properties.areaDesc);
    if (!acc[state]) {
      acc[state] = [];
    }
    acc[state].push(alert);
    return acc;
  }, {} as Record<string, WeatherAlert[]>);
}

function extractStateFromArea(areaDesc: string): string {
  // Improved state extraction regex
  const stateMatch = areaDesc.match(/\b([A-Z]{2})\b(?!.*[A-Z]{2})/);
  return stateMatch ? stateMatch[1] : 'Unknown';
}

export function sortAlertsBySeverity(alerts: WeatherAlert[]): WeatherAlert[] {
  const severityOrder = {
    'Extreme': 0,
    'Severe': 1,
    'Moderate': 2,
    'Minor': 3,
    'Unknown': 4,
  };

  return [...alerts].sort((a, b) => {
    const severityA = severityOrder[a.properties.severity] ?? 4;
    const severityB = severityOrder[b.properties.severity] ?? 4;
    return severityA - severityB;
  });
}

export function getAlertType(event: string): 'Watch' | 'Warning' | 'Advisory' {
  const eventLower = event.toLowerCase();
  if (eventLower.includes('warning')) {
    return 'Warning';
  }
  if (eventLower.includes('watch')) {
    return 'Watch';
  }
  return 'Advisory';
}

export function formatAlertTime(dateString: string): string {
  return new Date(dateString).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short',
  });
}

export function getTimeUntilExpiration(dateString: string): string {
  const now = new Date();
  const expires = new Date(dateString);
  const diffMs = expires.getTime() - now.getTime();

  if (diffMs < 0) {
    return 'Expired';
  }

  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

  if (diffHours > 24) {
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} day${diffDays > 1 ? 's' : ''} left`;
  }

  if (diffHours > 0) {
    return `${diffHours}h ${diffMinutes}m left`;
  }

  return `${diffMinutes}m left`;
}
