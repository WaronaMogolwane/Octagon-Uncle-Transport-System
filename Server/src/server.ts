import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import { InitDatabaseTables } from "./Models/DatabaseModel";
import express from "express";
import authRoute from "./Routes/AuthenticationRoutes";
import userProfileRoute from "./Routes/UserDetailRoutes";
import passengerRoute from "./Routes/PassengerRoutes";
import { authenticateJWT } from "./Middleware/Auth";
import ErrorHandler from "./Middleware/ErrorHandler";

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8081;

app.use("/auth", authenticateJWT, authRoute);
app.use("/user-profile", authenticateJWT, userProfileRoute);
app.use("/passenger", authenticateJWT, passengerRoute);

app.listen(PORT, function () {
  InitDatabaseTables();
  console.log(`Server is live on Port ${PORT}`);
});

app.use(ErrorHandler);
