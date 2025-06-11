import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import { firebase } from "./firebase";
import ErrorHandler from "./Middleware/ErrorHandler";
import { MainWorker } from "./Worker/MainWorker";
import { RegisterRoutes } from "./Routes/Routes";

// Import the FUNCTION to create Winston loggers (File/Console only)
import { CreateLogger as CreateWinstonLogger } from './Utilities/WinstonLogger'; // Adjust path

// Import the CustomLogger class (ensure this is the MODIFIED version that accepts eventLogger)
import { CustomLogger } from "./Classes/CustomLogger"; // Adjust path

// Import the logger instances from your WindowsLogger.ts file
import { ServerEventLogger } from "./Utilities/WindowsLogger"; // Adjust path


// Initialize dotenv configuration
dotenv.config();

const serverWinstonLogger = CreateWinstonLogger("Octagon Uncle Server");

// Create CustomLogger Instances, Wrapping Winston AND Passing node-windows EventLoggers
const ServerLogger = new CustomLogger(serverWinstonLogger, {
  eventLogger: ServerEventLogger
});

// Application Setup
const NODE_ENV = process.env.NODE_ENV;
const PORT = process.env.OUTS_SERVER_PORT;

const app = express();

// Middleware setup
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));

// Register API Routes
RegisterRoutes(app);

// Error Handling Middleware
app.use(ErrorHandler);


// Start the Express Server
app.listen(PORT, () => {
  ServerLogger.Log(`Octagon Uncle server is live on Port ${PORT}`);
});


// Start Worker Jobs (Conditionally)
if (NODE_ENV === "development") {
  const mainWorker = new MainWorker();
  mainWorker.StartJobs();
}

// Export the logger instances
export { ServerLogger }