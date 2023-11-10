//import { Router } from "express";
import Router from 'express-promise-router'
import { AddNewUser, GetUserByEmail } from "../Models/DatabaseModel";
import {
  CheckIfUserExists,
  RegisterUser,
  SendEmailOtp,
  VerifyOtp

} from "../Controllers/AuthenticationController";
import { authenticateJWT } from "../Middleware/Auth";
const router = Router();

router.post("/register-user", RegisterUser, async (req, res, next) => {
});

router.post("/login", (req, res) => { });

router.post("/send-login-otp", SendEmailOtp, (req, res) => { });

router.post("/send-register-otp", CheckIfUserExists, SendEmailOtp, (req, res) => { });

router.post("/verify-otp", VerifyOtp, (req, res) => { });

router.get("/", (req, res) => { });

export default router;
