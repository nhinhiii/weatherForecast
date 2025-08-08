import React, { useEffect, useState } from "react";
import { getWeatherTheme } from "../lib/weatherUtils";
import { weatherThemes } from "../config/weatherThemes";
import wind from "../assets/Icons/wind.svg";
import sunrise from "../assets/Icons/sunrise.svg";
import sunset from "../assets/Icons/sunset.svg";
import humid from "../assets/Icons/humid.svg";
import { convertTime } from "../lib/convertTime";
import AIAgentDisplay from "../AIAgent/AIAgentDisplay";
import { convertDate } from "../lib/convertDate";
import Footer from "../components/Footer";

const WeatherForecast = () => {
  const [cityInput, setCityInput] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const weatherAPI = import.meta.env.VITE_WEATHERFORECAST_API;

  // --- No changes to your functions ---
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
    setCityInput("");
  };

  useEffect(() => {
    const initialCity = "New York";
    setCityInput(initialCity);
    search(initialCity);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    search(cityInput);
  };

  const themeName = weatherData ? getWeatherTheme(weatherData) : "Sunny";
  const currentTheme = weatherThemes[themeName];

  return (
    <div className="relative w-screen h-[100dvh] overflow-hidden">
      <div className="absolute inset-0 z-0">{currentTheme.background}</div>

      <form
        onSubmit={handleSearch}
        className="absolute top-8 right-12 z-30 flex items-center gap-2"
      >
        <input
          type="text"
          onChange={(e) => setCityInput(e.target.value)}
          value={cityInput}
          placeholder="Search for a city..."
          className="w-full p-2 rounded-md text-white bg-black/30 border border-white/20 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="p-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-colors disabled:bg-gray-500"
          disabled={isLoading}
        >
          {isLoading ? "..." : "Search"}
        </button>
      </form>

      <div
        className="absolute inset-0 z-20 overflow-y-auto 
                   p-4 pt-24 lg:pt-4
                   flex flex-col items-center justify-center"
      >
        {isLoading && !weatherData && (
          <div className="text-white text-2xl">Loading...</div>
        )}
        {error && (
          <div className="text-red-400 bg-red-900/50 text-center p-6 rounded-lg w-full max-w-md">
            {error}
          </div>
        )}

        <img
          src={currentTheme.src}
          className=" w-30 h-auto top-20 left-10 z-10 
                   md:w-40 md:left-20 absolute
                   lg:w-50 lg:top-20 lg:left-28"
          alt="Weather theme icon"
        />

        {weatherData && !error && (
          <>
            <div
              className={`w-full max-w-md text-[#FFFAFA] text-center transition-opacity duration-500 mt-80 pt-10 lg:mt-0
                         lg:absolute lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 ${
                           isLoading ? "opacity-30" : "opacity-100"
                         }`}
            >
              <div style={{ color: `${currentTheme.generalColor}` }}>
                <p className="text-xl md:text-2xl font-mono">
                  {convertDate(weatherData.dt, weatherData.timezone)}
                </p>
                <p className="text-lg font-serif mt-2 md:mt-4">
                  {weatherData.name}
                </p>
                <p className="text-6xl md:text-7xl mt-2 md:mt-4">
                  {Math.floor(weatherData.main.temp)}°
                </p>
                <p
                  className="text-xl md:text-2xl font-medium mt-2 md:mt-4"
                  style={{ color: `${currentTheme.themeColor}` }}
                >
                  {weatherData.weather[0].description}
                </p>
                <div className="flex justify-center gap-4 md:gap-6 mt-4">
                  <p>Max: {Math.floor(weatherData.main.temp_max)}°</p>
                  <p>Min: {Math.floor(weatherData.main.temp_min)}°</p>
                </div>
                <div className="grid grid-cols-2 justify-center mt-6 md:mt-8 gap-x-8 gap-y-6 md:gap-x-16">
                  <div className="flex flex-col gap-4 items-start justify-self-center">
                    <div className="flex gap-3 items-center">
                      <img src={wind} className="w-6 h-6" alt="wind icon" />
                      <p>{weatherData.wind.speed} mph</p>
                    </div>
                    <div className="flex gap-3 items-center">
                      <img
                        src={humid}
                        className="w-6 h-6"
                        alt="humidity icon"
                      />
                      <p>{weatherData.main.humidity} %</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4 items-start justify-self-center">
                    <div className="flex gap-3 items-center">
                      <img
                        src={sunrise}
                        className="w-6 h-6"
                        alt="sunrise icon"
                      />
                      <p>
                        {convertTime(
                          weatherData.sys.sunrise,
                          weatherData.timezone
                        )}
                      </p>
                    </div>
                    <div className="flex gap-3 items-center">
                      <img src={sunset} className="w-6 h-6" alt="sunset icon" />
                      <p>
                        {convertTime(
                          weatherData.sys.sunset,
                          weatherData.timezone
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="w-95 max-w-md mt-20 mb-20
                         lg:absolute lg:top-28 lg:right-12 lg:mt-0 lg-full"
            >
              <AIAgentDisplay
                weatherData={weatherData}
                currentTheme={currentTheme}
              />
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default WeatherForecast;
