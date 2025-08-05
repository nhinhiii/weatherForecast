import React, { useEffect, useState } from "react";
import { getWeatherTheme } from "../lib/weatherUtils";
import { weatherThemes } from "../config/weatherThemes";
import { capitalizeWords } from "../lib/capitilize";

const WeatherForcast = () => {
  const [cityInput, setCityInput] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [err, setErr] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const weatherAPI = import.meta.env.VITE_WEATHER_API;

  const search = async (city) => {
    if (!city) {
      return;
    }
    setIsLoading(true);
    setErr(null);
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${weatherAPI}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("City not found. Please try again!");
      }
      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      setErr(err.message);
      setWeatherData(null);
    } finally {
      setIsLoading(false);
    }
  };

  //default city
  useEffect(() => {
    search("New York");
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    search(cityInput);
  };

  const formattedDate = () => {
    const date = new Date(weatherData.dt * 1000);
    const options = {
      month: "short",
      day: "2-digit",
      year: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  const themeName = weatherData ? getWeatherTheme(weatherData) : "Sunny";
  const currentTheme = weatherThemes[themeName];

  return (
    <div className="relative h-screen w-full">
      {currentTheme.background}

      <form
        onSubmit={handleSearch}
        className="absolute top-10 right-15 z-20 flex items-center"
      >
        <input
          type="text"
          onChange={(e) => setCityInput(e.target.value)}
          value={cityInput}
          placeholder="Type the city name..."
          className="p-2 rounded-xs text-black bg-white border border-black focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="p-2 bg-[rgba(255,248,248,0.51)] cursor-pointer rounded-xs hover:bg-blue-600 transition-colors"
          disable={isLoading}
        >
          {isLoading ? "..." : "Search"}
        </button>
      </form>

      <div>
        <div className="absolute inset-0 flex items-center justify-center z-10">
          {isLoading && (
            <div className="text-white text-2xl"> Loading ... </div>
          )}
          {err && (
            <div className="text-red-400 bg-red-900 bg-opacity-50 text-center p-10 rounded-lg">
              {err}
            </div>
          )}
          {weatherData && !isLoading && !err && (
            <div className="text-[#FFFAFA] text-center">
              <p className="text-2xl font-mono"> {formattedDate} </p>
              <p className="text-lg font-serif mt-4"> {weatherData.name}</p>
              <p className="text-7xl mt-4">
                {" "}
                {Math.floor(weatherData.main.temp)}°
              </p>
              <p
                className="text-2xl font-medium mt-4"
                style={{ color: `${currentTheme.themeColor}` }}
              >
                {" "}
                {capitalizeWords(weatherData.weather[0].description)}
              </p>
              <div className="flex flex-row gap-12 sm:flex-1 mt-4">
                <p> Max: {Math.floor(weatherData.main.temp_max)}°</p>
                <p> Min: {Math.floor(weatherData.main.temp_min)}°</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WeatherForcast;
