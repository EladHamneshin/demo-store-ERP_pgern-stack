import jwt, { JwtPayload } from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import STATUS_CODES from '../utils/StatusCodes';
import RequestError from '../types/errors/RequestError';
import userService from '../services/userService'
import { json } from 'express';

export const authHandler = asyncHandler(async (req, _res, next) => {
  const token = req.headers.authorization;
console.log('token', token);

  if (!token) {
    throw new RequestError('Not authorized, no token', STATUS_CODES.UNAUTHORIZED);
  }

  if (!process.env.JWT_SECRET) {
    console.error('JWT_SECRET not defined');
    process.exit(1);
  }

  try {
    const decoded = jwt.verify(JSON.parse(token), process.env.JWT_SECRET);

    req.userId = (decoded as JwtPayload).userId;
    await userService.getUser(req.userId)
    req.isAuthenticated = true;
    next();
  } catch (error) {
    console.error(error);
    req.isAuthenticated = false;
    throw new RequestError('Not authorized, token failed', STATUS_CODES.UNAUTHORIZED);
  }
});
