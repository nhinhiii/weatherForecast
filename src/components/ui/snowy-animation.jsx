"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion"; // Use the modern import path
import { cn } from "../../lib/utils"; // Assuming you have this utility function

/**
 * This is the main component that creates the snowy scene.
 * It generates a number of snowflakes and renders them.
 */
export const SnowyAnimate = ({ className }) => {
  const [snowflakes, setSnowflakes] = useState([]);

  useEffect(() => {
    // This effect runs once to create the snowflakes
    const generateSnowflakes = () => {
      if (typeof window !== "undefined") {
        const amount = Math.floor(
          (window.innerWidth * window.innerHeight) / 10000
        ); // Create a reasonable number of flakes
        const newSnowflakes = [];

        for (let i = 0; i < amount; i++) {
          newSnowflakes.push({
            id: i,
            // Start at a random horizontal position
            initialX: `${Math.random() * 100}%`,
            // Give each flake a different size, duration, and delay for a natural look
            size: Math.random() * 4 + 2, // size between 2px and 6px
            duration: Math.random() * 5 + 8, // duration between 8s and 13s
            delay: Math.random() * 5,
            repeatDelay: Math.random() * 4,
          });
        }
        setSnowflakes(newSnowflakes);
      }
    };

    generateSnowflakes();
    window.addEventListener("resize", generateSnowflakes);
    return () => window.removeEventListener("resize", generateSnowflakes);
  }, []);

  return (
    <div
      className={cn(
        "absolute inset-0 z-0 h-full w-full bg-snowy overflow-hidden",
        className
      )}
    >
      {snowflakes.map((flake) => (
        <FallingSnowflake key={flake.id} flakeOptions={flake} />
      ))}
    </div>
  );
};

const FallingSnowflake = ({ flakeOptions = {} }) => {
  return (
    <motion.div
      initial={{
        y: "-20px",
      }}
      animate={{
        y: "100vh",
      }}
      transition={{
        duration: flakeOptions.duration,
        repeat: Infinity,
        repeatType: "loop",
        ease: "linear",
        delay: flakeOptions.delay,
        repeatDelay: flakeOptions.repeatDelay,
      }}
      style={{
        left: flakeOptions.initialX,
        width: `${flakeOptions.size}px`,
        height: `${flakeOptions.size}px`,
      }}
      className="absolute rounded-full bg-white shadow-snow"
    />
  );
};
