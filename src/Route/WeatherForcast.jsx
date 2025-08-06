import React, { useEffect, useState } from "react";
import { getWeatherTheme } from "../lib/weatherUtils";
import { weatherThemes } from "../config/weatherThemes";
import { capitalizeWords } from "../lib/capitilize";
import wind from "../assets/Icons/wind.svg";
import sunrise from "../assets/Icons/sunrise.svg";
import sunset from "../assets/Icons/sunset.svg";
import humid from "../assets/Icons/humid.svg";
import { convertTime } from "../lib/convertTime";
import AIAgentDisplay from "../AIAgent/AIAgentDisplay";

const WeatherForecast = () => {
  const [cityInput, setCityInput] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const weatherAPI = import.meta.env.VITE_WEATHERFORECAST_API;

  const search = async (city) => {
    if (!city) return;

    setIsLoading(true);
    setError(null);
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${weatherAPI}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`City not found. Please try again.`);
      }
      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    search("New York");
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    search(cityInput);
  };

  const themeName = weatherData ? getWeatherTheme(weatherData) : "Sunny";
  const currentTheme = weatherThemes[themeName];

  return (
    <div className="relative h-screen">
      {currentTheme.background}

      <img
        src={currentTheme.src}
        className="absolute w-50 sm:30 h-auto top-20 left-35 z-10"
      />

      <form
        onSubmit={handleSearch}
        className="absolute top-8 right-8 z-20 flex items-center gap-2"
      >
        <input
          type="text"
          onChange={(e) => setCityInput(e.target.value)}
          value={cityInput}
          placeholder="Search for a city..."
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

      <AIAgentDisplay
        className="absolute top-30 right-8 z-20 mt-4"
        weatherData={weatherData}
        currentTheme={currentTheme}
      />

      <div className="absolute inset-0 flex items-center justify-center z-10">
        {error && (
          <div className="text-red-400 bg-red-900 bg-opacity-50 text-center p-10 rounded-lg">
            {error}
          </div>
        )}

        {weatherData && !error && (
          <div
            className={`text-[#FFFAFA] text-center transition-opacity duration-500 ${
              isLoading ? "opacity-30" : "opacity-100"
            }`}
          >
            {(() => {
              const utcSeconds = weatherData.dt;
              const cityOffsetSeconds = weatherData.timezone;
              const correctedTimestamp =
                (utcSeconds + cityOffsetSeconds) * 1000;
              const cityDate = new Date(correctedTimestamp);
              const options = {
                month: "short",
                day: "2-digit",
                year: "numeric",
                timeZone: "UTC",
              };
              const formattedDate = cityDate.toLocaleDateString(
                "en-US",
                options
              );

              return (
                <div
                  className="z-10"
                  style={{ color: `${currentTheme.generalColor}` }}
                >
                  <p className="text-2xl font-mono">{formattedDate}</p>
                  <p className="text-lg font-serif mt-4">{weatherData.name}</p>
                  <p className="text-7xl mt-4">
                    {Math.floor(weatherData.main.temp)}°
                  </p>
                  <p
                    className="text-2xl font-medium mt-4 capitalize"
                    style={{ color: `${currentTheme.themeColor}` }}
                  >
                    {weatherData.weather[0].description}
                  </p>
                  <div className="flex justify-center gap-6 mt-4">
                    <p>Max: {Math.floor(weatherData.main.temp_max)}°</p>
                    <p>Min: {Math.floor(weatherData.main.temp_min)}°</p>
                  </div>

                  <div className="grid grid-cols-2 justify-center mt-8 gap-30">
                    <div className="flex flex-col mt-8 gap-10">
                      <div className="flex gap-3 items-center">
                        <img src={wind} size={16} />
                        <p> {weatherData.wind.speed} mph</p>
                      </div>
                      <div className="flex gap-3 items-center">
                        <img src={humid} size={16} />
                        <p> {weatherData.main.humidity} %</p>
                      </div>
                    </div>
                    <div className="flex flex-col mt-8 gap-10 items-center">
                      <div className="flex gap-3 items-center">
                        <img src={sunrise} size={16} />
                        <p>
                          {convertTime(
                            weatherData.sys.sunrise,
                            weatherData.timezone
                          )}
                        </p>
                      </div>
                      <div className="flex gap-3 items-center">
                        <img src={sunset} size={16} />
                        <p>
                          {" "}
                          {convertTime(
                            weatherData.sys.sunset,
                            weatherData.timezone
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {isLoading && (
          <div className="absolute text-white text-2xl">Loading...</div>
        )}
      </div>
    </div>
  );
};

export default WeatherForecast;
