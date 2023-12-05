import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import STATUS_CODES from "../utils/StatusCodes";
import RequestError from "../types/errors/RequestError";
import generateToken from "../utils/jwtUtils";
import authService from "../services/authService";
import userValidation from "../utils/validations/userValidation";
import jwt, { JwtPayload } from 'jsonwebtoken';

// @desc    Auth user & get token
// @route   POST /api/users/auth/login
// @access  Public
export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { error } = userValidation(req.body);
  if (error)
    throw new RequestError(error.message, STATUS_CODES.BAD_REQUEST);
  const token = req.headers.authorization;

  if (token) {
    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET not defined');
      process.exit(1);
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded);
      req.userId = (decoded as JwtPayload).userId;
      // console.log(req.userId);
      
    } catch (error) {
      // console.log(error);
    }
    if (!req.userId) {
      res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
      });
      // throw new RequestError('Wrong authentication try again', STATUS_CODES.BAD_REQUEST);
    } else {
      throw new RequestError('User already logged in', STATUS_CODES.BAD_REQUEST);
    }
  }

  const { email, password } = req.body;
  const user = await authService.authUser(email, password);

  const token_a = generateToken(user.id);

  res.json({
    id: user.id,
    email: user.email,
    token: token_a
  });
});

// @desc    Logout user / clear cookie
// @route   POST /api/users/auth/logout
// @access  Public
export const logoutUser = (_req: Request, res: Response) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(STATUS_CODES.OK).json({ message: 'Logged out successfully' });
};
