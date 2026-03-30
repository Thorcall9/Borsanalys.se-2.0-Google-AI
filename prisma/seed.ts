import { PrismaClient } from '@prisma/client'
import { analyses } from '../src/data/analyses'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting seeding...')
  
  for (const [slug, data] of Object.entries(analyses)) {
    if (!data.ticker) continue;

    const scores = data.scores || {
      affarsmodell: 0,
      strategiskMoat: 0,
      finansiellKvalitet: 0,
      vardering: 0,
      tillvaxtutsikter: 0,
      riskprofil: 0,
      esgMakro: 0,
      aiObservationer: 0
    };

    const totalRating = Object.values(scores).reduce((sum, val) => sum + val, 0);

    const analysis = await prisma.analysis.upsert({
      where: { ticker: data.ticker },
      update: {
        companyName: data.title,
        totalRating: totalRating,
        verdict: data.recommendation,
        moat: scores.strategiskMoat,
        management: scores.affarsmodell,
        financials: scores.finansiellKvalitet,
        valuation: scores.vardering,
        growth: scores.tillvaxtutsikter,
        profitability: scores.riskprofil,
        risk: scores.esgMakro,
        trend: scores.aiObservationer,
        analysisText: data.summary,
      },
      create: {
        ticker: data.ticker,
        companyName: data.title,
        totalRating: totalRating,
        verdict: data.recommendation,
        moat: scores.strategiskMoat,
        management: scores.affarsmodell,
        financials: scores.finansiellKvalitet,
        valuation: scores.vardering,
        growth: scores.tillvaxtutsikter,
        profitability: scores.riskprofil,
        risk: scores.esgMakro,
        trend: scores.aiObservationer,
        analysisText: data.summary,
      },
    })
    console.log(`Upserted analysis for: ${analysis.companyName} (${analysis.ticker})`)
  }
  
  console.log('Seeding finished.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
