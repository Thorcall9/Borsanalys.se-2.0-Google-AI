import { prisma } from "./prisma.ts";
import { GoogleGenerativeAI } from "@google/generative-ai";

interface MacroDataPoint {
  key: string;
  value: number;
  source: string;
}

/**
 * Helper function to wait for a specified duration.
 */
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Fetch macro data via Gemini AI (Google Search grounding).
 * This is now the PRIMARY source for all macro indicators.
 */
async function fetchMacroViaAI(): Promise<MacroDataPoint[]> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("GEMINI_API_KEY is missing");

  const genAI = new GoogleGenerativeAI(apiKey);
  // Using gemini-2.5-flash with Google Search grounding
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    tools: [
      {
        googleSearch: {},
      } as any
    ]
  });

  const prompt = `Du är en finansiell data-assistent. Din uppgift är att hämta de absolut senaste och mest korrekta värdena för följande makroindikatorer. 
Använd sökning om det behövs för att hitta dagsaktuella siffor (datum: ${new Date().toLocaleDateString('sv-SE')}).

Indikatorer som behövs:
1. US10Y (US 10-Year Treasury Yield i %)
2. SE10Y (Svensk 10-årig statsobligationsränta i %)
3. USDSEK (Växelkurs USD till SEK)
4. EURSEK (Växelkurs EUR till SEK)
5. OMX30 (Aktuellt indexvärde för OMX Stockholm 30)
6. Inflation (Senaste KPI-inflationstakten i USA i %)

Svara EXAKT i detta JSON-format:
{
  "US10Y": number,
  "SE10Y": number,
  "USDSEK": number,
  "EURSEK": number,
  "OMX30": number,
  "Inflation": number
}`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().trim();
    
    // Extract JSON using robust regex to handle any pre-amble/post-amble explanations
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Kunde inte hitta något JSON-objekt i Gemini-svaret.");
    }
    
    const data = JSON.parse(jsonMatch[0]);
    const points: MacroDataPoint[] = [];

    const mapping: Record<string, string> = {
      "US10Y": "US10Y",
      "SE10Y": "SE10Y",
      "USDSEK": "USDSEK",
      "EURSEK": "EURSEK",
      "OMX30": "OMX30",
      "Inflation": "Inflation"
    };

    for (const [jsonKey, dbKey] of Object.entries(mapping)) {
      if (typeof data[jsonKey] === 'number') {
        points.push({
          key: dbKey,
          value: data[jsonKey],
          source: "gemini-ai"
        });
      }
    }

    return points;
  } catch (error: any) {
    console.error("[MACRO-AI] Error fetching via Gemini:", error.message);
    return [];
  }
}

/**
 * Helper function to safely execute a fetch function and log errors.
 */
async function safeFetch<T>(fn: () => Promise<T>, name: string): Promise<T | null> {
  try {
    console.log(`[MACRO-UPDATER] Fetching ${name}...`);
    return await fn();
  } catch (error: any) {
    console.error(`[MACRO-UPDATER] Error fetching ${name}:`, error.message);
    return null;
  }
}

/**
 * Fetch US 10Y Treasury Yield from Alpha Vantage. (FALLBACK)
 */
async function fetchUS10Y(): Promise<MacroDataPoint | null> {
  const apiKey = process.env.ALPHAVANTAGE_API_KEY;
  if (!apiKey) return null;

  const url = `https://www.alphavantage.co/query?function=TREASURY_YIELD&interval=daily&maturity=10year&apikey=${apiKey}`;
  const response = await fetch(url);
  const data = await response.json();

  if (data.Note || data.Information) return null;

  if (data.data && data.data.length > 0) {
    const latest = data.data[0];
    const value = parseFloat(latest.value);
    if (!isNaN(value)) {
      return { key: "US10Y", value, source: "alphavantage" };
    }
  }
  return null;
}

/**
 * Fetch USD/SEK and EUR/SEK from Alpha Vantage. (FALLBACK)
 */
