import express from "express";
import { placeOrder, userOrders } from "../controllers/orderController.js";
import authUser from "../middleware/auth.js";

const orderRouter = express.Router();

orderRouter.post("/place", authUser, placeOrder);
orderRouter.post("/userorders", authUser, userOrders);

export default orderRouter;
