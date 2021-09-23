import Role from "src/auth/roles/role.enum";

export interface User {
  userId: number;
  roles: Role[];
  username: string;
  password?: string;
}

export const users: User[] = [
  {
    userId: 0,
    roles: [Role.Admin, Role.User],
    username: 'admin',
    password: 'admin',
  },
  {
    userId: 1,
    roles: [Role.User],
    username: 'robert',
    password: 'weakpassword',
  },
];
