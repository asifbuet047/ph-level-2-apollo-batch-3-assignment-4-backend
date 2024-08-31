import express from "express";
import { CartController } from "./order.controller";

const router = express.Router();

router.post("/secret", CartController.getClientSecretForStripePayment);

router.get("/", CartController.getAllOrders);

router.get("/:phone", CartController.getAllOrdersOfAnUser);

router.post("/", CartController.createOrder);

export const CartRouter = {
  router,
};
