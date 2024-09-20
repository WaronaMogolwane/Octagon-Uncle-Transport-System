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

  if (isHttpError(error) || error) {
    statusCode = error.status ? error.status : statusCode;
    errorMessage = error.message ? error.message : errorMessage;
  }
  Logger.Error(errorMessage)
  res.status(statusCode).json({ error: { message: errorMessage } });
};

export default ErrorHandler;
