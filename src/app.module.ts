import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from './app.service';
import config from './config';
import MongooseConfigService from './config/mongoose.config';
import NotesModule from './notes/notes.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [config] }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useClass: MongooseConfigService
    }),
    NotesModule
  ],
  controllers: [],
  providers: [AppService, MongooseConfigService]
})
export class AppModule { }
