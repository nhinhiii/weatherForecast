import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import chatBot from "../assets/Icons/chatBot.png";
import { weatherAI } from "./weatherAI";
import { cn } from "../lib/utils";

const AIAgentDisplay = ({ weatherData, currentTheme, className }) => {
  const [suggestions, setSuggestions] = useState(null);
  const [gender, setGender] = useState("male");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (weatherData) {
      setIsLoading(true);
      weatherAI(weatherData).then((data) => {
        setSuggestions(data);
        setIsLoading(false);
      });
    }
  }, [weatherData]);

  let clothesImageSrc = null;
  if (currentTheme && currentTheme.clothes) {
    if (gender === "male") {
      clothesImageSrc = currentTheme.clothes.male;
    } else if (gender === "female") {
      clothesImageSrc = currentTheme.clothes.female;
    }
  }

  return (
    <div
      className={cn(
        "flex flex-col items-end gap-4 text-white w-full max-w-sm",
        className
      )}
    >
      <div className="flex items-center gap-4">
        <AnimatePresence>
          {suggestions && (
            <motion.p
              key={suggestions.reminder}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="underline underline-offset-4 text-sm font-medium"
              style={{ color: currentTheme.generalColor || "white" }}
            >
              {suggestions.reminder}
            </motion.p>
          )}
        </AnimatePresence>
        <img
          src={chatBot}
          alt="AI Agent Icon"
          className="h-16 w-16 rounded-full border-4 border-white shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-cyan-300/50"
        />
      </div>

      <div className="p-6 bg-[rgba(255,248,248,0.51)] rounded-2xl text-black shadow-xl w-full">
        <h3 className="text-center text-2xl font-bold mb-4">
          Suggestion Outfit
        </h3>

        <div className="flex justify-center gap-2 mb-4">
          <button
            onClick={() => setGender("male")}
            className={`px-4 py-1 rounded-full text-sm font-semibold transition-colors cursor-pointer ${
              gender === "male"
                ? "bg-blue-500 text-white"
                : "bg-white/50 hover:bg-white/80"
            }`}
          >
            Male
          </button>
          <button
            onClick={() => setGender("female")}
            className={`px-4 py-1 rounded-full text-sm font-semibold transition-colors cursor-pointer ${
              gender === "female"
                ? "bg-pink-500 text-white"
                : "bg-white/50 hover:bg-white/80"
            }`}
          >
            Female
          </button>
          <button
            onClick={() => setGender("unisex")}
            className={`px-4 py-1 rounded-full text-sm font-semibold transition-colors cursor-pointer ${
              gender === "unisex"
                ? "bg-gray-500 text-white"
                : "bg-white/50 hover:bg-white/80"
            }`}
          >
            Unisex
          </button>
        </div>

        <div className="flex items-center justify-center gap-4 min-h-[150px]">
          {isLoading ? (
            <p className="w-full text-center">Getting suggestions...</p>
          ) : (
            suggestions &&
            (gender === "unisex" ? (
              <div className="w-full">
                <ul className="list-disc list-inside space-y-2 text-sm text-start ml-8">
                  {suggestions.unisexOutfit.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <>
                <div className="flex-1 ml-4">
                  <ul className="list-disc list-inside space-y-2 text-sm">
                    {(gender === "male"
                      ? suggestions.maleOutfit
                      : suggestions.femaleOutfit
                    ).map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="w-1/3">
                  {clothesImageSrc && (
                    <img
                      src={clothesImageSrc}
                      alt={`${gender} outfit suggestion`}
                      className="h-40 w-320"
                    />
                  )}
                </div>
              </>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AIAgentDisplay;
