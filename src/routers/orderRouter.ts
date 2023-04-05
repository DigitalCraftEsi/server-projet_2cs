import  express  from "express";
import * as orderController from "../controllers/order/orderController"
import { verifyAuth } from "../controllers/auth/authController";
const orderRouter = express.Router();

orderRouter.get("/",verifyAuth,orderController.getAllOrders);
orderRouter.get("/:id",verifyAuth,orderController.getOrder);
orderRouter.post("/",verifyAuth,orderController.addOrder);
orderRouter.post("/:id", verifyAuth,orderController.updateOrder);
orderRouter.delete("/:id",verifyAuth,orderController.deleteOrder);

export default orderRouter;