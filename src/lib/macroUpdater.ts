import { prisma } from "./prisma.ts";

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
 * Fetch US 10Y Treasury Yield from Alpha Vantage.
 */
async function fetchUS10Y(): Promise<MacroDataPoint | null> {
  const apiKey = process.env.ALPHAVANTAGE_API_KEY;
  if (!apiKey) throw new Error("ALPHAVANTAGE_API_KEY is missing");

  const url = `https://www.alphavantage.co/query?function=TREASURY_YIELD&interval=daily&maturity=10year&apikey=${apiKey}`;
  const response = await fetch(url);
  const data = await response.json();

  if (data.Note || data.Information) {
    console.warn(`[MACRO-UPDATER] Alpha Vantage Rate Limit/Info for US10Y: ${data.Note || data.Information}`);
    return null;
  }

  // Alpha Vantage Treasury Yield returns data in "data" array
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
 * Fetch USD/SEK and EUR/SEK from Alpha Vantage.
 */
async function fetchFX(): Promise<MacroDataPoint[]> {
  const apiKey = process.env.ALPHAVANTAGE_API_KEY;
  if (!apiKey) throw new Error("ALPHAVANTAGE_API_KEY is missing");

  const results: MacroDataPoint[] = [];

  const currencies = [
    { from: "USD", to: "SEK", key: "USDSEK" },
    { from: "EUR", to: "SEK", key: "EURSEK" }
  ];

  for (const cur of currencies) {
    const url = `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${cur.from}&to_currency=${cur.to}&apikey=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.Note || data.Information) {
      console.warn(`[MACRO-UPDATER] Alpha Vantage Rate Limit/Info for ${cur.key}: ${data.Note || data.Information}`);
      continue;
    }

    const rate = data["Realtime Currency Exchange Rate"]?.["5. Exchange Rate"];
    if (rate) {
      const value = parseFloat(rate);
      if (!isNaN(value)) {
        results.push({ key: cur.key, value, source: "alphavantage" });
      }
    }
    
    // Tiny delay between currency pairs to be safe
    await delay(1000);
  }

  return results;
}

/**
 * Fetch OMX30 from RapidAPI (Yahoo Finance).
 */
async function fetchOMX(): Promise<MacroDataPoint | null> {
  const apiKey = process.env.RAPIDAPI_KEY;
  if (!apiKey) throw new Error("RAPIDAPI_KEY is missing");

  const url = `https://yahoo-finance-real-time1.p.rapidapi.com/stock/v2/get-options?symbol=%5EOMX`;
  const response = await fetch(url, {
    headers: {
      "x-rapidapi-host": "yahoo-finance-real-time1.p.rapidapi.com",
      "x-rapidapi-key": apiKey
    }
  });

  if (response.status === 403) {
    console.warn(`[MACRO-UPDATER] RapidAPI Forbidden (403) for OMX30. Check subscription to yahoo-finance-real-time1.`);
    return null;
  }

  const data = await response.json();

  if (data.message) {
    console.warn(`[MACRO-UPDATER] RapidAPI Info for OMX30: ${data.message}`);
    return null;
  }

  const result = data.optionChain?.result?.[0]?.quote;
  if (result && result.regularMarketPrice) {
    return { key: "OMX30", value: parseFloat(result.regularMarketPrice), source: "rapidapi-3b" };
  }
  return null;
}

/**
 * Fetch Swedish 10Y Yield from RapidAPI (Yahoo Finance).
 */
async function fetchSE10Y(): Promise<MacroDataPoint | null> {
  const apiKey = process.env.RAPIDAPI_KEY;
  if (!apiKey) throw new Error("RAPIDAPI_KEY is missing");

  const url = `https://yahoo-finance-real-time1.p.rapidapi.com/stock/v2/get-options?symbol=SE10Y-SE.ST`;
  const response = await fetch(url, {
    headers: {
      "x-rapidapi-host": "yahoo-finance-real-time1.p.rapidapi.com",
      "x-rapidapi-key": apiKey
    }
  });

  if (response.status === 403) {
    console.warn(`[MACRO-UPDATER] RapidAPI Forbidden (403) for SE10Y. Check subscription to yahoo-finance-real-time1.`);
    return null;
  }

  const data = await response.json();

  if (data.message) {
    console.warn(`[MACRO-UPDATER] RapidAPI Info for SE10Y: ${data.message}`);
    return null;
  }

  const result = data.optionChain?.result?.[0]?.quote;
  if (result && result.regularMarketPrice) {
    return { key: "SE10Y", value: parseFloat(result.regularMarketPrice), source: "rapidapi-3b" };
  }
  return null;
}

/**
 * Fetch US Inflation from Alpha Vantage.
 */
async function fetchInflation(): Promise<MacroDataPoint | null> {
  const apiKey = process.env.ALPHAVANTAGE_API_KEY;
  if (!apiKey) throw new Error("ALPHAVANTAGE_API_KEY is missing");

  const url = `https://www.alphavantage.co/query?function=INFLATION&apikey=${apiKey}`;
  const response = await fetch(url);
  const data = await response.json();

  if (data.Note || data.Information) {
    console.warn(`[MACRO-UPDATER] Alpha Vantage Rate Limit/Info for Inflation: ${data.Note || data.Information}`);
    return null;
  }

  if (data.data && data.data.length > 0) {
    const latest = data.data[0];
    const value = parseFloat(latest.value);
    if (!isNaN(value)) {
      return { key: "Inflation", value, source: "alphavantage" };
    }
  }
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
 * Main update function. Sequential to respect rate limits.
 */
export async function updateAllMacroData() {
  const tasks: { name: string, fn: () => Promise<any> }[] = [
    { name: "US10Y", fn: fetchUS10Y },
    { name: "FX Rates", fn: fetchFX },
    { name: "OMX30", fn: fetchOMX },
    { name: "SE10Y", fn: fetchSE10Y },
    { name: "Inflation", fn: fetchInflation }
  ];
  
  let updatedCount = 0;
  let failedCount = 0;

  for (const task of tasks) {
    console.log(`[MACRO-UPDATER] Starting task: ${task.name}...`);
    const result = await safeFetch(task.fn, task.name);
    
    if (result) {
      const points = Array.isArray(result) ? result : [result];
      for (const point of points) {
        try {
          await upsertMacroData(point);
          updatedCount++;
          console.log(`[MACRO-UPDATER] Successfully updated ${point.key}: ${point.value}`);
        } catch (err: any) {
          console.error(`[MACRO-UPDATER] Failed to upsert ${point.key}:`, err.message);
          failedCount++;
        }
      }
    } else {
      failedCount++;
    }

    // Delay between main tasks to avoid hitting Alpha Vantage / RapidAPI limits
    // Alpha Vantage free tier is 5 calls per minute.
    await delay(3000); 
  }

  return {
    success: true,
    updated: updatedCount,
    failed: failedCount
  };
}
