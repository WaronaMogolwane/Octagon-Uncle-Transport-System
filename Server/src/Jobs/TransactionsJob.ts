import schedule from "node-schedule";
import { CustomLogger } from "../Classes/CustomLogger";
import { PaystackListTransactionsResponse, PaystackTransactionData, Transaction } from "../Classes/Transaction";
import { InsertSuccessfulTransaction, InsertTransaction } from "../Models/PaymentsModel";
import { FetchPaystackTransactions } from "../Services/PaystackService";
import { WorkerLogger } from "../Worker/MainWorker";

const ONE_MORNING: string = "*/15 * * * *"; // Cron schedule for Every 15 minutes


export const FetchAndSaveTransactionsJob = (): void => {
    schedule.scheduleJob(ONE_MORNING, async () => {
        WorkerLogger.Log('Running Fetch All Transactions Job...');

        const thirtyDaysAgo: Date = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        const fromDate: string = thirtyDaysAgo.toISOString();
        const toDate: string = new Date().toISOString();

        let page: number = 1;
        let shouldContinue: boolean = true;
        let totalTransactions = 0;
        let savedTransactions = 0;

        while (shouldContinue) {
            try {
                const paystackResponse: PaystackListTransactionsResponse | null = await FetchPaystackTransactions(fromDate, toDate, page);

                if (paystackResponse && paystackResponse.status && paystackResponse.data && paystackResponse.data.length > 0) {
                    const transactions: PaystackTransactionData[] = paystackResponse.data; // Get ALL transactions

                    totalTransactions += transactions.length;

                    for (const transactionData of transactions) {
                        try {
                            // Paystack amount is in kobo, convert to Naira if necessary
                            const amount = transactionData.currency === 'ZAR'
                                ? transactionData.amount
                                : transactionData.amount;

                            const newTransaction: Transaction = new Transaction(
                                transactionData.id,
                                transactionData.metadata?.user_id || null,
                                amount, // Use the converted amount
                                transactionData.currency,
                                transactionData.status,
                                transactionData.reference,
                                new Date(transactionData.created_at),
                                transactionData.paid_at ? new Date(transactionData.paid_at) : null,
                                transactionData.metadata?.charge_type || 'unknown'
                            );
                            await InsertTransaction(newTransaction)
                                .then(() => {
                                    savedTransactions++;
                                })
                                .catch((error: any) => {
                                    WorkerLogger.Error(`Error saving transaction ${transactionData.reference}: ${error.message}`);
                                });
                        } catch (error: any) {
                            WorkerLogger.Error(`Error processing transaction ${transactionData.reference}: ${error.message}`);
                        }
                    }

                    if (paystackResponse.meta.page < paystackResponse.meta.pageCount) {
                        page++;
                    } else {
                        shouldContinue = false;
                    }
                } else {
                    shouldContinue = false;
                    if (paystackResponse && !paystackResponse.status) {
                        WorkerLogger.Error(`Error fetching transactions from Paystack (page ${page}): ${paystackResponse.message}`);
                    } else if (!paystackResponse) {
                        WorkerLogger.Error(`Failed to fetch transactions from Paystack (page ${page}). PaystackResponse was null/undefined.`);
                    } else {
                        WorkerLogger.Log(`No transactions returned from Paystack for page ${page}.`);
                    }
                }
            } catch (error: any) {
                WorkerLogger.Error(`An error occurred in FetchAndSaveSuccessfulTransactionsJob: ${error.message}`);
                shouldContinue = false;
            }
        }

        WorkerLogger.Log(`Fetch Transactions Job completed. Total Transactions Processed: ${totalTransactions}, Saved: ${savedTransactions}`);
    });
};
