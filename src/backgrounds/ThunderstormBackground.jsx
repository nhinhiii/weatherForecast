import React from "react";
import lightning from "../assets/Storms/lightning.png";
import { BackgroundBeamsWithCollision } from "../components/ui/background-beams-with-collision";

const ThunderstormBackground = () => {
  return (
    <BackgroundBeamsWithCollision className="bg-thunderstorm">
      <img
        src={lightning}
        className="size-200 animate-lightning absolute -top-100 left-0 rotate-350"
      />
    </BackgroundBeamsWithCollision>
  );
};

export default ThunderstormBackground;
