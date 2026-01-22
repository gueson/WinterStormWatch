// 城市数据类型
export interface City {
  id: string;
  name: string;
  state: string;
  lat: number;
  lon: number;
}

// 支持的城市列表
export const CITIES: City[] = [
  // Alabama
  { id: 'birmingham', name: 'Birmingham', state: 'AL', lat: 33.5186, lon: -86.8104 },
  { id: 'montgomery', name: 'Montgomery', state: 'AL', lat: 32.3668, lon: -86.2999 },
  // Alaska
  { id: 'anchorage', name: 'Anchorage', state: 'AK', lat: 61.2181, lon: -149.9003 },
  { id: 'fairbanks', name: 'Fairbanks', state: 'AK', lat: 64.8378, lon: -147.7164 },
  // Arizona
  { id: 'phoenix', name: 'Phoenix', state: 'AZ', lat: 33.4484, lon: -112.0740 },
  { id: 'tucson', name: 'Tucson', state: 'AZ', lat: 32.2226, lon: -110.9747 },
  // Arkansas
  { id: 'little-rock', name: 'Little Rock', state: 'AR', lat: 34.7465, lon: -92.2896 },
  { id: 'fayetteville', name: 'Fayetteville', state: 'AR', lat: 36.0634, lon: -94.1523 },
  // California
  { id: 'los-angeles', name: 'Los Angeles', state: 'CA', lat: 34.0522, lon: -118.2437 },
  { id: 'san-francisco', name: 'San Francisco', state: 'CA', lat: 37.7749, lon: -122.4194 },
  { id: 'san-diego', name: 'San Diego', state: 'CA', lat: 32.7157, lon: -117.1611 },
  { id: 'sacramento', name: 'Sacramento', state: 'CA', lat: 38.5816, lon: -121.4944 },
  // Colorado
  { id: 'denver', name: 'Denver', state: 'CO', lat: 39.7392, lon: -104.9903 },
  { id: 'colorado-springs', name: 'Colorado Springs', state: 'CO', lat: 38.8339, lon: -104.8214 },
  // Connecticut
  { id: 'hartford', name: 'Hartford', state: 'CT', lat: 41.7658, lon: -72.6734 },
  { id: 'new-haven', name: 'New Haven', state: 'CT', lat: 41.3083, lon: -72.9279 },
  // Delaware
  { id: 'wilmington', name: 'Wilmington', state: 'DE', lat: 39.7459, lon: -75.5464 },
  { id: 'dover', name: 'Dover', state: 'DE', lat: 39.1574, lon: -75.5244 },
  // Florida
  { id: 'miami', name: 'Miami', state: 'FL', lat: 25.7617, lon: -80.1918 },
  { id: 'orlando', name: 'Orlando', state: 'FL', lat: 28.5383, lon: -81.3792 },
  { id: 'jacksonville', name: 'Jacksonville', state: 'FL', lat: 30.3322, lon: -81.6557 },
  { id: 'tallahassee', name: 'Tallahassee', state: 'FL', lat: 30.4383, lon: -84.2807 },
  // Georgia
  { id: 'atlanta', name: 'Atlanta', state: 'GA', lat: 33.7490, lon: -84.3880 },
  { id: 'augusta-ga', name: 'Augusta', state: 'GA', lat: 33.4735, lon: -82.0105 },
  // Hawaii
  { id: 'honolulu', name: 'Honolulu', state: 'HI', lat: 21.3069, lon: -157.8583 },
  // Idaho
  { id: 'boise', name: 'Boise', state: 'ID', lat: 43.6150, lon: -116.2023 },
  // Illinois
  { id: 'chicago', name: 'Chicago', state: 'IL', lat: 41.8781, lon: -87.6298 },
  { id: 'springfield-il', name: 'Springfield', state: 'IL', lat: 39.7817, lon: -89.6501 },
  // Indiana
  { id: 'indianapolis', name: 'Indianapolis', state: 'IN', lat: 39.7684, lon: -86.1581 },
  { id: 'fort-wayne', name: 'Fort Wayne', state: 'IN', lat: 41.0794, lon: -85.1394 },
  // Iowa
  { id: 'des-moines', name: 'Des Moines', state: 'IA', lat: 41.5909, lon: -93.6208 },
  // Kansas
  { id: 'wichita', name: 'Wichita', state: 'KS', lat: 37.6922, lon: -97.3375 },
  { id: 'topeka', name: 'Topeka', state: 'KS', lat: 39.0489, lon: -95.6780 },
  // Kentucky
  { id: 'louisville', name: 'Louisville', state: 'KY', lat: 38.2527, lon: -85.7585 },
  { id: 'lexington', name: 'Lexington', state: 'KY', lat: 38.0428, lon: -84.5037 },
  // Louisiana
  { id: 'new-orleans', name: 'New Orleans', state: 'LA', lat: 29.9511, lon: -90.0715 },
  { id: 'baton-rouge', name: 'Baton Rouge', state: 'LA', lat: 30.4515, lon: -91.1871 },
  // Maine
  { id: 'portland-me', name: 'Portland', state: 'ME', lat: 43.6532, lon: -70.2582 },
  { id: 'augusta-me', name: 'Augusta', state: 'ME', lat: 44.3072, lon: -69.7816 },
  // Maryland
  { id: 'baltimore', name: 'Baltimore', state: 'MD', lat: 39.2904, lon: -76.6122 },
  { id: 'annapolis', name: 'Annapolis', state: 'MD', lat: 38.9784, lon: -76.4922 },
  // Massachusetts
  { id: 'boston', name: 'Boston', state: 'MA', lat: 42.3601, lon: -71.0589 },
  { id: 'worcester', name: 'Worcester', state: 'MA', lat: 42.2626, lon: -71.8023 },
  // Michigan
  { id: 'detroit', name: 'Detroit', state: 'MI', lat: 42.3314, lon: -83.0458 },
  { id: 'grand-rapids', name: 'Grand Rapids', state: 'MI', lat: 42.9634, lon: -85.6681 },
  // Minnesota
  { id: 'minneapolis', name: 'Minneapolis', state: 'MN', lat: 44.9778, lon: -93.2650 },
  { id: 'st-paul', name: 'St. Paul', state: 'MN', lat: 44.9429, lon: -93.0900 },
  // Mississippi
  { id: 'jackson', name: 'Jackson', state: 'MS', lat: 32.3078, lon: -90.1298 },
  // Missouri
  { id: 'kansas-city', name: 'Kansas City', state: 'MO', lat: 39.0997, lon: -94.5786 },
  { id: 'st-louis', name: 'St. Louis', state: 'MO', lat: 38.6270, lon: -90.1994 },
  // Montana
  { id: 'billings', name: 'Billings', state: 'MT', lat: 45.7833, lon: -108.5007 },
  { id: 'helena', name: 'Helena', state: 'MT', lat: 46.5958, lon: -112.0270 },
  // Nebraska
  { id: 'omaha', name: 'Omaha', state: 'NE', lat: 41.2524, lon: -95.9980 },
  { id: 'lincoln', name: 'Lincoln', state: 'NE', lat: 40.8136, lon: -96.7026 },
  // Nevada
  { id: 'las-vegas', name: 'Las Vegas', state: 'NV', lat: 36.1699, lon: -115.1398 },
  { id: 'reno', name: 'Reno', state: 'NV', lat: 39.5296, lon: -119.8138 },
  // New Hampshire
  { id: 'manchester', name: 'Manchester', state: 'NH', lat: 42.9956, lon: -71.4548 },
  // New Jersey
  { id: 'newark', name: 'Newark', state: 'NJ', lat: 40.7357, lon: -74.1724 },
  { id: 'jersey-city', name: 'Jersey City', state: 'NJ', lat: 40.7282, lon: -74.0776 },
  // New Mexico
  { id: 'albuquerque', name: 'Albuquerque', state: 'NM', lat: 35.1067, lon: -106.6450 },
  // New York
  { id: 'new-york', name: 'New York', state: 'NY', lat: 40.7128, lon: -74.0060 },
  { id: 'buffalo', name: 'Buffalo', state: 'NY', lat: 42.8864, lon: -78.8784 },
  // North Carolina
  { id: 'charlotte', name: 'Charlotte', state: 'NC', lat: 35.2271, lon: -80.8431 },
  { id: 'raleigh', name: 'Raleigh', state: 'NC', lat: 35.7796, lon: -78.6382 },
  // North Dakota
  { id: 'fargo', name: 'Fargo', state: 'ND', lat: 46.8772, lon: -96.7898 },
  { id: 'bismarck', name: 'Bismarck', state: 'ND', lat: 46.8083, lon: -100.7837 },
  // Ohio
  { id: 'columbus', name: 'Columbus', state: 'OH', lat: 39.9612, lon: -82.9988 },
  { id: 'cleveland', name: 'Cleveland', state: 'OH', lat: 41.4993, lon: -81.6944 },
  // Oklahoma
  { id: 'oklahoma-city', name: 'Oklahoma City', state: 'OK', lat: 35.4676, lon: -97.5164 },
  { id: 'tulsa', name: 'Tulsa', state: 'OK', lat: 36.1540, lon: -95.9928 },
  // Oregon
  { id: 'portland-or', name: 'Portland', state: 'OR', lat: 45.5122, lon: -122.6587 },
  { id: 'salem', name: 'Salem', state: 'OR', lat: 44.9429, lon: -123.0351 },
  // Pennsylvania
  { id: 'philadelphia', name: 'Philadelphia', state: 'PA', lat: 39.9526, lon: -75.1652 },
  { id: 'pittsburgh', name: 'Pittsburgh', state: 'PA', lat: 40.4406, lon: -79.9959 },
  // Rhode Island
  { id: 'providence', name: 'Providence', state: 'RI', lat: 41.8240, lon: -71.4128 },
  // South Carolina
  { id: 'columbia', name: 'Columbia', state: 'SC', lat: 34.0007, lon: -81.0348 },
  { id: 'charleston-sc', name: 'Charleston', state: 'SC', lat: 32.7765, lon: -79.9311 },
  // South Dakota
  { id: 'sioux-falls', name: 'Sioux Falls', state: 'SD', lat: 43.5446, lon: -96.7311 },
  // Tennessee
  { id: 'nashville', name: 'Nashville', state: 'TN', lat: 36.1627, lon: -86.7816 },
  { id: 'memphis', name: 'Memphis', state: 'TN', lat: 35.1495, lon: -90.0490 },
  // Texas
  { id: 'dallas', name: 'Dallas', state: 'TX', lat: 32.7767, lon: -96.7970 },
  { id: 'san-antonio', name: 'San Antonio', state: 'TX', lat: 29.4241, lon: -98.4936 },
  { id: 'houston', name: 'Houston', state: 'TX', lat: 29.7604, lon: -95.3698 },
  { id: 'austin', name: 'Austin', state: 'TX', lat: 30.2672, lon: -97.7431 },
  // Utah
  { id: 'salt-lake-city', name: 'Salt Lake City', state: 'UT', lat: 40.7608, lon: -111.8910 },
  // Vermont
  { id: 'burlington', name: 'Burlington', state: 'VT', lat: 44.4759, lon: -73.2121 },
  // Virginia
  { id: 'richmond', name: 'Richmond', state: 'VA', lat: 37.5407, lon: -77.4360 },
  { id: 'virginia-beach', name: 'Virginia Beach', state: 'VA', lat: 36.8529, lon: -75.9780 },
  // Washington
  { id: 'seattle', name: 'Seattle', state: 'WA', lat: 47.6062, lon: -122.3321 },
  { id: 'spokane', name: 'Spokane', state: 'WA', lat: 47.6588, lon: -117.4260 },
  // West Virginia
  { id: 'charleston-wv', name: 'Charleston', state: 'WV', lat: 38.3498, lon: -81.6326 },
  // Wisconsin
  { id: 'milwaukee', name: 'Milwaukee', state: 'WI', lat: 43.0389, lon: -87.9065 },
  { id: 'madison', name: 'Madison', state: 'WI', lat: 43.0731, lon: -89.4012 },
  // Wyoming
  { id: 'cheyenne', name: 'Cheyenne', state: 'WY', lat: 41.1400, lon: -104.8202 },
];

// 默认选中的城市
export const DEFAULT_CITY = CITIES[0];
