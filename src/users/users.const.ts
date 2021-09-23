export interface User {
  userId: number;
  username: string;
  password?: string;
}

export const users: User[] = [
  {
    userId: 0,
    username: 'admin',
    password: 'admin',
  },
  {
    userId: 1,
    username: 'robert',
    password: 'weakpassword',
  },
];
