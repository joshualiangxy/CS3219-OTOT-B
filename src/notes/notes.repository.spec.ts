import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateNoteDto, UpdateNoteDto } from './notes.dto';
import NotesRepository from './notes.repository';
import { Note } from './notes.schema';

const modelNote: any = jest.fn();
const createdNote = { save: jest.fn() };

describe('/src/notes/notes.repository', () => {
  let repositoryNotes: NotesRepository;

  beforeAll(async () => {
    modelNote.find = jest.fn();
    modelNote.findById = jest.fn();
    modelNote.findOneAndUpdate = jest.fn();
    modelNote.findOneAndDelete = jest.fn();

    const moduleNotes: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getModelToken(Note.name),
          useValue: modelNote,
        },
        NotesRepository,
      ],
    }).compile();

    repositoryNotes = moduleNotes.get<NotesRepository>(NotesRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('#findAll', () => {
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

    it('should find all note documents', async () => {
      modelNote.find.mockReturnValue(expectedResult);

      const result = await repositoryNotes.findAll();

      expect(modelNote.find).toHaveBeenCalledTimes(1);
      expect(modelNote.find).toHaveBeenLastCalledWith();

      expect(result).toStrictEqual(expectedResult);
    });
  });

  describe('#findById', () => {
    const expectedResult = {
      _id: '1',
      title: 'title 1',
      comment: 'comment 1',
    };

    it('should find all note documents', async () => {
      modelNote.findById.mockReturnValue(expectedResult);

      const result = await repositoryNotes.findById(expectedResult._id);

      expect(modelNote.findById).toHaveBeenCalledTimes(1);
      expect(modelNote.findById).toHaveBeenLastCalledWith(expectedResult._id);

      expect(result).toStrictEqual(expectedResult);
    });
  });

  describe('#findOneAndUpdate', () => {
    let updateNoteDto: UpdateNoteDto;

    beforeEach(() => {
      updateNoteDto = { _id: '2' };
    });

    describe('when both title and comment included', () => {
      const updatedNote = {
        _id: '2',
        title: 'updated title',
        comment: 'updated comment',
      };

      it('should find one note document and update title and comment', async () => {
        updateNoteDto.title = updatedNote.title;
        updateNoteDto.comment = updatedNote.comment;

        modelNote.findOneAndUpdate.mockReturnValue(updatedNote);

        const result = await repositoryNotes.findOneAndUpdate(updatedNote);

        expect(modelNote.findOneAndUpdate).toHaveBeenCalledTimes(1);
        expect(modelNote.findOneAndUpdate).toHaveBeenLastCalledWith(
          { _id: updateNoteDto._id },
          {
            title: updateNoteDto.title,
            comment: updateNoteDto.comment,
          },
          { new: true },
        );

        expect(result).toStrictEqual(updatedNote);
      });
    });

    describe('when only title included', () => {
      const updatedNote = {
        _id: '2',
        title: 'updated title',
      };

      it('should find one note document and update title', async () => {
        updateNoteDto.title = updatedNote.title;

        modelNote.findOneAndUpdate.mockReturnValue(updatedNote);

        const result = await repositoryNotes.findOneAndUpdate(updatedNote);

        expect(modelNote.findOneAndUpdate).toHaveBeenCalledTimes(1);
        expect(modelNote.findOneAndUpdate).toHaveBeenLastCalledWith(
          { _id: updateNoteDto._id },
          { title: updateNoteDto.title },
          { new: true },
        );

        expect(result).toStrictEqual(updatedNote);
      });
    });

    describe('when only comment included', () => {
      const updatedNote = {
        _id: '2',
        comment: 'updated comment',
      };

      it('should find one note document and update title', async () => {
        updateNoteDto.comment = updatedNote.comment;

        modelNote.findOneAndUpdate.mockReturnValue(updatedNote);

        const result = await repositoryNotes.findOneAndUpdate(updatedNote);

        expect(modelNote.findOneAndUpdate).toHaveBeenCalledTimes(1);
        expect(modelNote.findOneAndUpdate).toHaveBeenLastCalledWith(
          { _id: updateNoteDto._id },
          { comment: updateNoteDto.comment },
          { new: true },
        );

        expect(result).toStrictEqual(updatedNote);
      });
    });
  });

  describe('#create', () => {
    it('should create note document', async () => {
      const createNoteDto: CreateNoteDto = { title: 'abc', comment: '123' };

      modelNote.mockReturnValue(createdNote);
      await repositoryNotes.create({ title: 'abc', comment: '123' });

      expect(modelNote).toHaveBeenCalledTimes(1);
      expect(modelNote).toHaveBeenLastCalledWith(createNoteDto);

      expect(createdNote.save).toHaveBeenCalledTimes(1);
      expect(createdNote.save).toHaveBeenLastCalledWith();
    });
  });

  describe('#findOneAndDelete', () => {
    it('should find one note document and delete', async () => {
      const deletedNote = {
        _id: '1',
        title: 'title',
        comment: 'comment',
      };

      modelNote.findOneAndDelete.mockReturnValue(deletedNote);
      const result = await repositoryNotes.findOneAndDelete(deletedNote._id);

      expect(modelNote.findOneAndDelete).toHaveBeenCalledTimes(1);
      expect(modelNote.findOneAndDelete).toHaveBeenLastCalledWith({
        _id: deletedNote._id,
      });

      expect(result).toStrictEqual(deletedNote);
    });
  });
});
