import { SERVER_HOST, SERVER_PORT } from '@env';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { AuthorizationCharge } from '../Models/PaymentsModel';

export const ChargeAuthorization = async (
    authorizationCharge: AuthorizationCharge
): Promise<any> => {
    try {
        const response = await axios.post(
            `${SERVER_HOST}:${SERVER_PORT}/payments/charge-authorization`,
            authorizationCharge
        );
        return response.data;
    } catch (error: AxiosError | any) {
        throw error.response?.data || error;
    }
};

export const InitializeTransaction = async (
    email: string,
    reference: string,
    userId: string,
    businessId: string
): Promise<any> => {
    try {
        const response = await axios.post(
            `${SERVER_HOST}:${SERVER_PORT}/payments/initialize-transaction`,
            {
                email,
                amount: 100,
                reference,
                currency: 'ZAR',
                metadata: {
                    user_id: userId,
                    transporter_user_id: businessId,
                    charge_type: 'Card Authorization',
                },
            }
        );
        return response.data;
    } catch (error: AxiosError | any) {
        throw error.response?.data || error;
    }
};

export const GetMonthlyPaymentDetailsByUserId = async (
    userId: string
): Promise<any> => {
    try {
        const response = await axios.get(
            `${SERVER_HOST}:${SERVER_PORT}/payments/get-monthly-payment-details`,
            {
                params: { userId },
            }
        );
        return response.data[0][0];
    } catch (error: AxiosError | any) {
        throw error.response?.data || error;
    }
};
