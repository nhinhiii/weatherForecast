import React from "react";
import { motion } from "framer-motion";
import cloud1 from "../assets/Clouds/cloud1.png";
import cloud2 from "../assets/Clouds/cloud2.png";
import cloud3 from "../assets/Clouds/cloud3.png";
import cloud4 from "../assets/Clouds/cloud4.png";
import cloud5 from "../assets/Clouds/cloud5.png";

const CloudyBackground = () => {
  const clouds = [
    {
      id: 1,
      src: cloud1,
      initialY: "-5%",
      scale: 0.8,
      duration: 30,
      flipY: true,
    },
    {
      id: 2,
      src: cloud2,
      initialY: "0%",
      scale: 1.2,
      duration: 20,
      flipY: true,
    },
    {
      id: 3,
      src: cloud3,
      initialY: "3%",
      scale: 1,
      duration: 25,
      flipY: true,
    },
    {
      id: 4,
      src: cloud4,
      initialY: "-1%",
      scale: 0.9,
      duration: 18,
      flipY: true,
    },
    {
      id: 5,
      src: cloud5,
      initialY: "65%",
      scale: 1.4,
      duration: 35,
    },
  ];
  return (
    <div className="absolute inset-0 z-10 h-full w-full bg-cloudy overflow-hidden">
      {clouds.map((cloud) => {
        return (
          <motion.img
            key={cloud.id}
            src={cloud.src}
            alt={`${cloud.id}`}
            className={`absolute opacity-60 ${
              cloud.flipY ? "scale-y-[-1]" : ""
            }`}
            style={{
              top: cloud.initialY,
              scale: cloud.scale,
            }}
            initial={{ x: "-100%" }}
            animate={{ x: "100vw" }}
            transition={{
              duration: cloud.duration,
              repeat: Infinity,
              repeatType: "loop",
              ease: "linear",
            }}
          ></motion.img>
        );
      })}
    </div>
  );
};

export default CloudyBackground;
