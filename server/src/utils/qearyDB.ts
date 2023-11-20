import e from 'cors';
import { connectDB } from '../configs/db';

const query = async (query: string) => {
  try {
    const client = await connectDB();
    const res = await client?.query(query);
    client?.release();
    return res;
  } catch (error) {
    console.log(error);
  }
};

export default query;
