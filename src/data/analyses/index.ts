import { AnalysisData } from "../../types/analysis.js";
import { investorAb } from "./investor/investor-ab.js";
import { sbb } from "./sbb/sbb.js";
import { nvidiaFy2026 } from "./nvidia/nvidia-fy2026.js";
import { apple } from "./apple/apple.js";
import { microsoft } from "./microsoft/microsoft.js";
import { novoNordisk } from "./novo-nordisk/novo-nordisk.js";
import { volvo } from "./volvo/volvo.js";
import { alphabet } from "./alphabet/alphabet.js";
import { evolution2025 } from "./evolution/evolution-2025.js";
import { swedbank2025 } from "./swedbank/swedbank-2025.js";
import { handelsbanken2025 } from "./handelsbanken/handelsbanken-2025.js";
import { ericsson2025 } from "./ericsson/ericsson-2025.js";
import { newWaveGroup2025 } from "./new-wave-group/new-wave-group.js";
import { aqGroup } from "./aq-group/aq-group.js";
import { nibe2026 } from "./nibe/nibe-2026.js";
import { nordea2026 } from "./nordea/nordea-bank-2026.js";
import { saab2026 } from "./saab/saab-2026.js";

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
  "ericsson-2025": ericsson2025,
  "handelsbanken-2025": handelsbanken2025,
  "new-wave-group-april-2026": newWaveGroup2025,
  "aq-group": aqGroup,
  "nibe-industrier-2026": nibe2026,
  "nordea-bank-2026": nordea2026,
  "saab-2026": saab2026,
};

export type { AnalysisData, AIDrivenAnalysis } from "../../types/analysis.js";
