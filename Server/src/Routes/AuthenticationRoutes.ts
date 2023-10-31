//import { Router } from "express";
import Router from 'express-promise-router'
import { AddNewUser, GetUserByEmail } from "../Models/DatabaseModel";
import { SendOtp, VerifyOtp } from "../Models/OtpModel";
import {
  CheckIfUserExists,
  RegisterUser,
} from "../Controllers/AuthenticationController";
import { DbConnect } from "../Services/DatabaseService"
import { authenticateJWT } from "../Middleware/Auth";
const router = Router();

router.post("/register-user", DbConnect, (req, res, next) => { });

router.post("/login", (req, res) => { });

router.post("/send-login-otp", SendOtp, (req, res) => { });

router.post("/send-register-otp", CheckIfUserExists, SendOtp, (req, res) => { });

router.post("/verify-otp", VerifyOtp, (req, res) => { });

router.get("/", (req, res) => { });

export default router;
