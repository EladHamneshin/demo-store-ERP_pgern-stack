import express from 'express';
import * as Controller from '../controllers/shopInventoryController';
// import { updateInventory } from '../controllers/updateInventoryController';

const shopInventoryRouter = express.Router();

shopInventoryRouter.get('/', Controller.getAllData);
shopInventoryRouter.get('/:product_id', Controller.getProductById);
// shopInventoryRouter.post('/updateInventory', updateInventory);

export default shopInventoryRouter;
