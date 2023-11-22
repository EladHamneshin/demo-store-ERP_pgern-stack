import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import service from "../services/categoriesService";

const getCategories = asyncHandler(
  async (req: Request, res: Response) => {
    const categories = await service.getCategories();
    res.json(categories);
  }
);

export default { getCategories };