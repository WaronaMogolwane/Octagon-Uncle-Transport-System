import { AutomaticWithdrawalJob } from './../Jobs/WithdrawalJob';
import { CustomLogger } from "../Classes/CustomLogger";
import { PendingChargesJob } from "../Jobs/PendingChargesJob";
import { BulkChargeJob } from "../Jobs/RecurringPaymentsJobs";
import { TripsSchedulerJob } from "../Jobs/Trips";
import { FetchAndSaveTransactionsJob } from '../Jobs/TransactionsJob';

import { CreateLogger as CreateWinstonLogger } from '../Utilities/WinstonLogger';

import { WorkerEventLogger } from '../Utilities/WindowsLogger';


const NODE_ENV = process.env.NODE_ENV || "development";

const workerWinstonLogger = CreateWinstonLogger("Octagon Uncle Worker");

export const WorkerLogger = new CustomLogger(workerWinstonLogger, {
    eventLogger: WorkerEventLogger
});

export class MainWorker {
    StartJobs(): void {
        try {
            WorkerLogger.Log("Starting background jobs.");
            BulkChargeJob();
            PendingChargesJob();
            AutomaticWithdrawalJob();
            FetchAndSaveTransactionsJob();
            TripsSchedulerJob();
            WorkerLogger.Log("Main worker has started.");
        } catch (error: any) {
            WorkerLogger.Error(`Error starting jobs: ${error instanceof Error ? error.message : error}`);
            if (NODE_ENV !== "production" && error instanceof Error && error.stack) {
                WorkerLogger.Error(`Error starting jobs stack: ${error.stack}`);
            }
        }
    }
}

if (require.main === module && NODE_ENV === "production") {
    setTimeout(async () => {
        try {
            const mainWorker = new MainWorker();
            mainWorker.StartJobs();
        } catch (error: any) {
            WorkerLogger.Error(`An error occurred in worker main execution block (after delay): ${error instanceof Error ? error.message : error}`);
            if (NODE_ENV !== "production" && error instanceof Error && error.stack) {
                WorkerLogger.Error(`Worker main execution block stack (after delay): ${error.stack}`);
            }
        }
    }, 100);
}