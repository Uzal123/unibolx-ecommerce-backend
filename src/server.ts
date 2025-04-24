// Import the main Express application instance
import app from './app';

// Import the configuration settings (e.g., port number, environment variables, etc.)
import config from './config/config';

/**
 * Starts the Express server on the configured port.
 * Once the server is running, logs a confirmation message to the console.
 */
app.listen(config.port, () => {
  // Log that the server is up and running on the specified port
  console.log(`Server running on port ${config.port}`);
});
