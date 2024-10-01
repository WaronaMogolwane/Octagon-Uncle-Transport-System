import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { firebase } from "./firebase";
import ErrorHandler from "./Middleware/ErrorHandler";
import authRoute from "./Routes/AuthenticationRoutes";
import bankingDetailRoute from "./Routes/BankingDetailRoutes";
import businessDetailRoute from "./Routes/BusinessDetailRoutes";
import driverVehicleLinkingRoute from "./Routes/DriverVehicleLinkingRoutes";
import passengerDriverVehicleLinkingRoute from "./Routes/PassengerDriverVehicleLinkingRoutes";
import passengerRoute from "./Routes/PassengerRoutes";
import passengerScheduleRoute from "./Routes/PassengerScheduleRoutes";
import paymentsRoute from "./Routes/PaymentsRoute";
import pushNotificationsRoute from "./Routes/PushNotificationsRoute";
import tripRoute from "./Routes/TripRoutes";
import userProfileRoute from "./Routes/UserDetailRoutes";
import userRoute from "./Routes/UserRoutes";
import vehicleRoute from "./Routes/VehicleRoutes";
import WinstonLogger from "./Utilities/WinstonLogger";
import { MainWorker } from "./Worker/MainWorker";

const app = express();
app.use(cors());

const PORT = process.env.OUTS_SERVER_PORT || 8081;
var bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);
RegisterRoutes();

const fbp = firebase;

app.use(ErrorHandler);

const mainWorker: MainWorker = new MainWorker();
mainWorker.StartJobs();

app.listen(PORT, function () {
  WinstonLogger.info(`Server is live on Port ${PORT}`);
});
function RegisterRoutes() {
  app.use("/auth", authRoute);
  app.use("/user", userRoute);
  app.use("/user-profile", userProfileRoute);
  app.use("/passenger", passengerRoute);
  app.use("/trip", tripRoute);
  app.use("/vehicle", vehicleRoute);
  app.use("/business-detail", businessDetailRoute);
  app.use("/banking-detail", bankingDetailRoute);
  app.use("/payments", paymentsRoute);
  app.use("/push-notifications", pushNotificationsRoute);
  app.use("/passenger-driver-vehicle-linking", passengerDriverVehicleLinkingRoute);
  app.use("/passenger-schedule", passengerScheduleRoute);
  app.use("/driver-vehicle-linking", driverVehicleLinkingRoute);
}

