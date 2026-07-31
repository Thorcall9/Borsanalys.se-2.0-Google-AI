CREATE TABLE "V11Analysis" (
  "id" TEXT NOT NULL,
  "companyId" TEXT NOT NULL,
  "format" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "V11Analysis_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "V11ObjectRevision" (
  "id" TEXT NOT NULL,
  "analysisId" TEXT NOT NULL,
  "objectId" TEXT NOT NULL,
  "objectType" TEXT NOT NULL,
  "revision" INTEGER NOT NULL,
  "approvalStatus" TEXT NOT NULL,
  "payload" JSONB NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "approvedAt" TIMESTAMP(3),
  "approvedBy" TEXT,
  "approvalReason" TEXT,
  "supersedesId" TEXT,
  CONSTRAINT "V11ObjectRevision_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "V11Approval" (
  "id" TEXT NOT NULL,
  "revisionId" TEXT NOT NULL,
  "editorId" TEXT NOT NULL,
  "reason" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "V11Approval_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "V11Source" (
  "id" TEXT NOT NULL,
  "analysisId" TEXT NOT NULL,
  "sourceId" TEXT NOT NULL,
  "documentHash" TEXT NOT NULL,
  "verificationStatus" TEXT NOT NULL,
  "payload" JSONB NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "V11Source_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "V11Document" (
  "id" TEXT NOT NULL,
  "analysisId" TEXT NOT NULL,
  "documentHash" TEXT NOT NULL,
  "eventType" TEXT,
  "reportPeriod" TEXT,
  "metadata" JSONB NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "V11Document_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "V11Snapshot" (
  "id" TEXT NOT NULL,
  "analysisId" TEXT NOT NULL,
  "payloadHash" TEXT NOT NULL,
  "canonicalPayload" TEXT NOT NULL,
  "modelVersion" TEXT NOT NULL,
  "approvedBy" TEXT NOT NULL,
  "approvedAt" TIMESTAMP(3) NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "V11Snapshot_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "V11ReportEvent" (
  "id" TEXT NOT NULL,
  "analysisId" TEXT NOT NULL,
  "documentId" TEXT NOT NULL,
  "snapshotId" TEXT,
  "eventType" TEXT NOT NULL,
  "editorialAction" TEXT,
  "status" TEXT NOT NULL,
  "payload" JSONB NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "V11ReportEvent_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "V11EditorialDraft" (
  "id" TEXT NOT NULL,
  "analysisId" TEXT NOT NULL,
  "reportEventId" TEXT,
  "snapshotId" TEXT,
  "status" TEXT NOT NULL,
  "payload" JSONB NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "approvedAt" TIMESTAMP(3),
  "approvedBy" TEXT,
  CONSTRAINT "V11EditorialDraft_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "V11ObjectRevision_analysisId_objectId_revision_key" ON "V11ObjectRevision"("analysisId", "objectId", "revision");
CREATE INDEX "V11ObjectRevision_analysisId_approvalStatus_idx" ON "V11ObjectRevision"("analysisId", "approvalStatus");
CREATE INDEX "V11Approval_revisionId_idx" ON "V11Approval"("revisionId");
CREATE UNIQUE INDEX "V11Source_analysisId_sourceId_key" ON "V11Source"("analysisId", "sourceId");
CREATE INDEX "V11Source_documentHash_idx" ON "V11Source"("documentHash");
CREATE UNIQUE INDEX "V11Document_analysisId_documentHash_key" ON "V11Document"("analysisId", "documentHash");
CREATE UNIQUE INDEX "V11Snapshot_payloadHash_key" ON "V11Snapshot"("payloadHash");
CREATE INDEX "V11Snapshot_analysisId_approvedAt_idx" ON "V11Snapshot"("analysisId", "approvedAt");
CREATE INDEX "V11Analysis_companyId_format_idx" ON "V11Analysis"("companyId", "format");
CREATE INDEX "V11ReportEvent_analysisId_createdAt_idx" ON "V11ReportEvent"("analysisId", "createdAt");
CREATE INDEX "V11EditorialDraft_analysisId_status_idx" ON "V11EditorialDraft"("analysisId", "status");

ALTER TABLE "V11ObjectRevision" ADD CONSTRAINT "V11ObjectRevision_analysisId_fkey" FOREIGN KEY ("analysisId") REFERENCES "V11Analysis"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "V11Approval" ADD CONSTRAINT "V11Approval_revisionId_fkey" FOREIGN KEY ("revisionId") REFERENCES "V11ObjectRevision"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "V11Source" ADD CONSTRAINT "V11Source_analysisId_fkey" FOREIGN KEY ("analysisId") REFERENCES "V11Analysis"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "V11Document" ADD CONSTRAINT "V11Document_analysisId_fkey" FOREIGN KEY ("analysisId") REFERENCES "V11Analysis"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "V11Snapshot" ADD CONSTRAINT "V11Snapshot_analysisId_fkey" FOREIGN KEY ("analysisId") REFERENCES "V11Analysis"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "V11ReportEvent" ADD CONSTRAINT "V11ReportEvent_analysisId_fkey" FOREIGN KEY ("analysisId") REFERENCES "V11Analysis"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "V11EditorialDraft" ADD CONSTRAINT "V11EditorialDraft_analysisId_fkey" FOREIGN KEY ("analysisId") REFERENCES "V11Analysis"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
