import { connectDB } from '../configs/db'
import RequestError from '../types/errors/RequestError';
import STATUS_CODES from './StatusCodes';
import { DatabaseError } from 'pg';


const query = async (queryString: string) => {
  const pool = await connectDB();
  if (!pool) throw new Error('could not connect to database')
  try {
    const result = await pool.query(queryString);
    // Use client.release() if working with a connection pool
    // await client.end();
    // await client; // Make sure to await here

    return result;
  } catch (queryError) {
    // Log the error for debugging purposes
    console.error('Query error:', queryError);

    // Throw a custom error based on the type of error
    throw new RequestError(
      (queryError as DatabaseError).message || 'Unknown database error',
      STATUS_CODES.INTERNAL_SERVER_ERROR
    );
  } finally {
    pool.end()
  }
}

export default query;
