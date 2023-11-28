import query from '../utils/queryDB';
import { Product } from '../types/Product';

export const getAllData = async (queryString: string) => {
  const { rows }: { rows: Product[] } = await query(queryString);

  return rows;
};

export const getProductById = async (queryString: string) => {
  const { rows }: { rows: Product[] } = await query(queryString);
  return rows;
};

export async function checkQuantity(checkQuery: string) {
  const { rows }: { rows: Product[] } = await query(checkQuery);
  const [{ quantity }] = rows;
  return quantity;
}

export async function updateInventory(queryString: string) {
  const message = await query(queryString);
  return message?.command;
}
