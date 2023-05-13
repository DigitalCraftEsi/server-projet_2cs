import express from "express";
import { login, loginConsumer, signUpConsumer, refreshToken } from "../controllers/auth/authController";

const authRouter = express.Router();

authRouter.post("/login", login);
authRouter.post("/refreshToken", refreshToken);
authRouter.post("/loginconsumer", loginConsumer);
authRouter.post("/signupconsumer", signUpConsumer);

export default authRouter;