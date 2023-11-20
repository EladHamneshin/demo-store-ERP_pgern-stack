import express from 'express';
import * as Controller from '../controllers/shop_inventoryController'

const shop_inventoryRouter = express.Router();

shop_inventoryRouter.get('/:product_id', Controller.getProductById)

export default shop_inventoryRouter;
