import { NextFunction, Request, Response } from "express";
import { resolveRequestOrThrowError } from "../../app/utils/resolveRequestOrThrowError";
import { OrderServices } from "./order.services";
import { sendGenericSuccessfulResponse } from "../../app/utils/sendGenericResponse";
import DatabaseOperationFailedError from "../../app/errorHandlers/DatabaseOperationFailedError";
import httpStatus from "http-status";
import NoDataFoundError from "../../app/errorHandlers/NoDataFoundError";
import config from "../../app/config/config";
import Stripe from "stripe";

const createOrder = resolveRequestOrThrowError(
  async (request: Request, response: Response, next: NextFunction) => {
    console.log(request.body);
    const result = await OrderServices.createOrderIntoDB(request.body);
    if (result) {
      sendGenericSuccessfulResponse(response, {
        message:
          "Order created successfully and product inventory successfully modified",
        data: result,
      });
    } else {
      throw new DatabaseOperationFailedError(
        "Order creation operation failed",
        httpStatus.INSUFFICIENT_STORAGE
      );
    }
  }
);

const getAllOrders = resolveRequestOrThrowError(
  async (request: Request, response: Response, next: NextFunction) => {
    const result = await OrderServices.getAllOrdersFromDB();
    if (result) {
      sendGenericSuccessfulResponse(response, {
        message: "All Orders are successfully retrived",
        data: result,
      });
    } else {
      throw new NoDataFoundError(
        "Requested orders are not available in db",
        httpStatus.NOT_FOUND
      );
    }
  }
);

const getAllOrdersOfAnUser = resolveRequestOrThrowError(
  async (request: Request, response: Response, next: NextFunction) => {
    const result = await OrderServices.getAllOrdersOfAnUserFromDB(
      request.params.phone as string
    );
    if (result) {
      sendGenericSuccessfulResponse(response, {
        message: "All Orders of User are successfully retrived",
        data: result,
      });
    } else {
      throw new NoDataFoundError(
        "Requested orders are not available in db",
        httpStatus.NOT_FOUND
      );
    }
  }
);

const getClientSecretForStripePayment = resolveRequestOrThrowError(
  async (request: Request, response: Response, next: NextFunction) => {
    const stripe = new Stripe(config.stripe_secret_key);
    const paymentIntent = await stripe.paymentIntents.create({
      amount: request.body.amount,
      currency: request.body.currency,
    });
    if (paymentIntent) {
      sendGenericSuccessfulResponse(response, {
        message: "Client secret for Stripe payment is sent",
        data: paymentIntent,
      });
    } else {
      throw new NoDataFoundError(
        "PaymentIntent for Stripe payment is not created",
        httpStatus.NOT_FOUND
      );
    }
  }
);

export const OrderController = {
  createOrder,
  getAllOrders,
  getAllOrdersOfAnUser,
  getClientSecretForStripePayment,
};
