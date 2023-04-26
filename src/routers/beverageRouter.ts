import  express, { Router }   from "express";
import * as beverageController from "../controllers/beverage/beverageController"
import upload from "../middlwares/uploadFile";
const beverageRouter : Router = express.Router();


beverageRouter.post("/",beverageController.getBeverages);
beverageRouter.get("/:id",beverageController.getBeverage)
beverageRouter.post('/add',upload.single("picture"),beverageController.addbeverage)
beverageRouter.post("/:id",beverageController.updateBeverage);
beverageRouter.delete("/:id",beverageController.deleteBeverage)

export default beverageRouter