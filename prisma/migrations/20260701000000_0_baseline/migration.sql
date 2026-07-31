-- Baseline reconstructed from the live schema immediately before the first
-- recorded migration. Do not edit after it has been marked as applied.

CREATE TABLE "Analysis" (
  "id" TEXT NOT NULL,
  "ticker" TEXT NOT NULL,
  "version" INTEGER NOT NULL DEFAULT 1,
  "isCurrent" BOOLEAN NOT NULL DEFAULT true,
  "companyName" TEXT NOT NULL,
  "totalRating" INTEGER NOT NULL,
  "verdict" TEXT NOT NULL,
  "moat" INTEGER NOT NULL,
  "management" INTEGER NOT NULL,
  "valuation" INTEGER NOT NULL,
  "growth" INTEGER NOT NULL,
  "profitability" INTEGER NOT NULL,
  "financials" INTEGER NOT NULL,
  "risk" INTEGER NOT NULL,
  "trend" INTEGER NOT NULL,
  "analysisText" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Analysis_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "subscribers" (
  "id" SERIAL NOT NULL,
  "email" TEXT NOT NULL,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "subscribers_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "MacroMarketData" (
  "id" TEXT NOT NULL,
  "key" TEXT NOT NULL,
  "value" DOUBLE PRECISION NOT NULL,
  "source" TEXT NOT NULL,
  "trend" TEXT,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "MacroMarketData_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "MarketEvent" (
  "id" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "impact" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "whyItMatters" TEXT NOT NULL,
  "swedishCompanies" TEXT NOT NULL,
  "usCompanies" TEXT NOT NULL,
  "winners" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "MarketEvent_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "User" (
  "id" SERIAL NOT NULL,
  "email" TEXT NOT NULL,
  "name" TEXT,
  "firebaseUid" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Watchlist" (
  "id" SERIAL NOT NULL,
  "userId" INTEGER NOT NULL,
  "ticker" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Watchlist_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Notification" (
  "id" SERIAL NOT NULL,
  "userId" INTEGER NOT NULL,
  "ticker" TEXT NOT NULL,
  "type" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "message" TEXT NOT NULL,
  "isRead" BOOLEAN NOT NULL DEFAULT false,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "SavedAnalysis" (
  "id" SERIAL NOT NULL,
  "userId" INTEGER NOT NULL,
  "slug" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "ticker" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "SavedAnalysis_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "votes" (
  "id" TEXT NOT NULL,
  "stock" TEXT NOT NULL,
  "source" TEXT DEFAULT 'email',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "votes_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Analysis_ticker_version_key" ON "Analysis"("ticker", "version");
CREATE UNIQUE INDEX "subscribers_email_key" ON "subscribers"("email");
CREATE UNIQUE INDEX "MacroMarketData_key_key" ON "MacroMarketData"("key");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_firebaseUid_key" ON "User"("firebaseUid");
CREATE UNIQUE INDEX "Watchlist_userId_ticker_key" ON "Watchlist"("userId", "ticker");
CREATE UNIQUE INDEX "SavedAnalysis_userId_slug_key" ON "SavedAnalysis"("userId", "slug");

ALTER TABLE "Watchlist" ADD CONSTRAINT "Watchlist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "SavedAnalysis" ADD CONSTRAINT "SavedAnalysis_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
