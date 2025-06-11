import schedule from "node-schedule";
import {
  AutoInsertPassengerSchedule,
  TruncateTempPassengerSchedule,
} from "../Models/PassengerScheduleModel";
import { AutoInsertTrip } from "../Models/TripModel";
import { TruncatePassengerDriverVehicleLinking } from "../Models/PassengerDriverVehicleLinkingModel";
import { WorkerLogger } from "../Worker/MainWorker";

export const StartSchedule = () => {
  const AddPassengerDriverLinkingSchedule = schedule.scheduleJob(
    "5 0 * * *",
    function () {
      const date = new Date();
      let day = date.toLocaleString("en-us", { weekday: "long" });

      AutoInsertPassengerSchedule(day, (error, result) => {
        if (result) {
          WorkerLogger.Log("Passengers inserted into PDVL table succesfully");
          WorkerLogger.Log(
            "This job was supposed to run at 1205 but actually ran at " +
            new Date()
          );
        }
      });
    }
  );

  const AddTripSchedule = schedule.scheduleJob("10 0 * * *", function () {
    AutoInsertTrip((error, result) => {
      if (result) {
        WorkerLogger.Log("Trips succesfully added to table");
        WorkerLogger.Log(
          "This job was supposed to run at 1210 but actually ran at " +
          new Date()
        );
      }
    });
  });

  const ClearPassengerDriverVehicleLinkingSchedule = schedule.scheduleJob(
    " 1 0 * * *",
    function () {
      TruncatePassengerDriverVehicleLinking((error, result) => {
        if (result) {
          WorkerLogger.Log("PDVL table truncated");
          WorkerLogger.Log(
            "This job was supposed to run at 1201 but actually ran at " +
            new Date()
          );
        }
      });
    }
  );

  const ClearTempPassengerSchedule = schedule.scheduleJob(
    " 59 23 * * *",
    function () {
      TruncateTempPassengerSchedule((error, result) => {
        if (result) {
          WorkerLogger.Log("TempPassengerTable table truncated");
          WorkerLogger.Log(
            "This job was supposed to run at 1159 but actually ran at " +
            new Date()
          );
        }
      });
    }
  );
};
