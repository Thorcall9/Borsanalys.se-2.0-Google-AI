import { prisma } from './prisma.ts';

/**
 * Notifierings-service (Backend)
 * Skapar notifieringar för alla användare som bevakar en viss aktie/ticker.
 */

export type NotificationType = 
  | 'new_analysis' 
  | 'updated_analysis' 
  | 'target_changed' 
  | 'verdict_changed';

interface CreateNotificationParams {
  ticker: string;
  type: NotificationType;
  title: string;
  message: string;
}

export async function createTickerNotifications({ 
  ticker, 
  type, 
  title, 
  message 
}: CreateNotificationParams) {
  try {
    // 1. Hitta alla användare som har denna ticker i sin bevakningslista
    const watchers = await prisma.watchlist.findMany({
      where: {
        ticker: ticker.toUpperCase(),
      },
      select: {
        userId: true,
      },
    });

    if (watchers.length === 0) {
      console.log(`[NOTIFICATIONS] Inga användare bevakar ${ticker}. Notis skapades inte.`);
      return { success: true, count: 0 };
    }

    // 2. Skapa notifieringar för alla dessa användare
    // Vi använder createMany för effektivitet
    const notifications = watchers.map((w) => ({
      userId: w.userId,
      ticker: ticker.toUpperCase(),
      type: type,
      title: title,
      message: message,
      isRead: false,
    }));

    const result = await prisma.notification.createMany({
      data: notifications,
    });

    console.log(`[NOTIFICATIONS] Skapade ${result.count} notifieringar för ${ticker} (typ: ${type})`);
    return { success: true, count: result.count };
  } catch (error) {
    console.error(`[NOTIFICATIONS ERROR] Misslyckades att skapa notifieringar för ${ticker}:`, error);
    throw error;
  }
}
