import Router from "express-promise-router";
import {
  AddUserDetail,
  GetUserDetail,
  UpdateUserDetail,
} from "../Controllers/UserDetailController";
const router = Router();

router.post("/create-user-detail", AddUserDetail, async (req, res, next) => {});

router.get("/get-user-detail", GetUserDetail, async (req, res, next) => {});

router.post(
  "/update-user-detail",
  UpdateUserDetail,
  async (req, res, next) => {}
);

// router.delete("/delete-account", (req, res) => { });
// router.patch("/edit-profile", (req, res) => { });
// router.get("/profile", (req, res) => { });

export default router;
