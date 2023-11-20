import express from 'express';
import  * as Controller from '../controllers/shopInventoryController'
import { updateInventoryController } from '../controllers/updateInventoryController';


const shopInventoryRouter = express.Router();

shopInventoryRouter.get('', controller.externalGetAllData)
shopInventoryRouter.get('/:product_id', Controller.getProductById)
shopInventoryRouter.post('/updateInventory',updateInventoryController);

export default shopInventoryRouter;
