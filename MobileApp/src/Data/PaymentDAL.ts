import { SERVER_HOST, SERVER_PORT } from "@env";
import axios from "axios";
import { PaymentSchedule } from "../Models/PaymentShedule";

// Insert Payment Schedule
export const InsertPaymentSchedule = async (
    newPaymentSchedule: PaymentSchedule
): Promise<any> => {
    try {
        const response = await axios.post(
            `${SERVER_HOST}:${SERVER_PORT}/payments/create-payment-schedule`,
            {
                PaymentsScheduleId: newPaymentSchedule.PaymentsScheduleId,
                UserId: newPaymentSchedule.UserId,
                Amount: newPaymentSchedule.Amount,
                CardAuthorisationId: newPaymentSchedule.CardAuthorisationId,
                PaymentDay: newPaymentSchedule.PaymentDay,
                DateCreated: newPaymentSchedule.DateCreated,
            }
        );
        return response.data;
    } catch (error: any) {
        throw error.response?.data || error;
    }
};

// Get Available Balance by Business ID
export const GetAvailableBalanceByBusinessId = async (
    businessId: string
): Promise<any> => {
    try {
        const response = await axios.get(
            `${SERVER_HOST}:${SERVER_PORT}/payments/get-available-balance`,
            { params: { businessId } }
        );
        return response.data;
    } catch (error: any) {
        throw error.response?.data || error;
    }
};

// Get Upcoming Payment Summary by Business ID
export const GetUpcomingPaymentSummaryByBusinessId = async (
    businessId: string
): Promise<any> => {
    try {
        const response = await axios.get(
            `${SERVER_HOST}:${SERVER_PORT}/payments/get-upcoming-payments-summary`,
            { params: { businessId } }
        );
        return response.data;
    } catch (error: any) {
        throw error.response?.data || error;
    }
};

// Get Payments Summary for This Month
export const GetPaymentsSummaryForThisMonthByBusinessId = async (
    businessId: string
): Promise<any> => {
    try {
        const response = await axios.get(
            `${SERVER_HOST}:${SERVER_PORT}/payments/get-payments-summary`,
            { params: { businessId } }
        );
        return response.data;
    } catch (error: any) {
        throw error.response?.data || error;
    }
};

// Get Declined Payment Summary by Business ID
export const GetDeclinedPaymentSummaryByBusinessId = async (
    businessId: string
): Promise<any> => {
    try {
        const response = await axios.get(
            `${SERVER_HOST}:${SERVER_PORT}/payments/get-declined-payments-summary`,
            { params: { businessId } }
        );
        return response.data;
    } catch (error: any) {
        throw error.response?.data || error;
    }
};

// Get Payments by Business ID
export const GetPaymentsByBusinessId = async (
    businessId: string
): Promise<any> => {
    try {
        const response = await axios.get(
            `${SERVER_HOST}:${SERVER_PORT}/payments/get-business-payments`,
            { params: { businessId } }
        );
        return response.data;
    } catch (error: any) {
        throw error.response?.data || error;
    }
};

// Get Card Authorizations by User ID
export const GetCardAuthorizationsByUserId = async (
    userId: string
): Promise<any> => {
    try {
        const response = await axios.get(
            `${SERVER_HOST}:${SERVER_PORT}/payments/get-user-card-authorizations`,
            { params: { userId } }
        );
        return response.data;
    } catch (error: any) {
        throw error.response?.data || error;
    }
};
