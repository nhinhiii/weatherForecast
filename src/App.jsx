import "./App.css";
import { Routes, Route } from "react-router";
import WeatherForecast from "./Route/WeatherForecast";
import PageNotFound from "./Route/PageNotFound";

function App() {
  return (
    <Routes>
      <Route index element={<WeatherForecast />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
