import { Request, Response } from 'express';
import { addNewProductService, deleteProductByIdService, getAllProductsService, getProductByIdService, updateProductByIdService } from '../services/inventoryService'
import asyncHandler from 'express-async-handler';
import { AdminProduct } from '../types/Product';


export const getAllProductsController = asyncHandler(async (req: Request, res: Response) => {
  const allproducts: AdminProduct[] = await getAllProductsService();

  res.json(allproducts);
})

export const getProductByIdController = asyncHandler(async (req: Request, res: Response) => {
  
  const product: AdminProduct = await getProductByIdService(req.params.id);
  res.json(product);
})

export const addNewProductController = asyncHandler(async (req: Request, res: Response) => {  
  
  const newProduct: AdminProduct = await addNewProductService(req.body);
  res.json(newProduct)
})

export const updateProductByIdController = asyncHandler(async (req: Request, res: Response) => {

  const updatedProduct: AdminProduct = await updateProductByIdService(req.body, req.params.id);
  res.json(updatedProduct)

})

export const deleteProductByIdController = asyncHandler(async (req: Request, res: Response) => {

  const deletedProduct = await deleteProductByIdService(req.params.id);
  res.json(deletedProduct)

})

