import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateNoteDto, UpdateNoteDto } from './notes.dto';
import { Note, NoteDocument } from './notes.schema';

@Injectable()
export default class NotesRepository {
  public constructor(
    @InjectModel(Note.name) private modelNote: Model<NoteDocument>,
  ) {}

  public async findAll(): Promise<Note[]> {
    return this.modelNote.find();
  }

  public async findById(id: string): Promise<Note> {
    return this.modelNote.findById(id);
  }

  public async findOneAndUpdate(updateNoteDto: UpdateNoteDto): Promise<Note> {
    const { _id, ...update } = updateNoteDto;

    return this.modelNote.findOneAndUpdate({ _id }, update, { new: true });
  }

  public async create(createNoteDto: CreateNoteDto): Promise<void> {
    const createdNote: NoteDocument = new this.modelNote(createNoteDto);

    await createdNote.save();
  }

  public async findOneAndDelete(id: string): Promise<Note> {
    return this.modelNote.findOneAndDelete({ _id: id });
  }
}
