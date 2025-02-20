import { GetAvailableBalanceByBusinessId, GetCardAuthorizationsByUserId, GetDeclinedPaymentSummaryByBusinessId, GetPaymentsByBusinessId, GetPaymentsSummaryForThisMonthByBusinessId, GetUpcomingPaymentSummaryByBusinessId, InsertPaymentSchedule } from "../Data/PaymentDAL";
import { PaymentSchedule } from "../Models/PaymentShedule";
import { AuthorizationCharge } from "../Models/PaymentsModel";
import { ChargeAuthorization, GetMonthlyPaymentDetailsByUserId, InitializeTransaction } from "../Services/PaymentsService";


export const CreatePaymentSchedule = async (newPaymentSchedule: PaymentSchedule, callback: (error: any, result: any) => void) => {
    return await InsertPaymentSchedule(newPaymentSchedule, (error: any, result: any) => {
        if (error) {
            callback(error, null);
        }
        else {
            callback(null, result);
        }
    });
};
export const GetBalanceByBusinessId = async (businessId: string, callback: (error: any, result: any) => void) => {
    return await GetAvailableBalanceByBusinessId(businessId, (error: any, result: any) => {
        if (error) {
            callback(error, null);
        }
        else {
            callback(null, result);
        }
    });
};
export const GetUpcomingPaymentsSummary = async (businessId: string, callback: (error: any, result: any) => void) => {
    return await GetUpcomingPaymentSummaryByBusinessId(businessId, (error: any, result: any) => {
        if (error) {
            callback(error, null);
        }
        else {
            callback(null, result);
        }
    });
};
export const GetPaymentsSummaryForThisMonth = async (businessId: string, callback: (error: any, result: any) => void) => {
    return await GetPaymentsSummaryForThisMonthByBusinessId(businessId, (error: any, result: any) => {
        if (error) {
            callback(error, null);
        }
        else {
            callback(null, result);
        }
    });
};
export const GetDeclinedPaymentsSummary = async (businessId: string, callback: (error: any, result: any) => void) => {
    return await GetDeclinedPaymentSummaryByBusinessId(businessId, (error: any, result: any) => {
        if (error) {
            callback(error, null);
        }
        else {
            callback(null, result);
        }
    });
};
export const GetBusinessPayments = async (businessId: string, callback: (error: any, result: any) => void) => {
    return await GetPaymentsByBusinessId(businessId, (error: any, result: any) => {
        if (error) {
            callback(error, null);
        }
        else {
            callback(null, result);
        }
    });
};
export const GetUserCardAuthorizations = async (userId: string, callback: (error: any, result: any) => void) => {
    return await GetCardAuthorizationsByUserId(userId, (error: any, result: any) => {
        if (error) {
            callback(error, null);
        }
        else {
            callback(null, result);
        }
    });
};
export const PayAmount = async (authorizationCharge: AuthorizationCharge, callback: (error: any, result: any) => void) => {
    await ChargeAuthorization(authorizationCharge, (error: any, result: any) => {
        if (error) {
            callback(error, null);
        }
        else {
            callback(null, result);
        }
    });
};
export const GetMonthlyPaymentDetails = async (userId: string, callback: (error: any, result: any) => void) => {
    await GetMonthlyPaymentDetailsByUserId(userId, (error: any, result: any) => {
        if (error) {
            callback(error, null);
        }
        else {
            callback(null, result);
        }
    });
};
export const TokenizePaymentMethod = async (email: string, reference: string, userId: string, businessId: string, callback: (error: any, result: any) => void) => {
    await InitializeTransaction(email, reference, userId, businessId, (error: any, result: any) => {
        if (error) {
            callback(error, null);
        }
        else {
            callback(null, result);
        }
    });
};
