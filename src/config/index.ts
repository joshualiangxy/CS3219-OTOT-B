import { MongoDBConfig } from "./mongoose.config";

interface Config {
  port: number;
  mongodb: MongoDBConfig;
}

const config = (): Config => ({
  port: parseInt(process.env.LISTEN_PORT, 10) || 8080,
  mongodb: {
    host: process.env.MONGODB_HOST || 'localhost',
    port: process.env.MOGODB_PORT || '27017',
    database: process.env.MONGODB_DATABASE,
    username: process.env.MONGODB_USERNAME,
    password: process.env.MONGODB_PASSWORD || ''
  }
});

export default config;
