import { Pool } from 'pg';
import { config } from 'dotenv';
import RequestError from '../types/errors/RequestError';
import STATUS_CODES from '../utils/StatusCodes';
config();

export const connectDB = async () => {
  const pool: Pool = new Pool({connectionString:"postgres://bjcemgwu:110BEzC3ZoXSgxJ2f5RlEer1pKKmPbnb@berry.db.elephantsql.com/bjcemgwu"});

  const client = await pool.connect();
  if (!client) {
    throw new RequestError(
      'Could not connect to DB',
      STATUS_CODES.INTERNAL_SERVER_ERROR
    );
  }

  return client;
};
