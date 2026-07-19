import { useState, useEffect } from 'react';
import { getWeather } from '../services/weatherService';

function WeatherWidget() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await getWeather('Karachi');
        setWeather(response.data);
      } catch (err) {
        setError('Failed to load weather data');
        console.error('Error fetching weather:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (loading) return <p className="weather-widget">Loading weather...</p>;

  if (error) return <p className="weather-widget">{error}</p>;

  return (
    <div className="weather-widget">
      <span>{weather.name}</span>
      <span>{Math.round(weather.main.temp)}°C</span>
      <span>{weather.weather[0].description}</span>
    </div>
  );
}

export default WeatherWidget;