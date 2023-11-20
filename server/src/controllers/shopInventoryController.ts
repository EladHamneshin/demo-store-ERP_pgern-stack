import { Request, Response } from 'express'
import * as Service from '../services/shopInventoryRouterService'


export const getProductById = async (req: Request, res: Response) => {
  try {

    
    // const productId = Number(req.params.product_id);
    const productId = 12
    if (isNaN(productId) || productId <= 0) {
      return res.status(400).json({ message: "Invalid product ID format" });
    }
    const data = await Service.getProductById(productId);
    if (data === null || data === undefined) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(data);
  } catch (error) {
    console.error("Error in getting a single product", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};