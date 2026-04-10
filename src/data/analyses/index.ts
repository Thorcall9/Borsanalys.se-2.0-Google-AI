import { AnalysisData } from "../../types/analysis";
import { investorAb } from "./investor/investor-ab";
import { sbb } from "./sbb/sbb";
import { nvidiaFy2026 } from "./nvidia/nvidia-fy2026";
import { apple } from "./apple/apple";
import { microsoft } from "./microsoft/microsoft";
import { novoNordisk } from "./novo-nordisk/novo-nordisk";
import { volvo } from "./volvo/volvo";
import { alphabet } from "./alphabet/alphabet";
import { evolution2025 } from "./evolution/evolution-2025";
import { swedbank2025 } from "./swedbank/swedbank-2025";

export const analyses: Record<string, AnalysisData> = {
  "investor-ab": investorAb,
  "sbb": sbb,
  "nvidia-fy2026": nvidiaFy2026,
  "apple": apple,
  "microsoft": microsoft,
  "novo-nordisk": novoNordisk,
  "volvo": volvo,
  "alphabet": alphabet,
  "evolution-2025": evolution2025,
  "swedbank-2025": swedbank2025,
};

export type { AnalysisData, AIDrivenAnalysis } from "../../types/analysis";
