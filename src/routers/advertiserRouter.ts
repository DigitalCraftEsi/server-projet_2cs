import express from "express"
import { addAdvertiser, deleteAdvertiser, getAdvertiser, getAllAdvertiser } from "../controllers/advertiser/advertiserController";
import { verifyAuth } from "../controllers/auth/authController";
const advertiserRouter = express.Router();

advertiserRouter.get("/",verifyAuth,getAllAdvertiser)
advertiserRouter.get("/:id",verifyAuth,getAdvertiser)
advertiserRouter.post('/',verifyAuth,addAdvertiser)
advertiserRouter.delete("/:id",verifyAuth , deleteAdvertiser)


export default advertiserRouter