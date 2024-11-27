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
