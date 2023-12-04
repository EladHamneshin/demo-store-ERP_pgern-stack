import { connectDB } from '../configs/db';
import RequestError from '../types/errors/RequestError';
import STATUS_CODES from './StatusCodes';
import { DatabaseError, PoolClient, Pool } from 'pg';

const query = async (query: string) => {
  
  try {
    const client: PoolClient = await connectDB()
    const res = await client.query(query);
    client.release()

    await console.log(":)");
    return res;
  } catch (error) {
    console.error(error);
    throw new RequestError(
      (error as DatabaseError).message,
      STATUS_CODES.INTERNAL_SERVER_ERROR
    );
  } finally {    
  }
};

export default query;