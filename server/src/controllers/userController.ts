import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import STATUS_CODES from "../utils/StatusCodes";
import RequestError from "../types/errors/RequestError";
import * as userService from "../services/userService";
import userValidation from "../utils/validations/userValidation";

///
declare global {
  namespace Express {
    export interface Request {
      userId: string;
    }
  }
}
///

// @desc    Register a new user
// @route   POST  /api/users/register
// @access  Public
export const registerUser = asyncHandler(async (req: Request, res: Response) => {

    const { error } = userValidation(req.body);
    if (error)
      throw new RequestError(error.message, STATUS_CODES.BAD_REQUEST);
    
    const user = await userService.addUser(req.body);
  
    res.status(STATUS_CODES.CREATED).json({
      id: user?.id,
      email: user?.email,
    });
});

// @desc    Get user
// @route   GET /api/users
// @access  Private
export const getUser = asyncHandler(async (req, res) => {  
  const user = await userService.getUser(req.userId);

  res.json({
    id: user.id,
    email: user.email,
  });
});