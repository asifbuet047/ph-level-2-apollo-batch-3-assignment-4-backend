import { NextFunction, Request, Response } from "express";
import { resolveRequestOrThrowError } from "../../app/utils/resolveRequestOrThrowError";
import { DiscountServices } from "./discount.service";
import { sendGenericSuccessfulResponse } from "../../app/utils/sendGenericResponse";
import DatabaseOperationFailedError from "../../app/errorHandlers/DatabaseOperationFailedError";
import httpStatus from "http-status";
import NoDataFoundError from "../../app/errorHandlers/NoDataFoundError";

const createDiscount = resolveRequestOrThrowError(
  async (request: Request, response: Response, next: NextFunction) => {
    const result = await DiscountServices.createDiscountIntoDB(request.body);
    if (result) {
      sendGenericSuccessfulResponse(response, {
        message: "Discount created successfully",
        data: result,
      });
    } else {
      throw new DatabaseOperationFailedError(
        "Discount creation operation failed",
        httpStatus.INSUFFICIENT_STORAGE
      );
    }
  }
);

const updateDiscount = resolveRequestOrThrowError(
  async (request: Request, response: Response, next: NextFunction) => {
    const result = await DiscountServices.updateDiscountIntoDB(
      request.params.id,
      request.body
    );
    if (request) {
      sendGenericSuccessfulResponse(response, {
        message: "Discount updated successfully",
        data: result,
      });
    } else {
      throw new NoDataFoundError(
        "Requested discount is not available in db",
        httpStatus.NOT_FOUND
      );
    }
  }
);

const getAllDiscount = resolveRequestOrThrowError(
  async (request: Request, response: Response, next: NextFunction) => {
    const result = await DiscountServices.getAllDiscountsFromDB();
    if (result) {
      sendGenericSuccessfulResponse(response, {
        message: "Discount retrived successfully",
        data: result,
      });
    } else {
      throw new NoDataFoundError(
        "Any discount is not available in db",
        httpStatus.NOT_FOUND
      );
    }
  }
);

const deleteDiscount = resolveRequestOrThrowError(
  async (request: Request, response: Response, next: NextFunction) => {
    const result = await DiscountServices.deleteDiscountFromDB(
      request.params.id
    );
    if (result) {
      sendGenericSuccessfulResponse(response, {
        message: "Discount deleted successfully",
        data: result,
      });
    } else {
      throw new NoDataFoundError(
        "Requested discount is not available in db",
        httpStatus.NOT_FOUND
      );
    }
  }
);

export const DiscountController = {
  createDiscount,
  updateDiscount,
  getAllDiscount,
  deleteDiscount,
};
