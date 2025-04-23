export interface User {
  id: number;
  username: string;
  isAdmin?: boolean;
}

export let users: User[] = [
  { id: 1, username: 'admin', isAdmin: true },
  { id: 2, username: 'user1' },
  { id: 3, username: 'user2' },
];
