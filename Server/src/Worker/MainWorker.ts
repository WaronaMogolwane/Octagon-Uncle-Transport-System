import { CustomLogger } from "../Classes/CustomLogger";
import { PendingChargesJob } from "../Jobs/PendingChargesJob";
import { BulkChargeJob } from "../Jobs/RecurringPaymentsJobs";
import { TripsSchedulerJob } from "../Jobs/Trips";

const NODE_ENV = process.env.NODE_ENV;
const Logger: CustomLogger = new CustomLogger();

export class MainWorker {
    /**
     * Main worker service that starts on entry of the server.
     * @returns {any}
     */
    StartJobs = (): void => {
        try {
            BulkChargeJob();
            PendingChargesJob();
            TripsSchedulerJob();
            Logger.Log("Main worker has started.");
        } catch (error) {
            Logger.Error(error);
        }
    }
}

if (require.main === module && NODE_ENV === 'production') {
    const mainWorker: MainWorker = new MainWorker();
    mainWorker.StartJobs();
}
