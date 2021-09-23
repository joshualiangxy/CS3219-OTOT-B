import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import AuthModule from './auth/auth.module';
import config from './config';
import MongooseConfigService from './config/mongoose.config';
import NotesModule from './notes/notes.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [config] }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useClass: MongooseConfigService,
    }),
    NotesModule,
    AuthModule,
  ],
  controllers: [],
  providers: [MongooseConfigService],
})
export class AppModule {}
