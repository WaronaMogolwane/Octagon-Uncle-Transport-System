import schedule from "node-schedule";
import { CustomLogger } from "../Classes/CustomLogger";
import {
    BulkChargeAuthorizations,
    CheckIfRecurringChargesPendingToday,
    CreatePendingCharges,
} from "../Controllers/PaymentsController";
import { BulkChargeReponse } from "../Classes/BulkCharge";
import { ErrorResponse } from "../Classes/ErrorResponse";
import { OkPacket } from "mysql2";
import { WorkerLogger } from "../Worker/MainWorker";

const HALF_TWELVE_NIGHT: string = "30 0 * * *"; // Cron expression for 00:30 daily

/**
 * Schedules a job to create pending charges daily at 00:30.
 */
export const PendingChargesJob = (): void => {
    schedule.scheduleJob(HALF_TWELVE_NIGHT, async () => {
        WorkerLogger.Log("Pending Charges Worker: Checking if recurring charges are pending for today...");

        try {
            const hasPendingCharges = await AreRecurringChargesPendingToday();
            if (!hasPendingCharges) {
                WorkerLogger.Log("Pending Charges Worker: No pending charges found. Creating pending charges...");
                await CreatePendingChargesAsync();
            } else {
                WorkerLogger.Log("Pending Charges Worker: Pending recurring charges already exist today. Skipping creation.");
            }
        } catch (error: any) {
            WorkerLogger.Error(`Pending Charges Worker: Error checking or creating pending charges: ${error.message}`);
        }
    });
};

/**
 * Checks if there are pending recurring charges for today.
 * @returns {Promise<boolean>} - Returns `true` if charges are pending, `false` otherwise.
 */
const AreRecurringChargesPendingToday = async (): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        CheckIfRecurringChargesPendingToday((error: any, result: any) => {
            if (error) {
                WorkerLogger.Error(`Pending Charges Worker: Error checking for pending charges: ${error.message}`);
                reject(error);
            } else {
                WorkerLogger.Log(`Pending Charges Worker: Found ${result > 0 ? result : "no"} pending charges.`);
                resolve(result > 0);
            }
        });
    });
};

/**
 * Creates pending charges asynchronously.
 * Logs results on success or handles errors appropriately.
 */
const CreatePendingChargesAsync = async (): Promise<void> => {
    return new Promise((resolve, reject) => {
        CreatePendingCharges((error: any, result: OkPacket) => {
            if (error) {
                const err = new Error(error.message);
                WorkerLogger.Error(`Pending Charges Worker: ${new ErrorResponse(400, err.message, err.stack).toString()}`);
                reject(err);
            } else {
                if (result.affectedRows === 0) {
                    WorkerLogger.Log("Pending Charges Worker: No new pending charges were created.");
                } else {
                    WorkerLogger.Log("Pending Charges Worker: Pending charges successfully created.");
                }
                resolve();
            }
        });
    });
};
