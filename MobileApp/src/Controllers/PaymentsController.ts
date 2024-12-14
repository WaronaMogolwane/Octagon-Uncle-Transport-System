import { GetAvailableBalanceByBusinessId, GetDeclinedPaymentSummaryByBusinessId, GetPaymentsByBusinessId, GetPaymentsSummaryForThisMonthByBusinessId, GetUpcomingPaymentSummaryByBusinessId } from "../Data/PaymentDAL";

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
