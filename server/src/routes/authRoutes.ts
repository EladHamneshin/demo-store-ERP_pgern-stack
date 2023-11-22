import express from "express";
import * as authController from "../controllers/authController";

const authRouter = express.Router();

authRouter.post("/login", authController.loginUser);
authRouter.post("/logout", authController.logoutUser);

export default authRouter;