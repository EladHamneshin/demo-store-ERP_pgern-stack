import express  from "express";

import controller from "../controllers/categoriesController";

const shopCategoriesRouter = express.Router();

shopCategoriesRouter.route("/").get(controller.getCategories);

export default shopCategoriesRouter;