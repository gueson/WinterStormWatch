// 天气数据类型
export interface WeatherForecastData {
  date: string;
  temperatureMax: number;
  temperatureMin: number;
  snowfall: number;
  precipitation: number;
  weatherCode: number;
}

export interface OpenMeteoResponse {
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    snowfall_sum: number[];
    precipitation_sum: number[];
    weather_code: number[];
  };
}

// 天气代码到描述的映射
const WEATHER_CODE_MAP: Record<number, string> = {
  0: 'Clear sky',
  1: 'Mainly clear',
  2: 'Partly cloudy',
  3: 'Overcast',
  45: 'Fog',
  48: 'Depositing rime fog',
  51: 'Light drizzle',
  53: 'Moderate drizzle',
  55: 'Dense drizzle',
  56: 'Light freezing drizzle',
  57: 'Dense freezing drizzle',
  61: 'Slight rain',
  63: 'Moderate rain',
  65: 'Heavy rain',
  66: 'Light freezing rain',
  67: 'Heavy freezing rain',
  71: 'Slight snow fall',
  73: 'Moderate snow fall',
  75: 'Heavy snow fall',
  77: 'Snow grains',
  80: 'Slight rain showers',
  81: 'Moderate rain showers',
  82: 'Violent rain showers',
  85: 'Slight snow showers',
  86: 'Heavy snow showers',
  95: 'Thunderstorm',
  96: 'Thunderstorm with slight hail',
  99: 'Thunderstorm with heavy hail',
};

// 获取天气描述
export function getWeatherDescription(code: number): string {
  return WEATHER_CODE_MAP[code] || 'Unknown weather';
}

// 获取天气图标类名
export function getWeatherIconClass(code: number): string {
  if (code >= 0 && code <= 3) {
    return 'sunny';
  } else if (code >= 45 && code <= 48) {
    return 'fog';
  } else if (code >= 51 && code <= 67) {
    return 'rain';
  } else if (code >= 71 && code <= 77) {
    return 'snow';
  } else if (code >= 80 && code <= 82) {
    return 'rain';
  } else if (code >= 85 && code <= 86) {
    return 'snow';
  } else if (code >= 95 && code <= 99) {
    return 'thunderstorm';
  }
  return 'unknown';
}

// 调用Open-Meteo API获取天气预报
export async function fetchWeatherForecast(
  latitude: number,
  longitude: number
): Promise<WeatherForecastData[]> {
  try {
    const url = new URL('https://api.open-meteo.com/v1/forecast');
    url.searchParams.append('latitude', latitude.toString());
    url.searchParams.append('longitude', longitude.toString());
    url.searchParams.append('daily', 'temperature_2m_max,temperature_2m_min,snowfall_sum,precipitation_sum,weather_code');
    url.searchParams.append('timezone', 'America/Chicago');
    url.searchParams.append('forecast_days', '10');

    const response = await fetch(url.toString());
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data: OpenMeteoResponse = await response.json();

    // 转换数据格式
    const forecastData: WeatherForecastData[] = data.daily.time.map((date, index) => ({
      date,
      temperatureMax: Math.round(data.daily.temperature_2m_max[index]),
      temperatureMin: Math.round(data.daily.temperature_2m_min[index]),
      snowfall: data.daily.snowfall_sum[index] || 0,
      precipitation: data.daily.precipitation_sum[index] || 0,
      weatherCode: data.daily.weather_code[index],
    }));

    return forecastData;
  } catch (error) {
    console.error('Error fetching weather forecast:', error);
    return [];
  }
}
