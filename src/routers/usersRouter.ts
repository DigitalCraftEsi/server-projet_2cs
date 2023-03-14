import express from "express";
import { addUser, deleteUser } from "../controllers/user/userController";
import { verifyAuth } from "../controllers/auth/authController";

const userRouter = express.Router();

userRouter.post("/", verifyAuth, addUser);
userRouter.delete("/", verifyAuth, deleteUser);

export default userRouter;