import { Client } from 'pg';
import { config } from 'dotenv';
import RequestError from '../types/errors/RequestError';
import STATUS_CODES from '../utils/StatusCodes';
config();

export const connectDB = async () => {
  const client: Client = new Client();

  await client.connect();

  if (!client) {
    throw new RequestError(
      'Could not connect to DB',
      STATUS_CODES.INTERNAL_SERVER_ERROR
    );
  }

  return client;
};