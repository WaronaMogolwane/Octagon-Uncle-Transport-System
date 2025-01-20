import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { firebase } from "./firebase";
import ErrorHandler from "./Middleware/ErrorHandler";
import WinstonLogger from "./Utilities/WinstonLogger";
import { MainWorker } from "./Worker/MainWorker";
import { CustomLogger } from "./Classes/CustomLogger";
import { RegisterRoutes } from "./Routes/Routes";

const Logger: CustomLogger = new CustomLogger();
const NODE_ENV = process.env.NODE_ENV;
let PORT = (NODE_ENV === "development") ? process.env.OUTS_SERVER_PORT : process.env.PORT;
const app = express();
const fbp = firebase;
let bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);
app.use(ErrorHandler);
app.listen(PORT, function () {
  Logger.Log(`Octagon Uncle server is live on Port ${PORT}`);
});

RegisterRoutes(app);

if (NODE_ENV === 'development') {
  const mainWorker: MainWorker = new MainWorker();
  mainWorker.StartJobs();
}