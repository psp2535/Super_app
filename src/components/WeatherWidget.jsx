import React, { useState, useEffect } from "react";
import { fetchCurrentWeather } from "../services/apiServices";
import { Wind, Droplets, Gauge } from "lucide-react";

const WeatherWidget = () => {
  const [weather, setWeather] = useState(null);
  const [dateTime, setDateTime] = useState(new Date());
  const [loading, setLoading] = useState(true);

  // Live time ticker
  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Weather fetcher
  useEffect(() => {
    const loadWeather = async (coords) => {
      try {
        setLoading(true);
        const data = await fetchCurrentWeather(coords || "London");
        setWeather(data);
      } catch (err) {
        console.error("Failed to load weather:", err);
      } finally {
        setLoading(false);
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          };
          loadWeather(coords);
        },
        () => {
          loadWeather(null); // Fallback to default city
        },
        { timeout: 3000 }
      );
    } else {
      loadWeather(null);
    }
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).replace(/\//g, "-");
  };

  if (loading || !weather) {
    return (
      <div className="weather-widget loading-widget">
        <p>Loading weather data...</p>
      </div>
    );
  }

  const { main, wind, weather: conds } = weather;
  const mainCond = conds[0];
  const iconUrl = `https://openweathermap.org/img/wn/${mainCond.icon}@2x.png`;

  return (
    <div className="weather-widget">
      {/* Top Header Row: Date & Time */}
      <div className="weather-header">
        <span className="weather-date">{formatDate(dateTime)}</span>
        <span className="weather-time">{formatTime(dateTime)}</span>
      </div>

      {/* Main Weather Information Grid */}
      <div className="weather-body">
        {/* Left Column: Visual Condition */}
        <div className="weather-primary">
          <img src={iconUrl} alt={mainCond.main} className="weather-icon" />
          <span className="weather-condition-text">{mainCond.description}</span>
        </div>

        <div className="weather-divider"></div>

        {/* Center Column: Temperature */}
        <div className="weather-temp-section">
          <span className="weather-temp-value">{Math.round(main.temp)}°C</span>
          <div className="weather-stat">
            <Gauge size={16} className="weather-stat-icon" />
            <div className="weather-stat-details">
              <span className="weather-stat-value">{main.pressure} hPa</span>
              <span className="weather-stat-label">Pressure</span>
            </div>
          </div>
        </div>

        <div className="weather-divider"></div>

        {/* Right Column: Key Metrics (Wind & Humidity) */}
        <div className="weather-stats-column">
          <div className="weather-stat">
            <Wind size={20} className="weather-stat-icon" />
            <div className="weather-stat-details">
              <span className="weather-stat-value">{(wind.speed * 3.6).toFixed(1)} km/h</span>
              <span className="weather-stat-label">Wind Speed</span>
            </div>
          </div>

          <div className="weather-stat">
            <Droplets size={20} className="weather-stat-icon" />
            <div className="weather-stat-details">
              <span className="weather-stat-value">{main.humidity}%</span>
              <span className="weather-stat-label">Humidity</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
