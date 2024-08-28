import express from "express";
import { CartController } from "./cart.controller";

const router = express.Router();

router.post("/secret", CartController.getClientSecretForStripePayment);

router.get("/", CartController.getAllCarts);

router.get("/:phone", CartController.getAllCartsOfAnUser);

router.post("/", CartController.createCart);

export const CartRouter = {
  router,
};
