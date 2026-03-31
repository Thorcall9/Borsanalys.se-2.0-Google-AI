import { VercelRequest, VercelResponse } from '@vercel/node';

let cachedFgiData: any = null;
let lastFgiFetchTime: number = 0;
const FGI_CACHE_TTL = 24 * 60 * 60 * 1000; // 24 timmar

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    // 1. Kontrollera om vi har cache
    if (cachedFgiData && (Date.now() - lastFgiFetchTime < FGI_CACHE_TTL)) {
      console.log("Serving cached FGI data");
      return res.status(200).json(cachedFgiData);
    }

    // 2. Hämta API-nyckeln från miljön
    const apiKey = process.env.RAPIDAPI_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "RAPIDAPI_KEY is not set" });
    }

    // 3. Hämta FGI från RapidAPI
    const response = await fetch("https://fear-and-greed-index.p.rapidapi.com/v1/fgi", {
      method: "GET",
      headers: {
        "x-rapidapi-host": "fear-and-greed-index.p.rapidapi.com",
        "x-rapidapi-key": apiKey
      }
    });

    if (!response.ok) {
      if (cachedFgiData) return res.status(200).json(cachedFgiData); // fallback
      throw new Error(`RapidAPI error ${response.status}`);
    }

    const data = await response.json();

    // 4. Uppdatera cache
    cachedFgiData = data;
    lastFgiFetchTime = Date.now();

    return res.status(200).json(data);
  } catch (err: any) {
    console.error("[FGI API]", err.message);
    if (cachedFgiData) return res.status(200).json(cachedFgiData); // fallback
    return res.status(500).json({ error: err.message });
  }
}
