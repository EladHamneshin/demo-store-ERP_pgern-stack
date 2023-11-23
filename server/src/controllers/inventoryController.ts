import { Request, Response } from 'express';
import * as Service from '../services/inventoryService';
import asyncHandler from 'express-async-handler';

export const getAllData = asyncHandler(async (req: Request, res: Response) => {
  const searchParam = req.query.search?.toString();
  const allData = await Service.getAllData(searchParam);
  res.json(allData);
});

export const getProductById = asyncHandler(
  async (req: Request, res: Response) => {
    const productId = Number(req.params.product_id);
    const data = await Service.getProductById(productId);
    res.json(data);
  }
);

export const updateInventory = async (req: Request, res: Response) => {
  const success = await Service.updateInventory(req);
  res.json(success);
};
