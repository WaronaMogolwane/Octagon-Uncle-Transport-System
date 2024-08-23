import Router from "express-promise-router";
import { ChargeAuthorization, CreateNewCustomer, CreateNewPlan, CreateNewSubscription, CreateTransactionLink } from "../Controllers/PaymentsController";
import { HandleWebhookEvent } from "../Services/PaystackService";
const PAYSTACK_SECRET_KEY: string = process.env.OUTS_PAYSTACK_TEST_PUBLIC_KEY;
const router = Router();

router.post("/webhook", HandleWebhookEvent, async (req, res, next) => { });
router.post("/create-new-customer", CreateNewCustomer, async (req, res, next) => { });
router.post("/create-new-plan", CreateNewPlan, async (req, res, next) => { });
router.post("/create-new-subscription", CreateNewSubscription, async (req, res, next) => { });
router.post("/initialize-transaction", CreateTransactionLink, async (req, res, next) => { });
router.post("/charge-authorization", ChargeAuthorization, async (req, res, next) => { });

export default router;
