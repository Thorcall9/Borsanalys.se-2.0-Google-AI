import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { updateAllMacroData } from "../src/lib/macroUpdater.ts";

const prisma = new PrismaClient();

async function run() {
  console.log("Preparing database for forced macro update...");
  try {
    // Set all existing macro data timestamps to yesterday to bypass the daily lock check
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
    await prisma.macroMarketData.updateMany({
      data: {
        updatedAt: yesterday
      }
    });
    console.log("Macro timestamps updated to yesterday.");

    console.log("Running macro update...");
    const result = await updateAllMacroData();
    console.log("Update Result:", JSON.stringify(result, null, 2));

    const finalData = await prisma.macroMarketData.findMany();
    console.log("Final Macro Market Data:");
    console.log(JSON.stringify(finalData, null, 2));
  } catch (err: any) {
    console.error("Error running forced macro update:", err.message);
  } finally {
    await prisma.$disconnect();
  }
}

run();
