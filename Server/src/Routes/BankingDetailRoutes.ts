import Router from "express-promise-router";
import {
  AddBankingDetail,
  ModifyBankingDetail,
} from "../Controllers/BankingDetailController";

const router = Router();

router.post(
  "/add-banking-detail",
  AddBankingDetail,
  async (req, res, next) => {}
);

router.patch(
  "/update-banking-detail",
  ModifyBankingDetail,
  async (req, res, next) => {}
);

export default router;
