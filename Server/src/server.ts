import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import express from "express";
import authRoute from "./Routes/AuthenticationRoutes";
import userProfileRoute from "./Routes/UserDetailRoutes";
import passengerRoute from "./Routes/PassengerRoutes";
import tripRoute from "./Routes/TripRoutes";
import vehicleRoute from "./Routes/VehicleRoutes";
import passengerDriverVehicleLinkingRoute from "./Routes/PassengerDriverVehicleLinkingRoutes";
import passengerScheduleRoute from "./Routes/PassengerScheduleRoutes";
import driverVehicleLinkingRoute from "./Routes/DriverVehicleLinkingRoutes";
import businessDetailRoute from "./Routes/BusinessDetailRoutes";
import bankingDetailRoute from "./Routes/BankingDetailRoutes";
import userRoute from "./Routes/UserRoutes";
import paymentsRoute from "./Routes/PaymentsRoute";
import pushNotificationsRoute from "./Routes/PushNotificationsRoute";

import ErrorHandler from "./Middleware/ErrorHandler";
// myServerFile.js
import { firebase } from "./firebase";
// Use the Firebase Admin SDK here...
import { StartSchedule } from "./Services/ScheduleService";
import WinstonLogger from "./Utilities/WinstonLogger";

const app = express();

var cors = require("cors");
app.use(cors());

const PORT = process.env.OUTS_SERVER_PORT || 8081;
var bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);
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
app.use(
  "/passenger-driver-vehicle-linking",
  passengerDriverVehicleLinkingRoute
);
app.use("/passenger-schedule", passengerScheduleRoute);
app.use("/driver-vehicle-linking", driverVehicleLinkingRoute);
const fbp = firebase;
StartSchedule();

app.listen(PORT, function () {
  WinstonLogger.info(`Server is live on Port ${PORT}`);
});

app.use(ErrorHandler);
