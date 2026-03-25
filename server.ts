import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import yahooFinance from "yahoo-finance2";
import { query } from "./src/lib/db.js";
import { sendEmail } from "./src/lib/email.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure yahoo-finance2
// (Removing setGlobalConfig due to type issues in this version)

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  console.log(`[SERVER] Initializing server on port ${PORT}...`);

  // API routes FIRST
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Newsletter Signup (Neon + Resend)
  app.post("/api/newsletter/signup", async (req, res) => {
    const { email } = req.body;

    if (!email || !email.includes('@')) {
      return res.status(400).json({ error: "Ogiltig e-postadress" });
    }

    try {
      // 1. Save to Neon (PostgreSQL)
      // Note: This assumes a 'subscribers' table exists.
      // You can create it in the Neon console: 
      // CREATE TABLE IF NOT EXISTS subscribers (id SERIAL PRIMARY KEY, email TEXT UNIQUE, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);
      await query('INSERT INTO subscribers (email) VALUES ($1) ON CONFLICT (email) DO NOTHING', [email]);

      // 2. Send Welcome Email (Resend)
      await sendEmail({
        to: email,
        subject: 'Välkommen till Börsanalys.se!',
        html: `
          <h1>Välkommen!</h1>
          <p>Tack för att du har anmält dig till vårt nyhetsbrev.</p>
          <p>Vi kommer att skicka dig de senaste analyserna och marknadsuppdateringarna.</p>
          <br/>
          <p>Med vänliga hälsningar,</p>
          <p>Teamet på Börsanalys.se</p>
        `
      });

      res.json({ success: true, message: "Tack för din anmälan!" });
    } catch (error: any) {
      console.error('Newsletter Signup Error:', error);
      res.status(500).json({ error: "Kunde inte slutföra anmälan. Kontrollera att DATABASE_URL och RESEND_API_KEY är konfigurerade." });
    }
  });

  // Admin: List Subscribers (Neon)
  app.get("/api/admin/subscribers", async (req, res) => {
    try {
      const result = await query('SELECT * FROM subscribers ORDER BY created_at DESC');
      res.json(result.rows);
    } catch (error: any) {
      console.error('Admin Fetch Error:', error);
      res.status(500).json({ error: "Kunde inte hämta prenumeranter. Kontrollera att tabellen 'subscribers' finns i Neon." });
    }
  });

  app.get("/api/stocks/:ticker", async (req, res) => {
    const { ticker } = req.params;
    console.log(`[API] Request for ticker: ${ticker}`);
    
    if (!ticker) {
      return res.status(400).json({ error: "Ticker is required" });
    }

    try {
      // Fetch multiple modules for comprehensive data
      console.log(`[API] Fetching quoteSummary for: ${ticker}`);
      const summary = await yahooFinance.quoteSummary(ticker, {
        modules: ["price", "summaryDetail", "defaultKeyStatistics", "financialData", "earnings"]
      }) as any;
      
      if (!summary) {
        console.warn(`[API] No summary found for ticker: ${ticker}`);
        return res.status(404).json({ error: "Stock not found" });
      }

      const { price, summaryDetail, defaultKeyStatistics, financialData, earnings } = summary;
      
      const priceVal = price?.regularMarketPrice || financialData?.currentPrice;
      
      // Try to get yield from various fields, preferring summaryDetail.dividendYield
      // which is usually the most reliable decimal value.
      let rawYield = summaryDetail?.dividendYield ?? 
                     summaryDetail?.trailingAnnualDividendYield ?? 
                     summaryDetail?.yield ??
                     defaultKeyStatistics?.yield ?? 
                     defaultKeyStatistics?.dividendYield ??
                     financialData?.dividendYield;

      // If yield is missing but we have rate and price, calculate it
      const dividendRate = summaryDetail?.dividendRate || summaryDetail?.trailingAnnualDividendRate;
      if ((rawYield === undefined || rawYield === null) && dividendRate && priceVal) {
        rawYield = dividendRate / priceVal;
        console.log(`[API] Calculated yield for ${ticker}: ${rawYield} (${dividendRate} / ${priceVal})`);
      }

      // Normalize yield: Yahoo Finance sometimes returns it as a percentage (e.g. 1.8)
      // and sometimes as a decimal (e.g. 0.018). We want decimal.
      // Most yields are < 20% (0.2). If it's > 1, it's almost certainly a percentage.
      let dividendYield = rawYield;
      if (typeof dividendYield === 'number' && dividendYield > 1) {
        dividendYield = dividendYield / 100;
      }

      console.log(`[API] Yield for ${ticker}:`, {
        rawYield,
        dividendRate: summaryDetail?.dividendRate,
        final: dividendYield
      });

      // Normalize changePercent: quoteSummary's price module returns it as a decimal (e.g. 0.01 for 1%)
      // while quote() returns it as a percentage (e.g. 1.0 for 1%).
      // We want percentage for consistency in the frontend.
      let changePercent = price?.regularMarketChangePercent;
      if (typeof changePercent === 'number') {
        changePercent = changePercent * 100;
      }

      res.json({
        price: price?.regularMarketPrice || financialData?.currentPrice,
        currency: price?.currency,
        change: price?.regularMarketChange,
        changePercent: changePercent,
        pe: summaryDetail?.trailingPE || summaryDetail?.forwardPE || defaultKeyStatistics?.trailingPE,
        yield: dividendYield,
        marketCap: summaryDetail?.marketCap || price?.marketCap,
        name: price?.longName || price?.shortName,
        fiftyTwoWeekHigh: summaryDetail?.fiftyTwoWeekHigh,
        fiftyTwoWeekLow: summaryDetail?.fiftyTwoWeekLow,
        volume: summaryDetail?.averageVolume || price?.regularMarketVolume,
        eps: defaultKeyStatistics?.trailingEps,
        currentPrice: financialData?.currentPrice,
        targetPrice: financialData?.targetMeanPrice,
        yearlyFinancials: earnings?.financialsChart?.yearly || null,
      });
    } catch (error: any) {
      console.error(`[API] Error for ${ticker}:`, error.message);
      
      // Fallback to basic quote if quoteSummary fails
      try {
        console.log(`[API] Fallback to quote for: ${ticker}`);
        const quote = await yahooFinance.quote(ticker) as any;
        if (quote) {
          return res.json({
            price: quote.regularMarketPrice,
            currency: quote.currency,
            change: quote.regularMarketChange,
            changePercent: quote.regularMarketChangePercent,
            pe: quote.trailingPE || quote.forwardPE,
            yield: (quote.dividendYield > 1 ? quote.dividendYield / 100 : quote.dividendYield) || 
                   (quote.trailingAnnualDividendYield > 1 ? quote.trailingAnnualDividendYield / 100 : quote.trailingAnnualDividendYield) || 
                   (quote.yield > 1 ? quote.yield / 100 : quote.yield),
            marketCap: quote.marketCap,
            name: quote.longName || quote.shortName,
            fiftyTwoWeekHigh: quote.fiftyTwoWeekHigh,
            fiftyTwoWeekLow: quote.fiftyTwoWeekLow,
            volume: quote.regularMarketVolume,
            eps: quote.trailingEps,
          });
        }
      } catch (fallbackError: any) {
        console.error(`[API] Fallback failed for ${ticker}:`, fallbackError.message);
      }

      const status = error.name === 'YahooFinanceError' ? 404 : 500;
      res.status(status).json({ 
        error: error.message || "Failed to fetch stock data",
        ticker 
      });
    }
  });

  // GitHub OAuth Routes
  app.get("/api/auth/github/url", (req, res) => {
    const clientId = process.env.GITHUB_CLIENT_ID;
    if (!clientId) {
      return res.status(500).json({ error: "GitHub Client ID not configured" });
    }
    const redirectUri = `${process.env.APP_URL}/auth/github/callback`;
    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      scope: "read:user user:email",
    });
    const authUrl = `https://github.com/login/oauth/authorize?${params.toString()}`;
    res.json({ url: authUrl });
  });

  app.get("/auth/github/callback", async (req, res) => {
    const { code } = req.query;
    if (!code) {
      return res.status(400).send("No code provided");
    }

    try {
      const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code,
          redirect_uri: `${process.env.APP_URL}/auth/github/callback`,
        }),
      });

      const tokenData = await tokenResponse.json() as any;
      if (tokenData.error) {
        throw new Error(tokenData.error_description || tokenData.error);
      }

      // In a real app, you'd store this token in a session or database.
      // For this demo, we'll send it back to the client via postMessage.
      res.send(`
        <html>
          <body>
            <script>
              if (window.opener) {
                window.opener.postMessage({ 
                  type: 'GITHUB_AUTH_SUCCESS', 
                  token: '${tokenData.access_token}' 
                }, '*');
                window.close();
              } else {
                window.location.href = '/profil';
              }
            </script>
            <p>GitHub-koppling lyckades! Fönstret stängs automatiskt.</p>
          </body>
        </html>
      `);
    } catch (error: any) {
      console.error("GitHub OAuth error:", error);
      res.status(500).send(`Authentication failed: ${error.message}`);
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
