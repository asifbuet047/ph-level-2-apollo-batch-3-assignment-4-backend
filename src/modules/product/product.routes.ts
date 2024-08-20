import express, { NextFunction, Request, Response } from "express";
import { validateRequestPayloadWithSchema } from "../../app/middlewares/validateRequestPayloadWithSchema";
import { ProductValidation } from "./product.validation";
import { ProductController } from "./product.controller";
import { parseImageFile } from "../../app/utils/parseImageFile";
import { saveImageFileIntoLocalServersTempFolder } from "../../app/utils/saveImageFileIntoLocalServersTempFolder";

const router = express.Router();

router.post(
  "/",
  saveImageFileIntoLocalServersTempFolder.single("file"),
  (request: Request, response: Response, next: NextFunction) => {
    console.log(request.body);
    const temp = request.body;
    for (const key in temp) {
      if (key === "quantity" || key === "price" || key === "rating") {
        temp[key] = Number.parseInt(temp[key]);
      }
    }
    next();
  },
  validateRequestPayloadWithSchema(
    ProductValidation.productCreationValidationSchema
  ),
  ProductController.createProduct
);
router.get("/categories", ProductController.getCategories); //This route should be above the getProduct route

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
