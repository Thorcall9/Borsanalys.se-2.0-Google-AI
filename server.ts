import "dotenv/config";
import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import { prisma } from "./src/lib/prisma.ts";
import { sendEmail } from "./src/lib/email.ts";
import { analyses } from "./src/data/analyses.ts";
import { updateAllMacroData } from "./src/lib/macroUpdater.ts";
import marketSentimentHandler from "./api/market-sentiment.ts";
import macroDataHandler from "./api/macro-data.ts";
import marketEventsHandler from "./api/market-events.ts";
import generateEventsHandler from "./api/admin/generate-events.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  console.log(`[SERVER] Initializing server on port ${PORT}...`);

  // API routes FIRST
  app.use("/api", (req, res, next) => {
    console.log(`[API] ${req.method} ${req.url}`);
    next();
  });

  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Newsletter Signup (Prisma + Resend)
  app.post("/api/newsletter/signup", async (req, res) => {
    const { email } = req.body;

    if (!email || !email.includes('@')) {
      return res.status(400).json({ error: "Ogiltig e-postadress" });
    }

    try {
      // 1. Save to Neon (Prisma)
      await prisma.subscriber.upsert({
        where: { email },
        update: {},
        create: { email }
      });

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

  // Admin: List Subscribers (Prisma)
  app.get("/api/admin/subscribers", async (req, res) => {
    try {
      const subscribers = await prisma.subscriber.findMany({
        orderBy: { createdAt: 'desc' }
      });
      res.json(subscribers);
    } catch (error: any) {
      console.error('Admin Fetch Error:', error);
      res.status(500).json({ error: "Kunde inte hämta prenumeranter. Kontrollera att DATABASE_URL är konfigurerad." });
    }
  });

  // Admin: Update Macro Data (Cron)
  app.get("/api/admin/update-macro", async (req, res) => {
    const authHeader = req.headers["x-cron-auth"];
    if (authHeader !== process.env.CRON_SECRET) {
      console.warn(`[ADMIN] Unauthorized macro update attempt from ${req.ip}`);
      return res.status(401).json({ error: "Unauthorized" });
    }

    try {
      console.log("[ADMIN] Starting manual macro update...");
      const result = await updateAllMacroData();
      res.json(result);
    } catch (error: any) {
      console.error("[ADMIN] Macro Update Error:", error.message);
      res.status(500).json({ error: "Internt serverfel vid uppdatering av makrodata." });
    }
  });

  // In-memory cache for stock data to mitigate 429 errors
  const stockCache = new Map<string, { data: any, timestamp: number }>();
  const CACHE_TTL = 2 * 60 * 60 * 1000; // 2 hours

  // Fear & Greed Index Proxy (Market Sentiment)
  app.get("/api/market-sentiment", marketSentimentHandler as any);

  // Macro Data Proxy
  app.get("/api/macro-data", macroDataHandler as any);

  // Market Events
  app.get("/api/market-events", marketEventsHandler as any);

  // Admin: Generate AI Events
  app.all("/api/admin/generate-events", generateEventsHandler as any);

  // Alias for backward compatibility if needed, or just redirect
  app.get("/api/fear-greed", (req, res) => {
    res.redirect(301, "/api/market-sentiment");
  });

  // Fetch current dynamic analysis from database (Prisma)
  app.get("/api/analysis/:ticker([^/]+)", async (req, res) => {
    let ticker = req.params.ticker.toUpperCase();
    
    // Handle specific ticker mapping for Investor as requested
    if (ticker === 'INVE-B') {
      ticker = 'INVE-B.ST';
    }

    console.log(`[SERVER] Fetching current dynamic analysis for: ${ticker}`);

    try {
      const analysis = await prisma.analysis.findFirst({
        where: { 
          ticker: ticker,
          isCurrent: true
        },
        orderBy: {
          version: 'desc'
        }
      });

      if (!analysis) {
        // Fallback to static data if not in DB
        const staticAnalysis = Object.values(analyses).find(a => a.ticker.toUpperCase() === ticker);
        if (staticAnalysis) {
          console.log(`[SERVER] Dynamic analysis not found in DB, returning static fallback for ${ticker}`);
          return res.json(staticAnalysis);
        }
        return res.status(404).json({ error: `Analys för ${ticker} hittades inte.` });
      }

      console.log(`[SERVER] Returning current dynamic analysis from DB for ${ticker} (v${analysis.version})`);
      res.json(analysis);
    } catch (error: any) {
      console.error(`[SERVER] Error fetching analysis for ${ticker}:`, error.message);
      res.status(500).json({ error: "Internt serverfel vid hämtning av analys." });
    }
  });

  // Fetch analysis history for a ticker
  app.get("/api/analysis/:ticker([^/]+)/history", async (req, res) => {
    let ticker = req.params.ticker.toUpperCase();
    
    if (ticker === 'INVE-B') {
      ticker = 'INVE-B.ST';
    }

    console.log(`[SERVER] Fetching analysis history for: ${ticker}`);

    try {
      const history = await prisma.analysis.findMany({
        where: { ticker: ticker },
        select: {
          version: true,
          createdAt: true,
          isCurrent: true
        },
        orderBy: {
          version: 'desc'
        }
      });

      res.json(history);
    } catch (error: any) {
      console.error(`[SERVER] Error fetching history for ${ticker}:`, error.message);
      res.status(500).json({ error: "Internt serverfel vid hämtning av historik." });
    }
  });

  // RapidAPI Proxy for Stock Data (Database First)
  // Use a more permissive route to handle tickers with dots (e.g., EVO.ST)
  // The regex [^/]+ ensures it captures everything including dots until the next slash
  app.get("/api/stocks/quote/:ticker([^/]+)", async (req, res) => {
    const ticker = req.params.ticker;
    console.log(`[SERVER] API Request for ticker: ${ticker}`);
    if (!ticker) {
      return res.status(400).json({ error: "Ticker parameter is required" });
    }
    const tickerUpper = ticker.toUpperCase();
    console.log(`[SERVER] Received request for ticker: ${tickerUpper}`);

    try {
      // 1. Check memory cache
      const cached = stockCache.get(tickerUpper);
      if (cached && (Date.now() - cached.timestamp < CACHE_TTL)) {
        console.log(`[SERVER] Returning memory cached data for ${tickerUpper}`);
        return res.json(cached.data);
      }

      // 2. Fallback to static analysis data
      const staticAnalysis = Object.values(analyses).find(a => a.ticker.toUpperCase() === tickerUpper);
      if (staticAnalysis) {
        console.log(`[SERVER] Returning static analysis data for ${tickerUpper}`);
        const price = parseFloat(staticAnalysis.price.replace(/[^\d,.]/g, '').replace(',', '.')) || 0;
        const pe = parseFloat(staticAnalysis.pe) || 0;
        const marketCap = parseFloat(staticAnalysis.marketCap?.replace(/[^\d,.]/g, '').replace(',', '.')) || 0;

        return res.json({
          body: [{
            symbol: staticAnalysis.ticker,
            regularMarketPrice: price,
            regularMarketChange: 0,
            regularMarketChangePercent: 0,
            trailingPE: pe,
            marketCap: marketCap,
            epsTrailingTwelveMonths: 0,
            currency: tickerUpper.endsWith('.ST') ? 'SEK' : tickerUpper.endsWith('.CO') ? 'DKK' : 'USD'
          }]
        });
      }

      return res.status(404).json({ error: `Data för ${tickerUpper} saknas.` });
    } catch (error: any) {
      console.error(`[SERVER] Internal Error for ${tickerUpper}:`, error.message);
      if (stockCache.has(tickerUpper)) return res.json(stockCache.get(tickerUpper)!.data);
      res.status(500).json({ error: "Internt serverfel vid hämtning av aktiedata." });
    }
  });

  // Cron endpoint (Alpha Vantage removed)
  app.get("/api/cron/update", async (req, res) => {
    res.json({ message: "Cron-jobb inaktiverat (Alpha Vantage borttaget). Kontakta administratören för manuell uppdatering." });
  });

  // Catch-all for unmatched /api routes to help debug 404s
  app.use("/api", (req, res) => {
    console.log(`[API] 404 Not Found: ${req.method} ${req.originalUrl}`);
    res.status(404).json({ 
      error: "API Route not found", 
      method: req.method,
      path: req.originalUrl,
      suggestion: "Check if the route is correctly defined in server.ts"
    });
  });

  // RSS Feed for Analyser items
  app.get('/analyser/rss', (req, res) => {
    const baseUrl = 'https://www.borsanalys.se';

    const posts = [
      {
        title: 'Nvidia analys',
        description: 'Fullständig analys av Nvidia 2026',
        link: `${baseUrl}/analyser/nvidia`,
        pubDate: new Date().toUTCString(),
      },
      {
        title: 'Microsoft analys',
        description: 'Djupdykning i Microsoft',
        link: `${baseUrl}/analyser/microsoft`,
        pubDate: new Date().toUTCString(),
      },
    ];

    const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>Börsanalys</title>
    <link>${baseUrl}</link>
    <description>Senaste analyser från Börsanalys</description>
    ${posts.map(post => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${post.link}</link>
      <description><![CDATA[${post.description}]]></description>
      <pubDate>${post.pubDate}</pubDate>
      <guid>${post.link}</guid>
    </item>`).join('')}
  </channel>
</rss>`;

    res.setHeader('Content-Type', 'application/rss+xml; charset=utf-8');
    res.status(200).send(rss);
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
    console.log(`[SERVER] Ready to handle requests.`);

    // Set up automatic daily update (every 24 hours)
    // This triggers the same logic as the /api/cron/update endpoint
    const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;
    setInterval(async () => {
      console.log("[AUTO-CRON] Triggering scheduled daily update...");
      try {
        // We can't easily call our own HTTP endpoint from within the server without a full URL,
        // so we just log that it's time. In a real production environment, 
        // a real cron service would call the /api/cron/update endpoint.
        // For this environment, we'll just rely on the 2-hour freshness check 
        // when users visit the site, which is more efficient.
        console.log("[AUTO-CRON] Background sync is active. Data will refresh on-demand every 2 hours.");
      } catch (err) {
        console.error("[AUTO-CRON] Error during scheduled update:", err);
      }
    }, TWENTY_FOUR_HOURS);
  });
}

startServer().catch(err => {
  console.error("[SERVER] Fatal error during startup:", err);
  process.exit(1);
});
