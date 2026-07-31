-- AlterTable
ALTER TABLE "V11Snapshot" ADD COLUMN     "analysisModelVersion" TEXT,
ADD COLUMN     "parentSnapshotId" TEXT,
ADD COLUMN     "schemaVersion" TEXT;

-- CreateTable
CREATE TABLE "V11DecisionRecord" (
    "id" TEXT NOT NULL,
    "analysisId" TEXT NOT NULL,
    "objectId" TEXT NOT NULL,
    "previousRevisionId" TEXT NOT NULL,
    "newRevisionId" TEXT NOT NULL,
    "decisionType" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "evidenceIds" JSONB NOT NULL,
    "editorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "V11DecisionRecord_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "V11DecisionRecord_analysisId_createdAt_idx" ON "V11DecisionRecord"("analysisId", "createdAt");

-- CreateIndex
CREATE INDEX "V11DecisionRecord_objectId_createdAt_idx" ON "V11DecisionRecord"("objectId", "createdAt");

-- CreateIndex
CREATE INDEX "V11DecisionRecord_previousRevisionId_idx" ON "V11DecisionRecord"("previousRevisionId");

-- CreateIndex
CREATE INDEX "V11DecisionRecord_newRevisionId_idx" ON "V11DecisionRecord"("newRevisionId");

-- AddForeignKey
ALTER TABLE "V11Snapshot" ADD CONSTRAINT "V11Snapshot_parentSnapshotId_fkey" FOREIGN KEY ("parentSnapshotId") REFERENCES "V11Snapshot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "V11DecisionRecord" ADD CONSTRAINT "V11DecisionRecord_analysisId_fkey" FOREIGN KEY ("analysisId") REFERENCES "V11Analysis"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "V11DecisionRecord" ADD CONSTRAINT "V11DecisionRecord_previousRevisionId_fkey" FOREIGN KEY ("previousRevisionId") REFERENCES "V11ObjectRevision"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "V11DecisionRecord" ADD CONSTRAINT "V11DecisionRecord_newRevisionId_fkey" FOREIGN KEY ("newRevisionId") REFERENCES "V11ObjectRevision"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
