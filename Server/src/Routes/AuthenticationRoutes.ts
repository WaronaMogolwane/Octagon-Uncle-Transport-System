//import { Router } from "express";
import Router from 'express-promise-router'
import {
  CheckIfUserExists,
  RegisterUser,
  SendEmailOtp,
  UserLogin,
  VerifyOtp

} from "../Controllers/AuthenticationController";
const router = Router();

router.post("/register-user", RegisterUser, async (req, res, next) => {
});

router.post("/login", UserLogin, async (req, res, next) => { });

router.post("/send-email-otp", SendEmailOtp, (req, res) => { });

router.post("/send-register-otp", CheckIfUserExists, SendEmailOtp, (req, res) => { });

router.post("/verify-otp", VerifyOtp, async (req, res) => { });

router.get("/", (req, res) => { });

export default router;
