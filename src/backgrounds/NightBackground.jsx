import React, { useState, useEffect } from "react";

const NightBackground = () => {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    createStars();

    const resizePage = () => {
      createStars();
    };

    window.addEventListener("resize", resizePage);
    return () => window.removeEventListener("resize", resizePage);
  }, []);

  const createStars = () => {
    //create number of stars add in the arr -> display
    const numStar = Math.floor((window.innerWidth * window.innerHeight) / 8000);
    const newStars = [];

    //star: size, position x and y, opacity, animation
    for (let i = 0; i < numStar; i++) {
      newStars.push({
        id: i,
        size: Math.random() * 2 + 1,
        x: Math.random() * 100,
        y: Math.random() * 100,
        opacity: Math.random() * 0.5 + 0.5,
        animationDuration: Math.random() * 1 + 2,
      });
    }

    setStars(newStars);
  };
  //create random

  return (
    <div className="min-h-screen overflow-x-hidden bg-night">
      <div className="absolute inset-0 pointer-events-none">
        {stars.map((star) => (
          <div
            key={star.id}
            className="star animate-pulse"
            style={{
              width: star.size + "px",
              height: star.size + "px",
              left: star.x + "%",
              top: star.y + "%",
              opacity: star.opacity,
              animationDuration: star.animationDuration + "s",
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default NightBackground;
