import type { AnalysisData } from "../../../types/analysis.js";
import dossier from "./aq-q3-2026-dossier.json";

/** Canonical projection, prepared and verified from the immutable r2 dossier. */
export const aqQ32026 = dossier.presentation as AnalysisData;
export const aqDossier = dossier;
