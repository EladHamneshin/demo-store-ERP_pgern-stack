import express from 'express';
import * as Controller from '../controllers/shopInventoryController';

const shopInventoryRouter = express.Router();

shopInventoryRouter.get('/', Controller.getAllData);
shopInventoryRouter.get('/:product_id', Controller.getProductById);
shopInventoryRouter.post('/updateInventory', Controller.updateInventory);

export default shopInventoryRouter;
