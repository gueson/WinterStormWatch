import { WeatherAlert, AlertsResponse } from '@/types/weather';

const NWS_API_BASE = 'https://api.weather.gov';
const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 WeatherAlert/1.0 (support@winterstormwatch.online)';

async function fetchFromNWS<T>(endpoint: string): Promise<T> {
  const options: RequestInit = {
    headers: {
      'User-Agent': USER_AGENT,
      'Accept': 'application/geo+json',
      'Accept-Charset': 'utf-8',
      'Accept-Encoding': 'identity',
    },
    cache: 'no-store',
  };

  const response = await fetch(`${NWS_API_BASE}${endpoint}`, options);

  if (!response.ok) {
    let errorMsg = `NWS API error: ${response.status} ${response.statusText}`;
    
    if (response.status === 403) {
      errorMsg += ' - Forbidden (check User-Agent configuration)';
    } else if (response.status >= 500) {
      errorMsg += ' - Server error (try again later)';
    }
    
    throw new Error(errorMsg);
  }
  
  return response.json();
}

export async function getActiveAlerts(): Promise<WeatherAlert[]> {
  try {
    const data = await fetchFromNWS<AlertsResponse>('/alerts/active');
    
    if (data && data.features && data.features.length > 0) {
      return data.features;
    }
    return [];
  } catch {
    try {
      const data = await fetchFromNWS<AlertsResponse>('/alerts/active/area/US');
      return data && data.features && data.features.length > 0 ? data.features : [];
    } catch {
      return [];
    }
  }
}

export async function getAlertsByState(state: string): Promise<WeatherAlert[]> {
  try {
    const data = await fetchFromNWS<AlertsResponse>(`/alerts/active/area/${state}`);
    return data.features || [];
  } catch {
    return [];
  }
}

export function filterAllAlerts(alerts: WeatherAlert[]): WeatherAlert[] {
  return alerts;
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