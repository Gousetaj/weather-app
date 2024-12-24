import React, { useEffect, useState } from "react";
import axios from "axios";

interface WeatherProps {
  city: string;
}

interface WeatherData {
  current: {
    temp: number;
    weather: { description: string }[];
  };
  forecast: { dt: number; temp: { day: number }; weather: { description: string }[] }[];
}

const Weather: React.FC<WeatherProps> = ({ city }) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY; // Replace with your OpenWeatherMap API key
  const BASE_URL = "https://api.openweathermap.org/data/2.5";

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      setError("");
      try {
        const currentWeather = await axios.get(
          `${BASE_URL}/weather?q=${city}&units=metric&appid=${API_KEY}`
        );

        const forecastWeather = await axios.get(
          `${BASE_URL}/forecast/daily?q=${city}&cnt=5&units=metric&appid=${API_KEY}`
        );

        setWeatherData({
          current: {
            temp: currentWeather.data.main.temp,
            weather: currentWeather.data.weather,
          },
          forecast: forecastWeather.data.list.map((item: any) => ({
            dt: item.dt,
            temp: item.temp,
            weather: item.weather,
          })),
        });
      } catch (err) {
        setError("Failed to fetch weather data. Please try again.");
      }
      setLoading(false);
    };

    fetchWeather();
  }, [city]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!weatherData) return <p>No data to display.</p>;

  return (
    <div>
      <h2>Weather in {city}</h2>
      <div>
        <h3>Current Temperature: {weatherData.current.temp}°C</h3>
        <p>{weatherData.current.weather[0]?.description}</p>
      </div>
      <div>
        <h3>5-Day Forecast</h3>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {weatherData.forecast.map((day, index) => (
            <li key={index} style={{ margin: "10px 0" }}>
              <strong>{new Date(day.dt * 1000).toDateString()}</strong>:{" "}
              {day.temp.day}°C - {day.weather[0]?.description}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Weather;
