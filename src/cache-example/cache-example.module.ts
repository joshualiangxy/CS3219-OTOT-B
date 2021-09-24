import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import CacheExampleRepository from './cache-example.repository';
import { CacheExample, CacheExampleSchema } from './cache-example.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CacheExample.name, schema: CacheExampleSchema },
    ]),
  ],
  providers: [CacheExampleRepository],
  exports: [CacheExampleRepository],
})
export default class CacheExampleModule {}
