'use client';

import React from 'react';
import { useCity } from './CityContext';

// 本地提示类型
interface LocalTip {
  id: string;
  title: string;
  content: string;
  category: 'travel' | 'heating' | 'safety' | 'preparation' | 'community';
  source: string;
}

// 城市本地提示数据
const CITY_LOCAL_TIPS: Record<string, LocalTip[]> = {
  'dallas': [
    {
      id: 'dallas-travel-1',
      title: 'Navigating Dallas Weather Conditions',
      content: 'Watch for severe weather alerts including thunderstorms, flooding, and winter weather. Stick to surface streets when possible, and allow extra travel time during adverse conditions.',
      category: 'travel',
      source: 'Dallas Resident'
    },
    {
      id: 'dallas-heating-1',
      title: 'Home Preparation for All Seasons',
      content: 'Keep your HVAC system well-maintained year-round. During extreme heat or cold, set your thermostat to 68-72°F to avoid overworking your system.',
      category: 'heating',
      source: 'Dallas HVAC Expert'
    },
    {
      id: 'dallas-safety-1',
      title: 'Preventing Weather-Related Issues',
      content: 'Let faucets drip slightly during freezing temperatures. During storms, stay indoors and away from windows.',
      category: 'safety',
      source: 'Dallas Emergency Services'
    },
    {
      id: 'dallas-preparation-1',
      title: 'Emergency Grocery List',
      content: 'Always keep 3 days of non-perishable foods, bottled water, and essential medications on hand. Dallas stores often sell out quickly when severe weather is forecasted.',
      category: 'preparation',
      source: 'Dallas Resident'
    },
  ],
  'san-antonio': [
    {
      id: 'sa-travel-1',
      title: 'Driving in San Antonio Weather',
      content: 'San Antonio sees a variety of weather from flooding to occasional ice. Avoid low-water crossings during storms and bridges/overpasses in winter weather.',
      category: 'travel',
      source: 'San Antonio Resident'
    },
    {
      id: 'sa-heating-1',
      title: 'Year-Round Home Comfort',
      content: 'Maintain your heating and cooling systems. Layer clothing during cold snaps and use fans during heat waves for energy efficiency.',
      category: 'heating',
      source: 'San Antonio Energy Expert'
    },
    {
      id: 'sa-safety-1',
      title: 'Power Outage Safety',
      content: 'Have flashlights and batteries ready - San Antonio experiences outages during storms. Avoid using generators indoors due to carbon monoxide risk.',
      category: 'safety',
      source: 'San Antonio Fire Department'
    },
  ],
  'chicago': [
    {
      id: 'chicago-travel-1',
      title: 'Chicago Weather Driving',
      content: 'Be prepared for all types of weather - from summer storms to winter snow. Invest in good tires appropriate for the season and keep your gas tank at least half full.',
      category: 'travel',
      source: 'Chicago Resident'
    },
    {
      id: 'chicago-preparation-1',
      title: 'Seasonal Home Maintenance',
      content: 'Clean gutters before storm season, insulate pipes in winter, and service your air conditioning before summer.',
      category: 'preparation',
      source: 'Chicago Home Inspector'
    },
    {
      id: 'chicago-community-1',
      title: 'Chicago Community Support',
      content: 'Check on elderly neighbors during extreme weather. Many Chicago communities have resources available during severe conditions.',
      category: 'community',
      source: 'Chicago Community Leader'
    },
  ],
  // 默认通用提示
  'default': [
    {
      id: 'generic-travel-1',
      title: 'Safe Weather Driving Tips',
      content: 'Reduce speed, increase following distance, and avoid sudden stops during adverse conditions. Keep an emergency kit in your vehicle year-round.',
      category: 'travel',
      source: 'Driving Safety Expert'
    },
    {
      id: 'generic-heating-1',
      title: 'Home Comfort & Efficiency',
      content: 'Maintain comfortable temperatures and seal drafts around windows and doors to save energy year-round.',
      category: 'heating',
      source: 'Energy Efficiency Expert'
    },
    {
      id: 'generic-safety-1',
      title: 'Home Safety Tips',
      content: 'Install and test smoke and carbon monoxide detectors on every level of your home, especially near bedrooms.',
      category: 'safety',
      source: 'Fire Safety Expert'
    },
    {
      id: 'generic-preparation-1',
      title: 'Year-Round Emergency Kit',
      content: 'Prepare a kit with water, food, flashlights, batteries, first aid supplies, and medications to last at least 3 days for any emergency.',
      category: 'preparation',
      source: 'Emergency Preparedness Specialist'
    },
  ],
};

// 分类标签映射
const CATEGORY_LABELS: Record<LocalTip['category'], string> = {
  'travel': 'Travel Tips',
  'heating': 'Home Comfort',
  'safety': 'Safety Tips',
  'preparation': 'Preparation Tips',
  'community': 'Community Tips',
};

// 分类图标映射
const CATEGORY_ICONS: Record<LocalTip['category'], string> = {
  'travel': '🚗',
  'heating': '🏠',
  'safety': '🛡️',
  'preparation': '📋',
  'community': '🤝',
};

export const LocalTips: React.FC = () => {
  const { selectedCity } = useCity();
  const tips = CITY_LOCAL_TIPS[selectedCity.id] || CITY_LOCAL_TIPS['default'];

  // 按类别分组提示
  const groupedTips = tips.reduce((groups, tip) => {
    const category = tip.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(tip);
    return groups;
  }, {} as Record<string, LocalTip[]>);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Local Tips for {selectedCity.name}</h2>
      
      <div className="grid grid-cols-1 gap-6">
        {Object.entries(groupedTips).map(([category, categoryTips]) => (
          <div key={category}>
            <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-3">
              <span>{CATEGORY_ICONS[category as LocalTip['category']]}</span>
              {CATEGORY_LABELS[category as LocalTip['category']]}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categoryTips.map((tip) => (
                <div
                  key={tip.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <h4 className="font-medium text-gray-900 mb-2">{tip.title}</h4>
                  <p className="text-sm text-gray-600 mb-3">{tip.content}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>💬 {tip.source}</span>
                    <span className="px-2 py-0.5 bg-gray-100 rounded-full">
                      {CATEGORY_LABELS[tip.category]}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* 社区资源 */}
      <div className="mt-8 bg-gray-50 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Community Resources</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">🌡️ Local Weather Groups</h4>
            <p className="text-sm text-gray-600">Join local Facebook groups for real-time weather updates and neighborhood tips from fellow residents.</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">🏘️ Neighborhood Associations</h4>
            <p className="text-sm text-gray-600">Check with your neighborhood association for community resources and volunteer opportunities during severe weather events.</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">📱 Local Alert Apps</h4>
            <p className="text-sm text-gray-600">Download the official city app to receive emergency alerts and road condition updates directly to your phone.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
