import { SERVER_HOST, SERVER_PORT } from '@env';
import axios, { AxiosError } from 'axios';
import { BankingDetail } from '../Models/BankingDetail';
import { AuthorizationCharge } from '../Models/PaymentsModel';
export const ChargeAuthorization = async (authorizationCharge: AuthorizationCharge, callback: (error: any, result: any) => void) => {
    await axios
        .post(`${SERVER_HOST}:${SERVER_PORT}/payments/charge-authorization`, authorizationCharge,
        )
        .then((response: any) => {
            callback(null, response.data)
        })
        .catch((error: any) => {
            callback(error, null)
        });
};
export const InitializeTransaction = async (email: string, reference: string, userId: string, businessId: string, callback: (error: any, result: any) => void) => {
    await axios
        .post(`${SERVER_HOST}:${SERVER_PORT}/payments/initialize-transaction`,
            {
                email: email,
                amount: 100,
                reference: reference,
                currency: "ZAR",
                metadata: {
                    user_id: userId,
                    transporter_user_id: businessId,
                    charge_type: "Card Authorization"
                }

            },
        )
        .then((response: any) => {
            callback(null, response.data)
        })
        .catch((error: any) => {
            callback(error, null)
        });
};
