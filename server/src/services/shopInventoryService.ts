import * as DAL from '../dal/shopInventoryDAL';
import { Request, query } from 'express';
import RequestError from '../types/errors/RequestError';
import STATUS_CODES from '../utils/StatusCodes';
import { UpdateBody } from '../types/Product';

export const getAllData = async (searchParam: string | undefined) => {
  try { /// edit errors after
    console.log('searchParams is:',searchParam);
    console.log('searchParams type is',typeof(searchParam));
  
    if (searchParam === undefined) {
      console.log('1');
      let queryString = 'select * from products'
      const allData = await DAL.dalAllData(queryString);
      return allData;
    }
    
    else {
      console.log('2');
      let queryString = `
        SELECT * FROM products 
        WHERE name === ${searchParam}` // edit after
        const allData = await DAL.dalAllData(queryString);
        return allData;
      }
  } 
  catch (error) {
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

  let queryString = `
    select * from products
    where id = ${productId}`;

  const product = await DAL.getProductById(queryString);
  if (product === null || product === undefined) {
    throw new RequestError('Product not found', STATUS_CODES.NOT_FOUND);
  }
  return product;
};

export const updateInventory = async (req: Request) => {
  // בדיקה שהבקשה מכילה גוף תקין
  if (!req.body || !Array.isArray(req.body.items)) {
    throw new RequestError('Invalid request body', STATUS_CODES.BAD_REQUEST);
  }

  const { items, action } = req.body;

  // בדיקה שהפעולה חוקית 
  if (action !== 'buy' && action !== 'return' ) {
    throw new RequestError(`${action}: invalid action`, STATUS_CODES.BAD_REQUEST);
  }
  const queryAction = action === 'buy' ? '-' : '+';

  // לולאה על פריטי הבקשה
  for (const item of items) {
    const { productId, requiredQuantity} = item;

    // בבקשה productid בדיקה שיש 
    if (!productId || productId === '0') {
      throw new RequestError('no product id or invalid product id', STATUS_CODES.BAD_REQUEST);
    }
    // בדיקה שהכמות הנדרשת חוקית
    if (requiredQuantity === undefined || requiredQuantity <= 0) {
      throw new RequestError('invalid quantity', STATUS_CODES.BAD_REQUEST);
    }
    
    // בדיקה שיש במלאי את הכמות הנדרשת
    const checkQuery = `
    select quantity from products 
    where id = ${productId}`;

    const prodQuantity = await DAL.checkQuantity(checkQuery);
    if (prodQuantity < requiredQuantity && action === 'buy') {
      throw new RequestError('not enough in stock', STATUS_CODES.BAD_REQUEST);
    }
  }

  // עדכון המלאי
  for (const item of items) {
    const { productId, requiredQuantity} = item;
    const queryString = 
       `UPDATE products
        SET quantity = quantity ${queryAction} ${requiredQuantity}
        WHERE id = ${productId};`

    const res = await DAL.updateInventory(queryString);    
    if (!res) {
      throw new RequestError('Response error', STATUS_CODES.INTERNAL_SERVER_ERROR);
    } 

  }
  return STATUS_CODES.OK;
};



