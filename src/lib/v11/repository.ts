import type { Prisma, PrismaClient } from '@prisma/client';

export class V11Repository {
  constructor(private readonly prisma: PrismaClient) {}

  createAnalysis(input: { companyId: string; format: 'base-analysis' }) {
    return this.prisma.v11Analysis.create({ data: input });
  }

  registerSource(input: {
    analysisId: string;
    sourceId: string;
    documentHash: string;
    verificationStatus: string;
    payload: Prisma.InputJsonValue;
  }) {
    return this.prisma.v11Source.create({ data: input });
  }

  appendRevision(input: {
    analysisId: string; objectId: string; objectType: string; revision: number;
    approvalStatus: string; payload: Prisma.InputJsonValue; approvedAt?: Date;
    approvedBy?: string; approvalReason?: string; supersedesId?: string;
  }) {
    return this.prisma.v11ObjectRevision.create({ data: input });
  }

  appendDecisionRecord(input: {
    analysisId: string;
    objectId: string;
    previousRevisionId: string;
    newRevisionId: string;
    decisionType: string;
    reason: string;
    evidenceIds: Prisma.InputJsonValue;
    editorId: string;
    createdAt?: Date;
  }) {
    return this.prisma.v11DecisionRecord.create({ data: input });
  }

  createSnapshot(input: {
    id?: string; analysisId: string; parentSnapshotId: string | null; schemaVersion: string;
    analysisModelVersion: string; modelVersion: string; payloadHash: string; canonicalPayload: string;
    approvedBy: string; approvedAt: Date;
  }) {
    return this.prisma.v11Snapshot.create({ data: input });
  }

  getLatestSnapshot(analysisId: string) {
    return this.prisma.v11Snapshot.findFirst({ where: { analysisId }, orderBy: { approvedAt: 'desc' } });
  }

  getSnapshotById(id: string) {
    return this.prisma.v11Snapshot.findUnique({ where: { id } });
  }
}
