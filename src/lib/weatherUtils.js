export const getWeatherTheme = (weatherAPI) => {
  const condition = weatherAPI.weather[0].main;
  const currentTime = weatherAPI.dt;
  const sunrise = weatherAPI.sys.sunrise;
  const sunset = weatherAPI.sys.sunset;

  switch (condition) {
    case "Clear":
      if (currentTime > sunrise && currentTime < sunset) {
        return "Sunny";
      } else {
        return "Night";
      }

    case "Clouds":
      return "Clouds";

    case "Snow":
      return "Snow";

    case "Rain":
    case "Drizzle":
      return "Rain";

    case "Thunderstorm":
      return "Thunderstorm";

    case "Mist":
    case "Smoke":
    case "Haze":
    case "Dust":
    case "Fog":
    case "Sand":
    case "Ash":
    case "Squall":
    case "Tornado":
      return "Clouds";

    default:
      if (currentTime > sunrise && currentTime < sunset) {
        return "Sunny";
      } else {
        return "Night";
      }
  }
};
