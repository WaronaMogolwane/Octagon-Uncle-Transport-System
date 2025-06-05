// In Middleware/ErrorHandler.ts

import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { isHttpError } from "http-errors";
import { ErrorResponse } from "../Classes/ErrorResponse";
import { ServerLogger } from "../server";

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
    if (error.stack) {
      stackTrace = error.stack;
    }
  }
  setTimeout(() => {
    try {
      ServerLogger.Error(errorMessage, {
        stack: stackTrace,
        statusCode: statusCode,
        path: req.path,
        method: req.method
      });
    } catch (logError) {
      ServerLogger.Error(`Error occurred while trying to log error: ${logError}`);
    }
  }, 100);


  const isProduction = process.env.NODE_ENV === "production";

  res.status(statusCode).json({
    message: errorMessage,
    ...(isProduction ? {} : { stack: stackTrace }), // Only include stack trace in development
  });
};

export default ErrorHandler;