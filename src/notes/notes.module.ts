import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import NotesController from './notes.controller';
import NotesRepository from './notes.repository';
import { Note, NoteSchema } from './notes.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Note.name, schema: NoteSchema }])
  ],
  controllers: [NotesController],
  providers: [NotesRepository],
  exports: [NotesRepository]
})
export default class NotesModule { }
