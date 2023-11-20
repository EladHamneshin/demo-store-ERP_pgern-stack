import express from 'express';
import * as controller from '../controllers/shopInventoryController'

const shopInventoryRouter = express.Router();

shopInventoryRouter.get('', controller.externalGetAllData)
shopInventoryRouter.get('/:product_id', controller.getProductById);

export default shopInventoryRouter


