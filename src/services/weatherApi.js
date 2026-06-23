import axios from "axios";

const weatherClient = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5",
});

const MOCK_WEATHER = {
  main: {
    temp: 24.5,
    pressure: 1012,
    humidity: 74,
  },
  wind: {
    speed: 3.6,
  },
  weather: [
    {
      main: "Clouds",
      description: "scattered clouds",
      icon: "03d",
    },
  ],
  name: "London",
};

export const fetchCurrentWeather = async (location = "London") => {
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
  if (!apiKey) {
    console.warn("Weather API key not found. Using high-fidelity mock weather data.");
    return MOCK_WEATHER;
  }
  try {
    let url = `/weather?units=metric&appid=${apiKey}`;
    if (typeof location === "object" && location.lat && location.lon) {
      url += `&lat=${location.lat}&lon=${location.lon}`;
    } else {
      url += `&q=${encodeURIComponent(location)}`;
    }
    const response = await weatherClient.get(url);
    return response.data;
  } catch (error) {
    console.error("Weather service failure, falling back to mock weather:", error);
    return MOCK_WEATHER;
  }
};
