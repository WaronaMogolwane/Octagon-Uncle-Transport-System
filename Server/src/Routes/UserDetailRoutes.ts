import Router from "express-promise-router";
import {
  AddUserDetail,
  DeleteProfileImageUrl,
  GetUserDetail,
  GetUserProfileImage,
  UpdateProfileImageUrl,
  UpdateUserPersonalDetail,
} from "../Controllers/UserDetailController";
const router = Router();

router.post("/add-user-details", AddUserDetail, async (req, res, next) => {});

router.get(
  "/get-user-profile-image",
  GetUserProfileImage,
  async (req, res, next) => {}
);

router.get("/get-user-profile", GetUserDetail, async (req, res, next) => {});

router.patch(
  "/update-user-details",
  UpdateUserPersonalDetail,
  async (req, res, next) => {}
);
router.patch(
  "/update-user-detail-profile-url",
  UpdateProfileImageUrl,
  async (req, res, next) => {}
);

router.patch(
  "/delete-user-detail-profile-url",
  DeleteProfileImageUrl,
  async (req, res, next) => {}
);

export default router;
