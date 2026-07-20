const REVIEWED_MIGRATIONS = {
  apple: { from: "AVVAKTA", to: "BEVAKA" },
  "axfood-q1-2026": { from: "AVVAKTA", to: "BEVAKA" },
};

export function mapLegacyRecommendationForMigration({ slug, recommendation }) {
  const migration = REVIEWED_MIGRATIONS[slug];
  if (!migration || migration.from !== recommendation) return null;
  return migration.to;
}
