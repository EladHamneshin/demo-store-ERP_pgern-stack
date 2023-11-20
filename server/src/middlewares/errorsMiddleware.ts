import { Request, Response, NextFunction } from 'express';
import STATUS_CODES from '../utils/StatusCodes';
import RequestError from '../types/errors/RequestError';
import MiddlewareError from '../types/errors/MiddlewareError';


const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(STATUS_CODES.NOT_FOUND);
  console.log('not found');
  next(error);
};


const errorHandler = (error: MiddlewareError ,_req: Request, res: Response, _next: NextFunction) => {
  let statusCode = res.statusCode === STATUS_CODES.OK ? STATUS_CODES.INTERNAL_SERVER_ERROR : res.statusCode;
  let message = error.message;

  if (error instanceof RequestError) {
    statusCode = error.statusCode;
  }


  res.status(statusCode).json({
    message,
    stack: error.stack,
  });
};

export { notFound, errorHandler };