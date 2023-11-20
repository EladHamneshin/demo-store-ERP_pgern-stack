import * as DAL from '../dal/shopInventoryDAL';
import { Request } from 'express';
import RequestError from '../types/errors/RequestError';
import STATUS_CODES from '../utils/StatusCodes';

export const getAllData = async (searchParam: string | undefined) => {
  try {
    const allData = await DAL.dalAllData(searchParam);
    return allData;
  } catch (error) {
    console.error('an error occurred at services:', error);
  }
};

export const getProductById = async (productId: number) => {
  if (isNaN(productId) || productId <= 0) {
    throw new RequestError(
      'Invalid product ID format',
      STATUS_CODES.BAD_REQUEST
    );
  }
  const product = await DAL.getProductById(productId);
  if (product === null || product === undefined) {
    throw new RequestError('Product not found', STATUS_CODES.NOT_FOUND);
  }
  return product;
};

export const updateInventory = async (req: Request) => {
  // בדיקה שהבקשה מכילה גוף תקין
  if (!req.body || !Array.isArray(req.body)) {
    throw new RequestError('Invalid request body', STATUS_CODES.BAD_REQUEST);
  }

  // לולאה על פריטי הבקשה
  for (const item of req.body) {
    const { productId, requiredQuantity } = item;

    // בדיקה שיש productId בבקשה
    if (!productId) {
      throw new RequestError('no product id', STATUS_CODES.BAD_REQUEST);
    }

    // בדיקה שהכמות הנדרשת חוקית
    if (requiredQuantity === undefined || requiredQuantity <= 0) {
      throw new RequestError('not enough in stock', STATUS_CODES.BAD_REQUEST);
    }
  }
  const res = await DAL.updateInventory(req.body);
  if (!res) {
    throw new RequestError('error', STATUS_CODES.INTERNAL_SERVER_ERROR);
  } else {
    return res;
  }
};
