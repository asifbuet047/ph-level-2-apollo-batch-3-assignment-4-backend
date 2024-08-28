import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import httpStatus from "http-status";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";
import notFoundRouteHandler from "./app/middlewares/notFoundRouteHandler";
import { ProductRouter } from "./modules/product/product.routes";
import { DiscountRouter } from "./modules/discount/discount.routes";

import { CartRouter } from "./modules/cart/cart.routes";

const app = express();
app.use(cors());
app.options("*", cors());
app.use(express.json());

app.get("/", (request: Request, response: Response) => {
  response.status(httpStatus.OK).json({
    success: true,
    message: "ph-level-2-apollo-batch-3-assignment-4-backend is running",
  });
});

app.use("/product", ProductRouter.router);
app.use("/discount", DiscountRouter.router);
app.use("/cart", CartRouter.router);

app.use(globalErrorHandler);
app.use(notFoundRouteHandler);

export default app;
