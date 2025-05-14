import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import { firebase } from "./firebase";
import ErrorHandler from "./Middleware/ErrorHandler";
import { MainWorker } from "./Worker/MainWorker";
import { RegisterRoutes } from "./Routes/Routes";
import { CreateLogger } from './Utilities/WinstonLogger';
import { CustomLogger } from "./Classes/CustomLogger";


// Initialize dotenv configuration
dotenv.config();


// Create the server-specific logger instance 
const serverLogger = CreateLogger('Octagon Uncle Server', 'server');
const Logger = new CustomLogger(serverLogger); // Pass the server-specific logger instance to CustomLogger

const NODE_ENV = process.env.NODE_ENV || "production"; // Default to "production" if NODE_ENV is undefined
const PORT = NODE_ENV === "development" ? process.env.OUTS_SERVER_PORT : process.env.OUTS_SERVER_PORT;

const app = express();

// Middleware setup
app.use(cors());
app.use(ErrorHandler);
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));

// Start the server
app.listen(PORT, () => {
  Logger.Log(`Octagon Uncle server is live on Port ${PORT}`);
});

// Register routes
RegisterRoutes(app);

// Start jobs in development mode
if (NODE_ENV === "development") {
  const mainWorker = new MainWorker();
  mainWorker.StartJobs();
}

export { Logger }
