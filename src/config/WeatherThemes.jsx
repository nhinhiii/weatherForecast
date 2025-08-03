import React from "react";
import sunny from "../assets/Icons/sunny.png";
import night from "../assets/Icons/night.png";
import rainy from "../assets/Icons/rainy.png";
import snowy from "../assets/Icons/snowy.png";
import cloud from "../assets/Icons/cloud.png";
import thunderstorm from "../assets/Icons/thunderstorm.png";
import SunnyBackground from "../backgrounds/SunnyBackground";
import NightBackground from "../backgrounds/NightBackground";
import RainyBackground from "../backgrounds/RainyBackground";
import CloudyBackground from "../backgrounds/CloudyBackground";
import ThunderstormBackground from "../backgrounds/ThunderstormBackground";
import SnowyBackground from "../backgrounds/SnowyBackground";

export const WeatherThemes = {
  Sunny: {
    background: <SunnyBackground />,
    src: sunny,
  },
  Night: {
    background: <NightBackground />,
    src: night,
  },
  Rain: {
    background: <RainyBackground />,
    src: rainy,
  },
  Clouds: {
    background: <CloudyBackground />,
    src: cloud,
  },
  Thunderstorm: {
    background: <ThunderstormBackground />,
    src: thunderstorm,
  },
  Snow: {
    background: <SnowyBackground />,
    src: snowy,
  },
};
