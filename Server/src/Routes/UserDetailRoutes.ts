import Router from "express-promise-router";
import {
  AddUserDetail,
  GetUserDetail,
  UpdateUserDetail,
} from "../Controllers/UserDetailController";
const router = Router();

router.post("/create-user-detail", AddUserDetail, async (req, res, next) => {});

router.get("/get-user-detail", GetUserDetail, async (req, res, next) => {});

router.patch(
  "/update-user-detail",
  UpdateUserDetail,
  async (req, res, next) => {}
);

export default router;
