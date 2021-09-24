import {
  BadRequestException,
  CACHE_MANAGER,
  Controller,
  Get,
  Inject,
  Param,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { Error as MongooseError } from 'mongoose';
import CacheExampleRepository from './cache-example/cache-example.repository';
import { CacheExample } from './cache-example/cache-example.schema';

const BIG_JSON_CACHE_KEY = 'big-json-cache-key';

@Controller()
export default class AppController {
  public constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly repositoryCacheExample: CacheExampleRepository,
  ) {}

  @Get('/big-json/:id')
  public async getBigJson(@Param('id') id: string): Promise<CacheExample> {
    try {
      let result: CacheExample = await this.cacheManager.get(
        BIG_JSON_CACHE_KEY,
      );

      if (!result) result = await this.repositoryCacheExample.get(id);

      await this.cacheManager.set(BIG_JSON_CACHE_KEY, result);

      return result;
    } catch (err) {
      if (err instanceof MongooseError.CastError)
        throw new BadRequestException(err);

      throw err;
    }
  }
}
