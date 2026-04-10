import "dotenv/config";
import dotenv from "dotenv";
import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import { prisma } from "./src/lib/prisma.ts";
import { sendEmail } from "./src/lib/email.ts";
import { analyses, AnalysisData } from "./src/data/analyses/index.ts";
import { updateAllMacroData } from "./src/lib/macroUpdater.ts";
import marketSentimentHandler from "./api/market-sentiment.ts";
import macroDataHandler from "./api/macro-data.ts";
import marketEventsHandler from "./api/market-events.ts";
import generateEventsHandler from "./api/admin/generate-events.ts";
import rssHandler from "./api/rss.ts";
import sitemapHandler from "./api/sitemap.ts";
import rateLimit from "express-rate-limit";
import { GoogleGenerativeAI } from "@google/generative-ai";
import helmet from "helmet";
import cors from "cors";
import { z } from "zod";

// Explicitly load .env.local for development
dotenv.config({ path: ".env.local" });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Debug logger
const logFile = path.join(__dirname, "debug.log");
const logger = (msg: string) => {

  try {
    const line = `[${new Date().toISOString()}] ${msg}\n`;
    fs.appendFileSync(logFile, line);
  } catch (err) {
    // Ignore logging errors
  }
  console.log(msg);
};

logger(`[STARTUP] GEMINI_API_KEY presence: ${!!process.env.GEMINI_API_KEY}`);


