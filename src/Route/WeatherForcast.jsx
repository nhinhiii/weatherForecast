import React, { useRef, useState } from "react";
import { getWeatherTheme } from "../lib/weatherUtils";
import { weatherThemes } from "../config/WeatherThemes";

const WeatherForcast = () => {
  const inputCity = useRef();
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const weather_api = import.meta.env.VITE_WEATHER_API;

  const search = async (city) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity}&appid=${weather_api}`;
      const response = await fetch(url);
      if (!response.ok) {
        alert("Please type correct city name");
      }
      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      alert(err);
    }
  };

  if (!weatherData) return <div> Loading ... </div>;

  const themeName = getWeatherTheme(weatherData.weather[0].main);
  const currentTheme = weatherThemes[themeName];

  return <div>{currentTheme.background}</div>;
};

export default WeatherForcast;
