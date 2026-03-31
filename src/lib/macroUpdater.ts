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
 * Fetch OMX30 from financeapis.dev.
 * Note: Assuming a generic structure as financeapis.dev is a placeholder/generic name.
 */
async function fetchOMX(): Promise<MacroDataPoint | null> {
  const apiKey = process.env.FINANCE_API_KEY;
  if (!apiKey) throw new Error("FINANCE_API_KEY is missing");

  // Assuming financeapis.dev provides a quote endpoint
  const url = `https://api.financeapis.dev/v1/quote?symbol=^OMX&apikey=${apiKey}`;
  const response = await fetch(url);
  const data = await response.json();

  // Assuming standard quote response
  const price = data.price || data.regularMarketPrice || data.quoteResponse?.result?.[0]?.regularMarketPrice;
  if (price) {
    return { key: "OMX30", value: parseFloat(price), source: "financeapi" };
  }
  return null;
}

/**
 * Fetch Swedish 10Y Yield from financeapis.dev.
 */
async function fetchSE10Y(): Promise<MacroDataPoint | null> {
  const apiKey = process.env.FINANCE_API_KEY;
  if (!apiKey) throw new Error("FINANCE_API_KEY is missing");

  const url = `https://api.financeapis.dev/v1/yield?symbol=SE10Y&apikey=${apiKey}`;
  const response = await fetch(url);
  const data = await response.json();

  const yieldValue = data.value || data.yield || data.quoteResponse?.result?.[0]?.regularMarketPrice;
  if (yieldValue) {
    return { key: "SE10Y", value: parseFloat(yieldValue), source: "financeapi" };
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
    () => safeFetch(fetchSE10Y, "SE10Y")
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
