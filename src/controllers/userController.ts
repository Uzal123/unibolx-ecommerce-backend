import { Request, Response, NextFunction } from 'express';
import userService from '../services/userService';

/**
 * Login handler for user authentication.
 *
 * This function checks the request body for a 'username', validates it,
 * and attempts to log the user in by calling the user service. It returns
 * appropriate responses based on the success or failure of the login attempt.
 *
 * @param req - The HTTP request object containing the login data (username)
 * @param res - The HTTP response object used to send back the response
 * @param next - A function that passes control to the next middleware or error handler
 */
export const login = async (
  req: Request, // The request object containing the user input data
  res: Response, // The response object used to send the response back to the client
  next: NextFunction, // The next middleware or error handler in the chain
) => {
  try {
    // Extract 'username' from the request body
    const { username } = req.body;

    // Check if the 'username' field is present in the request body
    if (!username) {
      res.status(400).json({ message: 'Missing required fields' });
      return; // Stop execution and send a response if the username is missing
    }

    // Validate that the 'username' is a string
    if (typeof username !== 'string') {
      res.status(400).json({ message: 'Invalid input data' });
      return; // Stop execution and send a response if the username is not a valid string
    }

    // Call the user service to attempt login with the provided username
    const user = await userService.login(username);

    // If login is successful, respond with the user object and status 201 (Created)
    res.status(201).json(user);
  } catch (error) {
    // If an error occurs, pass it to the error handling middleware
    next(error);
  }
};
