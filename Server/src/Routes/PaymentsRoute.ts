import Router from "express-promise-router";
import {
    CreateNewCharge, CreateNewCustomer, CreateNewPaymentSchedule, CreateNewPlan,
    CreateNewSubscription, CreateNewTransferRecipient, CreateTransactionLink, CreateTransfer,
    GetAvailableBalance, GetBusinessPayments, GetDeclinedPaymentSummary,
    GetMonthlyPaymentDetails, GetPaymentsSummaryForThisMonth, GetUpcomingPaymentSummary,
    GetUserCardAuthorizations, RefundTransaction
} from "../Controllers/PaymentsController";
import { HandleWebhookEvent } from "../Services/PaystackService";

const router = Router();

// Webhook endpoint
router.post("/webhook", HandleWebhookEvent);

// Create operations
router.post("/create-new-customer", CreateNewCustomer);
router.post("/create-transfer-recipient", CreateNewTransferRecipient);
router.post("/create-new-plan", CreateNewPlan);
router.post("/create-payment-schedule", CreateNewPaymentSchedule);
router.post("/initialize-transaction", CreateTransactionLink);
router.post("/charge-authorization", CreateNewCharge);
router.post("/refund-transaction", RefundTransaction);
router.post("/initiate-transfer", CreateTransfer);

// Retrieve operations
router.get("/get-available-balance", GetAvailableBalance);
router.get("/get-payments-summary", GetPaymentsSummaryForThisMonth);
router.get("/get-upcoming-payments-summary", GetUpcomingPaymentSummary);
router.get("/get-declined-payments-summary", GetDeclinedPaymentSummary);
router.get("/get-business-payments", GetBusinessPayments);
router.get("/get-user-card-authorizations", GetUserCardAuthorizations);
router.get("/get-monthly-payment-details", GetMonthlyPaymentDetails);

export default router;
