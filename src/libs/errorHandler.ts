import { Request, Response, NextFunction } from 'express';

// Define a custom error interface that extends the standard Error object,
// allowing for an optional 'status' property for HTTP status codes.
export interface AppError extends Error {
  status?: number; // Optional HTTP status code for the error
}

// Error handler middleware for Express.
// This function is used to catch and handle errors in your application.
export const errorHandler = (
  err: AppError, // The error object that was thrown
  req: Request, // The request object that contains information about the HTTP request
  res: Response, // The response object that is used to send back the HTTP response
  next: NextFunction, // A callback function to pass control to the next middleware (if any)
) => {
  console.error(err); // Log the error to the console for debugging

  // Send a response with the appropriate HTTP status code and error message.
  // If no status is provided, it defaults to 500 (Internal Server Error).
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error', // Provide the error message or a default one
  });
};
