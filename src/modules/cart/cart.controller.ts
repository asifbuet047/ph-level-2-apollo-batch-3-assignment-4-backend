import { NextFunction, Request, Response } from "express";
import { resolveRequestOrThrowError } from "../../app/utils/resolveRequestOrThrowError";
import { CartServices } from "./cart.services";
import { sendGenericSuccessfulResponse } from "../../app/utils/sendGenericResponse";
import DatabaseOperationFailedError from "../../app/errorHandlers/DatabaseOperationFailedError";
import httpStatus from "http-status";
import NoDataFoundError from "../../app/errorHandlers/NoDataFoundError";
import config from "../../app/config/config";
import Stripe from "stripe";

const createCart = resolveRequestOrThrowError(
  async (request: Request, response: Response, next: NextFunction) => {
    const result = await CartServices.createCartIntoDB(request.body);
    if (result) {
      sendGenericSuccessfulResponse(response, {
        message:
          "Cart created successfully and product inventory successfully modified",
        data: result,
      });
    } else {
      throw new DatabaseOperationFailedError(
        "Cart creation operation failed",
        httpStatus.INSUFFICIENT_STORAGE
      );
    }
  }
);

const getAllCarts = resolveRequestOrThrowError(
  async (request: Request, response: Response, next: NextFunction) => {
    const result = await CartServices.getAllCartsFromDB();
    if (result) {
      sendGenericSuccessfulResponse(response, {
        message: "All Carts are successfully retrived",
        data: result,
      });
    } else {
      throw new NoDataFoundError(
        "Requested carts are not available in db",
        httpStatus.NOT_FOUND
      );
    }
  }
);

const getAllCartsOfAnUser = resolveRequestOrThrowError(
  async (request: Request, response: Response, next: NextFunction) => {
    const result = await CartServices.getAllCartsOfAnUserFromDB(
      request.params.phone as string
    );
    if (result) {
      sendGenericSuccessfulResponse(response, {
        message: "All Carts of User are successfully retrived",
        data: result,
      });
    } else {
      throw new NoDataFoundError(
        "Requested carts are not available in db",
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

export const CartController = {
  createCart,
  getAllCarts,
  getAllCartsOfAnUser,
  getClientSecretForStripePayment,
};
