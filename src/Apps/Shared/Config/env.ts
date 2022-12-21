import { config } from 'dotenv';
import { join } from 'path';

config({
  path: join(process.cwd(), `.env${process.env.NODE_ENV === 'test' ? '.test' : ''}`),
});

const isEnabled = (envVar: string): boolean => process.env[envVar] === 'true';

export const env = {
  nodeEnv: process.env?.NODE_ENV ?? 'DEV',
  isProduction: process.env.NODE_ENV === 'production',
  mongo: {
    mongoUri: process.env.MONGO_URI || 'mongodb://localhost/core',
    debug: isEnabled('MONGO_DEBUG'),
  },
  app: {
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
    domain: process.env.DOMAIN || 'localhost',
    baseUrl: process.env.BASE_URL || 'http://localhost:3000',
    cookieSecret: process.env.COOKIE_SECRET || 'cookie-secret',
    allowedOrigins: process.env.ALLOWED_ORIGINS?.split(',') || '*',
  },
  jwt: {
    privateKey: process.env.JWT_PRIVATE || 'jwt-private',
  },
};
