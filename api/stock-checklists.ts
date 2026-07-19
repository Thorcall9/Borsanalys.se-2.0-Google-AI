import { Request, Response } from "express";
import { auth, initError } from "./lib/firebaseAdmin.js";
import { prisma } from "../src/lib/prisma.js";
import { STOCK_CHECKLIST_QUESTIONS } from "../src/data/stockChecklist.js";

const answerValues = new Set(["yes", "uncertain", "no"]);
const questionIds = new Set(STOCK_CHECKLIST_QUESTIONS.map((question) => question.id));

function cleanPayload(body: any) {
  const companyName = typeof body.companyName === "string" ? body.companyName.trim().slice(0, 120) : "";
  const ticker = typeof body.ticker === "string" ? body.ticker.trim().toUpperCase().slice(0, 12) : null;
  const answers: Record<string, string> = {};
  const notes: Record<string, string> = {};
  for (const [id, answer] of Object.entries(body.answers || {})) if (questionIds.has(id) && typeof answer === "string" && answerValues.has(answer)) answers[id] = answer;
  for (const [id, note] of Object.entries(body.notes || {})) if (questionIds.has(id) && typeof note === "string") notes[id] = note.slice(0, 2000);
  return { companyName, ticker: ticker || null, sourceAnalysisSlug: typeof body.sourceAnalysisSlug === "string" ? body.sourceAnalysisSlug.trim().slice(0, 120) : null, answers, notes, status: body.status === "completed" ? "completed" : "started" };
}

export default async function stockChecklistsHandler(req: Request, res: Response) {
  if (initError) return res.status(500).json({ error: "Firebase Admin initieringsfel" });
  try {
    const header = req.headers.authorization;
    if (!header?.startsWith("Bearer ")) return res.status(401).json({ error: "Behörighet saknas. Logga in igen." });
    const decoded = await auth.verifyIdToken(header.slice(7));
    if (!decoded.uid || !decoded.email) return res.status(401).json({ error: "Ogiltig inloggning." });
    let user = await prisma.user.findUnique({ where: { firebaseUid: decoded.uid } });
    if (!user) user = await prisma.user.upsert({ where: { email: decoded.email }, update: { firebaseUid: decoded.uid }, create: { email: decoded.email, name: decoded.name || null, firebaseUid: decoded.uid } });
    const id = Number(req.query.id || req.body?.id || 0);
    if (req.method === "GET") {
      if (id) { const entry = await prisma.stockChecklist.findFirst({ where: { id, userId: user.id } }); return entry ? res.json(entry) : res.status(404).json({ error: "Checklistan hittades inte." }); }
      return res.json(await prisma.stockChecklist.findMany({ where: { userId: user.id }, orderBy: { updatedAt: "desc" } }));
    }
    if (req.method === "POST") {
      const payload = cleanPayload(req.body);
      if (!payload.companyName) return res.status(400).json({ error: "Ange ett bolag först." });
      const entry = await prisma.stockChecklist.create({ data: { ...payload, userId: user.id } });
      return res.status(201).json(entry);
    }
    if (req.method === "PUT") {
      if (!id) return res.status(400).json({ error: "Checklist-id saknas." });
      const payload = cleanPayload(req.body);
      if (!payload.companyName) return res.status(400).json({ error: "Ange ett bolag först." });
      const updated = await prisma.stockChecklist.updateMany({ where: { id, userId: user.id }, data: payload });
      return updated.count ? res.json({ success: true }) : res.status(404).json({ error: "Checklistan hittades inte." });
    }
    if (req.method === "DELETE") { if (!id) return res.status(400).json({ error: "Checklist-id saknas." }); const deleted = await prisma.stockChecklist.deleteMany({ where: { id, userId: user.id } }); return deleted.count ? res.json({ success: true }) : res.status(404).json({ error: "Checklistan hittades inte." }); }
    return res.status(405).json({ error: `Metod ${req.method} tillåts inte` });
  } catch (error) { console.error("[STOCK CHECKLIST API ERROR]", error); return res.status(500).json({ error: "Checklistan kunde inte hanteras just nu." }); }
}
