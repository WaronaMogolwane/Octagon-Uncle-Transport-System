import Router from "express-promise-router";
import {
  GetUser,
  UpdateUserEmail,
  UpdateUserPassword,
} from "../Controllers/UserController";
import { CreateNewCustomer, CreateNewPlan, CreateNewSubscription, TokenizePaymentInstrument } from "../Controllers/PaymentsController";

const router = Router();

router.post("/webhook", async (req, res, next) => {
  res.status(200).send(req.body);
  console.log(req.body)
});
router.post("/create-new-customer", CreateNewCustomer, async (req, res, next) => { });
router.post("/create-new-plan", CreateNewPlan, async (req, res, next) => { });
router.post("/create-new-subscription", CreateNewSubscription, async (req, res, next) => { });
router.post("/tokenize-payment-instrument", TokenizePaymentInstrument, async (req, res, next) => { });

export default router;
