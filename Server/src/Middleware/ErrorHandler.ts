import { ErrorRequestHandler } from "express";
import { isHttpError } from "http-errors";

const ErrorHandler: ErrorRequestHandler = (
  error: any,
  req: any,
  res: any,
  next: any
) => {
  console.error("poes" + error);
  let statusCode = 500;
  let errorMessage = "An unknown error occured";
  if (isHttpError(error)) {
    statusCode = error.status;
    errorMessage = error.message;
  }
  res.status(statusCode).json({ error: { message: errorMessage } });
};

export default ErrorHandler;
