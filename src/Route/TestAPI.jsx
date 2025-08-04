import React, { useState } from "react";

const TestAPI = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState("");

  //fetch and await to get data -> rememeber to use async
  const search = async (searchCity) => {
    const api_key = import.meta.env.VITE_WEATHER_API;

    //try catch
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${api_key}`;
      const response = await fetch(url);
      if (!response.ok) {
        alert("Not a city!!!!!");
      }
      const data = await response.json();
      console.log(data);
      setWeatherData(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="p-2 rounded bg-gray-700 text-white border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholer="Type your city here"
      />
      <button
        onClick={() => search(city)}
        className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 disabled:bg-gray-500"
      >
        {" "}
        Search{" "}
      </button>
      {weatherData && (
        <p className="text-green-400 mt-4">
          Success! Check the console for data.
        </p>
      )}
    </div>
  );
};

export default TestAPI;
