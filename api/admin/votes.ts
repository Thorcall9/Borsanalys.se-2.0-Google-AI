import type { Request, Response } from 'express';
import { prisma } from '../../src/lib/prisma.ts';

export default async function handler(req: Request, res: Response) {
  try {
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

    const result = votes.map(v => ({
      stock: v.stock,
      count: v._count.stock
    }));

    return res.status(200).json(result);
  } catch (error: any) {
    console.error('Admin Votes Fetch Error production:', error.message);
    return res.status(500).json({ error: "Kunde inte hämta röstresultat." });
  }
}
