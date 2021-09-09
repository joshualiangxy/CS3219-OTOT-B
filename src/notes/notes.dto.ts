export interface CreateNoteDto {
  title: string;
  comment?: string;
}

export interface UpdateNoteDto {
  _id: string;
  title?: string;
  comment?: string;
}
