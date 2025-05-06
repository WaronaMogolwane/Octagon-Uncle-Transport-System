import schedule from "node-schedule";
import { CustomLogger } from "../Classes/CustomLogger";
import { Transaction } from "../Classes/Transaction";
import { InsertSuccessfulTransaction } from "../Models/PaymentsModel";
import { FetchPaystackTransactions } from "../Services/PaystackService";


const Logger: CustomLogger = new CustomLogger();
const SUCCESSFUL_TRANSACTION_STATUS = 'success';
const ONE_MORNING: string = "0 1 * * *"; // Cron schedule for 01:00 PM daily



export const FetchAndSaveSuccessfulTransactionsJob = (): void => {
    // Schedule to run once a day at a specific time (e.g., 01:00 AM)
    schedule.scheduleJob(ONE_MORNING, async () => {
        console.log('Running Fetch Successful Transactions Job...');

        const thirtyDaysAgo: Date = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        const fromDate: string = thirtyDaysAgo.toISOString();
        const toDate: string = new Date().toISOString();

        let page: number = 1;
        let shouldContinue: boolean = true;

        while (shouldContinue) {
            const paystackResponse = await FetchPaystackTransactions(fromDate, toDate, page);

            if (paystackResponse && paystackResponse.status && paystackResponse.data && paystackResponse.data.length > 0) {
                const successfulTransactions = paystackResponse.data.filter(
                    (transaction) => transaction.status === SUCCESSFUL_TRANSACTION_STATUS
                );

                for (const transactionData of successfulTransactions) {
                    const newTransaction: Transaction = new Transaction(
                        transactionData.id,
                        transactionData.metadata?.user_id || null,
                        transactionData.amount,
                        transactionData.currency,
                        transactionData.status,
                        transactionData.reference,
                        new Date(transactionData.created_at),
                        transactionData.paid_at ? new Date(transactionData.paid_at) : null,
                        transactionData.metadata?.charge_type || 'unknown'
                    );
                    await InsertSuccessfulTransaction(newTransaction);
                }

                if (paystackResponse.meta.page < paystackResponse.meta.pageCount) {
                    page++;
                } else {
                    shouldContinue = false;
                }
                console.log('Fetch Successful Transactions Job completed.');

            } else {
                shouldContinue = false; // No more data or an error occurred
                if (paystackResponse && !paystackResponse.status) {
                    Logger.Error(`Error fetching transactions from Paystack (page ${page}): ${paystackResponse.message}`);
                } else if (!paystackResponse) {
                    Logger.Error(`Failed to fetch transactions from Paystack (page ${page}).`);
                }
            }
        }

        Logger.Log('Successfully fetched and saved all successful transactions for the last 30 days.');
    })
};