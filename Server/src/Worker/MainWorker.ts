import { BulkChargeJob } from "../Jobs/RecurringPayments"
import { TripsSchedulerJob } from "../Jobs/Trips";

export class MainWorker {
    /**
     * Main worker service that starts on entry of the server.
     * @returns {any}
     */
    StartJobs = (): void => {
        BulkChargeJob();
        TripsSchedulerJob();
    }
}