import  express, { Router }   from "express";
import * as beverageController from "../controllers/beverage/beverageController"
const beverageRouter : Router = express.Router();


beverageRouter.get("/",beverageController.getBeverages);
beverageRouter.get("/:id",beverageController.getBeverage)
beverageRouter.post('/',beverageController.addbeverage)
beverageRouter.post("/:id",beverageController.updateBeverage);
beverageRouter.delete("/:id",beverageController.deleteBeverage)

export default beverageRouter