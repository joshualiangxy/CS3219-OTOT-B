import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';
import { Error as MongooseError } from 'mongoose';
import { CreateNoteDto, UpdateNoteDto } from './notes.dto';
import NotesRepository from './notes.repository';
import { Note } from './notes.schema';

@Controller('notes')
export default class NotesController {
  public constructor(private readonly repositoryNotes: NotesRepository) {}

  @Get()
  public async listNotes(): Promise<Note[]> {
    try {
      return await this.repositoryNotes.findAll();
    } catch (err) {
      throw err;
    }
  }

  @Get(':id')
  public async getNote(@Param('id') id: string): Promise<Note> {
    try {
      return await this.repositoryNotes.findById(id);
    } catch (err) {
      if (err instanceof MongooseError.CastError)
        throw new BadRequestException(err);

      throw err;
    }
  }

  @Post()
  @HttpCode(201)
  public async createNote(@Body() createNoteDto: CreateNoteDto): Promise<Note> {
    try {
      return await this.repositoryNotes.create(createNoteDto);
    } catch (err) {
      if (err instanceof MongooseError.ValidationError)
        throw new BadRequestException(err);

      throw err;
    }
  }

  @Put()
  public async updateNote(@Body() updateNoteDto: UpdateNoteDto) {
    try {
      const { _id, ...updates } = updateNoteDto;

      if (isNil(_id)) throw new BadRequestException('_id required for update');
      if (isEmpty(updates))
        throw new BadRequestException('No update fields specified');
      if (isEmpty(updates.title))
        throw new BadRequestException('Title required for update');

      return await this.repositoryNotes.findOneAndUpdate(updateNoteDto);
    } catch (err) {
      if (err instanceof MongooseError.ValidationError)
        throw new BadRequestException(err);

      throw err;
    }
  }

  @Delete(':id')
  public async deleteNote(@Param('id') id: string): Promise<Note> {
    try {
      return await this.repositoryNotes.findOneAndDelete(id);
    } catch (err) {
      if (err instanceof MongooseError.CastError)
        throw new BadRequestException(err);

      throw err;
    }
  }
}
