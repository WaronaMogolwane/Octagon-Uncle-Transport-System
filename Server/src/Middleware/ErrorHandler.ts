// In Middleware/ErrorHandler.ts

import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { isHttpError } from "http-errors";
import { ErrorResponse } from "../Classes/ErrorResponse";
import { ServerLogger } from "../server"; // Assuming this is the correct import for your server's logger

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
    // Ensure stackTrace is captured if available
    if (error.stack) {
      stackTrace = error.stack;
    }
  }

  // *** Add a console log here to see if the handler is reached immediately ***
  console.error(`Error Handler Reached for ${req.method} ${req.path}. Logging error...`);


  // *** Wrap the Logger.Error call in a setTimeout ***
  setTimeout(() => {
    try {
      ServerLogger.Error(errorMessage, { // Pass the main error message string
        stack: stackTrace, // Pass stack trace as metadata
        statusCode: statusCode, // Pass status code as metadata
        path: req.path, // Pass request path as metadata
        method: req.method // Pass request method as metadata
        // Add any other relevant details here as key-value pairs
      });
      // Optional: Log confirmation *after* Logger.Error call is made (doesn't guarantee flush)
      // console.log('Logger.Error called within setTimeout');
    } catch (logError) {
      // Catch potential errors during the logging attempt itself
      console.error(`Error occurred while trying to log error: ${logError}`);
    }
  }, 50); // Add a small delay (e.g., 50 milliseconds)


  const isProduction = process.env.NODE_ENV === "production";

  // Ensure the response is sent relatively quickly even with the timeout for logging
  res.status(statusCode).json({
    message: errorMessage,
    ...(isProduction ? {} : { stack: stackTrace }), // Only include stack trace in development
  });

  // Call next if needed, though error handlers often don't call next unless re-throwing or deferring
  // next();
};

export default ErrorHandler;