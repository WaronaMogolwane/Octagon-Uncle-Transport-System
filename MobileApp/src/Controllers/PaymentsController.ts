import {
    GetAvailableBalanceByBusinessId,
    GetCardAuthorizationsByUserId,
    GetDeclinedPaymentSummaryByBusinessId,
    GetPaymentsByBusinessId,
    GetPaymentsSummaryForThisMonthByBusinessId,
    GetUpcomingPaymentSummaryByBusinessId,
    InsertPaymentSchedule,
} from "../Data/PaymentDAL";
import { PaymentSchedule } from "../Models/PaymentShedule";
import { AuthorizationCharge } from "../Models/PaymentsModel";
import {
    ChargeAuthorization,
    GetMonthlyPaymentDetailsByUserId,
    InitializeTransaction,
} from "../Services/PaymentsService";

// Convert all callback-based functions to promise-based versions for simplicity
export const CreatePaymentSchedule = async (newPaymentSchedule: PaymentSchedule): Promise<any> => {
    try {
        const result = await InsertPaymentSchedule(newPaymentSchedule);
        return result;
    } catch (error) {
        throw error;
    }
};

export const GetBalanceByBusinessId = async (businessId: string, callback?: (error: any, result: any) => void): Promise<any> => {
    try {
        const result = await GetAvailableBalanceByBusinessId(businessId);
        return result;
    } catch (error) {
        throw error;
    }
};

export const GetUpcomingPaymentsSummary = async (businessId: string): Promise<any> => {
    try {
        const result = await GetUpcomingPaymentSummaryByBusinessId(businessId);
        return result;
    } catch (error) {
        throw error;
    }
};

export const GetPaymentsSummaryForThisMonth = async (businessId: string): Promise<any> => {
    try {
        const result = await GetPaymentsSummaryForThisMonthByBusinessId(businessId);
        return result;
    } catch (error) {
        throw error;
    }
};

export const GetDeclinedPaymentsSummary = async (businessId: string): Promise<any> => {
    try {
        const result = await GetDeclinedPaymentSummaryByBusinessId(businessId);
        return result;
    } catch (error) {
        throw error;
    }
};

export const GetBusinessPayments = async (businessId: string): Promise<any> => {
    try {
        const result = await GetPaymentsByBusinessId(businessId);
        return result;
    } catch (error) {
        throw error;
    }
};

export const GetUserCardAuthorizations = async (userId: string): Promise<any> => {
    try {
        const result = await GetCardAuthorizationsByUserId(userId);
        return result;
    } catch (error) {
        throw error;
    }
};

export const PayAmount = async (authorizationCharge: AuthorizationCharge): Promise<any> => {
    try {
        const result = await ChargeAuthorization(authorizationCharge);
        return result;
    } catch (error) {
        throw error;
    }
};

export const GetMonthlyPaymentDetails = async (userId: string): Promise<any> => {
    try {
        const result = await GetMonthlyPaymentDetailsByUserId(userId);
        return result;
    } catch (error) {
        throw error;
    }
};

export const TokenizePaymentMethod = async (
    email: string,
    reference: string,
    userId: string,
    businessId: string
): Promise<any> => {
    try {
        const result = await InitializeTransaction(email, reference, userId, businessId);
        return result;
    } catch (error) {
        throw error;
    }
};
