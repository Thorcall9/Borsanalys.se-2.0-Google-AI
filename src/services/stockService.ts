
export interface RapidAPIQuote {
  symbol: string;
  regularMarketPrice: number;
  regularMarketChange: number;
  regularMarketChangePercent: number;
  regularMarketTime: number;
  marketCap: number;
  trailingPE: number;
  dividendYield: number;
  displayName?: string;
  longName?: string;
  shortName?: string;
  currency: string;
}

export const fetchWithCache = async (ticker: string): Promise<RapidAPIQuote | null> => {
  const cacheKey = `stock_data_${ticker}`;
  const cacheTimeKey = `stock_data_time_${ticker}`;
  const now = Date.now();
  const ONE_DAY = 24 * 60 * 60 * 1000; // 24 timmar i millisekunder

  const lastFetch = localStorage.getItem(cacheTimeKey);
  const cachedData = localStorage.getItem(cacheKey);

  // KOLL: Behöver vi hämta ny data?
  if (cachedData && lastFetch && (now - parseInt(lastFetch) < ONE_DAY)) {
    console.log(`Använder sparad data för ${ticker} (sparar en request!)`);
    try {
      return JSON.parse(cachedData);
    } catch (e) {
      console.error("Error parsing cached data", e);
    }
  }

  // Om inte -> Gör det riktiga API-anropet via vår server-proxy
  const apiUrl = `/api/stocks/quote/${ticker}`;
  console.log(`Hämtar ny data från RapidAPI för ${ticker} via ${apiUrl}...`);
  try {
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      console.error(`Server proxy error for ${ticker}: ${response.status} ${response.statusText}`);
      throw new Error(`Server proxy error: ${response.status}`);
    }

    const result = await response.json();
    
    // RapidAPI format: result.body[0]
    if (result && result.body && result.body.length > 0) {
      const data = result.body[0];

      // SPARA i blocket (LocalStorage)
      localStorage.setItem(cacheKey, JSON.stringify(data));
      localStorage.setItem(cacheTimeKey, now.toString());

      return data;
    }
    
    return null;
  } catch (error) {
    console.error("API-fel:", error);
    // Fallback till gammal data om den finns
    return cachedData ? JSON.parse(cachedData) : null;
  }
};
