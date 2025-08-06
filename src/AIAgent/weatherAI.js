export const weatherAI = async (weatherData) => {
  const prompt = `You are a helpful fashion and safety advisor, you will give me some outfits suggestion based on these following weather data for ${
    weatherData.name
  }, provide a concise reminder and three casual outfit suggestions (one male, one female, one unisex).

    Weather Data:
    - Condition: ${weatherData.weather[0].description}
    - Temperature: ${Math.floor(weatherData.main.temp)}°F
    - Feels Like: ${Math.floor(weatherData.main.feels_like)}°F
    - High: ${Math.floor(weatherData.main.temp_max)}°F
    - Low: ${Math.floor(weatherData.main.temp_min)}°F
    - Wind Speed: ${Math.floor(weatherData.wind.speed)} mph
    - Humidity: ${weatherData.main.humidity}%

    Please provide the response in the exact JSON format requested. The reminder should be a short, friendly tip. The outfits should be 2-3 bullet points each.
  `;

  const outfitsSchema = {
    type: "OBJECT",
    properties: {
      reminder: { type: "STRING" },
      maleOutfit: {
        type: "ARRAY",
        items: { type: "STRING" },
      },
      // FIX: Corrected typo from "femaleOutfits" to "femaleOutfit"
      femaleOutfit: {
        type: "ARRAY",
        items: { type: "STRING" },
      },
      unisexOutfit: {
        // Changed from generalOutfit to be more specific
        type: "ARRAY",
        items: { type: "STRING" },
      },
    },
    required: ["reminder", "maleOutfit", "femaleOutfit", "unisexOutfit"],
  };

  const payload = {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: {
      response_mime_type: "application/json",
      response_schema: outfitsSchema,
    },
  };

  const gemini_api_key = import.meta.env.VITE_GEMINI_API;
  const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${gemini_api_key}`;

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`AI API call failed!`);
    }

    const data = await response.json();
    const jsonString = data.candidates[0].content.parts[0].text;
    return JSON.parse(jsonString);
  } catch (err) {
    console.error("Failed to get AI suggestions:", err);
    // Return a default error object so the app doesn't crash
    return {
      reminder: "Could not get AI suggestion at this time.",
      maleOutfit: ["-"],
      femaleOutfit: ["-"],
      unisexOutfit: ["-"],
    };
  }
};
