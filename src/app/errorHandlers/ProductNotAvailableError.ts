import httpStatus from "http-status";

class ProductNotAvailableError extends Error {
  public statusCode: number;
  public message: string;

  constructor(message?: string, statusCode?: number, stack: string = "") {
    super(message);
    this.message = "Bike is not available for rent";
    this.statusCode = httpStatus.NOT_FOUND;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ProductNotAvailableError;
