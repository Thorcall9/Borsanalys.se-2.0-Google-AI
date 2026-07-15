import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function check() {
  try {
    const analysis = await prisma.analysis.findFirst({
      where: { 
        ticker: 'ABB-Q1-2026',
        isCurrent: true
      },
      orderBy: {
        version: 'desc'
      }
    });
    console.log("Analysis queried:", analysis);
  } catch (err: any) {
    console.error("Prisma error:", err.message);
  } finally {
    await prisma.$disconnect();
  }
}

check();
