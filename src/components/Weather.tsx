'use client';
import { useState, useEffect } from 'react';

interface WeatherData {
  temp: number;
  description: string;
  icon: string;
}

interface ForecastData {
  temp: {
    min: number;
    max: number;
  };
  icon: string;
  day: string;
  description: string;
}

export default function Weather() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData[]>([]);
  const [loading, setLoading] = useState(true);

  const getDayName = (date: Date): string => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) return 'Today';
    if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
    return date.toLocaleDateString([], { weekday: 'long' });
  };

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const API_KEY = "2f1a54ef4b277fbaf825f77db7291a4e";
        
        if (!API_KEY) {
          setWeather({
            temp: 0,
            description: 'Please add OpenWeatherMap API key',
            icon: '01d'
          });
          setLoading(false);
          return;
        }

        const city = 'Mannarkkad,IN'; // You can change this to your city
        // Fetch current weather
        const currentResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
        );
        const currentData = await currentResponse.json();

        // Fetch 5-day forecast
        const forecastResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`
        );
        const forecastData = await forecastResponse.json();

        setWeather({
          temp: currentData.main.temp,
          description: currentData.weather[0].description,
          icon: currentData.weather[0].icon,
        });

        // Process forecast data for next 5 days
        const dailyForecasts = new Map();
        
        forecastData.list.forEach((item: any) => {
          const date = new Date(item.dt * 1000);
          const day = date.toDateString();
          
          if (!dailyForecasts.has(day)) {
            dailyForecasts.set(day, {
              temps: [],
              icons: [],
              descriptions: [],
              date: date
            });
          }
          
          const dayData = dailyForecasts.get(day);
          dayData.temps.push(item.main.temp);
          dayData.icons.push(item.weather[0].icon);
          dayData.descriptions.push(item.weather[0].description);
        });

        const processedForecast = Array.from(dailyForecasts.values())
          .slice(0, 5)
          .map(dayData => ({
            temp: {
              min: Math.round(Math.min(...dayData.temps)),
              max: Math.round(Math.max(...dayData.temps))
            },
            icon: dayData.icons[Math.floor(dayData.icons.length / 2)], // Use mid-day icon
            description: dayData.descriptions[Math.floor(dayData.descriptions.length / 2)],
            day: getDayName(dayData.date)
          }));

        setForecast(processedForecast);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching weather:', error);
        setLoading(false);
      }
    };

    fetchWeather();
    const interval = setInterval(fetchWeather, 300000); // Update every 5 minutes

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-white flex flex-col items-end">
      {loading ? (
        <div className="text-lg font-light">Loading...</div>
      ) : weather ? (
        <>
          {/* Title */}
          <div className="mb-4">
            <h2 className="text-3xl font-light text-right mb-1">Mannarkkad Weather</h2>
            <div className="h-px bg-white/30 w-full"></div>
          </div>

          {/* Current weather */}
          <div className="flex items-center gap-3 mb-1">
            <img 
              src={`https://openweathermap.org/img/wn/${weather.icon}.png`}
              alt={weather.description}
              className="w-20 h-20"
            />
            <span className="text-8xl font-light">{Math.round(weather.temp)}°C</span>
          </div>
          <div className="text-2xl font-light capitalize mb-4">
            {weather.description}
          </div>

          {/* Daily Forecast */}
          <div className="flex flex-col gap-2">
            {forecast.map((item, index) => (
              <div key={index} className="flex items-center gap-8">
                <div className="text-xl font-light w-20">{item.day}</div>
                <img 
                  src={`https://openweathermap.org/img/wn/${item.icon}.png`}
                  alt={item.description}
                  className="w-10 h-10"
                />
                <div className="text-xl font-light w-16 flex gap-2">
                  <span>{item.temp.max}°</span>
                  <span className="text-gray-400">{item.temp.min}°</span>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="text-lg font-light">Weather unavailable</div>
      )}
    </div>
  );
}
