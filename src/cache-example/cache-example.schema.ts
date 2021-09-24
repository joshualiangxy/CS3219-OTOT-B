import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
class Friend {
  @Prop()
  id: string;

  @Prop()
  name: string;
}

@Schema()
class Data {
  @Prop()
  _id: string;

  @Prop()
  index: number;

  @Prop()
  guid: string;

  @Prop()
  isActive: boolean;

  @Prop()
  balance: string;

  @Prop()
  picture: string;

  @Prop()
  age: number;

  @Prop()
  eyeColor: string;

  @Prop()
  name: string;

  @Prop()
  gender: string;

  @Prop()
  company: string;

  @Prop()
  email: string;

  @Prop()
  phone: string;

  @Prop()
  address: string;

  @Prop()
  about: string;

  @Prop()
  registered: string;

  @Prop()
  latitude: number;

  @Prop()
  longitude: number;

  @Prop()
  tags: string[];

  @Prop()
  friends: Friend[];

  @Prop()
  greeting: string;

  @Prop()
  favoriteFruit: string;
}

@Schema({ collection: 'cache-example' })
export class CacheExample {
  @Prop()
  val: Data[];
}

export type CacheExampleDocument = CacheExample & Document;

export const CacheExampleSchema = SchemaFactory.createForClass(CacheExample);
