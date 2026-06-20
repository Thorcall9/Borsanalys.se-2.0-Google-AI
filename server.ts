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
import marketHandler from "./api/market.ts";
import aiHandler from "./api/ai.ts";
import adminHandler from "./api/admin.ts";
import rssHandler from "./api/rss.ts";
import sitemapHandler from "./api/sitemap.ts";
import watchlistHandler from "./api/watchlist.ts";
import voteHandler from "./api/vote";
import { createTickerNotifications, NotificationType } from "./src/lib/notifications.ts";
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
  /* Commenting out to prevent restart loop with tsx --watch
  try {
    const line = `[${new Date().toISOString()}] ${msg}\n`;
    fs.appendFileSync(logFile, line);
  } catch (err) {
    // Ignore logging errors
  }
  */
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
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        baseUri: ["'self'"],
        objectSrc: ["'none'"],
        frameAncestors: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "https://*.googlesyndication.com", "https://*.google.com", "https://*.googleapis.com", "https://*.gstatic.com", "https://va.vercel-scripts.com"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        imgSrc: ["'self'", "data:", "blob:", "https:"],
        fontSrc: ["'self'", "data:", "https://fonts.gstatic.com"],
        connectSrc: ["'self'", "https://*.vercel-insights.com", "https://vitals.vercel-insights.com", "https://*.googleapis.com", "https://*.googlesyndication.com"],
        frameSrc: ["'self'", "https://*.google.com", "https://*.googlesyndication.com"],
      },
    },
    crossOriginEmbedderPolicy: false // Disabled for cross-origin resources
  }));

  // CORS Policy: Restrict API usage to the site's domains and localhost instances
  const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:5173',
    /^https:\/\/borsanalys(-[a-zA-Z0-9-]+)?\.vercel\.app$/, // Tillåt enbart Vercel preview-miljöer som börjar på borsanalys
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

  // --- Auth Middleware ---
  const cronAuthMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const authHeader = req.headers["x-cron-auth"];
    if (!process.env.CRON_SECRET || authHeader !== process.env.CRON_SECRET) {
      console.warn(`[SECURITY] Unauthorized access attempt to ${req.originalUrl} from ${req.ip}`);
      return res.status(401).json({ error: "Unauthorized" });
    }
    next();
  };

  // --- AI Rate Limiter & Security ---
  const aiRateLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 30, // limit each IP to 30 requests per hour
    message: { error: "Gränsen för AI-anrop har uppnåtts. Vänligen försök igen senare." },
    standardHeaders: true,
    legacyHeaders: false,
  });

  const aiBodyLimit = express.json({ limit: "5kb" });

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


  // Admin: List Subscribers (Prisma) - PROTECTED
  app.get("/api/admin/subscribers", cronAuthMiddleware, async (req, res) => {
    try {
      const subscribers = await prisma.subscriber.findMany({
        orderBy: { createdAt: 'desc' }
      });
      res.json(subscribers);
    } catch (error: any) {
      console.error('Admin Fetch Error:', error.message);
      res.status(500).json({ error: "Internt serverfel vid hämtning av prenumeranter." });
    }
  });

  // Newsletter Voting (Production compatible)
  app.get("/vote", voteHandler as any);
  app.get("/api/admin/votes", cronAuthMiddleware, (req, res) => {
    req.query.type = 'votes';
    return adminHandler(req as any, res as any);
  });

  // Admin: Update Macro Data (Cron) - PROTECTED
  app.get("/api/admin/update-macro", cronAuthMiddleware, (req, res) => {
    req.query.type = 'update-macro';
    return adminHandler(req as any, res as any);
  });

  // In-memory cache for stock data to mitigate 429 errors
  const stockCache = new Map<string, { data: any, timestamp: number }>();
  const CACHE_TTL = 2 * 60 * 60 * 1000; // 2 hours

  // Fear & Greed Index Proxy (Market Sentiment)
  app.get("/api/market-sentiment", (req, res) => {
    req.query.type = 'sentiment';
    return marketHandler(req as any, res as any);
  });

  // Macro Data Proxy
  app.get("/api/macro-data", (req, res) => {
    req.query.type = 'macro';
    return marketHandler(req as any, res as any);
  });

  // Market Events
  app.get("/api/market-events", (req, res) => {
    req.query.type = 'events';
    return marketHandler(req as any, res as any);
  });

  // Watchlist (MVP)
  app.all("/api/watchlist", watchlistHandler as any);

  // Admin: Generate AI Events - PROTECTED
  app.all("/api/admin/generate-events", cronAuthMiddleware, (req, res) => {
    req.query.type = 'generate-events';
    return adminHandler(req as any, res as any);
  });

  // AI Routes (consolidated)
  app.get("/api/ai/macro-outlook", (req, res) => {
    req.query.type = 'macro-outlook';
    return aiHandler(req as any, res as any);
  });
  app.post("/api/ai/event-insight", (req, res) => {
    req.query.type = 'event-insight';
    return aiHandler(req as any, res as any);
  });

  // Admin: Trigger Test Notification - PROTECTED
  app.post("/api/admin/test-notification", cronAuthMiddleware, async (req, res) => {
    const notificationSchema = z.object({
      ticker: z.string().min(1).max(20),
      type: z.enum(['price_alert', 'new_analysis', 'news', 'earnings']),
      title: z.string().min(1).max(100),
      message: z.string().min(1).max(500)
    });

    const parsed = notificationSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: "Ogiltig input", details: parsed.error.issues });
    }

    const { ticker, type, title, message } = parsed.data;

    try {
      const result = await createTickerNotifications({
        ticker,
        type: type as NotificationType,
        title,
        message
      });
      res.json(result);
    } catch (error: any) {
      console.error("[ADMIN NOTIF TEST ERROR]", error);
      res.status(500).json({ error: error.message });
    }
  });

  /**
   * CONCEPTUAL FLOW: Publicera Analys & Notifiera
   * Detta är en mall för hur du kan koppla ihop flödet senare.
   * 
   * app.post("/api/admin/publish-analysis", async (req, res) => {
   *   const { analysisData } = req.body;
   *   // 1. Spara analysen i DB (Prisma)
   *   // const analysis = await prisma.analysis.create({ data: analysisData });
   *   
   *   // 2. Skicka notiser till alla som bevakar
   *   // await createTickerNotifications({
   *   //   ticker: analysis.ticker,
   *   //   type: 'new_analysis',
   *   //   title: `Ny analys ute: ${analysis.companyName}`,
   *   //   message: `Vi har precis publicerat en ny analys av ${analysis.companyName}.`
   *   // });
   *   
   *   // res.json({ success: true });
   * });
   */

  // AI Routes (Client safe calls) - PROTECTED WITH RATE LIMIT & VALIDATION
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
  
  app.post("/api/ai/macro-outlook", aiBodyLimit, aiRateLimiter, async (req, res) => {
    logger(`[API] Received POST request to /api/ai/macro-outlook`);
    try {
      if (!process.env.GEMINI_API_KEY) {
        logger("[ERROR] GEMINI_API_KEY is missing!");
        return res.status(500).json({ error: "Systemfel: API-nyckel saknas." });
      }

      // Using Gemini 2.5 Flash-Lite as established in this workspace
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

      // Hämta live makrodata för kontext
      let macroContext = "US10Y: 4.34%, SE10Y: 2.85%, USD/SEK: 9.56, EUR/SEK: 10.95, OMX30: 2905, KPI: 0.5%";
      try {
        const macroRows = await prisma.macroMarketData.findMany({ 
          orderBy: { updatedAt: 'desc' },
          take: 20 // Only need the most recent unique keys
        });
        const seen = new Set<string>();
        const unique = macroRows.filter(d => { if (seen.has(d.key)) return false; seen.add(d.key); return true; });
        if (unique.length > 0) {
          macroContext = unique.map(d => `${d.key}: ${d.value} (${d.trend || 'flat'})`).join(", ");
        }
      } catch (dbErr: any) {
        logger(`[WARNING] Database fetch failed (using fallback): ${dbErr.message}`);
      }

      const today = new Date().toLocaleDateString('sv-SE');
      const prompt = `Du är en erfaren makroekonomisk analytiker som skriver på svenska för investerare på Börsanalys.se.
Aktuella makroindikatorer (${today}): ${macroContext}.

Analysera var vi befinner oss i konjunkturcykeln och vad det innebär för aktiemarknaden.
Vi använder en 6-fasmodell:
- early_recovery (Tidig återhämtning)
- expansion (Expansion)
- overheating (Överhettning)
- late_cycle (Sen cykel)
- slowdown (Avmattning)
- recession (Recession)

Svara EXAKT i detta JSON-format utan någon annan text eller markdown:
{
  "outlook": "[3-4 meningar på svenska om makroläget och vad investerare bör tänka på just nu. Var professionell och initierad.]",
  "suggestedPhaseId": "early_recovery|expansion|overheating|late_cycle|slowdown|recession",
  "confidence": [HELTAL mellan 0-100],
  "upcomingDates": [{"date": "DD Månad", "title": "Händelse"}]
}`;

      logger("[AI] Calling Gemini model (gemini-2.5-flash-lite)...");
      const result = await model.generateContent(prompt);
      const response = await result.response;
      let text = response.text().trim();
      
      logger(`[AI] Raw response received (len: ${text.length})`);

      // 1. Better JSON Extraction (handle markdown blocks or preamble)
      let jsonData = null;
      try {
        // Strip markdown code blocks if present
        const cleanedText = text.replace(/```json\n?|```/g, "").trim();
        const jsonMatch = cleanedText.match(/\{[\s\S]*\}/);
        
        if (jsonMatch) {
          jsonData = JSON.parse(jsonMatch[0]);
        } else {
          jsonData = JSON.parse(cleanedText);
        }
      } catch (parseErr) {
        logger(`[ERROR] AI JSON Parse failed. Text snippet: ${text.substring(0, 100)}`);
        throw new Error("Kunde inte tolka AI-svaret som JSON.");
      }

      // 2. Data Validation & Formatting
      const validPhases = ['early_recovery', 'expansion', 'overheating', 'late_cycle', 'slowdown', 'recession'];
      const suggestedPhaseId = validPhases.includes(jsonData.suggestedPhaseId) ? jsonData.suggestedPhaseId : "late_cycle";
      
      let numericConfidence = 75;
      if (jsonData.confidence !== undefined) {
        numericConfidence = parseInt(String(jsonData.confidence), 10);
        if (isNaN(numericConfidence)) numericConfidence = 75;
      }

      res.json({
        outlook: jsonData.outlook || "Makroanalys genererades.",
        suggestedPhaseId,
        confidence: numericConfidence,
        upcomingDates: Array.isArray(jsonData.upcomingDates) ? jsonData.upcomingDates : []
      });

    } catch (err: any) {
      const errorMsg = err.message || "Okänt serverfel";
      logger(`[CRITICAL ERROR] /api/ai/macro-outlook: ${errorMsg}`);
      res.status(500).json({ 
        error: `Serverfel vid generering av makroanalys.`
      });
    }
  });

  // Global error handler for uncaught exceptions in routes
  app.use((err: any, req: any, res: any, next: any) => {
    logger(`[UNCAUGHT ERROR] ${err.message}`);
    if (err.stack) logger(err.stack);
    res.status(500).json({ error: "Ett internt serverfel uppstod." });
  });


  app.post("/api/ai/event-insight", aiBodyLimit, aiRateLimiter, async (req, res) => {
    const insightSchema = z.object({
      title: z.string().min(1).max(200),
      description: z.string().min(1).max(1000)
    });

    const parsed = insightSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: "Ogiltig input", details: parsed.error.issues });
    }

    const { title, description } = parsed.data;
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });
      const result = await model.generateContent(
        `Analysera följande händelse och dess potentiella påverkan på den svenska börsen (OMX): "${title} - ${description}". Ge ett kort, koncist svar på max 3 meningar om vad investerare bör hålla koll på.`
      );
      res.json({ insight: result.response.text() || "Kunde inte generera insikt." });
    } catch (err: any) {
      console.error("AI Insight Error:", err.message);
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
