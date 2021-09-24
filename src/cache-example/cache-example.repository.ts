import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CacheExample, CacheExampleDocument } from './cache-example.schema';

@Injectable()
export default class CacheExampleRepository {
  public constructor(
    @InjectModel(CacheExample.name)
    private readonly modelCacheExample: Model<CacheExampleDocument>,
  ) {}

  public async get(id: string): Promise<CacheExample> {
    return this.modelCacheExample.findById(id);
  }
}
