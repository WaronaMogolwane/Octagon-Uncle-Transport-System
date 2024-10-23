import { ErrorRequestHandler } from "express";
import { isHttpError } from "http-errors";
import WinstonLogger from "../Utilities/WinstonLogger"; import { platform } from 'node:process';
import WindowsLogger from "../Utilities/WindowsLogger";
import { CustomLogger } from "../Classes/CustomLogger";
const Logger: CustomLogger = new CustomLogger();
const ErrorHandler: ErrorRequestHandler = (
  error: any,
  req: any,
  res: any,
  next: any
) => {
  let statusCode: number = 500;
  let errorMessage: string = "An unknown error occured";
  let stackTrace: string = "";
  if (isHttpError(error) || error) {
    statusCode = error.status ? error.status : statusCode;
    errorMessage = error.message ? error.message : errorMessage;
    stackTrace = error.stack ? error.stack : stackTrace;
  }
  Logger.Error(JSON.stringify({
    message: errorMessage,
    stack: stackTrace
  }))
  res.status(statusCode).json(
    {
      message: errorMessage,
      stack: stackTrace
    }
  );
};

export default ErrorHandler;
