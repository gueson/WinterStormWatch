import { WeatherAlert } from '@/types/weather';

// Mock winter storm alerts data
// This data is used when NWS API is unavailable
// Generated based on typical winter storm patterns in the US

export const mockWinterAlerts: WeatherAlert[] = [
  {
    id: 'mock-1',
    type: 'Feature',
    properties: {
      '@id': 'https://api.weather.gov/alerts/mock-1',
      '@type': 'wx:Alert',
      id: 'mock-1',
      areaDesc: 'Dallas, Tarrant, Collin, Denton, Rockwall, Ellis, Johnson, Hood, Parker, Wise, TX',
      category: 'Met',
      response: 'Prepare',
      severity: 'Moderate',
      urgency: 'Expected',
      event: 'Winter Storm Watch',
      sender: 'W-NWS-NWSTG-2',
      senderName: 'NWS Fort Worth TX',
      headline: 'Winter Storm Watch for North Texas',
      description: 'A winter storm watch is in effect from Friday evening through Saturday evening for North Texas. Snow accumulation of 2-4 inches is expected, with localized amounts up to 6 inches possible. Travel could be very difficult, especially on bridges and overpasses.',
      instruction: 'Monitor the latest forecasts and prepare for possible travel disruptions. Ensure you have a winter emergency kit in your vehicle and at home.',
      messageType: 'Alert',
      certainty: 'Likely',
      url: 'https://weather.gov/fwd/winter',
      effective: new Date(Date.now() - 3600000).toISOString(),
      onset: new Date(Date.now() + 7200000).toISOString(),
      expires: new Date(Date.now() + 86400000).toISOString(),
      sent: new Date(Date.now() - 3600000).toISOString(),
      status: 'Actual',
      notification: 'NWS',
      references: [],
    },
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [-97.334, 32.993],
          [-96.637, 32.993],
          [-96.637, 33.364],
          [-97.334, 33.364],
          [-97.334, 32.993],
        ],
      ],
    },
  },
  {
    id: 'mock-2',
    type: 'Feature',
    properties: {
      '@id': 'https://api.weather.gov/alerts/mock-2',
      '@type': 'wx:Alert',
      id: 'mock-2',
      areaDesc: 'Chicago, Cook, DuPage, Kane, Lake, McHenry, Will, IL',
      category: 'Met',
      response: 'Avoid',
      severity: 'Severe',
      urgency: 'Immediate',
      event: 'Winter Storm Warning',
      sender: 'W-NWS-NWSTG-3',
      senderName: 'NWS Chicago IL',
      headline: 'Winter Storm Warning for Northern Illinois',
      description: 'A winter storm warning is in effect until Sunday morning. Heavy snow is expected with total accumulations of 6-10 inches. Wind gusts up to 35 mph will cause blowing and drifting snow, reducing visibility to less than a quarter mile at times.',
      instruction: 'Avoid all travel if possible. If you must travel, keep an extra flashlight, food, and water in your vehicle in case of an emergency.',
      messageType: 'Alert',
      certainty: 'Observed',
      url: 'https://weather.gov/lot/winter',
      effective: new Date(Date.now() - 7200000).toISOString(),
      onset: new Date(Date.now() - 3600000).toISOString(),
      expires: new Date(Date.now() + 43200000).toISOString(),
      sent: new Date(Date.now() - 7200000).toISOString(),
      status: 'Actual',
      notification: 'NWS',
      references: [],
    },
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [-88.243, 41.508],
          [-87.524, 41.508],
          [-87.524, 42.023],
          [-88.243, 42.023],
          [-88.243, 41.508],
        ],
      ],
    },
  },
  {
    id: 'mock-3',
    type: 'Feature',
    properties: {
      '@id': 'https://api.weather.gov/alerts/mock-3',
      '@type': 'wx:Alert',
      id: 'mock-3',
      areaDesc: 'New York, Kings, Queens, Bronx, Richmond, Nassau, Suffolk, Westchester, Rockland, Orange, NY',
      category: 'Met',
      response: 'Prepare',
      severity: 'Moderate',
      urgency: 'Expected',
      event: 'Winter Weather Advisory',
      sender: 'W-NWS-NWSTG-1',
      senderName: 'NWS New York NY',
      headline: 'Winter Weather Advisory for the Tri-State Area',
      description: 'A winter weather advisory is in effect from Saturday morning through Saturday evening. A mix of rain, sleet, and snow is expected, with snow accumulations of 1-3 inches possible. Ice accumulations up to one-tenth of an inch may cause slippery conditions.',
      instruction: 'Be prepared for slippery roads and limited visibility. Slow down and use caution while driving.',
      messageType: 'Alert',
      certainty: 'Possible',
      url: 'https://weather.gov/okx/winter',
      effective: new Date(Date.now() - 10800000).toISOString(),
      onset: new Date(Date.now() + 14400000).toISOString(),
      expires: new Date(Date.now() + 100800000).toISOString(),
      sent: new Date(Date.now() - 10800000).toISOString(),
      status: 'Actual',
      notification: 'NWS',
      references: [],
    },
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [-74.259, 40.477],
          [-73.700, 40.477],
          [-73.700, 41.304],
          [-74.259, 41.304],
          [-74.259, 40.477],
        ],
      ],
    },
  },
  {
    id: 'mock-4',
    type: 'Feature',
    properties: {
      '@id': 'https://api.weather.gov/alerts/mock-4',
      '@type': 'wx:Alert',
      id: 'mock-4',
      areaDesc: 'Seattle, King, Snohomish, Pierce, Kitsap, Thurston, WA',
      category: 'Met',
      response: 'Prepare',
      severity: 'Minor',
      urgency: 'Future',
      event: 'Snow Advisory',
      sender: 'W-NWS-NWSTG-17',
      senderName: 'NWS Seattle WA',
      headline: 'Snow Advisory for Western Washington',
      description: 'A snow advisory is in effect from Sunday night through Monday morning for Western Washington. Snow accumulations of 1-2 inches are expected in the lowlands, with 3-6 inches in the foothills. This could create slick conditions for the Monday morning commute.',
      instruction: 'Allow extra time for your Monday morning commute. Ensure your vehicle is equipped with winter tires or chains if traveling into the mountains.',
      messageType: 'Alert',
      certainty: 'Likely',
      url: 'https://weather.gov/sew/winter',
      effective: new Date(Date.now() + 21600000).toISOString(),
      onset: new Date(Date.now() + 36000000).toISOString(),
      expires: new Date(Date.now() + 129600000).toISOString(),
      sent: new Date(Date.now()).toISOString(),
      status: 'Actual',
      notification: 'NWS',
      references: [],
    },
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [-122.402, 47.448],
          [-121.805, 47.448],
          [-121.805, 47.735],
          [-122.402, 47.735],
          [-122.402, 47.448],
        ],
      ],
    },
  },
  {
    id: 'mock-5',
    type: 'Feature',
    properties: {
      '@id': 'https://api.weather.gov/alerts/mock-5',
      '@type': 'wx:Alert',
      id: 'mock-5',
      areaDesc: 'Denver, Adams, Arapahoe, Douglas, Jefferson, Boulder, CO',
      category: 'Met',
      response: 'Avoid',
      severity: 'Severe',
      urgency: 'Immediate',
      event: 'Blizzard Warning',
      sender: 'W-NWS-NWSTG-7',
      senderName: 'NWS Denver CO',
      headline: 'Blizzard Warning for Denver Metro Area',
      description: 'A blizzard warning is in effect until Sunday afternoon for the Denver Metro area. Heavy snow with accumulations of 8-12 inches and wind gusts up to 50 mph will create blizzard conditions with visibility less than a quarter mile at times.',
      instruction: 'Avoid all travel. This is a dangerous winter storm that could strand motorists for hours. If you become stranded, stay in your vehicle and call for help.',
      messageType: 'Alert',
      certainty: 'Observed',
      url: 'https://weather.gov/den/winter',
      effective: new Date(Date.now() - 7200000).toISOString(),
      onset: new Date(Date.now() - 3600000).toISOString(),
      expires: new Date(Date.now() + 57600000).toISOString(),
      sent: new Date(Date.now() - 7200000).toISOString(),
      status: 'Actual',
      notification: 'NWS',
      references: [],
    },
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [-105.122, 39.601],
          [-104.673, 39.601],
          [-104.673, 39.952],
          [-105.122, 39.952],
          [-105.122, 39.601],
        ],
      ],
    },
  },
  {
    id: 'mock-6',
    type: 'Feature',
    properties: {
      '@id': 'https://api.weather.gov/alerts/mock-6',
      '@type': 'wx:Alert',
      id: 'mock-6',
      areaDesc: 'Boston, Essex, Middlesex, Norfolk, Plymouth, Suffolk, Worcester, MA',
      category: 'Met',
      response: 'Prepare',
      severity: 'Moderate',
      urgency: 'Expected',
      event: 'Winter Storm Warning',
      sender: 'W-NWS-NWSTG-1',
      senderName: 'NWS Boston MA',
      headline: 'Winter Storm Warning for Eastern Massachusetts',
      description: 'A winter storm warning is in effect from Saturday afternoon through Sunday morning. Heavy snowfall is expected with total accumulations of 6-10 inches. Coastal areas may experience mixed precipitation early, changing to all snow by evening.',
      instruction: 'Finish any necessary travel by Saturday afternoon. Stock up on essential supplies including food, water, and medications. Charge electronic devices in case of power outages.',
      messageType: 'Alert',
      certainty: 'Likely',
      url: 'https://weather.gov/box/winter',
      effective: new Date(Date.now() - 14400000).toISOString(),
      onset: new Date(Date.now() + 7200000).toISOString(),
      expires: new Date(Date.now() + 100800000).toISOString(),
      sent: new Date(Date.now() - 14400000).toISOString(),
      status: 'Actual',
      notification: 'NWS',
      references: [],
    },
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [-71.380, 42.232],
          [-70.838, 42.232],
          [-70.838, 42.581],
          [-71.380, 42.581],
          [-71.380, 42.232],
        ],
      ],
    },
  },
];

// Function to get mock alerts by state
export function getMockAlertsByState(state: string): WeatherAlert[] {
  return mockWinterAlerts.filter(alert => 
    alert.properties.areaDesc.includes(state)
  );
}

// Function to get all mock winter alerts
export function getAllMockWinterAlerts(): WeatherAlert[] {
  return mockWinterAlerts;
}

// Function to simulate random alert updates
export function getRandomMockAlerts(count: number = 3): WeatherAlert[] {
  const shuffled = [...mockWinterAlerts].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}
