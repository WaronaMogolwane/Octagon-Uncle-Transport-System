import schedule, { scheduleJob } from "node-schedule";
import { CustomLogger } from "../Classes/CustomLogger";
import { GetBulkCharges } from "../Models/PaymentsModel";
import { GetAllCharges } from "../Controllers/PaymentsController";
import { BulkChargeReponse } from "../Classes/BulkCharge";
import { ErrorResponse } from "../Classes/ErrorResponse";

const Logger: CustomLogger = new CustomLogger();
export const BulkChargeJob = () => {
    schedule.scheduleJob(
        "0 0 * * *", //Everyday at midnight
        async function () {
            Logger.Log('Recurring Payment')
            await GetAllCharges((error: any, result: BulkChargeReponse) => {
                if (error) {
                    throw new ErrorResponse(400, error)
                }
                else {
                    Logger.Log(JSON.stringify(result))
                }
            })
        }
    );
};
