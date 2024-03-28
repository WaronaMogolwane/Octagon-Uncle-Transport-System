import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import express from "express";
import authRoute from "./Routes/AuthenticationRoutes";
import userProfileRoute from "./Routes/UserDetailRoutes";
import passengerRoute from "./Routes/PassengerRoutes";
import tripRoute from "./Routes/TripRoutes";
import vehicleRoute from "./Routes/VehicleRoutes";
import passengerDriverVehicleLinkingRoute from "./Routes/PassengerDriverVehicleLinking";

import ErrorHandler from "./Middleware/ErrorHandler";

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
app.use("/passengerDriverVehicleLinking", passengerDriverVehicleLinkingRoute);

app.listen(PORT, function () {
  console.log(`Server is live on Port ${PORT}`);
});

app.use(ErrorHandler);
