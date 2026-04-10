import type { Request, Response } from 'express';
import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req: Request, res: Response) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({ error: 'title och description krävs' });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `Du är en erfaren börsstrateg som analyserar marknadshändelser för svenska investerare.

Händelse: "${title}"
Sammanfattning: "${description}"

Skriv en kortfattad djupanalys (max 3 meningar) om hur denna händelse specifikt påverkar börsen och vilka konkreta åtgärder en investerare bör överväga. 
Var specifik, realistisk och nämn konkreta sektorer eller tillgångsslag.
Svara på svenska. Svara BARA med texten, inga JSON-omslag.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const insight = response.text().trim();

    return res.status(200).json({ insight });

  } catch (err: any) {
    console.error("[EVENT INSIGHT ERROR]", err.message);
    return res.status(500).json({
      error: "Kunde inte generera AI-insikt. Försök igen om en stund."
    });
  }
}
