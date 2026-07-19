CREATE TABLE "StockChecklist" (
  "id" SERIAL NOT NULL,
  "userId" INTEGER NOT NULL,
  "companyName" TEXT NOT NULL,
  "ticker" TEXT,
  "sourceAnalysisSlug" TEXT,
  "answers" JSONB NOT NULL,
  "notes" JSONB NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'started',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "StockChecklist_pkey" PRIMARY KEY ("id")
);
CREATE INDEX "StockChecklist_userId_updatedAt_idx" ON "StockChecklist"("userId", "updatedAt");
ALTER TABLE "StockChecklist" ADD CONSTRAINT "StockChecklist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
