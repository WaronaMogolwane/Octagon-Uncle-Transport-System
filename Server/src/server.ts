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

import schedule from "node-schedule";

import ErrorHandler from "./Middleware/ErrorHandler";

import { AutoInsertPassengerSchedule } from "./Models/PassengerScheduleModel";

const app = express();

var cors = require("cors");
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8081;

app.use("/auth", authRoute);
app.use("/user-profile", userProfileRoute);
app.use("/passenger", passengerRoute);
app.use("/trip", tripRoute);
app.use("/vehicle", vehicleRoute);
app.use(
  "/passenger-driver-vehicle-linking",
  passengerDriverVehicleLinkingRoute
);
app.use("/passenger-schedule", passengerScheduleRoute);
app.use("/driver-vehicle-linking", driverVehicleLinkingRoute);

const job = schedule.scheduleJob("30 * * * * *", function () {
  AutoInsertPassengerSchedule((error, result) => {
    if (result) {
      console.log(result);
    } else if (error) {
      console.log(error);
    } else {
      console.log("The Schedule ran but it got neither response Nick :(");
    }
  });
});

app.listen(PORT, function () {
  console.log(`Server is live on Port ${PORT}`);
});

app.use(ErrorHandler);
