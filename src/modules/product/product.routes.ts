import express from "express";
import { validateRequestPayloadWithSchema } from "../../app/middlewares/validateRequestPayloadWithSchema";
import { ProductValidation } from "./product.validation";
import { ProductController } from "./product.controller";

const router = express.Router();

router.post(
  "/",
  validateRequestPayloadWithSchema(
    ProductValidation.productCreationValidationSchema
  ),
  ProductController.createProduct
);

router.get("/:productId", ProductController.getProduct);

router.get("/", ProductController.getAllProducts);

router.put(
  "/:productId",
  validateRequestPayloadWithSchema(
    ProductValidation.productUpdateValidationSchema
  ),
  ProductController.updateProduct
);

router.delete("/:productId", ProductController.deleteProduct);

export const ProductRouter = {
  router,
};
