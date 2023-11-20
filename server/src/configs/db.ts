import { Pool } from 'pg';
import { config } from 'dotenv';
config();

export const connectDB = async () => {
  try {
    const pool: Pool = new Pool();

    const client = await pool.connect();

    return client;
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error: ${error.message}`);
      process.exit(1);
    }
  }
};
