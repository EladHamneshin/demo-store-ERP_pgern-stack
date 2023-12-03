import { connectDB } from '../configs/db';
import RequestError from '../types/errors/RequestError';
import STATUS_CODES from './StatusCodes';
import { DatabaseError } from 'pg';

const query = async (query: string) => {
  const client = await connectDB();
  try {
    const res = await client.query(query);
    client.end();
    return res;
  } catch (error) {
    console.error(error);
    throw new RequestError(
      (error as DatabaseError).message,
      STATUS_CODES.INTERNAL_SERVER_ERROR
    );
  }
};

export default query;