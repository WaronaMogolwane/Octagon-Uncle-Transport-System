import { SERVER_HOST, SERVER_PORT } from "@env";
import axios from "axios";
import { CardAuthorisation } from "../Models/PaymentsModel";
import { PaymentSchedule } from "../Models/PaymentShedule";

export const InsertPaymentSchedule = async (
    newPaymentSchedule: PaymentSchedule,
    callback: (error: any, result: any) => void,
) => {
    await axios
        .post(`${SERVER_HOST}:${SERVER_PORT}/payments/create-payment-schedule`, {
            PaymentsScheduleId: newPaymentSchedule.PaymentsScheduleId,
            UserId: newPaymentSchedule.UserId,
            Amount: newPaymentSchedule.Amount,
            CardAuthorisationId: newPaymentSchedule.CardAuthorisationId,
            PaymentDay: newPaymentSchedule.PaymentDay,
            DateCreated: newPaymentSchedule.DateCreated,
        })
        .then((response: any) => {
            callback(null, response);
        })
        .catch((error: any) => {
            callback(error, null);
        });
};

export const GetAvailableBalanceByBusinessId = async (businessId: string, callback: (error: any, result: any) => void) => {
    await axios
        .get(
            `${SERVER_HOST}:${SERVER_PORT}/payments/get-available-balance?businessId=${businessId}`
        )
        .then((response: any) => {
            callback(null, response.data)
        })
        .catch((error: any) => {
            console.error(error, null);
        });

};
export const GetUpcomingPaymentSummaryByBusinessId = async (businessId: string, callback: (error: any, result: any) => void) => {
    await axios
        .get(
            `${SERVER_HOST}:${SERVER_PORT}/payments/get-upcoming-payments-summary?businessId=${businessId}`
        )
        .then((response: any) => {
            callback(null, response.data)
        })
        .catch((error: any) => {
            console.error(error, null);
        });

};
export const GetPaymentsSummaryForThisMonthByBusinessId = async (businessId: string, callback: (error: any, result: any) => void) => {
    await axios
        .get(
            `${SERVER_HOST}:${SERVER_PORT}/payments/get-payments-summary?businessId=${businessId}`
        )
        .then((response: any) => {
            callback(null, response.data)
        })
        .catch((error: any) => {
            console.error(error, null);
        });

};
export const GetDeclinedPaymentSummaryByBusinessId = async (businessId: string, callback: (error: any, result: any) => void) => {
    await axios
        .get(
            `${SERVER_HOST}:${SERVER_PORT}/payments/get-declined-payments-summary?businessId=${businessId}`
        )
        .then((response: any) => {
            callback(null, response.data)
        })
        .catch((error: any) => {
            console.error(error, null);
        });

};
export const GetPaymentsByBusinessId = async (businessId: string, callback: (error: any, result: any) => void) => {
    await axios
        .get(
            `${SERVER_HOST}:${SERVER_PORT}/payments/get-business-payments?businessId=${businessId}`
        )
        .then((response: any) => {
            callback(null, response.data)
        })
        .catch((error: any) => {
            console.error(error, null);
        });

};
export const GetCardAuthorizationsByUserId = async (userId: string, callback: (error: any, result: any) => void) => {
    await axios
        .get(
            `${SERVER_HOST}:${SERVER_PORT}/payments/get-user-card-authorizations?userId=${userId}`
        )
        .then((response: any) => {
            callback(null, response.data)
        })
        .catch((error: any) => {
            console.error(error, null);
        });

};
