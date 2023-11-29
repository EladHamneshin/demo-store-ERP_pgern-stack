import { Client } from 'pg';
import { config } from 'dotenv';
import RequestError from '../types/errors/RequestError';
import STATUS_CODES from '../utils/StatusCodes';
config();

export const client: Client = new Client({
  connectionString: "postgres://vtribdjj:APfzm0b6_f2F7s9-W_LaDWq2o7e01DrQ@surus.db.elephantsql.com/vtribdjj"
});

export const connectDB = async () => {

  await client.connect();

  if (!client) {
    throw new RequestError(
      'Could not connect to DB',
      STATUS_CODES.INTERNAL_SERVER_ERROR
    );
  }
  return client;
};