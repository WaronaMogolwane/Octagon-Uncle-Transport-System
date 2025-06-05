import schedule from "node-schedule";
import { CustomLogger } from "../Classes/CustomLogger";
import {
    BulkChargeAuthorizations,
    GetAllBulkChargesForCurrentDay,
} from "../Controllers/PaymentsController";
import { BulkChargeReponse } from "../Classes/BulkCharge";
import { WorkerLogger } from "../Worker/MainWorker";

const TWELVE_NOON: string = "0 12 * * *"; // Cron schedule for 12:00 PM daily

/**
 * Schedules a job to handle recurring bulk charges daily.
 */
export const BulkChargeJob = (): void => {
    schedule.scheduleJob(TWELVE_NOON, async () => {
        WorkerLogger.Log("Bulk Charge Worker: Checking if recurring payment has been charged today...");

        try {
            const isChargedToday = await IsRecurringPaymentChargedToday();
            if (!isChargedToday) {
                WorkerLogger.Log("Bulk Charge Worker: Starting bulk charge authorization process...");
                await BulkChargeAuthorizations((error: any, result: BulkChargeReponse) => {
                    if (error) {
                        WorkerLogger.Error(`Bulk Charge Worker: Bulk charge authorization error: ${JSON.stringify(error)}`);
                    } else {
                        WorkerLogger.Log(`Bulk Charge Worker: Bulk charge authorization success: ${JSON.stringify(result)}`);
                    }
                });
            } else {
                WorkerLogger.Log("Bulk Charge Worker: Recurring payment already charged today. Skipping bulk charge.");
            }
        } catch (error: any) {
            WorkerLogger.Error(`Bulk Charge Worker: Error checking recurring payment status: ${error.message}`);
        }
    });
};

/**
 * Checks if recurring payments have been charged for the current day.
 * @returns {Promise<boolean>} - Returns `true` if payments are already charged, `false` otherwise.
 */
const IsRecurringPaymentChargedToday = async (): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        GetAllBulkChargesForCurrentDay((error: any, result: any) => {
            if (error) {
                reject(error);
            } else {
                resolve(result.length > 0);
            }
        });
    });
};
