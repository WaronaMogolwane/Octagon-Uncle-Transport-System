import Router from "express-promise-router";
import {
  CheckUserEmail,
  GetUser,
  GetUserActiveStatus,
  RestoreUserPassword,
  UpdateUserEmail,
  UpdateUserPassword,
} from "../Controllers/UserController";

const router = Router();

// GET Routes
router.get("/get-user", GetUser);
router.get("/get-user-active-status", GetUserActiveStatus);
router.get("/check-user-email", CheckUserEmail);

// PATCH Routes
router.patch("/update-user-email", UpdateUserEmail);
router.patch("/update-user-password", UpdateUserPassword);
router.patch("/restore-user-password", RestoreUserPassword);

export default router;
