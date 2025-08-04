import React, { useEffect, useState } from "react";
import { getWeatherTheme } from "../lib/weatherUtils";
import { weatherThemes } from "../config/weatherThemes";
import { capitalizeWords } from "../lib/capitilize";

const WeatherForcast = () => {
  const [cityInput, setCityInput] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [err, setErr] = useState(null);
  const weatherAPI = import.meta.env.VITE_WEATHER_API;

  const search = async (city) => {
    setErr(null);
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${weatherAPI}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`City not found (status: ${response.status}}`);
      }
      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      setErr(err.message);
      setWeatherData(null);
    }
  };

  useEffect(() => {
    search("New York");
  }, []);

  if (err) {
    return <div className="test-red-500 text-center p-10"> {err} </div>;
  }

  if (weatherData) {
    const themeName = getWeatherTheme(weatherData);
    const currentTheme = weatherThemes[themeName];
    const date = new Date(weatherData.dt * 1000);
    const options = {
      month: "short",
      day: "2-digit",
      year: "numeric",
    };
    const formattedDate = date.toLocaleDateString("en-US", options);

    return (
      <div className="relative h-screen w-full">
        {currentTheme.background}

        <div>
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="text-[#FFFAFA] text-center">
              <p className="text-2xl font-mono"> {formattedDate} </p>
              <p className="text-lg"> {weatherData.name}</p>
              <p className="text-7xl"> {Math.floor(weatherData.main.temp)}°</p>
              <p className="text-2xl text-[#0095FF]">
                {" "}
                {capitalizeWords(weatherData.weather[0].description)}
              </p>
              <p> Max: {Math.floor(weatherData.main.temp_max)}°</p>
              <p> Min: {Math.floor(weatherData.main.temp_min)}°</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default WeatherForcast;
