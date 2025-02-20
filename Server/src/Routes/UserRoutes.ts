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

router.get("/get-user", GetUser, async (req, res, next) => {});

router.get(
  "/get-user-active-status",
  GetUserActiveStatus,
  async (req, res, next) => {}
);

router.get("/check-user-email", CheckUserEmail, async (req, res, next) => {});

router.patch(
  "/update-user-email",
  UpdateUserEmail,
  async (req, res, next) => {}
);

router.patch(
  "/update-user-password",
  UpdateUserPassword,
  async (req, res, next) => {}
);

router.patch(
  "/restore-user-password",
  RestoreUserPassword,
  async (req, res, next) => {}
);
export default router;
