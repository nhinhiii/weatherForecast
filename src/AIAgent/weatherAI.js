export const weatherAI = async (weatherData) => {
  const prompt = `You are a helpful fashion and safety advisor, you will give me some outfits suggestion based on these following weather data for ${
    weatherData.name
  }, provide a concise reminder and three casual outfit suggestions (one male, one female, unisex).

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

  const outfits = {
    type: "OBJECT",
    properties: {
      reminder: { type: "STRING" },
      maleOutfit: {
        type: "ARRAY",
        items: { type: "STRING" },
      },
      femaleOutfits: {
        type: "ARRAY",
        items: { type: "STRING" },
      },
      generalOutfit: {
        type: "ARRAY",
        items: { type: "STRING" },
      },
    },
    required: ["reminder", "maleOutfit", "femaleOutfit", "generalOutfit"],
  };

  const payload = {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: {
      response_mime_type: "application/json",
      response_schema: outfits,
    },
  };

  const gemimi_api_key = import.meta.env.VITE_GEMINI_API;
  const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${gemimi_api_key}`;

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Check the API. Fail to get data!!!!!`);
    }

    const data = await response.json();

    const jsonString = data.candidates[0].content.parts[0].text;
    return JSON.parse(jsonString);
  } catch (err) {
    console.log("Fail to get data!!!!", err);
    return;
  }
};
