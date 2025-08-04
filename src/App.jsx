import "./App.css";
import CloudyBackground from "./backgrounds/CloudyBackground";
import NightBackground from "./backgrounds/NightBackground";
import RainyBackground from "./backgrounds/RainyBackground";
import SnowyBackground from "./backgrounds/SnowyBackground";
import SunnyBackground from "./backgrounds/SunnyBackground";
import ThunderstormBackground from "./backgrounds/ThunderstormBackground";
import TestAPI from "./Route/TestAPI";
import WeatherForcast from "./Route/WeatherForcast";

function App() {
  return (
    <div>
      <WeatherForcast />
    </div>
  );
}

export default App;
