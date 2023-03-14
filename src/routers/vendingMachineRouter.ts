import  express  from "express";
import {
    getAllCoffeeMachines,
    getCoffeeMachine,
    addCoffeeMachine,
    updateCoffeeMachine
} from "../controllers/vendingMachine/vendingMachineController"
import { verifyAuth } from "../controllers/auth/authController";

const machinRouter = express.Router();

machinRouter.get("/", verifyAuth, getAllCoffeeMachines);
machinRouter.get("/:id", getCoffeeMachine);
machinRouter.post("/", addCoffeeMachine);
machinRouter.patch("/:id", updateCoffeeMachine);

export default machinRouter;