import { PrismaClient } from '@prisma/client'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const prisma = new PrismaClient()

async function main() {
  console.log('Starting seeding...')
  
  const dataDir = path.join(__dirname, 'data')
  if (!fs.existsSync(dataDir)) {
    console.log('No data directory found. Skipping seeding.')
    return
  }

  const companies = fs.readdirSync(dataDir)

  for (const company of companies) {
    const companyDir = path.join(dataDir, company)
    if (!fs.statSync(companyDir).isDirectory()) continue

    const versions = fs.readdirSync(companyDir)
    for (const versionFile of versions) {
      if (!versionFile.endsWith('.ts')) continue

      const filePath = path.join(companyDir, versionFile)
      console.log(`Loading data from: ${filePath}`)
      
      // Use dynamic import for the data file
      const module = await import(`file://${filePath}`)
      const data = module.data as any

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

      const totalRating = (Object.values(scores) as any[]).reduce((sum: number, val: any) => sum + (typeof val === 'number' ? val : 0), 0);

      const analysis = await prisma.analysis.upsert({
        where: { 
          ticker_version: { 
            ticker: data.ticker, 
            version: data.version || 1 
          } 
        },
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
          isCurrent: data.isCurrent !== undefined ? data.isCurrent : true,
        },
        create: {
          ticker: data.ticker,
          version: data.version || 1,
          isCurrent: data.isCurrent !== undefined ? data.isCurrent : true,
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
      console.log(`Upserted analysis for: ${analysis.companyName} (${analysis.ticker}) v${analysis.version}`)
    }
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
