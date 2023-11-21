import express from "express";
import userController from "../controllers/userController";
import authRoutes from "./authRoutes";
import { authHandler } from "../middlewares/authMiddleware";

const userRouter = express.Router();

userRouter.use("/", authRoutes);

userRouter.get("/", authHandler, userController.getUser);
userRouter.post("/register", userController.registerUser);

export default userRouter;