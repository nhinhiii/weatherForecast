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
import maleSunny from "../assets/Icons/maleSunny.png";
import femaleSunny from "../assets/Icons/femaleSunny.png";
import maleRainny from "../assets/Icons/maleRainy.png";
import femaleRainny from "../assets/Icons/femaleRainy.png";
import maleSnowy from "../assets/Icons/maleSnowy.png";
import femaleSnowy from "../assets/Icons/femaleSnowy.png";

export const weatherThemes = {
  Sunny: {
    background: <SunnyBackground />,
    src: sunny,
    themeColor: "#0095FF",
    generalColor: "#FFFFFF",
    clothes: {
      male: maleSunny,
      female: femaleSunny,
    },
  },
  Night: {
    background: <NightBackground />,
    src: night,
    themeColor: "#731DAE",
    generalColor: "#FFFFFF",
    clothes: {
      male: maleSunny,
      female: femaleSunny,
    },
  },
  Rain: {
    background: <RainyBackground />,
    src: rainy,
    themeColor: "#20002B",
    generalColor: "#FFFFFF",
    clothes: {
      male: maleRainny,
      female: femaleRainny,
    },
  },
  Clouds: {
    background: <CloudyBackground />,
    src: cloud,
    themeColor: "#879FDD",
    generalColor: "#231F20",
    clothes: {
      male: maleSunny,
      female: femaleSunny,
    },
  },
  Thunderstorm: {
    background: <ThunderstormBackground />,
    src: thunderstorm,
    themeColor: "#D7DBE6",
    generalColor: "#FFFFFF",
    clothes: {
      male: maleRainny,
      female: femaleRainny,
    },
  },
  Snow: {
    background: <SnowyBackground />,
    src: snowy,
    themeColor: "#9EB3E7",
    generalColor: "#231F20",
    clothes: {
      male: maleSnowy,
      female: femaleSnowy,
    },
  },
};
