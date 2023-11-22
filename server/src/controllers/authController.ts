import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import STATUS_CODES from "../utils/StatusCodes";
import RequestError from "../types/errors/RequestError";
import generateToken from "../utils/jwtUtils";
import authService from "../services/authService";
import userValidation from "../utils/validations/userValidation";

// @desc    Auth user & get token
// @route   POST /api/users/auth/login
// @access  Public
export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { error } = userValidation(req.body);
  if (error)
    throw new RequestError(error.message, STATUS_CODES.BAD_REQUEST);

  if (req.cookies.jwt)
    throw new RequestError('User already logged in', STATUS_CODES.BAD_REQUEST);

  const { email, password } = req.body;
  const user = await authService.authUser(email, password);

  generateToken(res, user.id);

  res.json({
    id: user.id,
    email: user.email,
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
