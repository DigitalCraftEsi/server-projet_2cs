import express from "express";
import { addUser, deleteUser, getUsers } from "../controllers/user/userController";
import { verifyAuth } from "../controllers/auth/authController";

const userRouter = express.Router();

userRouter.post("/", verifyAuth, addUser);
userRouter.delete("/", verifyAuth, deleteUser);
userRouter.get("/", verifyAuth, getUsers)
// userRouter.patch("/", verifyAuth, getUsers)

export default userRouter;