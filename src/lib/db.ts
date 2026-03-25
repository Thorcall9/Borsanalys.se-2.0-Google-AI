import pg from 'pg';

const { Pool } = pg;

// Lazy initialization to prevent crash if DATABASE_URL is missing on startup
let pool: pg.Pool | null = null;

export function getDb() {
  if (!pool) {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error('DATABASE_URL environment variable is missing. Please add it in the AI Studio settings.');
    }
    pool = new Pool({
      connectionString,
      ssl: {
        rejectUnauthorized: false // Required for Neon
      }
    });
  }
  return pool;
}

// Helper to run queries
export async function query(text: string, params?: any[]) {
  const db = getDb();
  return db.query(text, params);
}
