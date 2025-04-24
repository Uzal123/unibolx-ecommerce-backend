import { User, users } from '../models/user';

const login = (username: string): User => {
  const user = users.find((user) => user.username === username);
  if (!user) {
    const newUser: User = {
      id: users.length + 1,
      username: username,
      isAdmin: false,
    };
    users.push(newUser);
    return newUser;
  }
  return user;
};

const userService = {
  login,
};

export default userService;
