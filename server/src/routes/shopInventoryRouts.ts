import express from 'express';
import * as Controller from '../controllers/shopInventoryController'

const shopInventoryRouter = express.Router();

shopInventoryRouter.get('/:product_id', Controller.getProductById)

export default shopInventoryRouter;
