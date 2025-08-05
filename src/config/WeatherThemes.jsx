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
import normalClothes from "../assets/Icons/normalClothes.png";
import umbrella from "../assets/Icons/umbrella.png";
import winterClothes from "../assets/Icons/winterClothes.png";

export const weatherThemes = {
  Sunny: {
    background: <SunnyBackground />,
    src: sunny,
    themeColor: "#0095FF",
    generalColor: "#FFFFFF",
    clothes: normalClothes,
  },
  Night: {
    background: <NightBackground />,
    src: night,
    themeColor: "#8522C9",
    generalColor: "#FFFFFF",
    clothes: normalClothes,
  },
  Rain: {
    background: <RainyBackground />,
    src: rainy,
    themeColor: "#20002B",
    generalColor: "#FFFFFF",
    clothes: umbrella,
  },
  Clouds: {
    background: <CloudyBackground />,
    src: cloud,
    themeColor: "#879FDD",
    generalColor: "#231F20",
    clothes: normalClothes,
  },
  Thunderstorm: {
    background: <ThunderstormBackground />,
    src: thunderstorm,
    themeColor: "#D7DBE6",
    generalColor: "#FFFFFF",
    clothes: umbrella,
  },
  Snow: {
    background: <SnowyBackground />,
    src: snowy,
    themeColor: "#9EB3E7",
    generalColor: "#231F20",
    clothes: winterClothes,
  },
};
