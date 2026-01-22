'use client';

import React from 'react';
import { useCity } from './CityContext';

// 应急联系人类型
interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  description: string;
  category: 'emergency' | 'medical' | 'utility' | 'transportation' | 'other';
}

// 城市应急联系数据
const CITY_EMERGENCY_CONTACTS: Record<string, EmergencyContact[]> = {
  'dallas': [
    { id: '911', name: 'Emergency Services', phone: '911', description: 'For life-threatening emergencies', category: 'emergency' },
    { id: 'dallas-police', name: 'Dallas Police Department', phone: '214-744-4444', description: 'Non-emergency police services', category: 'emergency' },
    { id: 'dallas-fire', name: 'Dallas Fire-Rescue', phone: '214-670-5111', description: 'Fire and rescue services', category: 'emergency' },
    { id: 'dallas-medical', name: 'Dallas Medical Services', phone: '214-670-5100', description: 'Medical emergencies', category: 'medical' },
    { id: 'oncor', name: 'Oncor Electric', phone: '1-888-313-4747', description: 'Power outages and electric emergencies', category: 'utility' },
    { id: 'dallas-water', name: 'Dallas Water Utilities', phone: '214-651-1441', description: 'Water-related emergencies', category: 'utility' },
    { id: 'dcta', name: 'Dallas Area Rapid Transit', phone: '214-979-1111', description: 'Public transportation information', category: 'transportation' },
  ],
  'san-antonio': [
    { id: '911', name: 'Emergency Services', phone: '911', description: 'For life-threatening emergencies', category: 'emergency' },
    { id: 'sa-police', name: 'San Antonio Police Department', phone: '210-207-7273', description: 'Non-emergency police services', category: 'emergency' },
    { id: 'sa-fire', name: 'San Antonio Fire Department', phone: '210-207-1000', description: 'Fire and rescue services', category: 'emergency' },
    { id: 'sa-medical', name: 'San Antonio Medical Center', phone: '210-558-4000', description: 'Medical emergencies', category: 'medical' },
    { id: 'cps', name: 'CPS Energy', phone: '210-353-HELP (4357)', description: 'Power outages and electric emergencies', category: 'utility' },
    { id: 'sa-water', name: 'San Antonio Water System', phone: '210-704-7272', description: 'Water-related emergencies', category: 'utility' },
    { id: 'vta', name: 'VIA Metropolitan Transit', phone: '210-362-2020', description: 'Public transportation information', category: 'transportation' },
  ],
  'houston': [
    { id: '911', name: 'Emergency Services', phone: '911', description: 'For life-threatening emergencies', category: 'emergency' },
    { id: 'houston-police', name: 'Houston Police Department', phone: '713-884-3131', description: 'Non-emergency police services', category: 'emergency' },
    { id: 'houston-fire', name: 'Houston Fire Department', phone: '713-522-5800', description: 'Fire and rescue services', category: 'emergency' },
    { id: 'houston-medical', name: 'Houston Medical Center', phone: '713-526-1011', description: 'Medical emergencies', category: 'medical' },
    { id: 'centerpoint', name: 'CenterPoint Energy', phone: '1-800-332-7143', description: 'Power outages and electric emergencies', category: 'utility' },
    { id: 'houston-water', name: 'Houston Public Works', phone: '713-371-1400', description: 'Water-related emergencies', category: 'utility' },
    { id: 'metro', name: 'Metropolitan Transit Authority', phone: '713-635-4000', description: 'Public transportation information', category: 'transportation' },
  ],
  // 默认通用联系人
  'default': [
    { id: '911', name: 'Emergency Services', phone: '911', description: 'For life-threatening emergencies', category: 'emergency' },
    { id: 'local-police', name: 'Local Police Department', phone: 'Local Non-Emergency Number', description: 'Non-emergency police services', category: 'emergency' },
    { id: 'local-fire', name: 'Local Fire Department', phone: 'Local Non-Emergency Number', description: 'Fire and rescue services', category: 'emergency' },
    { id: 'local-medical', name: 'Local Medical Services', phone: 'Local Medical Number', description: 'Medical emergencies', category: 'medical' },
    { id: 'local-electric', name: 'Local Electric Utility', phone: 'Local Utility Number', description: 'Power outages and electric emergencies', category: 'utility' },
    { id: 'local-water', name: 'Local Water Utility', phone: 'Local Utility Number', description: 'Water-related emergencies', category: 'utility' },
  ],
};

// 分类标签映射
const CATEGORY_LABELS: Record<EmergencyContact['category'], string> = {
  'emergency': 'Emergency Services',
  'medical': 'Medical Services',
  'utility': 'Utility Services',
  'transportation': 'Transportation Services',
  'other': 'Other Services',
};

// 分类图标映射
const CATEGORY_ICONS: Record<EmergencyContact['category'], string> = {
  'emergency': '🚨',
  'medical': '🏥',
  'utility': '💡',
  'transportation': '🚌',
  'other': '📞',
};

export const EmergencyContacts: React.FC = () => {
  const { selectedCity } = useCity();
  const contacts = CITY_EMERGENCY_CONTACTS[selectedCity.id] || CITY_EMERGENCY_CONTACTS['default'];

  // 按类别分组联系人
  const groupedContacts = contacts.reduce((groups, contact) => {
    const category = contact.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(contact);
    return groups;
  }, {} as Record<string, EmergencyContact[]>);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Emergency Contacts for {selectedCity.name}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 应急联系列表 */}
        <div>
          {Object.entries(groupedContacts).map(([category, categoryContacts]) => (
            <div key={category} className="mb-6">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-3">
                <span>{CATEGORY_ICONS[category as EmergencyContact['category']]}</span>
                {CATEGORY_LABELS[category as EmergencyContact['category']]}
              </h3>
              <div className="space-y-3">
                {categoryContacts.map((contact) => (
                  <div key={contact.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{contact.name}</h4>
                      <a
                        href={`tel:${contact.phone}`}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded-full text-sm font-medium hover:bg-blue-700 transition-colors"
                      >
                        <span>📞</span>
                        {contact.phone}
                      </a>
                    </div>
                    <p className="text-sm text-gray-600">{contact.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 应急准备提示 */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Emergency Preparedness</h3>
          
          <div className="space-y-4">
            {/* 应急包清单 */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">Winter Emergency Kit Essentials</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Flashlight with extra batteries</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Portable phone charger</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>First aid kit</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Non-perishable food and water (3-day supply)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Blankets and warm clothing</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Hand sanitizer and face masks</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Medications and medical supplies</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Weather radio</span>
                </li>
              </ul>
            </div>

            {/* 重要提示 */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-medium text-yellow-900 mb-2">⚠️ Important Winter Safety Tips</h4>
              <ul className="space-y-2 text-sm text-yellow-800">
                <li className="flex items-start gap-2">
                  <span className="text-yellow-600 mt-1">•</span>
                  <span>Keep phone charged and have backup power</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-600 mt-1">•</span>
                  <span>Stay informed about weather conditions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-600 mt-1">•</span>
                  <span>Avoid unnecessary travel during severe weather</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-600 mt-1">•</span>
                  <span>Check on elderly neighbors and family members</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-600 mt-1">•</span>
                  <span>Know how to shut off utilities if needed</span>
                </li>
              </ul>
            </div>

            {/* 相关资源 */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">📚 Additional Resources</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="https://www.ready.gov/winter-weather"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors text-sm"
                  >
                    <span>🔗</span>
                    Ready.gov Winter Weather Preparedness
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.cdc.gov/disasters/winter/index.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors text-sm"
                  >
                    <span>🔗</span>
                    CDC Winter Weather Safety
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
