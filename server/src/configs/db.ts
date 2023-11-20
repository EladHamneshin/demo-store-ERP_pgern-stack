import { Pool } from 'pg';
import { config } from 'dotenv';
config();

export const connectDB = async () => {
  try {
    const pool: Pool = new Pool();

    const client = await pool.connect();

    return client;
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error: ${error.message}`);
      process.exit(1);
    }
  }
};

const initProductTable = async () => {
  const client = await connectDB();
  client?.query(
    'CREATE TABLE IF NOT EXISTS coordinates (id SERIAL PRIMARY KEY, lat FLOAT NOT NULL, lng FLOAT NOT NULL)',
    (err) => {
      if (err) {
        console.log(err);
      }
    }
  );
  client?.query(
    'CREATE TABLE IF NOT EXISTS categories (id SERIAL PRIMARY KEY, name VARCHAR(255) NOT NULL, tags VARCHAR NOT NULL, clicked INT NOT NULL)',
    (err) => {
      if (err) {
        console.log(err);
      }
    }
  );
  client?.query(
    'CREATE TABLE IF NOT EXISTS images (id SERIAL PRIMARY KEY, url VARCHAR(255) NOT NULL, alt VARCHAR(255) NOT NULL)',
    (err) => {
      if (err) {
        console.log(err);
      }
    }
  );
  client?.query(
    'CREATE TABLE IF NOT EXISTS products (id SERIAL PRIMARY KEY, name VARCHAR(255) NOT NULL, price INT NOT NULL,quantity INT NOT NULL, description VARCHAR(255) NOT NULL, image INT NOT NULL, category INT NOT NULL, discount INT NOT NULL, rating INT NOT NULL, clicked INT NOT NULL, FOREIGN KEY (category) REFERENCES categories(id), FOREIGN KEY (image) REFERENCES images(id))',
    (err) => {
      if (err) {
        console.log(err);
      }
    }
  );
  client?.query(
    'CREATE TABLE IF NOT EXISTS productcoordinates (id SERIAL PRIMARY KEY, product INT NOT NULL, coordinates INT NOT NULL, FOREIGN KEY (product) REFERENCES products(id), FOREIGN KEY (coordinates) REFERENCES coordinates(id))',
    (err) => {
      if (err) {
        console.log(err);
      }
    }
  );
  client?.query(
    `INSERT INTO categories (name, tags, clicked) 
    VALUES ('Phones', 'brand material color', 0),('Computers','brand material storage',0)`,
    (err) => {
      if (err) {
        console.log(err);
      }
    }
  );
  client?.query(
    `INSERT INTO images (url, alt) VALUES ('https://images.unsplash.com/photo-1581093458791-9f3c3250a8b0?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGhvbmUlMjBwaG9uZSUyMHNob3BwaW5nJTIwY29tcHV0ZXJ8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80', 'phone'),('https://images.unsplash.com/photo-1581093458791-9f3c3250a8b0?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGhvbmUlMjBwaG9uZSUyMHNob3BwaW5nJTIwY29tcHV0ZXJ8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80', 'computer')`,
    (err) => {
      if (err) {
        console.log(err);
      }
    }
  );
  client?.query(
    `INSERT INTO products (name, price, description, image, category, discount, rating, clicked) VALUES ('Samsung Galaxy S21', 1000,540, 'Samsung Galaxy S21 5G | Factory Unlocked Android Cell Phone | US Version 5G Smartphone | Pro-Grade Camera, 8K Video, 64MP High Res | 128GB, Phantom Gray (SM-G991UZAAXAA)', 1, 1, 0, 5, 0),('Lenovo IdeaPad 3', 500,800, 'Lenovo IdeaPad 3 14 Laptop, 14.0 FHD 1920 x 1080 Display, AMD Ryzen 5 3500U Processor, 8GB DDR4 RAM, 256GB SSD, AMD Radeon Vega 8 Graphics, Narrow Bezel, Windows 10, 81W0003QUS, Abyss Blue', 2, 2, 0, 5, 0)`,
    (err) => {
      if (err) {
        console.log(err);
      }
    }
  );
  client?.query(
    `INSERT INTO productcoordinates (product, coordinates) VALUES (1,1),(2,1)`,
    (err) => {
      if (err) {
        console.log(err);
      }
    }
  );
  client?.release();
};
export default initProductTable;
