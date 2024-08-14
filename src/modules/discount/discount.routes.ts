import express from "express";
import { DiscountController } from "./discount.controller";
import { ProductController } from "../product/product.controller";
const router = express.Router();

router.post("/", DiscountController.createDiscount);

router.put("/:id", DiscountController.updateDiscount);

router.get("/", DiscountController.getAllDiscount);

router.delete("/:id", DiscountController.deleteDiscount);

export const DiscountRouter = {
  router,
};
