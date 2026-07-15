import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function check() {
  try {
    const macroData = await prisma.macroMarketData.findMany();
    console.log("Macro Market Data count:", macroData.length);
    console.log("Data:", JSON.stringify(macroData, null, 2));

    const events = await prisma.marketEvent.findMany();
    console.log("Market Events count:", events.length);
    console.log("Events:", JSON.stringify(events, null, 2));

    const subscribers = await prisma.subscriber.findMany();
    console.log("Subscribers count:", subscribers.length);

    const analyses = await prisma.analysis.findMany();
    console.log("Analyses count:", analyses.length);
  } catch (err: any) {
    console.error("Error connecting to database:", err.message);
  } finally {
    await prisma.$disconnect();
  }
}

check();
