import * as userDal from "../dal/userDal";
import RequestError from "../types/errors/RequestError";
import STATUS_CODES from "../utils/StatusCodes";
import { comparePassword } from '../utils/encryptionUtils';
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/jwtUtils";
import userValidation from "../utils/validations/userValidation";
import jwt, { JwtPayload } from 'jsonwebtoken';
import User from "../types/User";

const authUser = async (email: string, password: string) => {
    const user = await userDal.getUserByEmail(email);
    
    if (!user)
        throw new RequestError('User not registered', STATUS_CODES.UNAUTHORIZED);

    if (!await comparePassword(password, user.password))
        throw new RequestError('Invalid password', STATUS_CODES.UNAUTHORIZED);

    return user;
}

const loginUser = async (userLog: User) => {
  const { error } = userValidation(userLog);
  if (error)
    throw new RequestError(error.message, STATUS_CODES.BAD_REQUEST);
  const token = userLog.token;

  if (token) {
    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET not defined');
      process.exit(1);
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      userLog.token = (decoded as JwtPayload).userId;      
    } catch (error) {
      // console.log(error);
    }
    if (!userLog.token) {
      // res.cookie('jwt', '', {
      //   httpOnly: true,
      //   expires: new Date(0),
      // });
      // throw new RequestError('Wrong authentication try again', STATUS_CODES.BAD_REQUEST);
    } else {
      throw new RequestError('User already logged in', STATUS_CODES.BAD_REQUEST);
    }
  }

  const { email, password } = userLog;
  const user = await authUser(email, password);

  const token_a = generateToken(user.id);

  return {
    id: user.id,
    email: user.email,
    token: token_a
  };
};

export default { loginUser, authUser };