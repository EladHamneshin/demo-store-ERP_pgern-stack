import { Response } from 'express';
import jwt from 'jsonwebtoken';

const generateToken = (userId: string) => {
  if (!process.env.JWT_SECRET) {
    console.error('JWT_SECRET not defined');
    process.exit(1);
  }

  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '5m',
  });

  return token
};

export default generateToken;