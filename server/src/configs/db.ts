import { Pool } from 'pg';
import { config } from 'dotenv';
import RequestError from '../types/errors/RequestError';
import STATUS_CODES from '../utils/StatusCodes';
config();


export const connectDB = async () => {
  const pool: Pool = new Pool({
    connectionString: 'postgres://vtribdjj:APfzm0b6_f2F7s9-W_LaDWq2o7e01DrQ@surus.db.elephantsql.com/vtribdjj',
    max: 10000,
    maxUses: 10000
  });
  try {
    await pool.connect();
    if (!pool) {
      throw new RequestError(
        'Could not connect to DB',
        STATUS_CODES.INTERNAL_SERVER_ERROR
      );
    }
    return pool;
  } catch (err) {
    console.log('Error connecting to DB');
  }
};