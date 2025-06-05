import Router from "express-promise-router";
import {
  AddBankingDetail,
  GetBankingDetail,
  ModifyBankingDetail,
  VerifyAccountNumber,
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

router.get(
  "/get-banking-detail",
  GetBankingDetail,
  async (req, res, next) => {}
);

router.get(
  "/verify-account-number",
  VerifyAccountNumber,
  async (req, res, next) => {}
);

export default router;
