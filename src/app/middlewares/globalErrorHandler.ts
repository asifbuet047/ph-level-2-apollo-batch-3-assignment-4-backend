import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { ZodError } from "zod";
import { zodErrorHandler } from "../errorHandlers/zodErrorHandler";
import { TErrorSources } from "../errorHandlers/ErrorTypes";
import NoDataFoundError from "../errorHandlers/NoDataFoundError";
import DuplicateProductError from "../errorHandlers/DuplicateProductError";
import ProductNotAvailableError from "../errorHandlers/ProductNotAvailableError";
import mongoose from "mongoose";
import mongooseErrorHandler from "../errorHandlers/mongooseErrorHandler";

export const globalErrorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let message = "Something went wrong!";
  let errorSources: TErrorSources = [
    {
      path: "",
      message: "Something went wrong",
    },
  ];
  if (error instanceof ZodError) {
    const zodError = zodErrorHandler(error);
    message = zodError.message;
    errorSources = zodError.errorMessages;
    return res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      message,
      errorMessage: errorSources,
      stack: error.stack,
    });
  } else if (error instanceof mongoose.Error.CastError) {
    const castError = mongooseErrorHandler(error);
    message = castError.message;
    errorSources = castError.errorSources;
    return res.status(castError.statusCode as number).json({
      success: false,
      message,
      errorMessage: errorSources,
      stack: error.stack,
    });
  } else if (error instanceof mongoose.Error.ValidationError) {
    const castError = mongooseErrorHandler(error);
    message = castError.message;
    errorSources = castError.errorSources;
    return res.status(castError.statusCode as number).json({
      success: false,
      message,
      errorMessage: errorSources,
      stack: "error stack",
    });
  } else if (error instanceof NoDataFoundError) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
      data: [],
    });
  } else if (error instanceof DuplicateProductError) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
      data: [],
    });
  } else if (error instanceof ProductNotAvailableError) {
    return res.status(httpStatus.NOT_FOUND).json({
      success: false,
      message: error.message,
      data: [],
    });
  } else if (error instanceof SyntaxError && error?.statusCode === 400) {
    errorSources[0].path = "Request body holds inappropriate JSON object";
    return res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      message: "Bad request. Invalid JSON",
      errorMessage: errorSources,
      stack: error.stack,
    });
  } else {
    return res.status(statusCode).json({
      success: false,
      message: error.message,
      errorMessage: errorSources,
      stack: error.stack,
    });
  }
};
