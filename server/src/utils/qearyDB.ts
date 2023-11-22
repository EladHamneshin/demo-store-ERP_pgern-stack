import e from 'cors';
import { connectDB } from '../configs/db';
import RequestError from '../types/errors/RequestError';
import STATUS_CODES from './StatusCodes';

const query = async (query: string) => {
  const client = await connectDB();
  if (!client) {
      throw new RequestError('Could not connect to DB', STATUS_CODES.INTERNAL_SERVER_ERROR);
  }
  const res = await client.query(query);
  client.release();
  return res;

};;


export default query;
