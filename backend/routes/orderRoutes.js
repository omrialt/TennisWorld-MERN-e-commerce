import express from "express";
const orderRouter = express.Router();
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  getOrders,
  updateOrderToDelivered,
  getTopProductsSold,
} from "../controllers/orderController.js";
import { protect, admin } from "../middlewares/authMiddleware.js";

orderRouter
  .route("/")
  .post(protect, addOrderItems)
  .get(protect, admin, getOrders);
orderRouter.route("/myorders").get(protect, getMyOrders);
orderRouter.route("/topsales").get(protect, admin, getTopProductsSold);
orderRouter.route("/:id").get(protect, getOrderById);
orderRouter.route("/:id/pay").put(protect, updateOrderToPaid);
orderRouter.route("/:id/deliver").put(protect, admin, updateOrderToDelivered);

export default orderRouter;
