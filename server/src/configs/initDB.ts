import { Pool } from "pg";
import { config } from "dotenv";
config();

const connectDB = async () => {
  try {
    const pool: Pool = new Pool();
    console.log('before',pool);
    
    const client = await pool.connect();
    console.log('after',client);

    return client;
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error: ${error.message}`);
      process.exit(1);
    }
  }
};


export { connectDB };
