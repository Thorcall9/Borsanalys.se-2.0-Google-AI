import "dotenv/config";
import { updateAllMacroData } from "../src/lib/macroUpdater.ts";

async function run() {
  console.log("Triggering macro update...");
  try {
    const result = await updateAllMacroData();
    console.log("Result:", JSON.stringify(result, null, 2));
  } catch (err: any) {
    console.error("Error updating macro:", err.message);
  }
}

run();
