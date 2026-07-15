import "dotenv/config";
import { GoogleGenerativeAI } from "@google/generative-ai";

async function test() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("GEMINI_API_KEY is missing");
    return;
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  
  // Let's try gemini-2.5-flash with Google Search tools
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    // Enable Google Search grounding
    tools: [
      {
        googleSearch: {},
      } as any
    ]
  });

  const today = new Date().toLocaleDateString('sv-SE');
  const prompt = `Du är en finansiell data-assistent. Din uppgift är att hämta de absolut senaste och mest korrekta värdena för följande makroindikatorer.
Använd Google-sökning för att hitta dagsaktuella siffror (datum: ${today}).

Indikatorer som behövs:
1. US10Y (US 10-Year Treasury Yield i %)
2. SE10Y (Svensk 10-årig statsobligationsränta i %)
3. USDSEK (Växelkurs USD till SEK)
4. EURSEK (Växelkurs EUR till SEK)
5. OMX30 (Aktuellt indexvärde för OMX Stockholm 30)
6. Inflation (Senaste KPI-inflationstakten i USA i %)

Svara EXAKT i detta JSON-format:
{
  "US10Y": number,
  "SE10Y": number,
  "USDSEK": number,
  "EURSEK": number,
  "OMX30": number,
  "Inflation": number
}`;

  console.log("Calling Gemini with search grounding...");
  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    console.log("Raw Response text:");
    console.log(response.text());
    
    // Check search metadata
    const candidates = (response as any).candidates;
    if (candidates && candidates[0]?.groundingMetadata) {
      console.log("Grounding metadata keys:", Object.keys(candidates[0].groundingMetadata));
    }
  } catch (err: any) {
    console.error("Gemini Error:", err.message);
  }
}

test();
