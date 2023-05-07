import express from "express"
import { verifyAuth } from "../controllers/auth/authController";
import { addAdvertisement, deleteAdvertisement, getAdvertisement, getAllAdvertisement } from "../controllers/advertisement/advrController";
import upload from "../middlwares/uploadFile";
const advrtRouter = express.Router();

advrtRouter.get("/",verifyAuth,getAllAdvertisement)
advrtRouter.get("/:id",verifyAuth , getAdvertisement)
advrtRouter.post("/",verifyAuth , upload.single("video") ,addAdvertisement)
advrtRouter.delete('/:id',verifyAuth , deleteAdvertisement)

export default advrtRouter