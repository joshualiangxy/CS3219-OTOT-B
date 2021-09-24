import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import * as redisStore from 'cache-manager-redis-store';
import AppController from './app.controller';
import CacheExampleModule from './cache-example/cache-example.module';
import config, { CacheConfig } from './config';
import MongooseConfigService from './config/mongoose.config';
import NotesModule from './notes/notes.module';

@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (serviceConfig: ConfigService) => {
        const { host, port, ttl }: CacheConfig =
          serviceConfig.get<CacheConfig>('cacheConfig');

        return { ttl, store: redisStore, port, host };
      },
    }),
    ConfigModule.forRoot({ load: [config] }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useClass: MongooseConfigService,
    }),
    NotesModule,
    CacheExampleModule,
  ],
  controllers: [AppController],
  providers: [MongooseConfigService],
})
export class AppModule {}
