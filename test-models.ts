import "dotenv/config";
import { GoogleGenerativeAI } from "@google/generative-ai";

async function listModels() {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
  try {
    // Note: The v0.x library might not have a direct listModels on the main client 
    // but we can try to find where it is or just try the most likely ones.
    console.log("Testing gemini-1.5-flash...");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent("test");
    console.log("gemini-1.5-flash works!");
  } catch (err) {
    console.log("gemini-1.5-flash failed:", err.message);
  }

  try {
    console.log("Testing gemini-pro...");
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent("test");
    console.log("gemini-pro works!");
  } catch (err) {
    console.log("gemini-pro failed:", err.message);
  }
}

listModels();
