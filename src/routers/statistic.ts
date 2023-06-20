import express from "express"
import { verifyAuth } from "../controllers/auth/authController";
import { getStatictic } from "../controllers/statistic/statisticController";
const statisticRouter  = express.Router();

statisticRouter.get("/",verifyAuth,getStatictic);


export default statisticRouter