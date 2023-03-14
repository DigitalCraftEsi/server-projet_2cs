import  express  from "express";



import * as vendingMachineController from "../controllers/vendingMachine/vendingMachineController"
import * as beverageController from "../controllers/beverage/beverageController"
import * as orderController from "../controllers/order/orderController"
const machinRouter = express.Router();

machinRouter.get("/",vendingMachineController.getAllMaachin);
machinRouter.get("/:id",vendingMachineController.getMachine);
machinRouter.get("/:id/beverages",beverageController.getBeveragesOfMachin);
machinRouter.get("/:id/orders",orderController.getOrdersOfMachine);
machinRouter.post("/",vendingMachineController.addMachine);
machinRouter.post("/:id",vendingMachineController.updateMachine);


export default machinRouter;