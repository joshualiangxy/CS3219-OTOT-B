import isNil from 'lodash/isNil';
import { MongoDBConfig } from './mongoose.config';

export interface CacheConfig {
  host: string;
  port: number;
  ttl: number;
}

interface Config {
  port: number;
  corsOrigin?: string;
  mongodb: MongoDBConfig;
  cacheConfig: CacheConfig;
}

const config = (): Config => ({
  port: parseInt(process.env.LISTEN_PORT, 10) || 8080,
  corsOrigin: process.env.CORS_ORIGIN,
  mongodb: {
    host: process.env.MONGODB_HOST || 'localhost',
    protocol: process.env.MONGODB_PROTOCOL || 'mongodb',
    database: process.env.MONGODB_DATABASE,
    username: process.env.MONGODB_USERNAME,
    password: process.env.MONGODB_PASSWORD || '',
  },
  cacheConfig: {
    host: process.env.REDIS_HOST || 'localhost',
    port: isNil(process.env.REDIS_PORT)
      ? 6379
      : parseInt(process.env.REDIS_PORT),
    ttl: isNil(process.env.REDIS_TTL) ? 5 : parseInt(process.env.REDIS_TTL),
  },
});

export default config;
