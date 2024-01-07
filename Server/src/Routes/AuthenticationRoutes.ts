//import { Router } from "express";
import Router from 'express-promise-router'
import {
  CheckIfUserExists,
  RegisterUser,
  SendEmailOtp,
  SendUserInvitation,
  UserLogin,
  VerifyOtp,
  VerifyUserInvitation

} from "../Controllers/AuthenticationController";
import { CreateJWT } from '../Middleware/Auth';
const router = Router();

router.post("/register-user", RegisterUser, CreateJWT, async (req, res, next) => {
});

router.post("/login", UserLogin, CreateJWT, async (req, res, next) => { });

router.post("/send-email-otp", SendEmailOtp, (req, res) => { });

router.post("/send-register-otp", CheckIfUserExists, SendEmailOtp, (req, res) => { });

router.post("/verify-otp", VerifyOtp, async (req, res) => { });

router.post("/create-invitation", SendUserInvitation, (req, res) => { });

router.get("/verify-invitation", VerifyUserInvitation, (req, res) => { });

router.get("/", (req, res) => { });

export default router;
