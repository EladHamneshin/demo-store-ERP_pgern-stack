import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import express from 'express';
import cookieParser from 'cookie-parser';
import { notFound, errorHandler } from './middlewares/errorsMiddleware';
import inventoryRouter from './routes/inventoryRouts';
import shopInventoryRouter from './routes/shopInventoryRouts';
import userRoutes from './routes/userRoutes'

const app = express();

// APP CONFIGS
dotenv.config();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use('/api/shopInventory', shopInventoryRouter);
app.use('/api/user', userRoutes);
app.use('/api/inventory', inventoryRouter);

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server is running at port ${port}`);
});
