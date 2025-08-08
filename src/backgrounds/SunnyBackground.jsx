import React from "react";
import { Spotlight } from "../components/ui/Spotlight";

const SunnyBackground = () => {
  return (
    <div className="min-h-screen overflow-x-hidden bg-sunny">
      <Spotlight
        className="left-30 top-5 md:left-72 md:top-28 h-[100vh] w-[50vw] absolute"
        fill="#FFBC4C"
      />
      <Spotlight
        className="-top-38 -left-10 md:-left-32 md:-top-20 absolute h-[90vh] w-[50vw]"
        fill="#FF9B45"
      />
    </div>
  );
};

export default SunnyBackground;
