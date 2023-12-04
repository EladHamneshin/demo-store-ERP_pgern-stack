import { Client, Pool, PoolClient } from 'pg';
import { config } from 'dotenv';
import RequestError from '../types/errors/RequestError';
import STATUS_CODES from '../utils/StatusCodes';
config();

const pool: Pool = new Pool();

export const connectDB = async () => {

  const client: PoolClient = await pool.connect();

  if (!client) {
    throw new RequestError(
      'Could not connect to DB',
      STATUS_CODES.INTERNAL_SERVER_ERROR
    );
  }
  return client;
};