import { env } from './env.config.js';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

const sql = neon(env.DATABASE_URL);

const db = drizzle(sql);

export { sql, db };
