import React, { useState, useEffect } from "react";
import { fetchCurrentWeather } from "../services/weatherApi";
import { Wind, Droplets, Thermometer, Sun, Cloud, CloudRain, CloudLightning, CloudSnow, CloudFog } from "lucide-react";

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
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const hrStr = hours.toString().padStart(2, "0");
    return `${hrStr}:${minutes} ${ampm}`;
  };

  const formatDate = (date) => {
    const m = date.getMonth() + 1;
    const d = date.getDate();
    const y = date.getFullYear();
    return `${m}-${d}-${y}`;
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

  const getWeatherIcon = (mainCondition) => {
    const cond = (mainCondition || "").toLowerCase();
    if (cond.includes("thunderstorm") || cond.includes("lightning")) {
      return <CloudLightning size={48} className="weather-condition-icon-lucide" />;
    }
    if (cond.includes("rain") || cond.includes("drizzle") || cond.includes("shower")) {
      return <CloudRain size={48} className="weather-condition-icon-lucide" />;
    }
    if (cond.includes("snow") || cond.includes("ice") || cond.includes("hail")) {
      return <CloudSnow size={48} className="weather-condition-icon-lucide" />;
    }
    if (cond.includes("clear") || cond.includes("sun")) {
      return <Sun size={48} className="weather-condition-icon-lucide" />;
    }
    if (cond.includes("cloud") || cond.includes("overcast")) {
      return <Cloud size={48} className="weather-condition-icon-lucide" />;
    }
    return <CloudFog size={48} className="weather-condition-icon-lucide" />;
  };

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
          {getWeatherIcon(mainCond.main)}
          <span className="weather-condition-text">{mainCond.main}</span>
        </div>

        <div className="weather-divider"></div>

        {/* Center Column: Temperature & Pressure */}
        <div className="weather-temp-section">
          <span className="weather-temp-value">{Math.round(main.temp)}°C</span>
          <div className="weather-stat-row">
            <Thermometer size={22} className="weather-stat-icon-temp" />
            <div className="weather-stat-details">
              <span className="weather-stat-value">{main.pressure} mbar</span>
              <span className="weather-stat-label">Pressure</span>
            </div>
          </div>
        </div>

        <div className="weather-divider"></div>

        {/* Right Column: Key Metrics (Wind & Humidity) */}
        <div className="weather-stats-column">
          <div className="weather-stat-row">
            <Wind size={24} className="weather-stat-icon" />
            <div className="weather-stat-details">
              <span className="weather-stat-value">{(wind.speed * 3.6).toFixed(1)} km/h</span>
              <span className="weather-stat-label">Wind</span>
            </div>
          </div>

          <div className="weather-stat-row">
            <Droplets size={24} className="weather-stat-icon" />
            <div className="weather-stat-details">
              <span className="weather-stat-value">{main.humidity}%</span>
              <span className="weather-stat-label">Humidiy</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
