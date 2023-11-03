import { ErrorRequestHandler } from "express";
import { isHttpError } from "http-errors";
import { ErrorResponse } from "../Classes/ErrorResponse";

const ErrorHandler: ErrorRequestHandler = (
  error: any,
  req: any,
  res: any,
  next: any
) => {
  console.error(error);
  let statusCode: number = 500;
  let errorMessage: string = "An unknown error occured";
  if (isHttpError(error)) {
    statusCode = error.status;
    errorMessage = error.message;
  }
  res.status(statusCode).json({ error: { message: errorMessage } });
};

export default ErrorHandler;
