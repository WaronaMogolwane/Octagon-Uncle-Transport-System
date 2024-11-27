import { GetAvailableBalanceByBusinessId } from "../Data/PaymentDAL";

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
