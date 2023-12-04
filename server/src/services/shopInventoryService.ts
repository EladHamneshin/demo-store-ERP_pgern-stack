import * as DAL from '../dal/shopInventoryDAL';
import { Request, query } from 'express';
import RequestError from '../types/errors/RequestError';
import STATUS_CODES from '../utils/StatusCodes';
import { getAllDataQuery } from '../types/SQLqueries';
import validate from 'uuid-validate'
import { ProductsArr, UpdateBody } from '../types/Product';

export const getAllData = async (searchParam: string | undefined, categoryParam: string | undefined) => {
  if (categoryParam !== undefined) {
    const categoryQuery =
      `${getAllDataQuery}
    where c.name = '${categoryParam}'
    GROUP BY p.id, c.name, i.url, i.alt, c2.lng, c2.lat`;
    const dataByCategory = await DAL.getAllData(categoryQuery);
    if (dataByCategory === undefined || dataByCategory === null) {
      throw new RequestError('data not found', STATUS_CODES.INTERNAL_SERVER_ERROR);
    }
    return dataByCategory;
  }
  else {
    if (searchParam !== undefined) {
      const searchString = `
          ${getAllDataQuery} 
          WHERE p.name LIKE '%${searchParam}%'
          OR p.description LIKE '%${searchParam}%'
          GROUP BY p.id, c.name, i.url, i.alt, c2.lng, c2.lat`;
      const dataBySearch = await DAL.getAllData(searchString);
      if (dataBySearch === undefined || dataBySearch === null) {
        throw new RequestError('data not found', STATUS_CODES.NOT_FOUND);
      }
      return dataBySearch;
    }
    else {
      const queryString =
        `${getAllDataQuery}
            GROUP BY p.id, c.name, i.url, i.alt, c2.lng, c2.lat`;
      const allData = await DAL.getAllData(queryString);
      if (allData === undefined || allData === null) {
        throw new RequestError('data not found', STATUS_CODES.NOT_FOUND);
      }
      return allData;
    }
  }
};

export const getProductById = async (productId: string) => {
  if (!validate(productId)) {
    throw new RequestError(
      'Invalid product ID format',
      STATUS_CODES.BAD_REQUEST);
  }

  let queryString = `
    ${getAllDataQuery}
    where p.id = '${productId}'
    GROUP BY p.id, c.name, i.url, i.alt, c2.lng, c2.lat`;

  const [product] = await DAL.getProductById(queryString);

  if (product === null || product === undefined) {
    throw new RequestError('Product not found', STATUS_CODES.NOT_FOUND);
  }
  return product;
};


export const checkUpdateRequest = async (body: UpdateBody) => {
  // בדיקה שהבקשה מכילה גוף תקין
  if (!body || !Array.isArray(body.items)) {
    throw new RequestError('Invalid request body', STATUS_CODES.BAD_REQUEST);
  }

  const { items, action } = body;

  // בדיקה שהפעולה חוקית 
  if (action !== 'buy' && action !== 'return') {
    throw new RequestError(`${action}: invalid action`, STATUS_CODES.BAD_REQUEST,);
  }

  let errorProductsArr: ProductsArr[] = [];
  let successProductsArr: ProductsArr[] = [];

  // לולאה על פריטי הבקשה
  for (const item of items) {
    const { productId, quantity } = item;

    // בבקשה productid בדיקה שיש 
    if (!productId || !validate(productId)) {
      throw new RequestError('no such product id', STATUS_CODES.BAD_REQUEST);
    }
    // בדיקה שהכמות הנדרשת חוקית
    if (quantity === undefined || quantity <= 0) {
      throw new RequestError('invalid quantity', STATUS_CODES.BAD_REQUEST);
    }

    // בדיקה שיש במלאי את הכמות הנדרשת
    const checkQuery = `
    select quantity from products 
    where id = '${productId}'`;

    const existsQuantity = await DAL.checkQuantity(checkQuery);

    if (existsQuantity < quantity && action === 'buy') {
      errorProductsArr.push({ [productId]: existsQuantity });
    }
    else if (existsQuantity >= quantity && action === 'buy') {
      successProductsArr.push({ [productId]: existsQuantity });
    }
  }
  return ([errorProductsArr, successProductsArr])
}

export const updateInventory = async (body: UpdateBody) => {
  const { items, action } = body;
  const [errorProductsArr, successProductsArr] = await checkUpdateRequest(body);

  // בדיקה אם אין מספיק כמות בחלק מהמוצרים
  if (errorProductsArr.length > 0 && successProductsArr.length > 0) {

    throw new RequestError(
      `some products not in stock;`,
      STATUS_CODES.BAD_REQUEST)
  }
  // בדיקה אם אין מספיק כמות בכל המוצרים
  else if (errorProductsArr.length > 0) {
    throw new RequestError(
      `all products not in stock;`,
      STATUS_CODES.BAD_REQUEST)
  }

  const queryAction = action === 'buy' ? '-' : '+';

  // עדכון המלאי
  for (const item of items) {
    const { productId, quantity } = item;
    const queryString =`
      UPDATE products
      SET quantity = quantity ${queryAction} ${quantity}
      WHERE id = '${productId}';
      `

    const res = await DAL.updateInventory(queryString);
    if (!res) {
      throw new RequestError('Response error', STATUS_CODES.INTERNAL_SERVER_ERROR);
    }
  }

  return STATUS_CODES.OK;
};

