import schedule from "node-schedule";
import { AutoInsertPassengerSchedule } from "../Models/PassengerScheduleModel";
import { AutoInsertTrip } from "../Models/TripModel";
import { TruncatePassengerDriverVehicleLinking } from "../Models/PassengerDriverVehicleLinkingModel";

export const StartSchedule = () => {
  const AddPassengerDriverLinkingSchedule = schedule.scheduleJob(
    "5 0 * * *",
    function () {
      const date = new Date();
      let day = date.toLocaleString("en-us", { weekday: "long" });

      AutoInsertPassengerSchedule(day, (error, result) => {
        if (result) {
          console.log("Passengers inserted into PDVL table succesfully");
        }
      });
    }
  );

  const AddTripSchedule = schedule.scheduleJob("10 0 * * *", function () {
    AutoInsertTrip((error, result) => {
      if (result) {
        console.log("Trips succesfully added to table");
      }
    });
  });

  const ClearPassengerDriverVehicleLinkingSchedule = schedule.scheduleJob(
    " * 0 * * *",
    function () {
      TruncatePassengerDriverVehicleLinking((error, result) => {
        if (result) {
          console.log("PDVL table truncated");
        }
      });
    }
  );
};
