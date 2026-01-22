'use client';

import React, { useEffect, useState } from 'react';
import { useCity } from './CityContext';
import { fetchWeatherForecast, WeatherForecastData, getWeatherDescription, getWeatherIconClass } from '../lib/open-meteo-api';
import { STATE_ABBREVIATIONS } from '../lib/state-mapping';

export const WeatherForecast: React.FC = () => {
  const { selectedCity } = useCity();
  const [forecast, setForecast] = useState<WeatherForecastData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // 当城市改变时获取天气预报
  useEffect(() => {
    const getForecast = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchWeatherForecast(selectedCity.lat, selectedCity.lon);
        setForecast(data);
      } catch (err) {
        setError('Failed to fetch weather forecast');
        console.error('Error fetching forecast:', err);
      } finally {
        setLoading(false);
      }
    };

    getForecast();
  }, [selectedCity]);

  // 格式化日期
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          10-Day Winter Forecast for {selectedCity.name}, {STATE_ABBREVIATIONS[selectedCity.state] || selectedCity.state}
        </h2>
        <div className="text-sm text-gray-500">
          Updated: {new Date().toLocaleTimeString()}
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center text-red-700">
          {error}
        </div>
      ) : forecast.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          No forecast data available
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Weather</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Temp (°F)</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Snowfall (in)</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Precipitation (in)</th>
              </tr>
            </thead>
            <tbody>
              {forecast.map((day, index) => (
                <tr
                  key={index}
                  className={`border-b border-gray-200 hover:bg-gray-50 transition-colors ${
                    index === 0 ? 'bg-blue-50 font-medium' : ''
                  }`}
                >
                  <td className="px-4 py-4">{formatDate(day.date)}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xl ${
                        getWeatherIconClass(day.weatherCode) === 'sunny' ? 'text-yellow-500 bg-yellow-100' :
                        getWeatherIconClass(day.weatherCode) === 'rain' ? 'text-blue-500 bg-blue-100' :
                        getWeatherIconClass(day.weatherCode) === 'snow' ? 'text-blue-300 bg-blue-50' :
                        getWeatherIconClass(day.weatherCode) === 'thunderstorm' ? 'text-purple-500 bg-purple-100' :
                        'text-gray-500 bg-gray-100'
                      }`}>
                        {getWeatherIconClass(day.weatherCode) === 'sunny' && '☀️'}
                        {getWeatherIconClass(day.weatherCode) === 'rain' && '🌧️'}
                        {getWeatherIconClass(day.weatherCode) === 'snow' && '❄️'}
                        {getWeatherIconClass(day.weatherCode) === 'thunderstorm' && '⛈️'}
                        {getWeatherIconClass(day.weatherCode) === 'fog' && '🌫️'}
                        {!['sunny', 'rain', 'snow', 'thunderstorm', 'fog'].includes(getWeatherIconClass(day.weatherCode)) && '☁️'}
                      </div>
                      <span>{getWeatherDescription(day.weatherCode)}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{day.temperatureMax}°</span>
                      <span className="text-gray-500">/{day.temperatureMin}°</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    {day.snowfall > 0 ? (
                      <div className="flex items-center gap-2 text-blue-700">
                        <span>❄️</span>
                        <span>{day.snowfall.toFixed(1)} in</span>
                      </div>
                    ) : (
                      <span className="text-gray-400">None</span>
                    )}
                  </td>
                  <td className="px-4 py-4">
                    {day.precipitation > 0 ? (
                      <div className="flex items-center gap-2 text-blue-600">
                        <span>💧</span>
                        <span>{day.precipitation.toFixed(1)} in</span>
                      </div>
                    ) : (
                      <span className="text-gray-400">None</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-4 p-4 bg-blue-50 rounded-lg text-sm text-blue-700">
        <p className="font-semibold mb-2">Winter Weather Advisory:</p>
        <p>
          {forecast.some(day => day.snowfall > 3) ? (
            <span className="text-red-600 font-medium">⚠️ Significant snowfall expected in the coming days. Be prepared for winter weather conditions.</span>
          ) : forecast.some(day => day.snowfall > 0) ? (
            <span className="text-yellow-600 font-medium">🌨️ Light snowfall expected. Use caution while driving.</span>
          ) : (
            <span>No significant snowfall expected in the next 10 days.</span>
          )}
        </p>
      </div>
    </div>
  );
};
