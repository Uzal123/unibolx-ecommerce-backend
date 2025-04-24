/**
 * Represents a user in the system with an optional admin flag.
 */
export interface User {
  id: number; // Unique identifier for the user
  username: string; // The username of the user
  isAdmin?: boolean; // Optional flag indicating if the user is an admin (default is false)
}

// Initial set of users in the system
export let users: User[] = [
  { id: 1, username: 'admin', isAdmin: true }, // Admin user
  { id: 2, username: 'user1' }, // Regular user
  { id: 3, username: 'user2' }, // Another regular user
];
