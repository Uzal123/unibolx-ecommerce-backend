import { User, users } from '../models/user';

/**
 * Logs in a user by username.
 *
 * - If a user with the given username exists, it returns that user.
 * - If the user does not exist, a new one is created, added to the `users` array, and returned.
 *
 * @param username - The username of the user trying to log in.
 * @returns The existing or newly created User object.
 */
const login = (username: string): User => {
  // Search for a user in the in-memory store by username
  const user = users.find((user) => user.username === username);

  if (!user) {
    // Create a new user if not found
    const newUser: User = {
      id: users.length + 1, // Assign a new unique ID based on array length
      username: username,
      isAdmin: false, // Default role: regular user
    };

    // Add the new user to the in-memory users array
    users.push(newUser);

    return newUser;
  }

  // Return the existing user if found
  return user;
};

// Service object exposing user-related logic
const userService = {
  login,
};

export default userService;
