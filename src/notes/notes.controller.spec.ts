import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Error as MongooseError } from 'mongoose';
import NotesController from './notes.controller';
import { CreateNoteDto, UpdateNoteDto } from './notes.dto';
import NotesRepository from './notes.repository';

const repositoryNotes = {
  create: jest.fn(),
  findAll: jest.fn(),
  findById: jest.fn(),
  findOneAndDelete: jest.fn(),
  findOneAndUpdate: jest.fn(),
};

describe('/src/notes/notes.controller', () => {
  let controllerNotes: NotesController;

  beforeAll(async () => {
    const moduleNotes: TestingModule = await Test.createTestingModule({
      controllers: [NotesController],
      providers: [NotesRepository],
    })
      .overrideProvider(NotesRepository)
      .useValue(repositoryNotes)
      .compile();

    controllerNotes = moduleNotes.get<NotesController>(NotesController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('#listNotes', () => {
    describe('when notes found', () => {
      const expectedResult = [
        {
          _id: '1',
          title: 'title 1',
          comment: 'comment 1',
        },
        {
          _id: '2',
          title: 'title 2',
          comment: 'comment 2',
        },
      ];

      it('should return all notes', async () => {
        repositoryNotes.findAll.mockResolvedValue(expectedResult);

        const result = await controllerNotes.listNotes();

        expect(repositoryNotes.findAll).toHaveBeenCalledTimes(1);
        expect(repositoryNotes.findAll).toHaveBeenLastCalledWith();

        expect(result).toStrictEqual(expectedResult);
      });
    });

    describe('when error thrown', () => {
      it('should throw error', () => {
        repositoryNotes.findAll.mockRejectedValue(new Error('test error'));

        expect(() => controllerNotes.listNotes()).rejects.toThrow(
          new Error('test error'),
        );
      });
    });
  });

  describe('#getNote', () => {
    describe('when note found', () => {
      const expectedResult = {
        _id: '1',
        title: 'title',
        comment: 'comment',
      };

      it('should return found note', async () => {
        repositoryNotes.findById.mockResolvedValue(expectedResult);

        const result = await controllerNotes.getNote(expectedResult._id);

        expect(repositoryNotes.findById).toHaveBeenCalledTimes(1);
        expect(repositoryNotes.findById).toHaveBeenLastCalledWith(
          expectedResult._id,
        );

        expect(result).toStrictEqual(expectedResult);
      });
    });

    describe('when id is invalid ObjectId', () => {
      it('should throw BadRequestException', () => {
        const noteId = '1';
        const thrownMongooseError = new MongooseError.CastError(
          'string',
          noteId,
          '_id',
        );

        repositoryNotes.findById.mockRejectedValue(thrownMongooseError);

        expect(() => controllerNotes.getNote(noteId)).rejects.toThrow(
          new BadRequestException(thrownMongooseError),
        );
      });
    });

    describe('when generic error thrown', () => {
      it('should throw error', () => {
        repositoryNotes.findById.mockRejectedValue(new Error('test error'));

        expect(() => controllerNotes.getNote('1')).rejects.toThrow(
          new Error('test error'),
        );
      });
    });
  });

  describe('#createNote', () => {
    describe('when valid note provided', () => {
      const createNoteDto: CreateNoteDto = {
        title: 'test title',
        comment: 'test comment',
      };

      it('should create note', async () => {
        await controllerNotes.createNote(createNoteDto);

        expect(repositoryNotes.create).toHaveBeenCalledTimes(1);
        expect(repositoryNotes.create).toHaveBeenLastCalledWith(createNoteDto);
      });
    });
  });

  describe('#updateNote', () => {
    describe('when valid update', () => {
      const updateNoteDto: UpdateNoteDto = {
        _id: '1',
        title: 'title',
        comment: 'comment',
      };
      const expectedResult = {
        _id: '1',
        title: 'title',
        comment: 'comment',
      };

      it('should update note', async () => {
        repositoryNotes.findOneAndUpdate.mockResolvedValue(updateNoteDto);

        const result = await controllerNotes.updateNote(updateNoteDto);

        expect(repositoryNotes.findOneAndUpdate).toHaveBeenCalledTimes(1);
        expect(repositoryNotes.findOneAndUpdate).toHaveBeenLastCalledWith(
          updateNoteDto,
        );

        expect(result).toStrictEqual(expectedResult);
      });
    });

    describe('when _id not provided', () => {
      const updateNoteDto: UpdateNoteDto = { _id: null };

      it('should throw BadRequestException', () => {
        expect(() => controllerNotes.updateNote(updateNoteDto)).rejects.toThrow(
          new BadRequestException('_id required for update'),
        );
      });
    });

    describe('when no update field provided', () => {
      const updateNoteDto: UpdateNoteDto = { _id: '1' };

      it('should throw BadRequestException', () => {
        expect(() => controllerNotes.updateNote(updateNoteDto)).rejects.toThrow(
          new BadRequestException('No update fields specified'),
        );
      });
    });
  });

  describe('#deleteNote', () => {
    describe('when id is valid', () => {
      it('should delete note', async () => {
        const deletedNote = {
          _id: '1',
          title: 'title',
          comment: 'comment',
        };

        repositoryNotes.findOneAndDelete.mockResolvedValue(deletedNote);

        const result = await controllerNotes.deleteNote(deletedNote._id);

        expect(repositoryNotes.findOneAndDelete).toHaveBeenCalledTimes(1);
        expect(repositoryNotes.findOneAndDelete).toHaveBeenLastCalledWith(
          deletedNote._id,
        );

        expect(result).toStrictEqual(deletedNote);
      });
    });

    describe('when id is invalid ObjectId', () => {
      it('should throw BadRequestException', () => {
        const noteId = '1';
        const thrownMongooseError = new MongooseError.CastError(
          'string',
          noteId,
          '_id',
        );

        repositoryNotes.findOneAndDelete.mockRejectedValue(thrownMongooseError);

        expect(() => controllerNotes.deleteNote(noteId)).rejects.toThrow(
          new BadRequestException(thrownMongooseError),
        );
      });
    });
  });
});
