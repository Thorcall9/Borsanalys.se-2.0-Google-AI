import { prisma } from "./prisma.ts";

interface MacroDataPoint {
  key: string;
  value: number;
  source: string;
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
 * Fetch US 10Y Treasury Yield from Alpha Vantage.
 */
async function fetchUS10Y(): Promise<MacroDataPoint | null> {
  const apiKey = process.env.ALPHAVANTAGE_API_KEY;
  if (!apiKey) throw new Error("ALPHAVANTAGE_API_KEY is missing");

  const url = `https://www.alphavantage.co/query?function=TREASURY_YIELD&interval=daily&maturity=10year&apikey=${apiKey}`;
  const response = await fetch(url);
  const data = await response.json();

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

    const rate = data["Realtime Currency Exchange Rate"]?.["5. Exchange Rate"];
    if (rate) {
      const value = parseFloat(rate);
      if (!isNaN(value)) {
        results.push({ key: cur.key, value, source: "alphavantage" });
      }
    }
  }

  return results;
}

/**
 * Fetch OMX30 from RapidAPI (Yahoo Finance).
 */
async function fetchOMX(): Promise<MacroDataPoint | null> {
  const apiKey = process.env.RAPIDAPI_KEY;
  if (!apiKey) throw new Error("RAPIDAPI_KEY is missing");

  const url = `https://yh-finance.p.rapidapi.com/market/v2/get-quotes?region=SE&symbols=%5EOMX`;
  const response = await fetch(url, {
    headers: {
      "x-rapidapi-host": "yh-finance.p.rapidapi.com",
      "x-rapidapi-key": apiKey
    }
  });
  const data = await response.json();

  const result = data.quoteResponse?.result?.[0];
  if (result && result.regularMarketPrice) {
    return { key: "OMX30", value: parseFloat(result.regularMarketPrice), source: "rapidapi-yahoo" };
  }
  return null;
}

/**
 * Fetch Swedish 10Y Yield from RapidAPI (Yahoo Finance).
 * Note: SE10Y.ST or similar might be the symbol.
 */
async function fetchSE10Y(): Promise<MacroDataPoint | null> {
  const apiKey = process.env.RAPIDAPI_KEY;
  if (!apiKey) throw new Error("RAPIDAPI_KEY is missing");

  // SE10Y-SE.ST is a common symbol for Swedish 10Y in Yahoo Finance
  const url = `https://yh-finance.p.rapidapi.com/market/v2/get-quotes?region=SE&symbols=SE10Y-SE.ST`;
  const response = await fetch(url, {
    headers: {
      "x-rapidapi-host": "yh-finance.p.rapidapi.com",
      "x-rapidapi-key": apiKey
    }
  });
  const data = await response.json();

  const result = data.quoteResponse?.result?.[0];
  if (result && result.regularMarketPrice) {
    return { key: "SE10Y", value: parseFloat(result.regularMarketPrice), source: "rapidapi-yahoo" };
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
  // 1. Get previous value to calculate trend
  const previous = await prisma.macroMarketData.findUnique({
    where: { key: data.key }
  });

  let trend = "flat";
  if (previous) {
    if (data.value > previous.value) trend = "up";
    else if (data.value < previous.value) trend = "down";
  }

  // 2. Upsert the data
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
 */
export async function updateAllMacroData() {
  const fetchers = [
    () => safeFetch(fetchUS10Y, "US10Y"),
    () => safeFetch(fetchFX, "FX Rates"),
    () => safeFetch(fetchOMX, "OMX30"),
    () => safeFetch(fetchSE10Y, "SE10Y"),
    () => safeFetch(fetchInflation, "Inflation")
  ];

  const results = await Promise.allSettled(fetchers.map(f => f()));
  
  let updatedCount = 0;
  let failedCount = 0;

  const dataPoints: MacroDataPoint[] = [];

  for (const result of results) {
    if (result.status === "fulfilled" && result.value) {
      if (Array.isArray(result.value)) {
        dataPoints.push(...result.value);
      } else {
        dataPoints.push(result.value);
      }
    } else {
      failedCount++;
    }
  }

  // Process all collected data points
  for (const point of dataPoints) {
    try {
      await upsertMacroData(point);
      updatedCount++;
      console.log(`[MACRO-UPDATER] Successfully updated ${point.key}: ${point.value}`);
    } catch (err: any) {
      console.error(`[MACRO-UPDATER] Failed to upsert ${point.key}:`, err.message);
      failedCount++;
    }
  }

  return {
    success: true,
    updated: updatedCount,
    failed: failedCount
  };
}
