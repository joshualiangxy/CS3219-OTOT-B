import { MongoDBConfig } from './mongoose.config';

interface Config {
  port: number;
  corsOrigin?: string;
  mongodb: MongoDBConfig;
  jwtSecret: string;
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
  jwtSecret: process.env.JWT_SECRET,
});

export default config;
