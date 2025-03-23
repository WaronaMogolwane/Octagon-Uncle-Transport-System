import { response } from 'express';
import schedule from "node-schedule";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { CustomLogger } from "../Classes/CustomLogger";
import { BulkBankTransfer } from "../Classes/Transfer";
import { ErrorResponse } from "../Classes/ErrorResponse";
import { error } from "console";
import { InitiateBulkTransfer } from '../Services/PaystackService';

const PAYSTACK_API_URL = process.env.OUTS_PAYSTACK_API_URL;
const PAYSTACK_SECRET_KEY = process.env.OUTS_PAYSTACK_TEST_PUBLIC_KEY;
const Logger: CustomLogger = new CustomLogger();

// Validate environment variables
if (!PAYSTACK_API_URL || !PAYSTACK_SECRET_KEY) {
    throw new Error("Missing required environment variables for Paystack API.");
}

/**
 * Schedules jobs for automatic bulk transfers.
 */
export const AutomaticWithdrawalJob = (): void => {
    // Weekday jobs
    schedule.scheduleJob("0 15 * * 1-5", async () => {
        Logger.Log("Withdrawal Worker: Running weekday job at 15:00...");
        await RunBulkTransfer();
    });

    schedule.scheduleJob("0 23 * * 1-5", async () => {
        Logger.Log("Withdrawal Worker: Running weekday job at 23:00...");
        await RunBulkTransfer();
    });

    // Weekend jobs
    schedule.scheduleJob("0 9 * * 6,0", async () => {
        Logger.Log("Withdrawal Worker: Running weekend job at 9:00...");
        await RunBulkTransfer();
    });

    schedule.scheduleJob("0 23 * * 6,0", async () => {
        Logger.Log("Withdrawal Worker: Running weekend job at 23:00...");
        await RunBulkTransfer();
    });
};

/**
 * Runs the bulk transfer process.
 */
const RunBulkTransfer = async (): Promise<void> => {
    Logger.Log("Withdrawal Worker: Starting automatic bulk withdrawal process...");

    try {
        const bulkTransfers = await GetBulkTransfersForToday();
        if (!bulkTransfers.transfers || bulkTransfers.transfers.length === 0) {
            Logger.Log("Withdrawal Worker: No bulk transfers to process today.");
            return;
        }

        Logger.Log("Withdrawal Worker: Initiating bulk transfer...");
        await InitiateBulkTransfer(bulkTransfers, (response: any) => {
            Logger.Log(`Withdrawal Worker: Bulk transfer successful: ${JSON.stringify(response.data)}`);
        });
    } catch (error: any) {
        Logger.Error(`Withdrawal Worker: Automatic withdrawal job failed: ${error.message}`);
    }
};

/**
 * Fetches bulk transfers for today.
 */
const GetBulkTransfersForToday = async (): Promise<BulkBankTransfer> => {
    try {
        return {
            currency: "ZAR",
            source: "balance",
            transfers: [
                {
                    recipient: "RCP_12345",
                    amount: 50000,
                    reason: "Payment for services",
                    source: "balance",
                    reference: "PAY_001",
                },
                {
                    recipient: "RCP_67890",
                    amount: 250000,
                    reason: "Salary payout",
                    source: "balance",
                    reference: "PAY_002",
                },
            ],
        };
    } catch (error: any) {
        Logger.Error(`Withdrawal Worker: Failed to fetch bulk transfers: ${error.message}`);
        throw new ErrorResponse(500, "Failed to fetch bulk transfers", error);
    }
};

