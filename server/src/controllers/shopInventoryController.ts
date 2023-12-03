import { Request, Response } from 'express';
import * as Service from '../services/shopInventoryService';
import asyncHandler from 'express-async-handler';

export const getAllData = asyncHandler(
  async (req: Request, res: Response) => {
    const searchParam = req.query.search?.toString();
    const categoryParam = req.query.category?.toString();
    const allData = await Service.getAllData(searchParam, categoryParam);
    
    res.json(allData);
  }
);

export const getProductById = asyncHandler(
  async (req: Request, res: Response) => {
    const productId = req.params.product_id;
    const data = await Service.getProductById(productId);
    res.json(data);
  }
);

export const updateInventory = asyncHandler(
  async (req: Request, res: Response) => {
  const success = await Service.updateInventory(req.body);
  res.send(success)
  } 
)
