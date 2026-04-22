import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    // Dynamic Prisma import for better Serverless Function compatibility
    const { PrismaClient } = await import('@prisma/client');
    const prisma = new PrismaClient();

    // Get vote counts per stock, grouped by stock string
    const votes = await prisma.vote.groupBy({
      by: ['stock'],
      _count: {
        stock: true
      },
      orderBy: {
        _count: {
          stock: 'desc'
        }
      }
    });

    await prisma.$disconnect();

    const result = votes.map(v => ({
      stock: v.stock,
      count: v._count.stock
    }));

    return res.status(200).json(result);
  } catch (error: any) {
    console.error('Admin Votes Fetch Error production:', error);
    return res.status(500).json({ error: "Kunde inte hämta röstresultat. Kontrollera DATABASE_URL." });
  }
}
