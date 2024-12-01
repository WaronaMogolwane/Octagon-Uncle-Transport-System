import { SERVER_HOST, SERVER_PORT } from "@env";
import axios from "axios";

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
