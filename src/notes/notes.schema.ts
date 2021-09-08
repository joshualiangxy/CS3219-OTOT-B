import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Note {
  @Prop({ required: true })
  title: string;

  @Prop()
  comment: string;
}

export type NoteDocument = Note & Document;

export const NoteSchema = SchemaFactory.createForClass(Note);
