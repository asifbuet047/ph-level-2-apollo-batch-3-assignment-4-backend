import httpStatus from "http-status";

class DuplicateProductError extends Error {
  public statusCode: number;
  public message: string;

  constructor(
    message: string = "Same resource already exits",
    statusCode: number = httpStatus.CONFLICT,
    stack: string = ""
  ) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default DuplicateProductError;
