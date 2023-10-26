import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import { InitDatabaseTables } from "./Models/DatabaseModel.ts";
import express from "express";
import authRoute from "./Routes/AuthenticationRoutes.ts";
import userProfileRoute from "./Routes/UserDetailRoutes.ts";
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8081;

app.use("/auth", authRoute);
app.use("/user-profile", userProfileRoute);

app.listen(PORT, function () {
  InitialiseServer();
  console.log(`Server is live on Port ${PORT}`);
});

const InitialiseServer = () => {
  InitDatabaseTables();
};
