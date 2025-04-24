import dotenv from 'dotenv';

// Load environment variables from a .env file into process.env
dotenv.config();

// Define the structure of the configuration object
interface Config {
  port: number; // The port number the server will run on
  nodeEnv: string; // The environment the application is running in (development, production, etc.)
  discountFrequency: number; // The frequency at which discounts are applied (e.g., every 5th order)
}

// Configuration object that maps environment variables to the application configuration
const config: Config = {
  // The port the server should listen on (defaults to 3000 if not specified in environment variables)
  port: Number(process.env.PORT) || 3000,

  // The environment the application is running in (defaults to 'development' if not specified)
  nodeEnv: process.env.NODE_ENV || 'development',

  // The frequency at which a discount is applied (defaults to 5 if not specified)
  discountFrequency: Number(process.env.DISCOUNT_FREQUENCY) || 5, // Every 5th order gets a discount
};

// Export the configuration object to be used in other parts of the application
export default config;
