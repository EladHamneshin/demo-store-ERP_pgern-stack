import { connectDB } from './initDB';

const initProductTable = async () => {
  const pool = await connectDB();
  pool?.query(
    'CREATE TABLE IF NOT EXISTS products (id SERIAL PRIMARY KEY, name VARCHAR(255) NOT NULL, price INT NOT NULL, description VARCHAR(255) NOT NULL, image INT NOT NULL, category INT NOT NULL, discount INT NOT NULL, rating INT NOT NULL)',
    (err: any, res: any) => {
      if (err) {
        console.log(err);
      } else {
        // console.log(res);
      }
    }
  );
  pool?.release();
};
export default initProductTable;