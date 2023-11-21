import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import express from 'express';
import cookieParser from 'cookie-parser';
import { notFound, errorHandler } from './middlewares/errorsMiddleware';
import shopInventoryRouter from './routes/shopInventoryRouts'
import shop_inventoryRouter from './routes/shopInventoryRouts';

const app = express();

// APP CONFIGS
dotenv.config();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/shopInventory', shopInventoryRouter);


app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server is running at port ${port}`);
});
