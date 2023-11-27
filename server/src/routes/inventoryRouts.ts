import express, { Router } from 'express';
import { addNewProductController, deleteProductByIdController, getAllProductsController, getProductByIdController, updateProductByIdController } from '../controllers/inventoryController';
import { authHandler } from '../middlewares/authMiddleware';

const inventoryRouter = express.Router();
inventoryRouter.use(authHandler);

inventoryRouter.get('/', getAllProductsController);
inventoryRouter.get('/:id', getProductByIdController);
inventoryRouter.post('/', addNewProductController);
inventoryRouter.put('/:id', updateProductByIdController);
inventoryRouter.delete('/:id', deleteProductByIdController);


export default inventoryRouter;
