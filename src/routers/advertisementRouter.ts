import express from "express"
import { verifyAuth } from "../controllers/auth/authController";
import { addAdvertisement, deleteAdvertisement, getAdvertisement, getAllAdvertisement, getAdByAgeGender } from "../controllers/advertisement/advrController";
import upload from "../middlwares/uploadFile";
const advrtRouter = express.Router();

advrtRouter.get('/getAdByAgeGender', getAdByAgeGender)
advrtRouter.get("/:id",verifyAuth , getAdvertisement)
advrtRouter.delete('/:id',verifyAuth , deleteAdvertisement)
advrtRouter.get("/",verifyAuth, getAllAdvertisement)
advrtRouter.post("/",verifyAuth , upload.single("video") ,addAdvertisement)


export default advrtRouter