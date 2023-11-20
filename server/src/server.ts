import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import express from 'express';
import cookieParser from 'cookie-parser';
import initProductTable from './configs/db.js';
import { notFound, errorHandler } from './middlewares/errorsMiddleware.js';

const app = express();

// APP CONFIGS
dotenv.config();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(notFound);
app.use(errorHandler);
app.use('/api/shop_inventory', )

const port = process.env.PORT || 5000;

app.listen(port, () => {
  initProductTable();
  console.log(`server is running at port ${port}`);
});
