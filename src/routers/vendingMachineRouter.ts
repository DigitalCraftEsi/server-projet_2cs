import  express  from "express";
import * as vendingMachineController from "../controllers/vendingMachineController"
import * as beverageController from "../controllers/beverageController"
const machinRouter = express.Router();

machinRouter.get("/",vendingMachineController.getAllMaachin);
machinRouter.get("/:id",vendingMachineController.getMachine);
machinRouter.get("/:id/beverage",beverageController.getBeveragesOfMachin);
machinRouter.post("/",vendingMachineController.addMachine);
machinRouter.post("/:id",vendingMachineController.updateMachine);

export default machinRouter;