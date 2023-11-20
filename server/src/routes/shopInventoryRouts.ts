import express from 'express';
import * as controller from '../controllers/controller'

const shopInventoryRouter = express.Router();

shopInventoryRouter.get('/shop_inventory', controller.externalGetAllData) ///check url!!!

export default shopInventoryRouter
