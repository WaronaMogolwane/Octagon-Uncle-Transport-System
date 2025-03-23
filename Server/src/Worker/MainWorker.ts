import { AutomaticWithdrawalJob } from './../Jobs/WithdrawalJob';
import { CustomLogger } from "../Classes/CustomLogger";
import { PendingChargesJob } from "../Jobs/PendingChargesJob";
import { BulkChargeJob } from "../Jobs/RecurringPaymentsJobs";
import { TripsSchedulerJob } from "../Jobs/Trips";

const NODE_ENV = process.env.NODE_ENV || "development"; // Default to "development" if not specified
const Logger = new CustomLogger();

export class MainWorker {
    /**
     * Main worker service that starts scheduled jobs.
     */
    StartJobs(): void {
        try {
            BulkChargeJob();
            PendingChargesJob();
            AutomaticWithdrawalJob();
            TripsSchedulerJob();
            Logger.Log("Main worker has started.");
        } catch (error) {
            Logger.Error("Error starting jobs:" + error);
        }
    }
}

// Automatically start the main worker in production mode
if (require.main === module && NODE_ENV === "production") {
    const mainWorker = new MainWorker();
    mainWorker.StartJobs();
}
