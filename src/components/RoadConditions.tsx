'use client';

import React from 'react';
import { useCity } from './CityContext';

// 道路状况数据类型
interface RoadCondition {
  id: string;
  name: string;
  status: 'open' | 'closed' | 'delayed' | 'construction';
  description: string;
  lastUpdated: string;
}

// 城市道路状况数据
const CITY_ROAD_CONDITIONS: Record<string, RoadCondition[]> = {
  'dallas': [
    { id: 'i35', name: 'I-35 E', status: 'open', description: 'All lanes open, light traffic', lastUpdated: '2026-01-22 14:30' },
    { id: 'us75', name: 'US-75', status: 'delayed', description: 'Northbound delays due to weather, reduced speed limit', lastUpdated: '2026-01-22 14:15' },
    { id: 'i635', name: 'I-635', status: 'open', description: 'All lanes open, normal traffic', lastUpdated: '2026-01-22 14:45' },
    { id: 'sh121', name: 'SH-121', status: 'closed', description: 'Southbound closed between Exit 24 and 25 due to snow removal', lastUpdated: '2026-01-22 13:30' },
  ],
  'san-antonio': [
    { id: 'i35', name: 'I-35', status: 'open', description: 'All lanes open, light traffic', lastUpdated: '2026-01-22 14:20' },
    { id: 'us281', name: 'US-281', status: 'open', description: 'All lanes open, normal traffic', lastUpdated: '2026-01-22 14:40' },
    { id: 'i10', name: 'I-10', status: 'delayed', description: 'Westbound delays due to light snow, use caution', lastUpdated: '2026-01-22 14:00' },
  ],
  'houston': [
    { id: 'i10', name: 'I-10', status: 'open', description: 'All lanes open, light traffic', lastUpdated: '2026-01-22 14:50' },
    { id: 'i45', name: 'I-45', status: 'open', description: 'All lanes open, normal traffic', lastUpdated: '2026-01-22 14:35' },
    { id: 'us59', name: 'US-59', status: 'open', description: 'All lanes open, light traffic', lastUpdated: '2026-01-22 14:25' },
  ],
  'austin': [
    { id: 'i35', name: 'I-35', status: 'delayed', description: 'Both directions delayed due to weather, reduced speed', lastUpdated: '2026-01-22 14:10' },
    { id: 'us290', name: 'US-290', status: 'open', description: 'All lanes open, light traffic', lastUpdated: '2026-01-22 14:30' },
    { id: 'mopac', name: 'Mopac Expressway', status: 'closed', description: 'Southbound closed at Loop 360 for snow removal', lastUpdated: '2026-01-22 13:45' },
  ],
  'chicago': [
    { id: 'i90', name: 'I-90', status: 'delayed', description: 'Eastbound delays due to heavy snow, reduced speed', lastUpdated: '2026-01-22 14:05' },
    { id: 'i94', name: 'I-94', status: 'delayed', description: 'Both directions delayed, icy conditions', lastUpdated: '2026-01-22 14:20' },
    { id: 'i290', name: 'I-290', status: 'open', description: 'All lanes open, but icy in spots', lastUpdated: '2026-01-22 14:35' },
  ],
  'new-york': [
    { id: 'i95', name: 'I-95', status: 'open', description: 'All lanes open, light traffic', lastUpdated: '2026-01-22 14:40' },
    { id: 'i87', name: 'I-87', status: 'delayed', description: 'Northbound delays due to light snow', lastUpdated: '2026-01-22 14:15' },
    { id: 'i78', name: 'I-78', status: 'open', description: 'All lanes open, normal traffic', lastUpdated: '2026-01-22 14:30' },
  ],
  'los-angeles': [
    { id: 'i405', name: 'I-405', status: 'open', description: 'All lanes open, normal traffic', lastUpdated: '2026-01-22 14:50' },
    { id: 'i10', name: 'I-10', status: 'open', description: 'All lanes open, light traffic', lastUpdated: '2026-01-22 14:45' },
    { id: 'i5', name: 'I-5', status: 'open', description: 'All lanes open, normal traffic', lastUpdated: '2026-01-22 14:35' },
  ],
  'seattle': [
    { id: 'i5', name: 'I-5', status: 'delayed', description: 'Both directions delayed due to rain and fog', lastUpdated: '2026-01-22 14:25' },
    { id: 'i90', name: 'I-90', status: 'open', description: 'All lanes open, but wet conditions', lastUpdated: '2026-01-22 14:40' },
    { id: 'sr520', name: 'SR-520', status: 'open', description: 'All lanes open, normal traffic', lastUpdated: '2026-01-22 14:30' },
  ],
  // 默认道路状况数据
  'default': [
    { id: 'major-hwy-1', name: 'Major Highways', status: 'open', description: 'Current road conditions unavailable. Check local resources for updates.', lastUpdated: 'N/A' },
    { id: 'local-roads', name: 'Local Roads', status: 'open', description: 'Current road conditions unavailable. Check local resources for updates.', lastUpdated: 'N/A' },
  ],
};

export const RoadConditions: React.FC = () => {
  const { selectedCity } = useCity();
  const roadConditions = CITY_ROAD_CONDITIONS[selectedCity.id] || CITY_ROAD_CONDITIONS['default'];

  // 获取状态显示信息
  const getStatusInfo = (status: RoadCondition['status']) => {
    switch (status) {
      case 'open':
        return { text: 'Open', color: 'text-green-700 bg-green-50', icon: '✅' };
      case 'closed':
        return { text: 'Closed', color: 'text-red-700 bg-red-50', icon: '🚫' };
      case 'delayed':
        return { text: 'Delayed', color: 'text-yellow-700 bg-yellow-50', icon: '⚠️' };
      case 'construction':
        return { text: 'Construction', color: 'text-orange-700 bg-orange-50', icon: '🔧' };
      default:
        return { text: 'Unknown', color: 'text-gray-700 bg-gray-50', icon: '❓' };
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Road Conditions for {selectedCity.name}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 道路状况列表 */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Major Highways</h3>
          <div className="space-y-3">
            {roadConditions.map((road) => {
              const statusInfo = getStatusInfo(road.status);
              return (
                <div
                  key={road.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{road.name}</h4>
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${statusInfo.color}`}>
                      <span>{statusInfo.icon}</span>
                      {statusInfo.text}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{road.description}</p>
                  <div className="text-xs text-gray-500">
                    Last updated: {road.lastUpdated}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 相关资源链接 */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Road Condition Resources</h3>
          <div className="bg-gray-50 rounded-lg p-4 space-y-4">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Official Road Information</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href={`https://www.drivetexas.org/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <span>🔗</span>
                    <span>Texas Department of Transportation (TxDOT)</span>
                  </a>
                </li>
                <li>
                  <a
                    href={`https://www.511ia.org/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <span>🔗</span>
                    <span>Iowa 511 Road Conditions</span>
                  </a>
                </li>
                <li>
                  <a
                    href={`https://www.511ny.org/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <span>🔗</span>
                    <span>New York 511 Road Conditions</span>
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-2">Winter Driving Tips</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="/guide"
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <span>📖</span>
                    <span>Winter Storm Safety Guide</span>
                  </a>
                </li>
                <li>
                  <a
                    href={`https://www.weather.gov/safety/winter-driving`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <span>🔗</span>
                    <span>NWS Winter Driving Safety</span>
                  </a>
                </li>
              </ul>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">❄️ Winter Road Safety Alert</h4>
              <p className="text-sm text-blue-800">
                Always check road conditions before traveling during winter weather. Allow extra time for your journey and drive at reduced speeds.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