async function fetchFX(): Promise<MacroDataPoint[]> {
  const apiKey = process.env.ALPHAVANTAGE_API_KEY;
  if (!apiKey) return [];

  const results: MacroDataPoint[] = [];
  const currencies = [
    { from: "USD", to: "SEK", key: "USDSEK" },
    { from: "EUR", to: "SEK", key: "EURSEK" }
  ];

  for (const cur of currencies) {
    try {
      const url = `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${cur.from}&to_currency=${cur.to}&apikey=${apiKey}`;
      const response = await fetch(url);
      const data = await response.json();
      const rate = data["Realtime Currency Exchange Rate"]?.["5. Exchange Rate"];
      if (rate) {
        const value = parseFloat(rate);
        if (!isNaN(value)) {
          results.push({ key: cur.key, value, source: "alphavantage" });
        }
      }
      await delay(1000);
    } catch (e) { /* ignore fallback errors */ }
  }
  return results;
}

/**
 * Fetch OMX30 from RapidAPI. (FALLBACK)
 */
async function fetchOMX(): Promise<MacroDataPoint | null> {
  const apiKey = process.env.RAPIDAPI_KEY;
  if (!apiKey) return null;

  try {
    const url = `https://yahoo-finance-real-time1.p.rapidapi.com/stock/v2/get-options?symbol=%5EOMX`;
    const response = await fetch(url, {
      headers: {
        "x-rapidapi-host": "yahoo-finance-real-time1.p.rapidapi.com",
        "x-rapidapi-key": apiKey
      }
    });
    const data = await response.json();
    const result = data.optionChain?.result?.[0]?.quote;
    if (result && result.regularMarketPrice) {
      return { key: "OMX30", value: parseFloat(result.regularMarketPrice), source: "rapidapi" };
    }
  } catch (e) { /* ignore */ }
  return null;
}

/**
 * Upsert macro data into the database and calculate trend.
 */
async function upsertMacroData(data: MacroDataPoint) {
  const previous = await prisma.macroMarketData.findUnique({
    where: { key: data.key }
  });

  let trend = "flat";
  if (previous) {
    if (data.value > previous.value) trend = "up";
    else if (data.value < previous.value) trend = "down";
  }

  return await prisma.macroMarketData.upsert({
    where: { key: data.key },
    update: {
      value: data.value,
      source: data.source,
      trend: trend,
      updatedAt: new Date()
    },
    create: {
      key: data.key,
      value: data.value,
      source: data.source,
      trend: trend
    }
  });
}

/**
 * Main update function. 
 * Updated to prioritize Gemini AI and enforce once-a-day updates.
 */
export async function updateAllMacroData() {
  // Check if we already updated today
  const lastUpdate = await prisma.macroMarketData.findFirst({
    orderBy: { updatedAt: 'desc' }
  });

  if (lastUpdate) {
    const lastUpdateDate = new Date(lastUpdate.updatedAt).toDateString();
    const today = new Date().toDateString();
    
    if (lastUpdateDate === today) {
      console.log("[MACRO-UPDATER] Already updated today. Skipping to avoid overhead.");
      return { success: true, message: "Already updated today", skip: true };
    }
  }

  console.log("[MACRO-UPDATER] Starting daily macro update via Gemini AI...");
  
  // 1. Try Gemini AI (Primary)
  let points = await fetchMacroViaAI();
  let updatedCount = 0;

  if (points.length > 0) {
    for (const point of points) {
      await upsertMacroData(point);
      updatedCount++;
    }
    console.log(`[MACRO-UPDATER] Successfully updated ${updatedCount} indicators via Gemini.`);
  } else {
    // 2. Fallback to traditional APIs if AI fails
    console.warn("[MACRO-UPDATER] Gemini fetch failed, falling back to legacy APIs...");
    
    // Fallback task 1: US10Y
    const resUS10Y = await safeFetch<MacroDataPoint | null>(fetchUS10Y, "US10Y");
    if (resUS10Y) {
      await upsertMacroData(resUS10Y);
      updatedCount++;
    }

    // Fallback task 2: FX
    const resFX = await safeFetch<MacroDataPoint[]>(fetchFX, "FX");
    if (resFX && resFX.length > 0) {
      for (const p of resFX) {
        await upsertMacroData(p);
        updatedCount++;
      }
    }

    // Fallback task 3: OMX30
    const resOMX = await safeFetch<MacroDataPoint | null>(fetchOMX, "OMX30");
    if (resOMX) {
      await upsertMacroData(resOMX);
      updatedCount++;
    }
  }

  return {
    success: true,
    updated: updatedCount,
    timestamp: new Date().toISOString()
  };
}

