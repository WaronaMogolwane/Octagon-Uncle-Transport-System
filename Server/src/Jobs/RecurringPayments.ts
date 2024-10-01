import schedule, { scheduleJob } from "node-schedule";
import { CustomLogger } from "../Classes/CustomLogger";

const Logger: CustomLogger = new CustomLogger();
export const BulkChargeJob = () => {
    schedule.scheduleJob(
        "*/1 * * * *",
        function () {
            Logger.Log('Recurring Payment')
        }
    );
};
