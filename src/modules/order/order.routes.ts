import express from "express";
import { OrderController } from "./order.controller";

const router = express.Router();

router.post("/secret", OrderController.getClientSecretForStripePayment);

router.get("/", OrderController.getAllOrders);

router.get("/:phone", OrderController.getAllOrdersOfAnUser);

router.post("/", OrderController.createOrder);

export const OrderRouter = {
  router,
};
