import Router from "express-promise-router";
import {
  AddUserDetail,
  GetUserDetail,
  UpdateUserPersonalDetail,
} from "../Controllers/UserDetailController";
const router = Router();

router.post("/add-user-details", AddUserDetail, async (req, res, next) => {});

router.post("/get-user-details", GetUserDetail, async (req, res, next) => {});

router.patch(
  "/update-user-details",
  UpdateUserPersonalDetail,
  async (req, res, next) => {}
);

export default router;
