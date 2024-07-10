import { NextFunction, Request, Response } from "express";
import { resolveRequestOrThrowError } from "../../app/utils/resolveRequestOrThrowError";
import ProductModel from "./product.model";
import { ProductServices } from "./product.service";
import { sendGenericSuccessfulResponse } from "../../app/utils/sendGenericResponse";
import DatabaseOperationFailedError from "../../app/errorHandlers/DatabaseOperationFailedError";
import httpStatus from "http-status";
import NoDataFoundError from "../../app/errorHandlers/NoDataFoundError";

const createProduct = resolveRequestOrThrowError(
  async (request: Request, response: Response, next: NextFunction) => {
    const result = await ProductServices.createProductIntoDB(request.body);
    if (result) {
      sendGenericSuccessfulResponse(response, {
        message: "Product created successfully",
        data: result,
      });
    } else {
      throw new DatabaseOperationFailedError(
        "Product creation operation failed",
        httpStatus.INSUFFICIENT_STORAGE
      );
    }
  }
);

const getProduct = resolveRequestOrThrowError(
  async (request: Request, response: Response, next: NextFunction) => {
    const result = await ProductServices.getProductFromDB(
      request.params.productId
    );
    if (result) {
      sendGenericSuccessfulResponse(response, {
        message: "Requested product retrived successfully",
        data: result,
      });
    } else {
      throw new NoDataFoundError(
        "Requested product is not available in db",
        httpStatus.NOT_FOUND
      );
    }
  }
);

const getAllProducts = resolveRequestOrThrowError(
  async (request: Request, response: Response, next: NextFunction) => {
    const result = await ProductServices.getAllProductsFromDB();
    if (Array.isArray(result)) {
      sendGenericSuccessfulResponse(response, {
        message: "Products retrived successfully",
        data: result,
      });
    } else {
      throw new NoDataFoundError(
        "Any product is not available in db",
        httpStatus.NOT_FOUND
      );
    }
  }
);

const updateProduct = resolveRequestOrThrowError(
  async (request: Request, response: Response, next: NextFunction) => {
    const result = await ProductServices.updateProductIntoDB(
      request.params.productId,
      request.body
    );
    if (result) {
      sendGenericSuccessfulResponse(response, {
        message: "Product updated successfully",
        data: result,
      });
    } else {
      throw new NoDataFoundError(
        "Requested product is not available in db",
        httpStatus.NOT_FOUND
      );
    }
  }
);

const deleteProduct = resolveRequestOrThrowError(
  async (request: Request, response: Response, next: NextFunction) => {
    const result = await ProductServices.deleteProductFromDB(
      request.params.productId
    );
    if (result) {
      sendGenericSuccessfulResponse(response, {
        message: "Requested product deleted successfully",
        data: result,
      });
    } else {
      throw new NoDataFoundError(
        "Requested product is not available in db",
        httpStatus.NOT_FOUND
      );
    }
  }
);

export const ProductController = {
  createProduct,
  getProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
};
