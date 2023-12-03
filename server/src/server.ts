import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import express, { NextFunction } from 'express';
import cookieParser from 'cookie-parser';
import { notFound, errorHandler } from './middlewares/errorsMiddleware';
import shopCategoriesRouter from './routes/categoriesRouter';
import inventoryRouter from './routes/inventoryRouts';
import shopInventoryRouter from './routes/shopInventoryRouts';
import userRoutes from './routes/userRoutes';
import { connectDB } from "./configs/db";

export const app = express();

// APP CONFIGS
dotenv.config();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
// app.use((req, res, next) => {
//   console.log('middleware body:', req.body);
//   next();
// });
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//add erp
app.use('/erp/api', express.Router().get('/', (req, res) => {res.status(200);}))
app.use('/erp/api/shopInventory/categories', shopCategoriesRouter);
app.use('/erp/api/user', userRoutes);
app.use('/erp/api/shopInventory', shopInventoryRouter);
app.use('/erp/api/inventory', inventoryRouter);
app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;

const start = async () => {
  await connectDB();
  console.log('Connecting to database successfully');
  app.listen(port, () => {
    console.log(`server is running at port ${port}`);
  });
}
start()

