import { config } from 'dotenv';

config({ path: `.env.${process.env.NODE_ENV ?? 'development'}.local` });

export const env = {
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  DATABASE_URL: process.env.DATABASE_URL,
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '1d',
  ARCJET_KEY: process.env.ARCJET_KEY,
};
