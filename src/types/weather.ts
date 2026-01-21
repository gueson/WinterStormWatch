export interface WeatherAlert {
  id: string;
  type: string;
  properties: {
    '@id': string;
    '@type': string;
    id: string;
    areaDesc: string;
    category: string;
    centrality?: string;
    response: string;
    severity: 'Extreme' | 'Severe' | 'Moderate' | 'Minor' | 'Unknown';
    urgency: 'Immediate' | 'Expected' | 'Future' | 'Past' | 'Unknown';
    event: string;
    sender: string;
    senderName: string;
    headline?: string;
    description: string;
    instruction?: string;
    messageType: string;
    severityMod?: string;
    certainty: string;
    url: string;
    effective: string;
    onset?: string;
    expires: string;
    ends?: string;
    sent: string;
    status: string;
    notification: string;
    references: Reference[];
  };
  geometry?: {
    type: string;
    coordinates: number[][][];
  };
}

export interface Reference {
  '@id': string;
  identifier: string;
  sender: string;
    sent: string;
  }

export interface AlertsResponse {
  '@context': string | object[];
  type: string;
  features: WeatherAlert[];
  title: string;
  updated: string;
}

export type AlertType = 'Watch' | 'Warning' | 'Advisory' | 'Watch + Warning' | 'All';

export interface AlertFilters {
  type: AlertType;
  state?: string;
  severity?: string;
  search?: string;
}

export interface GroupedAlerts {
  [key: string]: WeatherAlert[];
}
