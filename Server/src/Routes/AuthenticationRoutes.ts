//import { Router } from "express";
import Router from 'express-promise-router'
import {
  CheckIfUserExists,
  DeactivateUser,
  GetBusinessDrivers,
  GetBusinessClients,
  GetPendingInvitations,
  RegisterUser,
  RemoveUserInvitation,
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
router.patch("/deactivate-user", DeactivateUser, async (req, res) => {
});
router.post("/login", UserLogin, CreateJWT, async (req, res, next) => { });

router.post("/send-email-otp", SendEmailOtp, (req, res) => { });

router.post("/send-register-otp", CheckIfUserExists, SendEmailOtp, (req, res) => { });

router.post("/verify-otp", VerifyOtp, async (req, res) => { });

router.post("/create-invitation", SendUserInvitation, (req, res) => { });

router.post("/verify-invitation", VerifyUserInvitation, async (req, res) => {
});
router.get("/get-pending-invitations", GetPendingInvitations, async (req, res) => {
});
router.delete("/delete-user-invitation", RemoveUserInvitation, async (req, res) => {
});
router.get("/get-business-drivers", GetBusinessDrivers, async (req, res) => {
});
router.get("/get-business-clients", GetBusinessClients, async (req, res) => {
});
router.get("/", (req, res) => { });

export default router;
