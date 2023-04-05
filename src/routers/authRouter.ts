import express from "express";
import { login, loginConsumer, signUpConsumer } from "../controllers/auth/authController";

const authRouter = express.Router();

authRouter.post("/login", login);
authRouter.post("/loginconsumer", loginConsumer);
authRouter.post("/signupconsumer", signUpConsumer);

export default authRouter;