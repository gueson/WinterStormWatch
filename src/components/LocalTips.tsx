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
      title: 'Navigating Dallas Freeways in Snow',
      content: 'Avoid I-35 during heavy snowfall - it tends to ice over quickly. Stick to surface streets when possible, and allow twice the usual travel time.',
      category: 'travel',
      source: 'Dallas Resident'
    },
    {
      id: 'dallas-heating-1',
      title: 'Winter Heating Tips for Dallas Homes',
      content: 'Many Dallas homes have heat pumps that struggle in extreme cold. Keep thermostat set to 68°F to avoid overworking your system, and seal windows with plastic film for extra insulation.',
      category: 'heating',
      source: 'Dallas HVAC Expert'
    },
    {
      id: 'dallas-safety-1',
      title: 'Preventing Frozen Pipes',
      content: 'Let faucets drip slightly during freezing temperatures, especially for pipes on exterior walls. Open cabinet doors under sinks to allow warm air circulation.',
      category: 'safety',
      source: 'Dallas Plumber'
    },
    {
      id: 'dallas-preparation-1',
      title: 'Winter Storm Grocery List',
      content: 'Stock up on non-perishable foods, bottled water, and essential medications before the storm hits. Many Dallas grocery stores sell out quickly when snow is forecasted.',
      category: 'preparation',
      source: 'Dallas Resident'
    },
  ],
  'san-antonio': [
    {
      id: 'sa-travel-1',
      title: 'Driving in San Antonio Ice',
      content: 'San Antonio roads rarely see ice, so they freeze quickly. Avoid bridges and overpasses which ice before surface streets. Keep a bag of kitty litter in your trunk for traction.',
      category: 'travel',
      source: 'San Antonio Resident'
    },
    {
      id: 'sa-heating-1',
      title: 'Heating Your San Antonio Home',
      content: 'Many older San Antonio homes have inefficient heating systems. Layer up with warm clothing to reduce heating costs, and use space heaters safely (keep 3 feet from flammables).',
      category: 'heating',
      source: 'San Antonio Energy Expert'
    },
    {
      id: 'sa-safety-1',
      title: 'Power Outage Safety',
      content: 'Have flashlights and batteries ready - San Antonio often experiences power outages during winter storms. Avoid using generators indoors due to carbon monoxide risk.',
      category: 'safety',
      source: 'San Antonio Fire Department'
    },
  ],
  'chicago': [
    {
      id: 'chicago-travel-1',
      title: 'Chicago Winter Driving',
      content: 'Invest in good snow tires - they make a huge difference on Chicago streets. Keep your gas tank at least half full to prevent fuel line freezing.',
      category: 'travel',
      source: 'Chicago Resident'
    },
    {
      id: 'chicago-preparation-1',
      title: 'Winterizing Your Chicago Home',
      content: 'Clean gutters before winter to prevent ice dams. Insulate pipes in unheated areas like basements and attics.',
      category: 'preparation',
      source: 'Chicago Home Inspector'
    },
    {
      id: 'chicago-community-1',
      title: 'Chicago Winter Community Tips',
      content: 'Check on elderly neighbors during extreme cold. Many Chicago communities have warming centers open during severe weather.',
      category: 'community',
      source: 'Chicago Community Leader'
    },
  ],
  // 默认通用提示
  'default': [
    {
      id: 'generic-travel-1',
      title: 'Safe Winter Driving Tips',
      content: 'Reduce speed, increase following distance, and avoid sudden stops. Use winter tires if available, and keep an emergency kit in your vehicle.',
      category: 'travel',
      source: 'Winter Driving Expert'
    },
    {
      id: 'generic-heating-1',
      title: 'Efficient Home Heating',
      content: 'Set thermostat to 68°F during the day and lower at night. Seal drafts around windows and doors to save energy.',
      category: 'heating',
      source: 'Energy Efficiency Expert'
    },
    {
      id: 'generic-safety-1',
      title: 'Carbon Monoxide Safety',
      content: 'Install carbon monoxide detectors on every level of your home, especially near bedrooms. Test them monthly.',
      category: 'safety',
      source: 'Fire Safety Expert'
    },
    {
      id: 'generic-preparation-1',
      title: 'Winter Emergency Kit',
      content: 'Prepare a kit with water, food, flashlights, batteries, first aid supplies, and medications to last at least 3 days.',
      category: 'preparation',
      source: 'Emergency Preparedness Specialist'
    },
  ],
};

// 分类标签映射
const CATEGORY_LABELS: Record<LocalTip['category'], string> = {
  'travel': 'Travel Tips',
  'heating': 'Heating Tips',
  'safety': 'Safety Tips',
  'preparation': 'Preparation Tips',
  'community': 'Community Tips',
};

// 分类图标映射
const CATEGORY_ICONS: Record<LocalTip['category'], string> = {
  'travel': '🚗',
  'heating': '🔥',
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
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Local Winter Tips for {selectedCity.name}</h2>
      
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
            <p className="text-sm text-gray-600">Check with your neighborhood association for community warming centers and volunteer opportunities during winter storms.</p>
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
