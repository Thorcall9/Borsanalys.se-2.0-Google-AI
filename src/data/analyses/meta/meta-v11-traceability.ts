/**
 * Intern v11-proveniens för den låsta Meta-artikeln.
 * Den redaktionella texten finns endast i meta-analysis-content.md.
 */
export const META_V11_TRACEABILITY = {
  articleVersion: "meta-v11-2026-08-02",
  canonicalContent: "src/data/analyses/meta/meta-analysis-content.md",
  publicationState: "published",
  overviewFact: "Analysen använder en låst v11-modell. Varje framtida rapportkommentar ska jämföras mot den dokumenterade NTM-modellen, de låsta scenarierna och tesbrytarna i denna artikel.",
  publicNote: "Källor, normaliseringspolicy, scenarioantaganden och faktakontroll finns i artikelns egna avsnitt. Versionsnyckel: meta-v11-2026-08-02. Nästa rapportuppföljning ska ange vilka rapporterade utfall som bekräftar, försvagar eller bryter de mätbara teserna.",
  sourceRegister: [
    { id: "META-10K-2025", document: "Meta Platforms 2025 Form 10-K", use: "Femårshistorik, kapitalallokering och risker" },
    { id: "META-Q1-2026", document: "Meta Platforms Q1 2026 Form 10-Q", use: "Senaste rapporterade balans- och kassaflödesunderlag före Q2" },
    { id: "META-Q2-2026", document: "Meta Platforms Q2 2026 earnings release", use: "Q2-resultat, KPI:er, segment och guidance" },
  ],
  lockedPolicies: [
    "Base-skatt: 17 %.",
    "Avgångskostnaden återläggs; juridiska kostnader behålls i base.",
    "Värderingshorisont: 31 december 2031, 5,42 år.",
    "Scenario-sannolikheter: 30 % / 50 % / 20 %.",
  ],
} as const;
