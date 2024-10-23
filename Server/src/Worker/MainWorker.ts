import { BulkChargeJob } from "../Jobs/RecurringPaymentsJobs"
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