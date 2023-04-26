import  express  from "express";
import * as profileController from "../controllers/profile/profileController"
import { verifyAuth } from "../controllers/auth/authController";
import upload from "../middlwares/uploadFile";
const profileRouter = express.Router();

profileRouter.get("/",verifyAuth,profileController.getprofile);
profileRouter.post("/",verifyAuth,upload.single('picture'),profileController.updateProfile);
profileRouter.post("/updatePassword",verifyAuth,profileController.updatePassword);

export default profileRouter;