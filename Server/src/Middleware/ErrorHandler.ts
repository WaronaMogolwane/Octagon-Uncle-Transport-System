import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { isHttpError } from "http-errors";
import { ErrorResponse } from "../Classes/ErrorResponse";
import { CustomLogger } from "../Classes/CustomLogger";

const Logger = new CustomLogger();

const ErrorHandler: ErrorRequestHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let errorMessage = "An unknown error occurred";
  let stackTrace = "";

  if (isHttpError(error) || error) {
    statusCode = error.status || statusCode;
    errorMessage = error.message || errorMessage;
    stackTrace = error.stack || stackTrace;
  }

  Logger.Error(
    JSON.stringify({
      message: errorMessage,
      stack: stackTrace,
    })
  );

  const isProduction = process.env.NODE_ENV === "production";

  res.status(statusCode).json({
    message: errorMessage,
    ...(isProduction ? {} : { stack: stackTrace }), // Only include stack trace in development
  });
};

export default ErrorHandler;
