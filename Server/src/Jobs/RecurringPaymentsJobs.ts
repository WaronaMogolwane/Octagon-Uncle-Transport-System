import schedule, { scheduleJob } from "node-schedule";
import { CustomLogger } from "../Classes/CustomLogger";
import { BulkChargeAuthorizations, GetAllBulkChargesForCurrentDay } from "../Controllers/PaymentsController";
import { BulkChargeReponse } from "../Classes/BulkCharge";
import { ErrorResponse } from "../Classes/ErrorResponse";
const TWELVE_NOON: string = "0 12 * * *"
const Logger: CustomLogger = new CustomLogger();
export const BulkChargeJob = () => {
    schedule.scheduleJob(
        TWELVE_NOON, //Everyday 12:00
        async function () {
            IsRecurringPaymentChargedToday(async (error: any, result: any) => {
                Logger.Log('Try recurring bulk charge.')
                if (error) {
                    Logger.Error(error);
                } else {
                    if (result == false) {
                        await BulkChargeAuthorizations((error: any, result: BulkChargeReponse) => {
                            if (error) {
                                Logger.Error(error)
                            }
                            else {
                                Logger.Log(JSON.stringify(result))
                            }
                        })
                    }
                }
            })
        })
}
const IsRecurringPaymentChargedToday = (callback: (error: any, result: any) => void): any => {
    GetAllBulkChargesForCurrentDay((error: any, result: any) => {
        if (error) {
            callback(error, null)
        } else {
            if (result.length > 0) {
                callback(null, true);
            } else {
                callback(null, false);
            }
        }
    })
}