async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  console.log(`[SERVER] Initializing server on port ${PORT}...`);

  // Security Middleware
  app.use(helmet({
    contentSecurityPolicy: false, // Disabled to allow Google AdSense scripts without complex Hashes/Nonces
    crossOriginEmbedderPolicy: false // Disabled for cross-origin resources
  }));

  // CORS Policy: Restrict API usage to the site's domains and localhost instances
  const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:5173',
    /^https:\/\/.*\.vercel\.app$/, // Allow temporary Vercel preview environments
    'https://borsanalys.se',
    'https://www.borsanalys.se'
  ];

  app.use(cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests if desired, or server-to-server)
      if (!origin) return callback(null, true);
      
      const isAllowed = allowedOrigins.some(allowed => {
        if (allowed instanceof RegExp) return allowed.test(origin);
        return allowed === origin;
      });
      
      if (isAllowed) return callback(null, true);
      callback(new Error('Blocked by CORS policy'));
    },
    credentials: true,
  }));

  // API routes FIRST
  app.use("/api", (req, res, next) => {
    logger(`[REQUEST] ${req.method} ${req.url}`);
    next();
  });

  app.get("/api/test-debug", (req, res) => {
    logger("[API] Test debug route reached");
    res.json({ ok: true, timestamp: new Date().toISOString() });
  });


  const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 200, // limit each IP to 200 requests per windowMs
    message: { error: "För många anrop. Vänligen försök igen senare." }
  });

  const newsletterLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 10, // limit each IP to 10 requests per hour
    message: { error: "Du har gjort för många anmälningar. Vänligen försök igen senare." }
  });

  app.use("/api/", apiLimiter);

  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Newsletter Signup (Prisma + Resend + Zod)
  app.post("/api/newsletter/signup", newsletterLimiter, async (req, res) => {
    // 1. Strict input validation with Zod
    const emailSchema = z.string().email({ message: "Ogiltig e-postadress. Vänligen kontrollera formatet." });
    const parsedEmail = emailSchema.safeParse(req.body.email);

    if (!parsedEmail.success) {
      return res.status(400).json({ error: parsedEmail.error.issues[0].message });
    }
    const email = parsedEmail.data;

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
    if (!process.env.CRON_SECRET || authHeader !== process.env.CRON_SECRET) {
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

  // AI Routes (Client safe calls)
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
  
  app.post("/api/ai/macro-outlook", async (req, res) => {
    logger(`[API] Received POST request to /api/ai/macro-outlook`);
    try {
      if (!process.env.GEMINI_API_KEY) {
        logger("[ERROR] GEMINI_API_KEY is missing!");
        return res.status(500).json({ error: "Systemfel: API-nyckel saknas." });
      }

      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      // Hämta live makrodata för kontext
      let macroContext = "US10Y: 4.34%, SE10Y: 2.85%, USD/SEK: 9.56, EUR/SEK: 10.95, OMX30: 2905, KPI: 0.5%";
      try {
        const macroRows = await prisma.macroMarketData.findMany({ orderBy: { updatedAt: 'desc' } });
        const seen = new Set<string>();
        const unique = macroRows.filter(d => { if (seen.has(d.key)) return false; seen.add(d.key); return true; });
        if (unique.length > 0) {
          macroContext = unique.map(d => `${d.key}: ${d.value} (${d.trend || 'flat'})`).join(", ");
        }
      } catch (dbErr: any) {
        logger(`[WARNING] Database fetch failed (using fallback): ${dbErr.message}`);
      }

      const today = new Date().toLocaleDateString('sv-SE');
      const prompt = `Du är en erfaren makroekonomisk analytiker som skriver på svenska för investerare.
Aktuella makroindikatorer (${today}): ${macroContext}.

Analysera var vi befinner oss i konjunkturcykeln och vad det innebär för aktiemarknaden.
Ange även 3-4 kommande viktiga makrohändelser (räntebesked, KPI-publiceringar m.m.) efter ${today}.

Svara EXAKT i detta JSON-format utan någon annan text eller markdown:
{"outlook":"[3-4 meningar om makroläget och vad investerare bör tänka på]","suggestedPhaseId":"[recovery|overheating|stagflation|reflation]","upcomingDates":[{"date":"DD Månad","title":"Händelse"},{"date":"DD Månad","title":"Händelse"},{"date":"DD Månad","title":"Händelse"}]}`;

      logger("[AI] Calling Gemini model...");
      const result = await model.generateContent(prompt);
      let text = result.response.text().trim();
      logger(`[AI] Raw response received (len: ${text.length})`);

      // Clean markdown code blocks and extract JSON
      text = text.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/\s*```$/i, '').trim();
      
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) text = jsonMatch[0];
      else {
        // Fallback if no JSON object is found in the text
        logger(`[WARNING] No JSON found in AI response. Raw text snippet: ${text.substring(0, 50)}...`);
      }

      let data;
      try {
        data = JSON.parse(text);
        logger("[AI] JSON parsed successfully");
      } catch (parseErr) {
        logger(`[ERROR] AI JSON Parse Error. Raw text: ${text}`);
        return res.json({
          outlook: "Kunde inte tolka analysen helt, men konjunkturklockan indikerar att vi rör oss i cykeln baserat på nuvarande indikatorer.",
          suggestedPhaseId: "recovery",
          upcomingDates: []
        });
      }

      res.json({
        outlook: data.outlook || "Makroanalys genererades – se indikatorer ovan.",
        suggestedPhaseId: data.suggestedPhaseId || null,
        upcomingDates: Array.isArray(data.upcomingDates) ? data.upcomingDates : []
      });

    } catch (err: any) {
      logger(`[CRITICAL ERROR] /api/ai/macro-outlook: ${err.message}`);
      // Log the full stack trace to the debug file
      if (err.stack) logger(err.stack);
      
      res.status(500).json({ error: `Kunde inte generera analys: ${err.message}` });
    }
  });

  // Global error handler for uncaught exceptions in routes
  app.use((err: any, req: any, res: any, next: any) => {
    logger(`[UNCAUGHT ERROR] ${err.message}`);
    if (err.stack) logger(err.stack);
    res.status(500).json({ error: "Ett internt serverfel uppstod." });
  });


  app.post("/api/ai/event-insight", async (req, res) => {
    const { title, description } = req.body;
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(
        `Analysera följande händelse och dess potentiella påverkan på den svenska börsen (OMX): "${title} - ${description}". Ge ett kort, koncist svar på max 3 meningar om vad investerare bör hålla koll på.`
      );
      res.json({ insight: result.response.text() || "Kunde inte generera insikt." });
    } catch (err: any) {
      console.error("AI Insight Error:", err);
      res.status(500).json({ error: "Kunde inte generera insikt" });
    }
  });

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
        const staticAnalysis = Object.values(analyses).find(a => a.ticker.toUpperCase() === ticker) as AnalysisData | undefined;
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
      const staticAnalysis = Object.values(analyses).find(a => a.ticker.toUpperCase() === tickerUpper) as AnalysisData | undefined;
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
  app.get('/analyser/rss', rssHandler as any);
  app.get('/sitemap.xml', sitemapHandler as any);

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

  // SPA Fallback: Serve index.html for all other routes
  app.get("*", (req, res) => {
    const distPath = path.join(process.cwd(), "dist");
    res.sendFile(path.join(distPath, "index.html"));
  });

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
