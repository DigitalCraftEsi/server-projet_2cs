import  express  from "express";
import {
    getAllCoffeeMachines,
    getCoffeeMachine,
    addCoffeeMachine,
    updateCoffeeMachine
} from "../controllers/vendingMachine/vendingMachineController"

const machinRouter = express.Router();

machinRouter.get("/", getAllCoffeeMachines);
machinRouter.get("/:id", getCoffeeMachine);
machinRouter.post("/", addCoffeeMachine);
machinRouter.patch("/:id", updateCoffeeMachine);

export default machinRouter;