import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { MongooseModuleOptions, MongooseOptionsFactory } from "@nestjs/mongoose";
import { format } from 'url';

export interface MongoDBConfig {
  host: string;
  database: string;
  username: string;
  password: string;
}

interface Options {
  uri: string;
  dbName: string;
  auth?: {
    username: string;
    password: string;
  },
}

@Injectable()
export default class MongooseConfigService implements MongooseOptionsFactory {
  public constructor(private readonly serviceConfig: ConfigService) { }

  public createMongooseOptions(): MongooseModuleOptions {
    const {
      host,
      username,
      password,
      database: dbName
    } = this.serviceConfig.get<MongoDBConfig>('mongodb');
    const options: Options = {
      uri: format({
        protocol: 'mongodb',
        slashes: true,
        host
      }),
      dbName
    };

    if (username) options.auth = { username, password };

    return options;
  }
}
