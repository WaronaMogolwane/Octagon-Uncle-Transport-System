import Router from "express-promise-router";
import {
  AddBusinessDetail,
  GetBusinessDetail,
  GetBusinessDetailForParent,
  ModifyBusinessDetail,
} from "../Controllers/BusinessDetailController";

const router = Router();

router.post(
  "/add-business-detail",
  AddBusinessDetail,
  async (req, res, next) => {}
);

router.get(
  "/get-business-detail",
  GetBusinessDetail,
  async (req, res, next) => {}
);

router.get(
  "/get-business-detail-for-parent",
  GetBusinessDetailForParent,
  async (req, res, next) => {}
);

router.patch(
  "/update-business-detail",
  ModifyBusinessDetail,
  async (req, res, next) => {}
);

export default router;
