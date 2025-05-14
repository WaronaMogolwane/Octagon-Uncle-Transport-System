import { AutomaticWithdrawalJob } from './../Jobs/WithdrawalJob';
import { CustomLogger } from "../Classes/CustomLogger";
import { PendingChargesJob } from "../Jobs/PendingChargesJob";
import { BulkChargeJob } from "../Jobs/RecurringPaymentsJobs";
import { TripsSchedulerJob } from "../Jobs/Trips";
import { FetchAndSaveTransactionsJob } from '../Jobs/TransactionsJob';
import { CreateLogger } from '../Utilities/WinstonLogger'; // Adjust path as needed (Capital C)
import winston from 'winston'; // Import winston type for CustomLogger constructor

const NODE_ENV = process.env.NODE_ENV || "development"; // Default to "development" if not specified

// Create the worker-specific logger instance (lowercase variable name)
const workerLogger: winston.Logger = CreateLogger('Octagon Uncle Worker', 'worker');
const Logger = new CustomLogger(workerLogger); // Pass the worker-specific logger instance to CustomLogger
export { Logger }; // Export the logger instance for use in other modules

// Log the very first startup message immediately
workerLogger.info('Worker process started.');


// Pass workerLogger to other modules/classes that need it
export class MainWorker {
    /**
     * Main worker service that starts scheduled jobs.
     */
    StartJobs(): void {
        try {
            // These logs are part of the main job starting logic
            Logger.Log("Starting main worker...");
            BulkChargeJob();
            PendingChargesJob();
            AutomaticWithdrawalJob();
            FetchAndSaveTransactionsJob()
            TripsSchedulerJob();
            Logger.Log("Main worker has started.");
        } catch (error: any) { // Added type annotation for error
            Logger.Error(`Error starting jobs: ${error instanceof Error ? error.message : error}`);
            // Log the stack trace separately if available and not in production
            // if (NODE_ENV !== "production" && error instanceof Error && error.stack) {
            //     Logger.Error(`Error starting jobs stack: ${error.stack}`);
            // }
        }
    }
}

// Automatically start the main worker in production mode
if (require.main === module && NODE_ENV === "production") {
    // *** Wrap instantiation and StartJobs call in a setTimeout ***
    // This gives the logging system a moment after initial setup
    setTimeout(async () => { // Use setTimeout
        try {
            // The Logger instance should be available here from the outer scope
            const mainWorker = new MainWorker(); // Instantiate the class
            mainWorker.StartJobs();
            // Optional: Log completion if needed, though 'Main worker has started.' is in StartJobs
            // Logger.Log('Worker main execution block completed after delay.');
        } catch (error: any) {
            // Use console.error here as the main Logger might not be fully ready
            console.error(`An error occurred in worker main execution block (after delay): ${error instanceof Error ? error.message : error}`);
            if (NODE_ENV !== "production" && error instanceof Error && error.stack) {
                console.error(`Worker main execution block stack (after delay): ${error.stack}`);
            }
        }
    }, 100); // Add a small delay (e.g., 100 milliseconds)
}