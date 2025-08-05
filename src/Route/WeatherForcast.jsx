import React, { useEffect, useState } from "react";
import { getWeatherTheme } from "../lib/weatherUtils";
import { weatherThemes } from "../config/weatherThemes";
import { capitalizeWords } from "../lib/capitilize";

const WeatherForecast = () => {
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

  return (
    <div className="relative h-screen w-full">
      {weatherData
        ? weatherThemes[getWeatherTheme(weatherData)].background
        : weatherThemes["Sunny"].background}

      <form
        onSubmit={handleSearch}
        className="absolute top-4 right-4 z-20 flex items-center gap-2"
      >
        <input
          type="text"
          onChange={(e) => setCityInput(e.target.value)}
          value={cityInput}
          placeholder="Type the city name..."
          className="p-2 rounded-md text-white bg-black/30 border border-white/20 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="p-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-colors disabled:bg-gray-500"
          disabled={isLoading}
        >
          {isLoading ? "..." : "Search"}
        </button>
      </form>

      <div className="absolute inset-0 flex items-center justify-center z-10">
        {isLoading && <div className="text-white text-2xl"> Loading ... </div>}
        {err && (
          <div className="text-red-400 bg-red-900 bg-opacity-50 text-center p-10 rounded-lg">
            {err}
          </div>
        )}
        {weatherData && !isLoading && !err && (
          <div className="text-[#FFFAFA] text-center">
            {(() => {
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
                <>
                  <p className="text-2xl font-mono"> {formattedDate} </p>
                  <p className="text-lg font-serif mt-4"> {weatherData.name}</p>
                  <p className="text-7xl mt-4">
                    {" "}
                    {Math.floor(weatherData.main.temp)}°
                  </p>
                  <p
                    className="text-2xl font-medium mt-4 capitalize"
                    style={{ color: `${currentTheme.themeColor}` }}
                  >
                    {capitalizeWords(weatherData.weather[0].description)}
                  </p>
                  <div className="flex justify-center gap-12 mt-4">
                    <p> Max: {Math.floor(weatherData.main.temp_max)}°</p>
                    <p> Min: {Math.floor(weatherData.main.temp_min)}°</p>
                  </div>
                </>
              );
            })()}
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherForecast;
