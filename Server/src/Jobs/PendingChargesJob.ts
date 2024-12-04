import schedule, { scheduleJob } from "node-schedule";
import { CustomLogger } from "../Classes/CustomLogger";
import { BulkChargeAuthorizations, CheckIfRecurringChargesPendingToday, CreatePendingCharges, GetAllBulkChargesForCurrentDay } from "../Controllers/PaymentsController";
import { BulkChargeReponse } from "../Classes/BulkCharge";
import { ErrorResponse } from "../Classes/ErrorResponse";
const HALF_TWELVE_NIGHT: string = "30 0 * * *"
const Logger: CustomLogger = new CustomLogger();
export const PendingChargesJob = () => {
    schedule.scheduleJob(
        HALF_TWELVE_NIGHT, //Everyday 00:30
        async function () {
            AreRecurringChargesPendingToday((error: any, result: any) => {
                Logger.Log('Creating pending charges.')
                if (error) {
                    const err: Error = new Error(error.message)
                    Logger.Error(new ErrorResponse(400, err.message, err.stack).toString());
                }
                else {
                    if (result == false) {
                        CreatePendingCharges((error: any, result: any) => {
                            if (error) {
                                const err: Error = new Error(error.message)
                                Logger.Error(new ErrorResponse(400, err.message, err.stack).toString());
                            }
                            else (
                                Logger.Log('Pending charges successfully created.')
                            )
                        })
                    }
                    else {
                        Logger.Log('Pending recurring charges already exist today.')
                    }
                }
            })
        })
}
const AreRecurringChargesPendingToday = (callback: (error: any, result: any) => void): any => {
    CheckIfRecurringChargesPendingToday((error: any, result: any) => {
        if (error) {
            callback(error, null)
        } else {

            if (result > 0) {
                callback(null, true);
            } else {
                callback(null, false);
            }
        }
    })
}