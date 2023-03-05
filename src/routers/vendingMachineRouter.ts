import  express  from "express";
import * as vendingMachineController from "../controllers/vendingMachineController"
const machinRouter = express.Router();

machinRouter.get("/",vendingMachineController.getAllMaachin);
machinRouter.get("/:id",vendingMachineController.getMachine);
machinRouter.post("/",vendingMachineController.addMachine);
machinRouter.post("/:id",vendingMachineController.modifyMachine);

export default machinRouter;