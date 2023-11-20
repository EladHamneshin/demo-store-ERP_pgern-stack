import express from 'express';
import { updateInventoryController } from '../controllers/updateInventoryController';

const shop_inventoryRouter = express.Router();


shop_inventoryRouter.post('/updateInventory', updateInventoryController);

export default shop_inventoryRouter