import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const analyses = await prisma.analysis.findMany({
    select: {
      id: true,
      ticker: true,
      companyName: true,
      version: true,
      isCurrent: true,
      createdAt: true
    }
  });
  console.log("Analyses in DB:", JSON.stringify(analyses, null, 2));
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
