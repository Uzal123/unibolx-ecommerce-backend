import dotenv from 'dotenv';

dotenv.config();

interface Config {
  port: number;
  nodeEnv: string;
  discountFrequency: number;
}

const config: Config = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  discountFrequency: Number(process.env.DISCOUNT_FREQUENCY) || 5, // Every 5th order gets a discount
};

export default config;
