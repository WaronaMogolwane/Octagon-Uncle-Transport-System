import { Router } from "express";
import { AddNewUser, GetUserByEmail } from '../Models/DatabaseModel.js';
import { SendOtp, VerifyOtp } from '../Models/OtpModel.js';
import { CheckIfUserExists, RegisterUser } from '../Controllers/AuthenticationController.js';
const router = Router();



router.post("/register-user", RegisterUser, (req, res) => {});

router.post("/login", (req, res) => {});

router.post("/send-login-otp", SendOtp, (req, res) => {});

router.post("/send-register-otp", CheckIfUserExists, SendOtp, (req, res) => {});

router.post("/verify-otp", VerifyOtp, (req, res) => {});

router.get('/', (req, res) => {});

export default router;