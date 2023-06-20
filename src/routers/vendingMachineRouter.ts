import  express  from "express";



import * as vendingMachineController from "../controllers/vendingMachine/vendingMachineController"
import * as beverageController from "../controllers/beverage/beverageController"
import * as orderController from "../controllers/order/orderController"
import { verifyAuth } from "../controllers/auth/authController";
const machinRouter = express.Router();

machinRouter.get("/",verifyAuth,vendingMachineController.getAllMaachin);
machinRouter.get("/:id",verifyAuth,vendingMachineController.getMachine);
machinRouter.get("/:id/beverages",verifyAuth,beverageController.getBeveragesOfMachin);
machinRouter.get("/:id/orders",verifyAuth,orderController.getOrdersOfMachine);
machinRouter.post("/",verifyAuth,vendingMachineController.addMachine);
machinRouter.post("/am",vendingMachineController.setMachineToAM);
machinRouter.get("/am/:id",vendingMachineController.getMachineOfAM);
machinRouter.post("/client/assignation",verifyAuth,vendingMachineController.assignMachinesToClient);
machinRouter.post("/:id",verifyAuth,vendingMachineController.updateMachine);
machinRouter.delete("/:id",verifyAuth,vendingMachineController.deleteMachine);
machinRouter.post("/:id/unlock",verifyAuth,vendingMachineController.unlockMachine);
machinRouter.post("/:id/status",verifyAuth,vendingMachineController.changeStatusOfMachine);



export default machinRouter;