import  express  from "express";
import * as orderController from "../controllers/order/orderController"
const orderRouter = express.Router();

orderRouter.get("/",orderController.getAllOrders);
orderRouter.get("/:id",orderController.getOrder);
orderRouter.post("/",orderController.addOrder);
orderRouter.post("/:id",orderController.updateOrder);

export default orderRouter;