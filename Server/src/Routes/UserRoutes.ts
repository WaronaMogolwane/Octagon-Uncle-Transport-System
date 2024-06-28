import Router from "express-promise-router";
import {
  GetUser,
  UpdateUserEmail,
  UpdateUserPassword,
} from "../Controllers/UserController";

const router = Router();

router.get("/get-user", GetUser, async (req, res, next) => {});

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
export default router;
