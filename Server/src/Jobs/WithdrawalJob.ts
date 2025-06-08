import schedule from "node-schedule";
import { ErrorResponse } from "../Classes/ErrorResponse";
import { FetchBulkWithdrawalsForProcessing } from "../Models/PaymentsModel";
import { InitiateBulkTransfer } from "../Services/PaystackService";
import { BulkTransferRequest } from "../Classes/Transfer";
import { WorkerLogger } from "../Worker/MainWorker";


/**
 * Schedules jobs for automatic bulk transfers.
 */
export const AutomaticWithdrawalJob = (): void => {
    // Weekday jobs
    schedule.scheduleJob("0 15 * * 1-5", async () => {
        WorkerLogger.Log("Withdrawal Worker: Running weekday job at 15:00...");
        await RunBulkTransfer();
    });

    // schedule.scheduleJob("0 23 * * 1-5", async () => {
    //     WorkerLogger.Log("Withdrawal Worker: Running weekday job at 23:00...");
    //     await RunBulkTransfer();
    // });

    // Weekend jobs
    schedule.scheduleJob("0 9 * * 6,0", async () => {
        WorkerLogger.Log("Withdrawal Worker: Running weekend job at 9:00...");
        await RunBulkTransfer();
    });

    // schedule.scheduleJob("0 23 * * 6,0", async () => {
    //     WorkerLogger.Log("Withdrawal Worker: Running weekend job at 23:00...");
    //     await RunBulkTransfer();
    // });
};

/**
 * Runs the bulk transfer process.
 */
const RunBulkTransfer = async (): Promise<void> => {
    WorkerLogger.Log("Withdrawal Worker: Starting automatic bulk withdrawal process...");

    try {
        const bulkWithdrawals = await GetBulkTransfersForToday();
        if (!bulkWithdrawals || bulkWithdrawals.transfers.length === 0) {
            WorkerLogger.Log("Withdrawal Worker: No bulk transfers to process today.");
            return;
        }

        WorkerLogger.Log("Withdrawal Worker: Initiating bulk transfer...");
        await InitiateBulkTransfer(bulkWithdrawals);
        WorkerLogger.Log("Withdrawal Worker: Bulk transfer initiated.");
        // Consider adding logic to update transfer statuses in your database here, after successful initiation

    } catch (error: any) {
        WorkerLogger.Error(`Withdrawal Worker: Automatic withdrawal job failed: ${error.message}`);
    }
};

/**
 * Fetches bulk transfers for today from the database.
 * Uses the stored procedure GetBulkWithdrawalsForProcessing.
 */
const GetBulkTransfersForToday = async (): Promise<BulkTransferRequest> => {
    try {
        const pendingWithdrawals = await FetchBulkWithdrawalsForProcessing(); // Calls the model function
        if (!pendingWithdrawals || pendingWithdrawals.length === 0) {
            return {
                currency: "ZAR", // Use your default currency
                source: "balance", // Use your default source
                transfers: [],
            };
        }

        // Map the Transfer objects (from the database) to the format expected by Paystack
        const transfers = pendingWithdrawals.map((withdrawal) => ({
            recipient: withdrawal.recipientCode, // Make sure this matches your Transfer class
            amount: withdrawal.amount * 100, // Convert to kobo/cents
            reason: withdrawal.reason,
            reference: withdrawal.reference,
        }));

        return {
            currency: "ZAR", // Use your default currency.
            source: "balance", // Use your default source.
            transfers: transfers,
        };
    } catch (error: any) {
        WorkerLogger.Error(`Withdrawal Worker: Failed to fetch bulk transfers: ${error.message}`);
        throw new ErrorResponse(500, "Failed to fetch bulk transfers", error);
    }
};